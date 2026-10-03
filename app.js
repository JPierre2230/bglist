/* Board game shelf — reads data/games.json (made by scripts/sync_bgg.py) and data/profiles.json */
(() => {
"use strict";

// ------------------------------------------------------------ text (English / 繁體中文)
const T = {
  en: {
    title: "{user}'s board games", titleDefault: "Board game shelf",
    synced: "Updated from BoardGameGeek {when}", sample: "Showing sample data. Follow the README to sync your own BGG collection.",
    csv: "Imported from a BGG CSV export {when}. Add a BGG token to get box art and details.",
    searchPh: "Search by name", pick: "Random", filters: "Filters", done: "Done", sortBy: "Sort",
    everyone: "Everyone", addFriend: "Add friend", editFriends: "Edit friends",
    all: "All", played: "Played", unplayed: "Not played yet",
    players: "Number of players", can: "Supports", rec: "Recommended", best: "Best",
    pHint: "Recommended and Best use BGG community votes.",
    time: "Playing time", weight: "Complexity", categories: "Categories", mechanics: "Mechanics",
    showAll: "Show all {n}", showLess: "Show fewer", includeExp: "Show expansions",
    clear: "Clear all filters",
    count: "<b>{n}</b> of {total} games", countAll: "<b>{n}</b> games",
    noneTitle: "No games match these filters", noneBody: "Try removing a filter or two.",
    noData: "No collection found", noDataBody: "Run the BGG sync (see README) to create data/games.json.",
    s_name: "Name", s_rating: "BGG rating", s_my: "My rating", s_light: "Lightest first", s_heavy: "Heaviest first",
    s_short: "Shortest first", s_long: "Longest first", s_year: "Release date",
    updated: "Updated – {when}", myStar: "My rating",
    w1: "Light", w2: "Medium-light", w3: "Medium-heavy", w4: "Heavy",
    t1: "Up to 30 min", t2: "30–60 min", t3: "1–2 hours", t4: "Over 2 hours",
    min: "min", pl: "players", yr: "Published", age: "Age", bggRating: "BGG rating", rank: "BGG rank",
    myRating: "My rating", plays: "My plays", bestWith: "Best with", designers: "Designer",
    playedWith: "Played with", loggedOnBgg: "Logged {n}× on BGG, last {date}", markPlayed: "Played",
    notLogged: "Not logged on BGG",
    expansionsOwned: "Expansions you own", baseGame: "Base game",
    openBgg: "Open on BoardGameGeek", another: "Pick another", more: "Read more", less: "Show less",
    pTitle: "Friends", pIntro: "Each friend keeps their own list of games you've played together. Add the names they appear under in your BGG play logs and those games are filled in automatically.",
    pName: "Name", pBggNames: "Names in BGG play logs", pBggHint: "Comma separated. Seen in your plays:",
    pColor: "Meeple colour", pDelete: "Remove", pAdd: "Add friend", pDone: "Done",
    pExport: "Download profiles.json", pImport: "Import file",
    pUnsaved: "Changes are saved in this browser only. To keep them everywhere, download profiles.json and replace the one in your repository's data folder.",
    pConfirmDelete: "Remove {name} and their played list?",
    pNone: "No friends added yet.", newFriend: "New friend",
    expansion: "Expansion", gamesPlayedWith: "{n} played with {name}",
    langDep: "Language dependence", langHint: "How much reading is needed during play, from BGG votes.",
    l1: "No text", l2: "Little text", l3: "Moderate text", l4: "Lots of text", l5: "Must read the language",
    copies: "Copies", addPic: "Add a picture", changePic: "Change picture", picsLink: "Add box pictures",
    edit: "Edit", editing: "Editing", editTitle: "Edit mode", editIntro: "Enter the password to edit friends, played games and pictures.",
    pw: "Password", pw2: "Type it again", wrongPw: "That password isn't right.", unlock: "Unlock",
    setTitle: "Create an edit password", setIntro: "Choose a password. The editing options on this site only appear after it's entered.",
    mismatch: "The two passwords don't match.", tooShort: "Use at least 4 characters.", setBtn: "Create password",
    savedTitle: "One more step", savedBody: "You're in edit mode in this browser. To make the password work on every device, download config.json and upload it into the data folder of your repository (Add file → Upload files → Commit changes).",
    dlConfig: "Download config.json", stopEdit: "Stop editing", changePw: "Change password", close: "Close",
    editOnTitle: "You're in edit mode", editOnBody: "Friend editing, played-with ticks and the BGG and picture links are showing. This browser stays unlocked until you stop editing.",
  },
  zh: {
    title: "{user} 的桌遊", titleDefault: "桌遊清單",
    synced: "BoardGameGeek 資料更新於 {when}", sample: "目前顯示範例資料。請依照 README 同步你的 BGG 收藏。",
    csv: "已於 {when} 從 BGG CSV 匯入。加入 BGG token 即可取得封面與詳細資料。",
    searchPh: "搜尋遊戲名稱", pick: "隨機", filters: "篩選", done: "完成", sortBy: "排序",
    everyone: "全部", addFriend: "新增朋友", editFriends: "編輯朋友",
    all: "全部", played: "玩過", unplayed: "還沒玩過",
    players: "遊戲人數", can: "可玩", rec: "推薦", best: "最佳",
    pHint: "「推薦」與「最佳」依據 BGG 玩家投票。",
    time: "遊戲時間", weight: "難度", categories: "分類", mechanics: "機制",
    showAll: "顯示全部 {n} 項", showLess: "收合", includeExp: "顯示擴充",
    clear: "清除所有篩選",
    count: "<b>{n}</b> / {total} 款遊戲", countAll: "共 <b>{n}</b> 款遊戲",
    noneTitle: "沒有符合條件的遊戲", noneBody: "試著移除一兩個篩選條件。",
    noData: "找不到收藏資料", noDataBody: "請先執行 BGG 同步（見 README）以產生 data/games.json。",
    s_name: "名稱", s_rating: "BGG 評分", s_my: "我的評分", s_light: "由輕到重", s_heavy: "由重到輕",
    s_short: "由短到長", s_long: "由長到短", s_year: "出版年份",
    updated: "更新於 {when}", myStar: "我的評分",
    w1: "輕度", w2: "中輕度", w3: "中重度", w4: "重度",
    t1: "30 分鐘內", t2: "30–60 分鐘", t3: "1–2 小時", t4: "2 小時以上",
    min: "分鐘", pl: "人", yr: "出版年份", age: "年齡", bggRating: "BGG 評分", rank: "BGG 排名",
    myRating: "我的評分", plays: "我玩過次數", bestWith: "最佳人數", designers: "設計師",
    playedWith: "和誰玩過", loggedOnBgg: "BGG 紀錄 {n} 次，最近 {date}", markPlayed: "玩過",
    notLogged: "BGG 無紀錄",
    expansionsOwned: "擁有的擴充", baseGame: "主遊戲",
    openBgg: "在 BoardGameGeek 開啟", another: "再選一款", more: "展開", less: "收合",
    pTitle: "朋友", pIntro: "每位朋友都有一份和你一起玩過的遊戲清單。填入他們在 BGG 遊玩紀錄中的名字，就會自動帶入。",
    pName: "名字", pBggNames: "BGG 遊玩紀錄中的名字", pBggHint: "以逗號分隔。你的紀錄中出現過：",
    pColor: "米寶顏色", pDelete: "刪除", pAdd: "新增朋友", pDone: "完成",
    pExport: "下載 profiles.json", pImport: "匯入檔案",
    pUnsaved: "變更只存在這個瀏覽器。若要在所有裝置保留，請下載 profiles.json 並取代 repository 中 data 資料夾裡的檔案。",
    pConfirmDelete: "要刪除 {name} 和他的遊玩清單嗎？",
    pNone: "還沒有新增朋友。", newFriend: "新朋友",
    expansion: "擴充", gamesPlayedWith: "和 {name} 玩過 {n} 款",
    langDep: "語言依賴度", langHint: "遊戲中需要閱讀多少文字，依據 BGG 玩家投票。",
    l1: "無文字", l2: "少量文字", l3: "中等文字", l4: "大量文字", l5: "需讀懂原文",
    copies: "份數", addPic: "加入圖片", changePic: "更換圖片", picsLink: "加入封面圖片",
    edit: "編輯", editing: "編輯中", editTitle: "編輯模式", editIntro: "輸入密碼以編輯朋友、遊玩紀錄和圖片。",
    pw: "密碼", pw2: "再輸入一次", wrongPw: "密碼不正確。", unlock: "解鎖",
    setTitle: "建立編輯密碼", setIntro: "設定一組密碼。輸入密碼後，網站上的編輯選項才會出現。",
    mismatch: "兩次輸入的密碼不一樣。", tooShort: "請至少使用 4 個字元。", setBtn: "建立密碼",
    savedTitle: "還差一步", savedBody: "這個瀏覽器已進入編輯模式。若要讓密碼在所有裝置生效，請下載 config.json，並上傳到 repository 的 data 資料夾（Add file → Upload files → Commit changes）。",
    dlConfig: "下載 config.json", stopEdit: "結束編輯", changePw: "更改密碼", close: "關閉",
    editOnTitle: "目前為編輯模式", editOnBody: "已顯示朋友編輯、遊玩勾選，以及 BGG 和圖片連結。在你結束編輯之前，這個瀏覽器會保持解鎖。",
  },
};
let lang = localStorage.getItem("bglist.lang") || (/^zh/i.test(navigator.language) ? "zh" : "en");
const t = (k, vars = {}) => (T[lang][k] ?? T.en[k] ?? k).replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");

// ------------------------------------------------------------ constants
const COLORS = ["#d23f31", "#2b6cb0", "#e8b10a", "#3a8f4e", "#7b4fb0", "#e07a1f", "#2a2a2a", "#e8e4dc", "#d6589a", "#3fa3a8"];
const TIME = [["t1", 0, 30], ["t2", 31, 60], ["t3", 61, 120], ["t4", 121, 9999]];
const WEIGHT = [["w1", 0, 2], ["w2", 2, 3], ["w3", 3, 4], ["w4", 4, 9]];
const SORTS = ["name", "rating", "my", "light", "heavy", "short", "long", "year"];
const STORE = "bglist.profiles.v1";
const FACET_PREVIEW = 10;

const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const meeple = (color, stroke = "rgba(0,0,0,.35)") =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${color}" stroke="${stroke}" stroke-width="1" d="M12 2.2a3.6 3.6 0 0 1 3.6 3.6c0 .9-.3 1.6-.8 2.2 2.7.5 6.4 1.6 7.1 3 .5 1-.4 2-2.2 2-.9 0-1.9-.1-2.6-.3l3 7.2c.3.7-.2 1.4-1 1.4h-3.6l-3.5-4.8-3.5 4.8H4.9c-.8 0-1.3-.7-1-1.4l3-7.2c-.7.2-1.7.3-2.6.3-1.8 0-2.7-1-2.2-2 .7-1.4 4.4-2.5 7.1-3a3.6 3.6 0 0 1 2.8-5.8Z"/></svg>`;
const icons = {
  players: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.8 14.2c2.4.1 4.1 1.7 4.6 4.8"/></svg>',
  time: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
};

// ------------------------------------------------------------ edit mode
// GitHub Pages has no server, so this only hides the editing tools from visitors.
// Visitors can never change your real data either way: that lives in your GitHub repository.
const EDIT_KEY = "bglist.edit";
let editing = false, CONFIG = {};
async function sha(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("bglist:" + text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
function setEditing(on, hash = "") {
  editing = on;
  try { on ? localStorage.setItem(EDIT_KEY, hash) : localStorage.removeItem(EDIT_KEY); } catch { /* ignore */ }
  document.body.classList.toggle("editing", on);
  renderEditBtn();
}
function renderEditBtn() {
  const lock = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0' + (editing ? '' : 'v3') + '"/></svg>';
  const b = $("#editBtn");
  b.innerHTML = lock + (editing ? t("editing") : t("edit"));
  b.classList.toggle("on", editing);
}
function openEdit(view) {
  const has = !!CONFIG.editPasswordHash;
  view ||= editing ? "on" : has ? "unlock" : "set";
  let h = `<button class="d-close" type="button" aria-label="${t("close")}" data-close>×</button><form class="p-body" method="dialog" data-view="${view}">`;
  if (view === "unlock") h += `<h2>${t("editTitle")}</h2><p>${t("editIntro")}</p>
      <label class="field"><small>${t("pw")}</small><input type="password" name="pw" autocomplete="current-password" required></label>
      <p class="err" hidden></p><div class="p-foot"><span style="flex:1"></span><button class="btn" type="submit">${t("unlock")}</button></div>`;
  if (view === "set") h += `<h2>${t("setTitle")}</h2><p>${t("setIntro")}</p>
      <label class="field"><small>${t("pw")}</small><input type="password" name="pw" autocomplete="new-password" required></label>
      <label class="field"><small>${t("pw2")}</small><input type="password" name="pw2" autocomplete="new-password" required></label>
      <p class="err" hidden></p><div class="p-foot"><span style="flex:1"></span><button class="btn" type="submit">${t("setBtn")}</button></div>`;
  if (view === "saved") h += `<h2>${t("savedTitle")}</h2><p>${t("savedBody")}</p>
      <div class="p-foot"><button class="btn" type="button" data-dlconfig>${t("dlConfig")}</button><span style="flex:1"></span><button class="btn light" type="button" data-close>${t("close")}</button></div>`;
  if (view === "on") h += `<h2>${t("editOnTitle")}</h2><p>${t("editOnBody")}</p>
      <div class="p-foot"><button class="btn" type="button" data-stop>${t("stopEdit")}</button><button class="btn light" type="button" data-changepw>${t("changePw")}</button><span style="flex:1"></span><button class="btn light" type="button" data-close>${t("close")}</button></div>`;
  $("#editBody").innerHTML = h + "</form>";
  const d = $("#editDialog"); if (!d.open) d.showModal();
  d.querySelector("input")?.focus();
}
function editEvents() {
  const d = $("#editDialog");
  d.addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, err = f.querySelector(".err"), show = m => { err.textContent = m; err.hidden = false; };
    const pw = f.pw.value;
    if (f.dataset.view === "unlock") {
      const h = await sha(pw);
      if (h !== CONFIG.editPasswordHash) return show(t("wrongPw"));
      setEditing(true, h); d.close(); update();
    } else {
      if (pw.length < 4) return show(t("tooShort"));
      if (pw !== f.pw2.value) return show(t("mismatch"));
      const h = await sha(pw);
      CONFIG = { ...CONFIG, editPasswordHash: h };
      setEditing(true, h); update(); openEdit("saved");
    }
  });
  d.addEventListener("click", e => {
    if (e.target === d || e.target.closest("[data-close]")) return d.close();
    if (e.target.closest("[data-stop]")) { setEditing(false); d.close(); update(); }
    if (e.target.closest("[data-changepw]")) openEdit("set");
    if (e.target.closest("[data-dlconfig]")) {
      const blob = new Blob([JSON.stringify(CONFIG, null, 2)], { type: "application/json" });
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "config.json" });
      document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
  });
  $("#editBtn").addEventListener("click", () => openEdit());
}

// ------------------------------------------------------------ state
let DATA = { games: [], plays: [] };
let byId = new Map();
let profiles = [];          // [{id,name,color,bggNames:[],played:[ids]}]
let repoProfilesJson = "";  // to detect unsaved local edits
let playedCache = new Map();// profileId -> Map(gameId -> {count,last,manual})
const S = {
  q: "", players: new Set(), pmode: "can", time: new Set(), weight: new Set(), ld: new Set(),
  cats: new Set(), mechs: new Set(), exp: false, profile: "", pfilter: "all", sort: "name",
};
const ui = { showAllCats: false, showAllMechs: false };

// ------------------------------------------------------------ helpers
const hue = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 360; };
const initials = name => {
  const cjk = name.match(/[\u3400-\u9fff]/g);
  if (cjk) return cjk.slice(0, 2).join("");
  return name.replace(/^(the|a|an)\s+/i, "").split(/[\s:\-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
};
const placeholder = g => `<div class="ph" style="background:hsl(${hue(g.name)} 32% 40%)">${esc(initials(displayName(g)))}</div>`;
const img = (g, big = false) => {
  const src = big ? (g.image || g.thumb) : (g.thumb || g.image);
  if (!src) return placeholder(g);
  return `<img src="${esc(src)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${g.id}">`;
};
const displayName = g => (lang === "zh" && g.cjkName) ? g.cjkName : g.name;
const subName = g => (lang === "zh" && g.cjkName) ? g.name : (g.cjkName || "");
const range = (a, b, unit = "") => (!a && !b) ? "—" : (a && b && a !== b ? `${a}–${b}` : `${a || b}`) + unit;
const timeOf = g => [g.minTime || g.time || g.maxTime || 0, g.maxTime || g.time || g.minTime || 0];
const fmtDate = iso => {
  if (!iso) return "";
  const d = new Date(iso.replace(" ", "T"));
  return isNaN(d) ? iso : d.toLocaleDateString(lang === "zh" ? "zh-TW" : undefined, { year: "numeric", month: "short", day: "numeric" });
};
const pips = w => {
  if (!w) return "";
  let h = '<span class="pips" title="' + w.toFixed(2) + ' / 5">';
  for (let i = 1; i <= 5; i++) h += `<i class="${w >= i - .25 ? "on" : w >= i - .75 ? "half" : ""}"></i>`;
  return h + "</span>";
};
const weightLabel = w => { const b = WEIGHT.find(([, lo, hi]) => w >= lo && w < hi); return b ? t(b[0]) : ""; };

// ------------------------------------------------------------ profiles
function loadProfiles(repo) {
  const norm = list => (list || []).map(p => ({ bggNames: [], played: [], ...p }));
  repoProfilesJson = JSON.stringify(norm(repo?.profiles));
  let local = null;
  try { local = JSON.parse(localStorage.getItem(STORE) || "null"); } catch { /* ignore */ }
  profiles = norm(local?.profiles || repo?.profiles);
  rebuildPlayed();
}
function saveProfiles() {
  try { localStorage.setItem(STORE, JSON.stringify({ updated: Date.now(), profiles })); } catch { /* storage full or blocked */ }
  rebuildPlayed();
}
const unsaved = () => JSON.stringify(profiles) !== repoProfilesJson;
function rebuildPlayed() {
  playedCache = new Map();
  for (const p of profiles) {
    const m = new Map();
    const names = new Set(p.bggNames.map(n => n.trim().toLowerCase()).filter(Boolean));
    if (names.size) for (const pl of DATA.plays || []) {
      if (!pl.players.some(n => names.has(n.toLowerCase()))) continue;
      const e = m.get(pl.gameId) || { count: 0, last: "", manual: false };
      e.count += pl.qty || 1; if (pl.date > e.last) e.last = pl.date;
      m.set(pl.gameId, e);
    }
    for (const id of p.played) { const e = m.get(id) || { count: 0, last: "" }; e.manual = true; m.set(id, e); }
    playedCache.set(p.id, m);
  }
}
const playedWith = (pid, gid) => playedCache.get(pid)?.get(gid);
function allPlayerNames() {
  const c = new Map();
  for (const pl of DATA.plays || []) for (const n of pl.players) c.set(n, (c.get(n) || 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1]).map(([n]) => n);
}

// ------------------------------------------------------------ filtering
function matches(g, skip = "") {
  if (!S.exp && g.type === "expansion") return false;
  if (S.q) {
    const hay = [g.name, ...(g.altNames || []), ...(g.designers || []), ...(g.mechanics || []), ...(g.categories || [])].join(" ").toLowerCase();
    if (!S.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
  }
  if (S.players.size && skip !== "players") {
    const ok = [...S.players].some(n => {
      const max = g.maxPlayers || 0, min = g.minPlayers || 0;
      const can = n === 8 ? max >= 8 : (min <= n && n <= max);
      if (S.pmode === "can") return can;
      const list = S.pmode === "best" ? g.bestPlayers : g.recPlayers;
      if (!list?.length) return S.pmode === "rec" ? can : false;
      return n === 8 ? list.some(x => x >= 8) : list.includes(n);
    });
    if (!ok) return false;
  }
  if (S.time.size) {
    const [lo, hi] = timeOf(g);
    if (!lo && !hi) return false;
    if (![...S.time].some(k => { const [, a, b] = TIME.find(x => x[0] === k); return lo <= b && hi >= a; })) return false;
  }
  if (S.weight.size) {
    if (!g.weight) return false;
    if (![...S.weight].some(k => { const [, a, b] = WEIGHT.find(x => x[0] === k); return g.weight >= a && g.weight < b; })) return false;
  }
  if (S.ld.size && !S.ld.has(g.langDep)) return false;
  if (skip !== "cats" && S.cats.size && ![...S.cats].every(c => g.categories?.includes(c))) return false;
  if (skip !== "mechs" && S.mechs.size && ![...S.mechs].every(c => g.mechanics?.includes(c))) return false;
  if (S.profile && S.pfilter !== "all") {
    const p = !!playedWith(S.profile, g.id);
    if (S.pfilter === "played" ? !p : p) return false;
  }
  return true;
}
const sorters = {
  name: (a, b) => displayName(a).localeCompare(displayName(b), lang === "zh" ? "zh-Hant" : undefined),
  rating: (a, b) => (b.rating || 0) - (a.rating || 0),
  my: (a, b) => (b.myRating || 0) - (a.myRating || 0),
  light: (a, b) => (a.weight || 9) - (b.weight || 9),
  heavy: (a, b) => (b.weight || 0) - (a.weight || 0),
  short: (a, b) => (timeOf(a)[1] || 9999) - (timeOf(b)[1] || 9999),
  long: (a, b) => (timeOf(b)[1] || 0) - (timeOf(a)[1] || 0),
  year: (a, b) => (b.year || 0) - (a.year || 0),
  plays: (a, b) => (b.numPlays || 0) - (a.numPlays || 0),
  added: (a, b) => String(b.added || "").localeCompare(String(a.added || "")),
};
const filtered = () => DATA.games.filter(g => matches(g)).sort((a, b) => sorters[S.sort](a, b) || sorters.name(a, b));

// ------------------------------------------------------------ URL state
function writeHash() {
  const p = new URLSearchParams();
  if (S.q) p.set("q", S.q);
  if (S.players.size) p.set("p", [...S.players].join(","));
  if (S.pmode !== "can") p.set("pm", S.pmode);
  if (S.time.size) p.set("t", [...S.time].join(","));
  if (S.weight.size) p.set("w", [...S.weight].join(","));
  if (S.ld.size) p.set("l", [...S.ld].join(","));
  if (S.cats.size) p.set("c", [...S.cats].join("|"));
  if (S.mechs.size) p.set("m", [...S.mechs].join("|"));
  if (S.exp) p.set("x", "1");
  if (S.profile) p.set("f", S.profile);
  if (S.pfilter !== "all") p.set("pf", S.pfilter);
  if (S.sort !== "name") p.set("s", S.sort);
  const h = p.toString();
  history.replaceState(null, "", h ? "#" + h : location.pathname + location.search);
}
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  const set = (k, sep = ",", num = false) => new Set((p.get(k) || "").split(sep).filter(Boolean).map(v => num ? +v : v));
  S.q = p.get("q") || "";
  S.players = set("p", ",", true);
  S.pmode = ["can", "rec", "best"].includes(p.get("pm")) ? p.get("pm") : "can";
  S.time = set("t"); S.weight = set("w"); S.ld = set("l", ",", true); S.cats = set("c", "|"); S.mechs = set("m", "|");
  S.exp = p.get("x") === "1";
  S.profile = p.get("f") || "";
  S.pfilter = ["played", "unplayed"].includes(p.get("pf")) ? p.get("pf") : "all";
  S.sort = SORTS.includes(p.get("s")) ? p.get("s") : "name";
}

// ------------------------------------------------------------ render: header
function renderStatic() {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $("#langBtn").textContent = lang === "zh" ? "English" : "中文";
  $("#picsLink").textContent = t("picsLink");
  renderEditBtn();
  const title = DATA.username && DATA.source !== "sample" ? t("title", { user: DATA.username }) : t("titleDefault");
  $("#title").textContent = title; document.title = title;
  const d = DATA.generated ? new Date(DATA.generated) : null;
  const monthYear = d && !isNaN(d) ? (lang === "zh" ? `${d.getFullYear()}/${d.getMonth() + 1}` : `${d.getMonth() + 1}/${d.getFullYear()}`) : "";
  $("#syncNote").textContent = DATA.source === "sample" ? t("sample") : monthYear ? t("updated", { when: monthYear }) : "";
  $("#sort").innerHTML = SORTS.map(k => `<option value="${k}" ${S.sort === k ? "selected" : ""}>${t("s_" + k)}</option>`).join("");
}

function renderProfiles() {
  const row = $("#profileRow");
  if (!profiles.length && !editing) { row.innerHTML = ""; return; }
  let h = `<button class="token everyone" type="button" aria-pressed="${!S.profile}" data-prof="">${meeple("currentColor", "none")}${t("everyone")}</button>`;
  for (const p of profiles) h += `<button class="token" type="button" aria-pressed="${S.profile === p.id}" data-prof="${esc(p.id)}">${meeple(p.color)}${esc(p.name)}</button>`;
  if (editing) h += `<button class="token add" type="button" id="editProfiles">${profiles.length ? t("editFriends") : "+ " + t("addFriend")}</button>`;
  if (S.profile) {
    h += `<span class="profile-mode" role="group">` + ["all", "played", "unplayed"].map(k =>
      `<button type="button" aria-pressed="${S.pfilter === k}" data-pf="${k}">${t(k)}</button>`).join("") + `</span>`;
  }
  row.innerHTML = h;
}

// ------------------------------------------------------------ render: filters
function facetCounts(key, skip) {
  const c = new Map();
  for (const g of DATA.games) {
    if (!matches(g, skip)) continue;
    for (const v of g[key] || []) c.set(v, (c.get(v) || 0) + 1);
  }
  // keep selected ones visible even at zero
  for (const v of (skip === "cats" ? S.cats : S.mechs)) if (!c.has(v)) c.set(v, 0);
  return [...c.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
function chip(label, pressed, attrs, cls = "chip") {
  return `<button type="button" class="${cls}" aria-pressed="${pressed}" ${attrs}>${label}</button>`;
}
function renderFilters() {
  let h = "";
  // players
  h += `<section class="fgroup"><h3>${t("players")}</h3><div class="chips">`;
  for (let n = 1; n <= 8; n++) h += chip(n === 8 ? "8+" : n, S.players.has(n), `data-f="players" data-v="${n}"`, "chip num");
  h += `</div><div class="seg" role="group">` + ["can", "rec", "best"].map(k =>
    `<button type="button" aria-pressed="${S.pmode === k}" data-pm="${k}">${t(k)}</button>`).join("") +
    `</div></section>`;
  // time
  h += `<section class="fgroup"><h3>${t("time")}</h3><div class="chips">` +
    TIME.map(([k]) => chip(t(k), S.time.has(k), `data-f="time" data-v="${k}"`)).join("") + `</div></section>`;
  // weight
  h += `<section class="fgroup"><h3>${t("weight")}</h3><div class="chips">` +
    WEIGHT.map(([k]) => chip(t(k), S.weight.has(k), `data-f="weight" data-v="${k}"`)).join("") + `</div></section>`;
  // language dependence
  if (DATA.games.some(g => g.langDep)) {
    const ln = n => DATA.games.filter(g => g.langDep === n && matches(g)).length;
    h += `<section class="fgroup"><h3>${t("langDep")}</h3><div class="chips">` +
      [1, 2, 3, 4, 5].map(n => chip(`${t("l" + n)}<span class="n">${ln(n)}</span>`, S.ld.has(n), `data-f="ld" data-v="${n}"`)).join("") +
      `</div></section>`;
  }
  // categories & mechanics
  for (const [key, skip, set, flag, label] of [["categories", "cats", S.cats, "showAllCats", "categories"], ["mechanics", "mechs", S.mechs, "showAllMechs", "mechanics"]]) {
    const list = facetCounts(key, skip);
    if (!list.length) continue;
    const shown = ui[flag] ? list : list.slice(0, FACET_PREVIEW).concat(list.slice(FACET_PREVIEW).filter(([v]) => set.has(v)));
    h += `<section class="fgroup"><h3>${t(label)}</h3><div class="chips">` +
      shown.map(([v, n]) => chip(`${esc(v)}<span class="n">${n}</span>`, set.has(v), `data-f="${skip}" data-v="${esc(v)}"`)).join("") + `</div>`;
    if (list.length > FACET_PREVIEW) h += `<button type="button" class="linkish" data-more="${flag}">${ui[flag] ? t("showLess") : t("showAll", { n: list.length })}</button>`;
    h += `</section>`;
  }
  // expansions
  if (DATA.games.some(g => g.type === "expansion"))
    h += `<section class="fgroup"><label class="switch"><input type="checkbox" id="expToggle" ${S.exp ? "checked" : ""}> ${t("includeExp")}</label></section>`;
  $("#filterBody").innerHTML = h;
}

function activeFilterChips() {
  const out = [];
  if (S.q) out.push([`“${esc(S.q)}”`, "q", ""]);
  for (const n of S.players) out.push([`${n === 8 ? "8+" : n} ${t("pl")}${S.pmode !== "can" ? " · " + t(S.pmode) : ""}`, "players", n]);
  for (const k of S.time) out.push([t(k), "time", k]);
  for (const k of S.weight) out.push([t(k), "weight", k]);
  for (const n of S.ld) out.push([t("l" + n), "ld", n]);
  for (const v of S.cats) out.push([esc(v), "cats", v]);
  for (const v of S.mechs) out.push([esc(v), "mechs", v]);
  return out;
}

// ------------------------------------------------------------ render: grid
function card(g) {
  const [lo, hi] = timeOf(g);
  const badges = profiles.filter(p => playedWith(p.id, g.id)).slice(0, 4).map(p => meeple(p.color, "#fff")).join("");
  const sub = subName(g);
  return `<button type="button" class="card" data-id="${g.id}">
    <div class="cover">${img(g)}</div>
    ${g.type === "expansion" ? `<span class="tag-exp">${t("expansion")}</span>` : ""}
    ${badges ? `<span class="played-badges">${badges}</span>` : ""}
    <div class="meta">
      <h2>${esc(displayName(g))}</h2>
      ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
      <div class="facts">
        ${S.sort === "rating" && g.rating ? `<span class="hl" title="${t("bggRating")}">★ ${g.rating.toFixed(1)}</span>` : ""}
        ${S.sort === "my" && g.myRating ? `<span class="hl" title="${t("myStar")}">★ ${g.myRating}</span>` : ""}
        ${S.sort === "year" && g.year ? `<span class="hl" title="${t("yr")}">${g.year}</span>` : ""}
        <span title="${t("players")}">${icons.players}${range(g.minPlayers, g.maxPlayers)}</span>
        ${lo || hi ? `<span title="${t("time")}" class="${S.sort === "short" || S.sort === "long" ? "hl" : ""}">${icons.time}${range(lo, hi)}′</span>` : ""}
        ${g.weight ? `<span title="${t("weight")}: ${weightLabel(g.weight)} (${g.weight.toFixed(1)})">${pips(g.weight)}</span>` : ""}
      </div>
    </div>
  </button>`;
}
function render() {
  const list = filtered();
  const base = DATA.games.filter(g => S.exp || g.type !== "expansion").length;
  const grid = $("#grid"), empty = $("#empty");
  if (!DATA.games.length) {
    grid.innerHTML = ""; empty.hidden = false;
    empty.innerHTML = `<h2>${t("noData")}</h2><p>${t("noDataBody")}</p>`;
    $("#count").textContent = ""; return;
  }
  grid.innerHTML = list.map(card).join("");
  empty.hidden = list.length > 0;
  if (!list.length) empty.innerHTML = `<h2>${t("noneTitle")}</h2><p>${t("noneBody")}</p><button class="btn" type="button" data-clear>${t("clear")}</button>`;
  $("#count").innerHTML = list.length === base ? t("countAll", { n: list.length }) : t("count", { n: list.length, total: base });
  const chips = activeFilterChips();
  $("#activeChips").innerHTML = chips.map(([label, f, v]) =>
    `<button type="button" class="chip" aria-pressed="true" data-rm="${f}" data-v="${esc(v)}">${label}</button>`).join("") +
    (chips.length > 1 ? `<button type="button" class="linkish" data-clear>${t("clear")}</button>` : "");
  const nf = chips.length - (S.q ? 1 : 0);
  $("#filterBadge").textContent = nf || "";
  grid.querySelectorAll("img[data-ph]").forEach(i => i.addEventListener("error", onImgError, { once: true }));
  grid.querySelectorAll(".card").forEach(c => masonry.observe(c));
  $("#pickBtn").disabled = !list.length;
}
// Masonry: every card spans as many 4px grid rows as its own height needs,
// so tall boxes, wide boxes and long names each get a card that fits them.
const ROW = 4;
const masonry = new ResizeObserver(entries => {
  for (const e of entries) {
    const card = e.target;
    const gap = parseFloat(getComputedStyle(card).marginBottom) || 0;
    card.style.gridRowEnd = "span " + Math.ceil((card.getBoundingClientRect().height + gap) / ROW);
  }
});
function onImgError(e) {
  const g = byId.get(+e.target.dataset.ph);
  if (g) e.target.outerHTML = placeholder(g);
}
function update(full = true) {
  writeHash();
  if (full) { renderFilters(); renderProfiles(); }
  render();
}

// ------------------------------------------------------------ detail dialog
function openGame(id, fromPick = false) {
  const g = byId.get(id); if (!g) return;
  const [lo, hi] = timeOf(g);
  const sub = subName(g);
  const stat = (v, label) => v ? `<div class="stat"><b>${v}</b><small>${label}</small></div>` : "";
  const exps = DATA.games.filter(x => x.type === "expansion" && x.baseIds?.includes(g.id));
  const bases = (g.baseIds || []).map(i => byId.get(i)).filter(Boolean);
  const mini = x => `<button type="button" class="mini" data-open="${x.id}">${img(x)}<span>${esc(displayName(x))}</span></button>`;
  const desc = g.description || "";
  const best = g.bestPlayers?.length ? g.bestPlayers.join(", ") : "";

  let played = "";
  if (!editing) {
    const who = profiles.filter(p => playedWith(p.id, g.id));
    if (who.length) played = `<h3>${t("playedWith")}</h3><div class="played-chips">` +
      who.map(p => `<span>${meeple(p.color)}${esc(p.name)}</span>`).join("") + `</div>`;
  } else if (profiles.length) {
    played = `<h3>${t("playedWith")}</h3><div class="played-list">` + profiles.map(p => {
      const e = playedWith(p.id, g.id);
      const logged = e?.count ? t("loggedOnBgg", { n: e.count, date: fmtDate(e.last) }) : (p.bggNames.length ? t("notLogged") : "");
      return `<div class="played-item">${meeple(p.color)}<span class="who">${esc(p.name)}</span><span class="when">${logged}</span>
        <label><input type="checkbox" data-mark="${esc(p.id)}" ${p.played.includes(g.id) || e?.count ? "checked" : ""} ${e?.count && !p.played.includes(g.id) ? "disabled" : ""}> ${t("markPlayed")}</label></div>`;
    }).join("") + `</div>`;
  }

  $("#gameBody").innerHTML = `<button class="d-close" type="button" aria-label="Close" data-close>×</button>
  <div class="d-game">
    <div class="cover">${img(g, true)}</div>
    <div class="d-main">
      <h2>${esc(displayName(g))}</h2>
      ${sub || g.year ? `<p class="sub">${esc(sub)}${sub && g.year ? " · " : ""}${g.year || ""}</p>` : ""}
      <div class="stats">
        ${stat(range(g.minPlayers, g.maxPlayers), t("players"))}
        ${stat(best, t("bestWith"))}
        ${stat(range(lo, hi, " " + t("min")), t("time"))}
        ${stat(g.weight ? `${g.weight.toFixed(1)} <small>/ 5</small>` : "", t("weight") + (g.weight ? " · " + weightLabel(g.weight) : ""))}
        ${stat(g.minAge ? g.minAge + "+" : "", t("age"))}
        ${stat(g.langDep ? t("l" + g.langDep) : "", t("langDep"))}
        ${stat(g.copies > 1 ? "×" + g.copies : "", t("copies"))}
        ${stat(g.rating ? g.rating.toFixed(1) : "", t("bggRating"))}
        ${stat(g.rank ? "#" + g.rank : "", t("rank"))}
        ${stat(g.myRating || "", t("myRating"))}
        ${stat(g.numPlays || "", t("plays"))}
      </div>
      ${played}
      ${desc ? `<h3>${g.designers?.length ? esc(g.designers.join(", ")) : ""}</h3><p class="desc ${desc.length > 420 ? "clamp" : ""}" id="desc">${esc(desc)}</p>
        ${desc.length > 420 ? `<button type="button" class="linkish" data-desc>${t("more")}</button>` : ""}` : ""}
      ${g.categories?.length ? `<h3>${t("categories")}</h3><div class="chips">${g.categories.map(c => chip(esc(c), S.cats.has(c), `data-jump="cats" data-v="${esc(c)}"`)).join("")}</div>` : ""}
      ${g.mechanics?.length ? `<h3>${t("mechanics")}</h3><div class="chips">${g.mechanics.map(c => chip(esc(c), S.mechs.has(c), `data-jump="mechs" data-v="${esc(c)}"`)).join("")}</div>` : ""}
      ${exps.length ? `<h3>${t("expansionsOwned")}</h3><div class="minis">${exps.map(mini).join("")}</div>` : ""}
      ${bases.length ? `<h3>${t("baseGame")}</h3><div class="minis">${bases.map(mini).join("")}</div>` : ""}
      <div class="d-actions">
        ${fromPick ? `<button class="btn" type="button" data-again>${t("another")}</button>` : ""}
        ${editing ? `<a href="https://boardgamegeek.com/boardgame/${g.id}" target="_blank" rel="noopener">${t("openBgg")}</a>
        <a href="images.html#g${g.id}">${g.image || g.thumb ? t("changePic") : t("addPic")}</a>` : ""}
      </div>
    </div>
  </div>`;
  $("#gameBody").dataset.id = id;
  $("#gameBody").querySelectorAll("img[data-ph]").forEach(i => i.addEventListener("error", onImgError, { once: true }));
  const d = $("#gameDialog");
  if (!d.open) d.showModal();
  d.scrollTop = 0;
}
function pickRandom() {
  const list = filtered();
  if (!list.length) return;
  const cur = +($("#gameBody").dataset.id || 0);
  const pool = list.length > 1 ? list.filter(g => g.id !== cur) : list;
  openGame(pool[Math.floor(Math.random() * pool.length)].id, true);
}

// ------------------------------------------------------------ profiles dialog
function openProfiles() {
  const names = allPlayerNames();
  let h = `<button class="d-close" type="button" aria-label="Close" data-close>×</button><div class="p-body">
    <h2>${t("pTitle")}</h2><p>${t("pIntro")}</p>`;
  if (unsaved()) h += `<div class="notice">${t("pUnsaved")}</div>`;
  if (!profiles.length) h += `<p>${t("pNone")}</p>`;
  for (const p of profiles) {
    const n = playedCache.get(p.id)?.size || 0;
    h += `<div class="p-row" data-pid="${esc(p.id)}">
      <div class="line">${meeple(p.color)}<input type="text" value="${esc(p.name)}" data-k="name" aria-label="${t("pName")}">
        <button type="button" class="btn warn" data-del>${t("pDelete")}</button></div>
      <div class="colors" role="group" aria-label="${t("pColor")}">${COLORS.map(c =>
        `<button type="button" aria-pressed="${p.color === c}" data-color="${c}" aria-label="${c}">${meeple(c)}</button>`).join("")}</div>
      <label><small>${t("pBggNames")}</small><input type="text" value="${esc(p.bggNames.join(", "))}" data-k="bggNames" placeholder="Amy, amy_lin"></label>
      ${names.length ? `<div class="suggest"><small style="color:var(--ink-soft);font-size:12.5px">${t("pBggHint")}</small> ${names.slice(0, 14).map(nm =>
        `<button type="button" class="chip" aria-pressed="${p.bggNames.some(x => x.toLowerCase() === nm.toLowerCase())}" data-addname="${esc(nm)}">${esc(nm)}</button>`).join("")}</div>` : ""}
      <small style="color:var(--ink-soft)">${t("gamesPlayedWith", { n, name: esc(p.name) })}</small>
    </div>`;
  }
  h += `<div class="p-foot">
      <button class="btn" type="button" data-addprof>+ ${t("pAdd")}</button>
      <button class="btn light" type="button" data-export>${t("pExport")}</button>
      <label class="btn light" style="cursor:pointer">${t("pImport")}<input type="file" accept=".json,application/json" hidden data-import></label>
      <span style="flex:1"></span><button class="btn" type="button" data-close>${t("pDone")}</button>
    </div></div>`;
  $("#profileBody").innerHTML = h;
  const d = $("#profileDialog");
  if (!d.open) d.showModal();
}
function profileEvents() {
  const body = $("#profileBody");
  const P = el => profiles.find(p => p.id === el.closest("[data-pid]")?.dataset.pid);
  body.addEventListener("input", e => {
    const p = P(e.target); if (!p) return;
    if (e.target.dataset.k === "name") p.name = e.target.value;
    if (e.target.dataset.k === "bggNames") p.bggNames = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
    saveProfiles(); renderProfiles(); render();
  });
  body.addEventListener("change", e => {
    if (e.target.dataset.k === "bggNames") openProfiles();
    if (e.target.matches("[data-import]")) {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(txt => {
        const j = JSON.parse(txt);
        profiles = (j.profiles || []).map(p => ({ bggNames: [], played: [], ...p }));
        saveProfiles(); update(); openProfiles();
      }).catch(() => alert("That file isn't a valid profiles.json."));
    }
  });
  body.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const p = P(b);
    if (b.dataset.color && p) { p.color = b.dataset.color; saveProfiles(); update(); openProfiles(); }
    else if (b.hasAttribute("data-del") && p) {
      if (confirm(t("pConfirmDelete", { name: p.name }))) {
        profiles = profiles.filter(x => x !== p);
        if (S.profile === p.id) { S.profile = ""; S.pfilter = "all"; }
        saveProfiles(); update(); openProfiles();
      }
    }
    else if (b.dataset.addname && p) {
      const nm = b.dataset.addname, i = p.bggNames.findIndex(x => x.toLowerCase() === nm.toLowerCase());
      i >= 0 ? p.bggNames.splice(i, 1) : p.bggNames.push(nm);
      saveProfiles(); update(); openProfiles();
    }
    else if (b.hasAttribute("data-addprof")) {
      const used = new Set(profiles.map(p => p.color));
      profiles.push({ id: "p" + Date.now().toString(36), name: t("newFriend"), color: COLORS.find(c => !used.has(c)) || COLORS[0], bggNames: [], played: [] });
      saveProfiles(); update(); openProfiles();
      const inputs = body.querySelectorAll('input[data-k="name"]'); inputs[inputs.length - 1]?.select();
    }
    else if (b.hasAttribute("data-export")) {
      const blob = new Blob([JSON.stringify({ profiles }, null, 2)], { type: "application/json" });
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "profiles.json" });
      document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
  });
}

// ------------------------------------------------------------ events
function toggle(set, v) { set.has(v) ? set.delete(v) : set.add(v); }
function bind() {
  let qTimer;
  $("#q").addEventListener("input", e => { clearTimeout(qTimer); qTimer = setTimeout(() => { S.q = e.target.value.trim(); update(); }, 120); });
  $("#sort").addEventListener("change", e => { S.sort = e.target.value; update(false); });
  $("#langBtn").addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh"; localStorage.setItem("bglist.lang", lang);
    renderStatic(); update();
  });
  $("#pickBtn").addEventListener("click", () => { $("#gameBody").dataset.id = ""; pickRandom(); });
  $("#openFilters").addEventListener("click", () => $("#filters").classList.add("open"));
  $("#closeFilters").addEventListener("click", () => $("#filters").classList.remove("open"));
  document.addEventListener("pointerdown", e => {
    const f = $("#filters");
    if (f.classList.contains("open") && !f.contains(e.target) && !e.target.closest("#openFilters")) f.classList.remove("open");
  });

  $("#profileRow").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.id === "editProfiles") { if (!profiles.length) { profiles.push({ id: "p" + Date.now().toString(36), name: t("newFriend"), color: COLORS[0], bggNames: [], played: [] }); saveProfiles(); update(); } openProfiles(); return; }
    if (b.dataset.pf) { S.pfilter = b.dataset.pf; update(); return; }
    if ("prof" in b.dataset) {
      const changed = S.profile !== b.dataset.prof;
      S.profile = b.dataset.prof;
      S.pfilter = !S.profile ? "all" : changed ? "played" : S.pfilter;
      update();
    }
  });

  $("#filterBody").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const f = b.dataset.f, v = b.dataset.v;
    if (f === "players") toggle(S.players, +v);
    else if (f === "time") toggle(S.time, v);
    else if (f === "weight") toggle(S.weight, v);
    else if (f === "ld") toggle(S.ld, +v);
    else if (f === "cats") toggle(S.cats, v);
    else if (f === "mechs") toggle(S.mechs, v);
    else if (b.dataset.pm) S.pmode = b.dataset.pm;
    else if (b.dataset.more) ui[b.dataset.more] = !ui[b.dataset.more];
    else return;
    update();
  });
  $("#filterBody").addEventListener("change", e => { if (e.target.id === "expToggle") { S.exp = e.target.checked; update(); } });

  document.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-clear")) {
      Object.assign(S, { q: "", players: new Set(), pmode: "can", time: new Set(), weight: new Set(), ld: new Set(), cats: new Set(), mechs: new Set() });
      $("#q").value = ""; update();
    } else if (b.dataset.rm) {
      const f = b.dataset.rm, v = b.dataset.v;
      if (f === "q") { S.q = ""; $("#q").value = ""; }
      else if (f === "players") S.players.delete(+v);
      else if (f === "ld") S.ld.delete(+v);
      else ({ time: S.time, weight: S.weight, cats: S.cats, mechs: S.mechs })[f].delete(v);
      update();
    }
  });

  $("#grid").addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openGame(+c.dataset.id); });

  const gd = $("#gameDialog");
  gd.addEventListener("click", e => {
    if (e.target === gd) return gd.close();
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-close")) gd.close();
    else if (b.hasAttribute("data-again")) pickRandom();
    else if (b.dataset.open) openGame(+b.dataset.open);
    else if (b.hasAttribute("data-desc")) {
      const d = $("#desc"); d.classList.toggle("clamp"); b.textContent = d.classList.contains("clamp") ? t("more") : t("less");
    } else if (b.dataset.jump) {
      const set = b.dataset.jump === "cats" ? S.cats : S.mechs;
      toggle(set, b.dataset.v); gd.close(); update();
    }
  });
  gd.addEventListener("change", e => {
    const pid = e.target.dataset.mark; if (!pid) return;
    const p = profiles.find(x => x.id === pid), id = +$("#gameBody").dataset.id;
    if (e.target.checked) { if (!p.played.includes(id)) p.played.push(id); } else p.played = p.played.filter(x => x !== id);
    saveProfiles(); render(); renderProfiles();
  });
  gd.addEventListener("close", () => { $("#gameBody").dataset.id = ""; });

  const pd = $("#profileDialog");
  pd.addEventListener("click", e => { if (e.target === pd || e.target.closest("[data-close]")) pd.close(); });
  profileEvents();

  window.addEventListener("hashchange", () => { readHash(); $("#q").value = S.q; renderStatic(); update(); });
}

