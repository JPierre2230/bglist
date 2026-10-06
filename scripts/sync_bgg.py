#!/usr/bin/env python3
"""
Sync a BoardGameGeek collection into data/games.json for the shelf website.

Usage
  BGG_TOKEN=xxxx python scripts/sync_bgg.py --user YOUR_BGG_NAME
  python scripts/sync_bgg.py --csv collection.csv        # no token yet? use BGG's CSV export

Only the Python standard library is used, so it runs anywhere (including GitHub Actions).

BGG rules this script follows (https://boardgamegeek.com/using_the_xml_api):
  * every XML API request carries "Authorization: Bearer <token>"
  * requests go to boardgamegeek.com (no www)
  * requests are spaced out, and 202 / 429 / 5xx responses are retried with backoff
"""
import argparse
import csv
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

API = "https://boardgamegeek.com/xmlapi2"
THING_BATCH = 20          # BGG's current maximum ids per /thing request
PAUSE = 2.5               # seconds between requests, to stay polite
UA = "bglist-shelf/1.0 (+https://github.com/)"
CJK = re.compile(r"[\u3400-\u9fff\uf900-\ufaff]")
# BGG's language-dependence poll levels, 1 (no text) .. 5 (unplayable in another language)
LANG_LEVELS = {"no necessary": 1, "some necessary": 2, "moderate": 3, "extensive": 4, "unplayable": 5}


def lang_level(text):
    t = (text or "").lower()
    return next((v for k, v in LANG_LEVELS.items() if t.startswith(k)), None)


# ---------------------------------------------------------------- HTTP

def fetch(path, params, token, tries=10):
    url = f"{API}/{path}?{urllib.parse.urlencode(params)}"
    headers = {"User-Agent": UA}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    wait = PAUSE
    for attempt in range(1, tries + 1):
        time.sleep(PAUSE if attempt == 1 else wait)
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                body = r.read()
                if r.status == 202:   # collection is being prepared on BGG's side
                    log(f"  BGG is preparing the data (202), retrying… [{attempt}/{tries}]")
                    wait = min(wait * 1.6, 30)
                    continue
                return ET.fromstring(body)
        except urllib.error.HTTPError as e:
            if e.code == 401:
                sys.exit("BGG answered 401 Unauthorized. Check that BGG_TOKEN is set and valid "
                         "(create one at https://boardgamegeek.com/applications).")
            if e.code in (429, 500, 502, 503, 504):
                wait = min(wait * 2, 60)
                log(f"  BGG returned {e.code}, waiting {wait:.0f}s… [{attempt}/{tries}]")
                continue
            raise
        except urllib.error.URLError as e:
            wait = min(wait * 2, 60)
            log(f"  network error ({e.reason}), waiting {wait:.0f}s… [{attempt}/{tries}]")
    sys.exit(f"Gave up after {tries} attempts: {url}")


def log(msg):
    print(msg, flush=True)


# ---------------------------------------------------------------- parsing helpers

def num(v, kind=float):
    try:
        x = kind(float(v))
        return x if x != 0 else None
    except (TypeError, ValueError):
        return None


def val(el, tag, attr="value", kind=None):
    node = el.find(tag)
    if node is None:
        return None
    raw = node.get(attr) if attr else node.text
    return num(raw, kind) if kind else raw


def clean_description(text, limit=1600):
    if not text:
        return ""
    t = html.unescape(html.unescape(text))          # BGG double-encodes some entities
    t = re.sub(r"\n{3,}", "\n\n", t).strip()
    return t if len(t) <= limit else t[:limit].rsplit(" ", 1)[0] + "…"


# ---------------------------------------------------------------- collection

def parse_collection(root, subtype):
    games = {}
    for it in root.findall("item"):
        gid = int(it.get("objectid"))
        status = it.find("status")
        stats = it.find("stats")
        my = None
        if stats is not None:
            r = stats.find("rating")
            if r is not None:
                my = num(r.get("value"))
        games[gid] = {
            "id": gid,
            "type": "expansion" if subtype == "boardgameexpansion" else "base",
            "name": (it.findtext("name") or "").strip(),
            "image": (it.findtext("image") or "").strip() or None,
            "thumb": (it.findtext("thumbnail") or "").strip() or None,
            "myRating": my,
            "numPlays": num(it.findtext("numplays"), int) or 0,
            "comment": (it.findtext("comment") or "").strip() or None,
            "added": (status.get("lastmodified") if status is not None else None),
        }
    return games


def get_collection(user, token):
    games = {}
    log(f"Fetching owned base games for {user}…")
    root = fetch("collection", {"username": user, "own": 1, "stats": 1,
                                "subtype": "boardgame",
                                "excludesubtype": "boardgameexpansion"}, token)
    err = root.find(".//error/message")
    if err is not None:
        sys.exit(f"BGG error: {err.text}")
    games.update(parse_collection(root, "boardgame"))
    log(f"  {len(games)} base games")

    log("Fetching owned expansions…")
    root = fetch("collection", {"username": user, "own": 1, "stats": 1,
                                "subtype": "boardgameexpansion"}, token)
    exp = parse_collection(root, "boardgameexpansion")
    log(f"  {len(exp)} expansions")
    games.update(exp)
    return games


