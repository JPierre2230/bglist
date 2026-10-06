# Board game shelf

A website that shows your BoardGameGeek collection with box art, filters, and a played-with list for each friend. It runs free on GitHub Pages, and a GitHub Action refreshes your collection from BGG every day.

What it does

- Filter by player count (supports / BGG recommended / BGG best), playing time, complexity, language dependence (how much reading a game needs), categories and mechanics. Filters combine and are saved in the address bar, so you can bookmark or share a filtered view (for example "best at 4 players, under an hour").
- Search by English or Chinese name (BGG's alternate names are included), designer or mechanic. A 中文 button switches the interface to Traditional Chinese and shows Chinese titles first when BGG has one.
- Friends: give each friend a meeple colour. Choose a friend to see only games you've played together, or only ones you haven't yet. Games fill in automatically from your BGG play logs, and you can tick extra games by hand.
- "Pick one for us" chooses a random game from whatever is currently filtered.
- Expansions are hidden by default and listed under their base game.

## Why the old site stopped showing pictures

The old bglist loaded images through two free helper services (bgg-json.azurewebsites.net and cors-anywhere.herokuapp.com) that have since shut down. This version talks to BGG's official API directly, from a GitHub Action, so there's nothing in between to disappear. If an image ever fails to load, the card shows a coloured tile with the game's initials instead of a blank space.

## Setup (about 15 minutes, plus BGG's approval wait)

### 1. Request a BGG API token

Since 2025 BGG requires every app that uses its API to be registered.

1. Sign in to BoardGameGeek and go to https://boardgamegeek.com/applications
2. Register a new application. Choose the free non-commercial licence and describe it as a personal collection viewer.
3. Approval can take a week or more. Once approved, open the application and create a token. Copy it somewhere safe.

You can finish the remaining steps while you wait. The site works with sample data, or with your CSV export (see "Before your token arrives" below).

### 2. Put the site on GitHub

1. Create a free GitHub account if you don't have one, then create a new **public** repository, for example `bglist`.
2. Upload everything in this folder to the repository (on the repository page: Add file → Upload files, then drag the folder contents in). Make sure the hidden `.github` folder and the `.nojekyll` file are included; if your file manager hides them, enable "show hidden files" first.
3. Go to Settings → Pages. Under "Build and deployment", set Source to "Deploy from a branch", Branch to `main`, folder `/ (root)`, and save.
4. After a minute your site is live at `https://YOUR-GITHUB-NAME.github.io/bglist/`.

### 3. Connect your BGG account

In the repository, go to Settings → Secrets and variables → Actions.

1. On the **Secrets** tab, add a secret named `BGG_TOKEN` and paste your BGG token. Secrets are never shown publicly.
2. On the **Variables** tab, add a variable named `BGG_USERNAME` with your BGG username.

### 4. Run the first sync

Go to the Actions tab, choose "Sync BoardGameGeek collection", and press "Run workflow". A collection of 200 games takes about two minutes. When it finishes, refresh your site.

From then on it runs every night at 3:00 (Taiwan time). Press "Run workflow" anytime you want an update straight away.

Note: GitHub pauses scheduled workflows in repositories that have had no activity for 60 days. If that happens, you'll get an email; one click on "Enable workflow" in the Actions tab restarts it.

## Friends

Click "Edit friends" on the site to add people. For each friend:

- **Name** is what's shown on the site.
- **Names in BGG play logs** links them to your logged plays. The editor lists every name that appears in your plays, so you can tap to add. If a friend appears under several spellings, add them all.
- Inside any game, tick "Played" next to a friend to add games you didn't log on BGG.

Friend changes save straight to your website once you connect GitHub: unlock edit mode, click Edit in the footer, then Connect GitHub, and follow the three steps to create a token limited to this repository (Contents: Read and write). The token is kept only in that browser. Without a connection, changes stay in the browser you made them in, and "Download profiles.json" still works as before.

## Before your token arrives

BGG lets you export your own collection without a token: on BGG, open your collection, choose the export option (CSV), and download it. Then, on a computer with Python 3:

```
python scripts/sync_bgg.py --csv path/to/collection.csv
```

Upload the new `data/games.json` to your repository. This gives you names, player counts, times, complexity and language dependence, but no box art, Chinese names, categories or friends' plays; those arrive with the first token-based sync.

## Running the sync on your own computer

```
BGG_TOKEN=your-token python scripts/sync_bgg.py --user YOUR_BGG_NAME
```

Add `--no-plays` to skip play logs. To preview the site locally, run `python -m http.server` in this folder and open http://localhost:8000 (opening index.html directly won't load the data).

## Files

| File | What it is |
| --- | --- |
| `index.html`, `style.css`, `app.js` | The website |
| `data/games.json` | Your collection, written by the sync (sample data until your first sync) |
| `data/profiles.json` | Your friends and their played games |
| `scripts/sync_bgg.py` | Fetches your collection, game details and plays from BGG |
| `.github/workflows/sync-bgg.yml` | Runs the sync every night |

## BGG terms

BGG's API terms ask public sites to credit BGG with its "Powered by BGG" logo linking to boardgamegeek.com. The footer has a text link; you can swap in the official logo from BGG's API page if you like. Keep the repository's token in Secrets only, never in a file.