// ------------------------------------------------------------ boot
async function getJSON(url) {
  try { const r = await fetch(url, { cache: "no-cache" }); return r.ok ? await r.json() : null; } catch { return null; }
}
async function boot() {
  readHash();
  const [games, prof, pics, conf] = await Promise.all([getJSON("data/games.json"), getJSON("data/profiles.json"), getJSON("data/images.json"), getJSON("data/config.json")]);
  CONFIG = conf || {};
  let saved = ""; try { saved = localStorage.getItem(EDIT_KEY) || ""; } catch { /* ignore */ }
  // a password created in this browser but not uploaded yet still counts here
  if (!CONFIG.editPasswordHash && saved) CONFIG.editPasswordHash = saved;
  editing = !!saved && saved === CONFIG.editPasswordHash;
  document.body.classList.toggle("editing", editing);
  DATA = games || { games: [], plays: [] };
  DATA.plays ||= [];
  // pictures added by hand with images.html take priority over the BGG sync
  for (const g of DATA.games) {
    const u = pics?.images?.[g.id];
    if (u) { g.image = u; g.thumb = u; }
  }
  byId = new Map(DATA.games.map(g => [g.id, g]));
  loadProfiles(prof);
  if (S.profile && !profiles.some(p => p.id === S.profile)) S.profile = "";
  $("#q").value = S.q;
  renderStatic(); bind(); editEvents(); update();
}
boot();
})();