# ---------------------------------------------------------------- thing details

def parse_player_poll(item):
    best, rec = [], []
    poll = item.find("poll[@name='suggested_numplayers']")
    if poll is None:
        return best, rec
    for res in poll.findall("results"):
        n = res.get("numplayers", "")
        if not n.isdigit():          # skip "4+" style buckets
            continue
        votes = {r.get("value"): int(r.get("numvotes", 0)) for r in res.findall("result")}
        b, r_, no = votes.get("Best", 0), votes.get("Recommended", 0), votes.get("Not Recommended", 0)
        if b + r_ + no < 3:
            continue
        if b >= r_ and b > no:
            best.append(int(n))
        if b + r_ > no:
            rec.append(int(n))
    return best, rec


def parse_lang_poll(item):
    poll = item.find("poll[@name='language_dependence']")
    if poll is None:
        return None
    votes = [(int(r.get("numvotes", 0)), lang_level(r.get("value"))) for r in poll.findall("results/result")]
    votes = [v for v in votes if v[1] and v[0] > 0]
    return max(votes)[1] if votes else None


def parse_thing(item):
    links = lambda t: [l.get("value") for l in item.findall(f"link[@type='{t}']")]
    alt = [n.get("value") for n in item.findall("name[@type='alternate']")]
    best, rec = parse_player_poll(item)
    ratings = item.find("statistics/ratings")
    rank = None
    weight = rating = None
    if ratings is not None:
        weight = val(ratings, "averageweight", kind=float)
        rating = val(ratings, "average", kind=float)
        r = ratings.find("ranks/rank[@name='boardgame']")
        if r is not None:
            rank = num(r.get("value"), int)
    return {
        "primaryName": (item.find("name[@type='primary']").get("value")
                        if item.find("name[@type='primary']") is not None else None),
        "altNames": alt,
        "cjkName": next((a for a in alt if CJK.search(a)), None),
        "year": val(item, "yearpublished", kind=int),
        "image": (item.findtext("image") or "").strip() or None,
        "thumb": (item.findtext("thumbnail") or "").strip() or None,
        "minPlayers": val(item, "minplayers", kind=int),
        "maxPlayers": val(item, "maxplayers", kind=int),
        "bestPlayers": best,
        "recPlayers": rec,
        "time": val(item, "playingtime", kind=int),
        "minTime": val(item, "minplaytime", kind=int),
        "maxTime": val(item, "maxplaytime", kind=int),
        "minAge": val(item, "minage", kind=int),
        "langDep": parse_lang_poll(item),
        "weight": round(weight, 2) if weight else None,
        "rating": round(rating, 2) if rating else None,
        "rank": rank,
        "categories": links("boardgamecategory"),
        # BGG's game types (strategygames, thematic, partygames, familygames, abstracts, wargames, ...)
        "domains": [r.get("name") for r in item.findall("statistics/ratings/ranks/rank[@type='family']")],
        # only the BGG families that describe a category or mechanism (e.g. "Category: Dungeon Crawler")
        "families": [f for f in links("boardgamefamily") if f.startswith(("Category:", "Mechanism:"))],
        "mechanics": links("boardgamemechanic"),
        "designers": links("boardgamedesigner"),
        "baseIds": [int(l.get("id")) for l in item.findall("link[@type='boardgameexpansion']")
                    if l.get("inbound") == "true"],
        "description": clean_description(item.findtext("description")),
    }


def get_things(ids, token):
    out = {}
    ids = sorted(ids)
    for i in range(0, len(ids), THING_BATCH):
        chunk = ids[i:i + THING_BATCH]
        log(f"Fetching game details {i + 1}–{i + len(chunk)} of {len(ids)}…")
        root = fetch("thing", {"id": ",".join(map(str, chunk)), "stats": 1}, token)
        for item in root.findall("item"):
            out[int(item.get("id"))] = parse_thing(item)
    return out


# ---------------------------------------------------------------- plays

def get_plays(user, token, max_pages=50):
    """Logged plays, with the collection owner removed from each player list."""
    plays = []
    me = user.lower()
    for page in range(1, max_pages + 1):
        root = fetch("plays", {"username": user, "page": page}, token)
        batch = root.findall("play")
        if not batch:
            break
        for p in batch:
            item = p.find("item")
            if item is None:
                continue
            names = []
            for pl in p.findall("players/player"):
                if (pl.get("username") or "").lower() == me:
                    continue
                n = (pl.get("name") or "").strip() or (pl.get("username") or "").strip()
                if n:
                    names.append(n)
            plays.append({
                "date": p.get("date"),
                "gameId": int(item.get("objectid")),
                "qty": int(p.get("quantity") or 1),
                "players": names,
            })
        total = int(root.get("total") or 0)
        log(f"  plays page {page}: {len(plays)}/{total}")
        if len(plays) >= total:
            break
    return plays


# ---------------------------------------------------------------- CSV fallback

def from_csv(path):
    """Read BGG's 'Export collection' CSV (available without a token while logged in)."""
    def i(v): return num(v, int)
    def f(v):
        x = num(v)
        return round(x, 2) if x else None
    def plist(v):
        return sorted({int(x) for x in re.findall(r"\d+", v or "")})
    def age(v):
        m = re.search(r"\d+", v or "")
        return int(m.group()) if m else None
    games, seen = [], {}
    with open(path, newline="", encoding="utf-8-sig") as fh:
        for row in csv.DictReader(fh):
            if row.get("own", "1") not in ("1", "", None):
                continue
            gid = i(row.get("objectid"))
            if not gid:
                continue
            if gid in seen:                      # several copies of the same game
                seen[gid]["copies"] += 1
                continue
            g = {
                "id": gid,
                "type": "expansion" if row.get("itemtype") == "expansion"
                        or row.get("objecttype") == "boardgameexpansion" else "base",
                "name": row.get("objectname") or row.get("originalname") or f"#{gid}",
                "altNames": [], "cjkName": None,
                "year": i(row.get("yearpublished")),
                "image": None, "thumb": None,
                "minPlayers": i(row.get("minplayers")), "maxPlayers": i(row.get("maxplayers")),
                "bestPlayers": plist(row.get("bggbestplayers")),
                "recPlayers": plist(row.get("bggrecplayers")),
                "time": i(row.get("playingtime")),
                "minTime": i(row.get("minplaytime")), "maxTime": i(row.get("maxplaytime")),
                "minAge": age(row.get("bggrecagerange")),
                "langDep": lang_level(row.get("bgglanguagedependence")),
                "copies": 1,
                "weight": f(row.get("avgweight")), "rating": f(row.get("average")),
                "rank": i(row.get("rank")), "myRating": f(row.get("rating")),
                "numPlays": i(row.get("numplays")) or 0,
                "categories": [], "mechanics": [], "designers": [], "baseIds": [],
                "description": "", "comment": row.get("comment") or None,
                "added": row.get("acquisitiondate") or None,
            }
            seen[gid] = g
            games.append(g)
    link_expansions_by_name(games)
    return games


def link_expansions_by_name(games):
    """The CSV doesn't say which base game an expansion belongs to, so match on names:
    'Root: The Riverfolk Expansion' -> 'Root', '20 Strong: Too Many Bones' -> 'Too Many Bones'."""
    bases = sorted((g for g in games if g["type"] == "base"), key=lambda g: -len(g["name"]))
    for e in (g for g in games if g["type"] == "expansion"):
        name = e["name"].lower()
        for b in bases:
            bn = b["name"].lower()
            if (name.startswith(bn) and name[len(bn):len(bn) + 2] in (": ", " –", " -", " (")) \
                    or name.endswith(": " + bn):
                e["baseIds"] = [b["id"]]
                break


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--user", default=os.environ.get("BGG_USERNAME"), help="BGG username")
    ap.add_argument("--token", default=os.environ.get("BGG_TOKEN"), help="BGG API token (or env BGG_TOKEN)")
    ap.add_argument("--csv", help="Use a BGG collection CSV export instead of the API")
    ap.add_argument("--no-plays", action="store_true", help="Skip fetching logged plays")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "data", "games.json"))
    a = ap.parse_args()

    if a.csv:
        games, plays, source = from_csv(a.csv), [], "csv"
    else:
        if not a.user:
            sys.exit("Set --user or the BGG_USERNAME environment variable.")
        if not a.token:
            sys.exit("Set the BGG_TOKEN environment variable. BGG requires a registered app token: "
                     "https://boardgamegeek.com/applications  (or use --csv with your collection export)")
        coll = get_collection(a.user, a.token)
        details = get_things(coll.keys(), a.token)
        games = []
        for gid, g in coll.items():
            d = details.get(gid, {})
            merged = {**g, **{k: v for k, v in d.items() if v not in (None, [], "") or k == "domains"}}
            merged["name"] = g["name"] or d.get("primaryName") or f"#{gid}"
            merged.pop("primaryName", None)
            for k in ("altNames", "categories", "mechanics", "designers", "baseIds", "bestPlayers", "recPlayers"):
                merged.setdefault(k, [])
            games.append(merged)
        plays = [] if a.no_plays else get_plays(a.user, a.token)
        source = "api"

    games.sort(key=lambda g: g["name"].lower())
    data = {
        "generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "username": a.user,
        "source": source,
        "games": games,
        "plays": plays,
    }
    # Skip writing when nothing changed, so the scheduled job doesn't make empty commits
    try:
        with open(a.out, encoding="utf-8") as fh:
            old = json.load(fh)
        if all(old.get(k) == data[k] for k in ("username", "source", "games", "plays")):
            log("No changes since the last sync.")
            return
    except (OSError, ValueError):
        pass
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    log(f"Wrote {len(games)} games and {len(plays)} plays to {os.path.normpath(a.out)}")


if __name__ == "__main__":
    main()
