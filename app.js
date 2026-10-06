/* Board game shelf — reads data/games.json (made by scripts/sync_bgg.py) and data/profiles.json */
(() => {
"use strict";

// ------------------------------------------------------------ text (English / 繁體中文)
const T = {
  en: {
    titleDefault: "Board Game Library",
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
    langDep: "Language Requirement",
    l1: "None", l2: "Minimal", l3: "Moderate", l4: "High", l5: "Essential",
    copies: "Copies", addPic: "Add a picture", changePic: "Change picture", picsLink: "Add box pictures",
    ghConnect: "Connect GitHub", ghConnectedTo: "Saving to {repo}", ghDisconnect: "Disconnect",
    ghTitle: "Save straight to your website",
    ghIntro: "Connect this browser to your GitHub repository once, and changes to friends save to your website automatically, for every device.",
    ghStep1: 'On GitHub, create a fine-grained token at <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">github.com/settings/personal-access-tokens/new</a>.',
    ghStep2: "Under <b>Repository access</b>, choose <b>Only select repositories</b> and pick your website's repository.",
    ghStep3: "Under <b>Permissions</b>, add <b>Contents</b> and set it to <b>Read and write</b>. Generate the token and copy it.",
    ghRepo: "Repository (owner/name)", ghToken: "Token", ghBtn: "Connect", ghChecking: "Checking…",
    ghKeep: "The token is kept only in this browser. Connect only your own devices.",
    ghSaving: "Saving to your website…", ghSaved: "Saved to your website ✓", ghOk: "Connected. Changes now save to your website ✓",
    ghErrToken: "GitHub didn't accept this token. Check it was copied in full and hasn't expired.",
    ghErrRepo: "This token can't see that repository. Check the name, and that the token was given access to it.",
    ghErrWrite: "This token can read but not save. Give it Contents: Read and write.",
    ghErrNet: "Couldn't reach GitHub. Your changes are kept in this browser and will save next time.",
    pSavedGh: "Changes save to your website automatically.", pLocalOnly: "Changes are only saved in this browser. Connect GitHub to save them to your website for every device.",
    pwSavedGh: "Your password is saved to your website and now works on every device.",
    rolling: "Rolling…", fPlayers: "Players", fLang: "Language", fTools: "Edit tools",
    edit: "Edit", editing: "Editing", editTitle: "Edit mode", editIntro: "Enter the password to edit friends, played games and pictures.",
    pw: "Password", pw2: "Type it again", wrongPw: "That password isn't right.", unlock: "Unlock",
    setTitle: "Create an edit password", setIntro: "Choose a password. The editing options on this site only appear after it's entered.",
    mismatch: "The two passwords don't match.", tooShort: "Use at least 4 characters.", setBtn: "Create password",
    savedTitle: "One more step", savedBody: "You're in edit mode in this browser. To make the password work on every device, download config.json and upload it into the data folder of your repository (Add file → Upload files → Commit changes).",
    dlConfig: "Download config.json", stopEdit: "Stop editing", changePw: "Change password", close: "Close",
    editOnTitle: "You're in edit mode", editOnBody: "Friend editing, played-with ticks and the BGG and picture links are showing. This browser stays unlocked until you stop editing.",
  },
  zh: {
    titleDefault: "桌遊收藏庫",
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
    langDep: "語言需求",
    l1: "無", l2: "少量", l3: "中等", l4: "高", l5: "必要",
    copies: "份數", addPic: "加入圖片", changePic: "更換圖片", picsLink: "加入封面圖片",
    ghConnect: "連結 GitHub", ghConnectedTo: "儲存至 {repo}", ghDisconnect: "取消連結",
    ghTitle: "直接儲存到你的網站",
    ghIntro: "只要讓這個瀏覽器連結一次 GitHub repository，朋友的變更就會自動儲存到網站，所有裝置都看得到。",
    ghStep1: '在 GitHub 建立 fine-grained token：<a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">github.com/settings/personal-access-tokens/new</a>。',
    ghStep2: "在 <b>Repository access</b> 選 <b>Only select repositories</b>，並選擇你網站的 repository。",
    ghStep3: "在 <b>Permissions</b> 加入 <b>Contents</b>，設為 <b>Read and write</b>。產生 token 後複製。",
    ghRepo: "Repository（擁有者/名稱）", ghToken: "Token", ghBtn: "連結", ghChecking: "檢查中…",
    ghKeep: "Token 只會存在這個瀏覽器。請只在自己的裝置上連結。",
    ghSaving: "正在儲存到網站…", ghSaved: "已儲存到網站 ✓", ghOk: "已連結。變更會直接儲存到網站 ✓",
    ghErrToken: "GitHub 不接受這個 token。請確認完整複製且尚未過期。",
    ghErrRepo: "這個 token 看不到該 repository。請確認名稱，以及 token 已取得存取權。",
    ghErrWrite: "這個 token 只能讀取無法儲存。請將 Contents 設為 Read and write。",
    ghErrNet: "無法連線到 GitHub。變更已保存在這個瀏覽器，下次會再儲存。",
    pSavedGh: "變更會自動儲存到網站。", pLocalOnly: "變更只存在這個瀏覽器。連結 GitHub 即可儲存到網站，所有裝置都看得到。",
    pwSavedGh: "密碼已儲存到網站，所有裝置都能使用。",
    rolling: "抽選中…", fPlayers: "人數", fLang: "語言", fTools: "編輯工具",
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
const SORTS = ["name", "rating", "light", "heavy", "short", "long", "year"];
const STORE = "bglist.profiles.v1";
// The 10 categories and 10 mechanics used for filtering. Each game is sorted into them from
// BGG's own (much longer) lists; the game window still shows BGG's full lists.
const has = (list, ...names) => names.some(n => list.includes(n));
const like = (list, re) => list.some(x => re.test(x));
const GROUPS = {
  cats: [
    { id: "strategy", en: "Strategy", zh: "策略", test: g => g.domains ? g.domains.includes("strategygames")
        : has(g.categories, "Economic", "Industry / Manufacturing", "Civilization", "City Building", "Territory Building", "Political") || (g.weight >= 3.2 && !isCrawler(g)) },
    { id: "thematic", en: "Thematic / Adventure", zh: "主題／冒險", test: g => g.domains?.includes("thematic")
        || has(g.categories, "Adventure", "Exploration", "Horror")
        || has(g.mechanics, "Storytelling", "Narrative Choice / Paragraph", "Legacy Game", "Scenario / Mission / Campaign Game") },
    { id: "combat", en: "Combat / Skirmish", zh: "戰鬥／對戰", test: g => g.domains?.includes("wargames") || has(g.categories, "Fighting", "Wargame") },
    { id: "crawler", en: "Dungeon Crawler / Boss Battler", zh: "地城探索／魔王戰", test: g => isCrawler(g) },
    { id: "coop", en: "Cooperative", zh: "合作", test: g => has(g.mechanics, "Cooperative Game") },
    { id: "deduction", en: "Social Deduction / Bluffing", zh: "陣營推理／吹牛", test: g => has(g.categories, "Bluffing")
        || has(g.mechanics, "Hidden Roles", "Traitor Game", "Roles with Asymmetric Information") },
    { id: "party", en: "Party", zh: "派對", test: g => g.domains?.includes("partygames") || has(g.categories, "Party Game") },
    { id: "cards", en: "Card / Deck Building", zh: "卡牌／牌庫構築", test: g => has(g.categories, "Card Game", "Collectible Components")
        || has(g.mechanics, "Deck, Bag, and Pool Building", "Deck Construction") },
    { id: "abstract", en: "Abstract / Puzzle", zh: "抽象／益智", test: g => g.domains?.includes("abstracts") || has(g.categories, "Abstract Strategy", "Puzzle") },
    { id: "family", en: "Family / Casual", zh: "家庭／輕鬆", test: g => g.domains ? g.domains.some(d => d === "familygames" || d === "childrensgames")
        : has(g.categories, "Children's Game") || (g.weight > 0 && g.weight < 1.9 && !has(g.categories, "Party Game")) },
  ],
  mechs: [
    { id: "deckbuild", en: "Deck / Bag Building", zh: "牌庫／抽袋構築", test: g => has(g.mechanics, "Deck, Bag, and Pool Building", "Deck Construction") },
    { id: "workers", en: "Worker Placement", zh: "工人放置", test: g => like(g.mechanics, /^Worker Placement/) },
    { id: "area", en: "Area Control / Influence", zh: "區域控制", test: g => has(g.mechanics, "Area Majority / Influence", "King of the Hill") },
    { id: "drafting", en: "Card Drafting", zh: "輪抽／選牌", test: g => like(g.mechanics, /Drafting/) && !has(g.mechanics, "Action Drafting") || has(g.mechanics, "Open Drafting", "Closed Drafting") },
    { id: "dice", en: "Dice Rolling / Dice Placement", zh: "擲骰／骰子放置", test: g => like(g.mechanics, /\b(Dice|Die)\b/) || has(g.mechanics, "Re-rolling and Locking") },
    { id: "actions", en: "Action Selection", zh: "行動選擇", test: g => like(g.mechanics, /^Action /) || has(g.mechanics, "Rondel", "Follow", "Command Cards") },
    { id: "tiles", en: "Tile Placement", zh: "板塊放置", test: g => has(g.mechanics, "Tile Placement", "Grid Coverage") },
    { id: "hand", en: "Hand Management", zh: "手牌管理", test: g => has(g.mechanics, "Hand Management") },
    { id: "sets", en: "Set Collection", zh: "收集組合", test: g => has(g.mechanics, "Set Collection") },
    { id: "powers", en: "Variable Player Powers / Asymmetry", zh: "角色能力／不對稱", test: g => has(g.mechanics, "Variable Player Powers") },
  ],
};
// dungeon crawlers and boss battlers: BGG tags these as families; otherwise co-op games built around fighting
function isCrawler(g) {
  return like(g.families || [], /Dungeon Crawl|Boss Battler/)
    || (has(g.categories, "Fighting") && has(g.mechanics, "Cooperative Game"));
}
const groupLabel = (kind, id) => { const x = GROUPS[kind].find(x => x.id === id); return x ? x[lang] || x.en : id; };

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
      ${ghStatus()}
      <div class="p-foot"><button class="btn" type="button" data-stop>${t("stopEdit")}</button><button class="btn light" type="button" data-changepw>${t("changePw")}</button><span style="flex:1"></span><button class="btn light" type="button" data-close>${t("close")}</button></div>`;
  if (view === "savedgh") h += `<h2>${t("ghSaved")}</h2><p>${t("pwSavedGh")}</p>
      <div class="p-foot"><span style="flex:1"></span><button class="btn" type="button" data-close>${t("close")}</button></div>`;
  if (view === "github") h += `<h2>${t("ghTitle")}</h2><p>${t("ghIntro")}</p>
      <ol class="gh-steps"><li>${t("ghStep1")}</li><li>${t("ghStep2")}</li><li>${t("ghStep3")}</li></ol>
      <label class="field"><small>${t("ghRepo")}</small><input type="text" name="repo" value="${esc(GH?.repo || guessRepo())}" placeholder="username/bglist" autocapitalize="off" spellcheck="false" required></label>
      <label class="field"><small>${t("ghToken")}</small><input type="password" name="token" autocomplete="off" placeholder="github_pat_…" required></label>
      <p class="hint-line">${t("ghKeep")}</p>
      <p class="err" hidden></p><div class="p-foot"><button class="btn light" type="button" data-back>←</button><span style="flex:1"></span><button class="btn" type="submit">${t("ghBtn")}</button></div>`;
  $("#editBody").innerHTML = h + "</form>";
  const d = $("#editDialog"); if (!d.open) d.showModal();
  (view === "github" ? d.querySelector('input[name="token"]') : d.querySelector("input"))?.focus();
}
function ghStatus() {
  return GH
    ? `<div class="gh-status on"><span>● ${t("ghConnectedTo", { repo: esc(GH.repo) })}</span><button type="button" class="linkish" data-ghoff>${t("ghDisconnect")}</button></div>`
    : `<div class="gh-status"><span>${t("pLocalOnly")}</span><button type="button" class="btn" data-gh>${t("ghConnect")}</button></div>`;
}
function editEvents() {
  const d = $("#editDialog");
  d.addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, err = f.querySelector(".err"), show = m => { err.textContent = m; err.hidden = false; };
    if (f.dataset.view === "github") {
      const btn = f.querySelector('[type="submit"]'); btn.disabled = true; btn.textContent = t("ghChecking");
      try { await connectGithub(f.repo.value, f.token.value); toast(t("ghOk"), "ok", 3500); d.close(); update(); }
      catch (e2) { show(e2.message); btn.disabled = false; btn.textContent = t("ghBtn"); }
      return;
    }
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
      setEditing(true, h); update();
      if (GH) {
        try { await ghWrite("data/config.json", JSON.stringify(CONFIG, null, 2) + "\n", "Update edit password"); return openEdit("savedgh"); }
        catch (e2) { toast(e2.message, "err", 6000); }
      }
      openEdit("saved");
    }
  });
  d.addEventListener("click", e => {
    if (e.target === d || e.target.closest("[data-close]")) return d.close();
    if (e.target.closest("[data-stop]")) { setEditing(false); d.close(); update(); }
    if (e.target.closest("[data-changepw]")) openEdit("set");
    if (e.target.closest("[data-gh]")) openEdit("github");
    if (e.target.closest("[data-back]")) openEdit();
    if (e.target.closest("[data-ghoff]")) { disconnectGithub(); openEdit(); }
    if (e.target.closest("[data-dlconfig]")) {
      const blob = new Blob([JSON.stringify(CONFIG, null, 2)], { type: "application/json" });
      const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "config.json" });
      document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
  });
  $("#editBtn").addEventListener("click", () => openEdit());
}

// ------------------------------------------------------------ saving straight to GitHub
// The editor connects this browser once with a token limited to this one repository;
// friend changes then commit data/profiles.json through GitHub's API.
const GH_KEY = "bglist.github";
let GH = (() => { try { return JSON.parse(localStorage.getItem(GH_KEY) || "null"); } catch { return null; } })();
function guessRepo() {
  const m = location.hostname.match(/^([^.]+)\.github\.io$/i);
  if (!m) return "";
  const seg = location.pathname.split("/").filter(Boolean)[0];
  return `${m[1]}/${seg && !seg.includes(".") ? seg : m[1] + ".github.io"}`;
}
// no trailing slash: GitHub refuses "…/repos/owner/name/" in a way browsers report as a network failure
const ghFetch = (path, opts = {}, auth = GH) => fetch(`https://api.github.com/repos/${auth.repo}${path ? "/" + path : ""}`, {
  cache: "no-store", ...opts,
  headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${auth.token}`, "X-GitHub-Api-Version": "2022-11-28", ...(opts.headers || {}) },
});
const b64 = str => { const b = new TextEncoder().encode(str); let s = ""; for (let i = 0; i < b.length; i += 32768) s += String.fromCharCode(...b.subarray(i, i + 32768)); return btoa(s); };
const ghError = status => new Error(status === 401 ? t("ghErrToken") : status === 404 ? t("ghErrRepo") : status === 403 ? t("ghErrWrite") : t("ghErrNet"));
async function ghRead(file) {
  const r = await ghFetch(`contents/${file}`, { headers: { Accept: "application/vnd.github.raw+json" } });
  if (r.status === 404) return null;
  if (!r.ok) throw ghError(r.status);
  return r.json();
}
async function ghWrite(file, text, message) {
  for (let attempt = 0; attempt < 3; attempt++) {
    let cur;
    try { cur = await ghFetch(`contents/${file}`); } catch { throw ghError(0); }
    if (!cur.ok && cur.status !== 404) throw ghError(cur.status);
    const sha = cur.ok ? (await cur.json()).sha : undefined;
    const r = await ghFetch(`contents/${file}`, { method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, content: b64(text), ...(sha ? { sha } : {}) }) }).catch(() => null);
    if (r?.ok) return;
    if (r && (r.status === 409 || r.status === 422)) continue;   // file changed meanwhile: fetch again and retry
    throw ghError(r ? r.status : 0);
  }
  throw ghError(409);
}

let toastTimer;
function toast(msg, kind = "ok", ms = 2600) {
  const el = $("#toast");
  // shown in the top layer so it also appears above an open window
  try { if (el.matches(":popover-open")) el.hidePopover(); el.showPopover(); } catch { /* older browsers: shown normally */ }
  el.textContent = msg; el.className = "toast " + kind;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  if (ms) toastTimer = setTimeout(() => { el.classList.remove("show"); setTimeout(() => { try { if (!el.classList.contains("show")) el.hidePopover(); } catch { /* ignore */ } }, 300); }, ms);
}

let ghTimer = null, ghBusy = false, ghAgain = false;
function queueGithubSave(delay = 1200) {
  if (!GH || !editing) return;
  clearTimeout(ghTimer);
  toast(t("ghSaving"), "busy", 0);
  ghTimer = setTimeout(saveToGithub, delay);
}
async function saveToGithub() {
  if (ghBusy) { ghAgain = true; return; }
  ghBusy = true;
  const snap = JSON.stringify(profiles);
  try {
    await ghWrite("data/profiles.json", JSON.stringify({ profiles }, null, 2) + "\n", "Update friends");
    repoProfilesJson = snap;
    if (JSON.stringify(profiles) === snap) { try { localStorage.removeItem(STORE); } catch { /* ignore */ } }
    toast(t("ghSaved"), "ok");
  } catch (e) { toast(e.message, "err", 6000); }
  ghBusy = false;
  if (ghAgain) { ghAgain = false; saveToGithub(); }
}
async function connectGithub(repo, token) {
  const auth = { repo: repo.trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\/+$/, ""), token: token.trim() };
  let r;
  try { r = await ghFetch("", {}, auth); } catch { throw ghError(0); }
  if (!r.ok) throw ghError(r.status);
  GH = auth;
  try { localStorage.setItem(GH_KEY, JSON.stringify(GH)); } catch { /* ignore */ }
  if (unsaved()) { await saveToGithub(); return; }   // this browser has edits that never reached the website: send them
  // otherwise take the latest friends from GitHub, so an older copy here never overwrites newer changes
  try {
    const fresh = await ghRead("data/profiles.json");
    if (fresh) { try { localStorage.removeItem(STORE); } catch { /* ignore */ } loadProfiles(fresh); }
  } catch { /* keep what we have */ }
}
function disconnectGithub() {
  GH = null;
  try { localStorage.removeItem(GH_KEY); } catch { /* ignore */ }
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
// Remember each picture's shape, so cards are the right size before the picture loads
// (no jumping) and the grid can glide reliably.
const RATIO_KEY = "bglist.ratios";
const ratios = (() => { try { return JSON.parse(localStorage.getItem(RATIO_KEY) || "{}"); } catch { return {}; } })();
let ratioTimer;
const rememberRatio = (src, r) => {
  if (Math.abs((ratios[src] || 0) - r) < .005) return;
  ratios[src] = Math.round(r * 1000) / 1000;
  clearTimeout(ratioTimer);
  ratioTimer = setTimeout(() => { try { localStorage.setItem(RATIO_KEY, JSON.stringify(ratios)); } catch { /* full */ } }, 800);
};
const pic = g => {
  const src = g.thumb || g.image;
  if (!src) return placeholder(g);
  const r = ratios[src];
  return `<span class="pic" style="aspect-ratio:${r || 1}"><img src="${esc(src)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-ph="${g.id}"></span>`;
};
function prepPics(root) {
  root.querySelectorAll(".pic:not(.loaded) img").forEach(im => {
    const done = instant => {
      const box = im.parentElement;
      if (im.naturalWidth) {
        const r = im.naturalWidth / im.naturalHeight;
        rememberRatio(im.getAttribute("src"), r);
        box.style.aspectRatio = r;
      }
      box.classList.add("loaded"); if (instant) box.classList.add("instant");
      const card = im.closest(".card"); if (card?.isConnected) setSpan(card);
    };
    if (im.complete && im.naturalWidth) done(true);
    else im.addEventListener("load", () => done(false), { once: true });
    im.addEventListener("error", onImgError, { once: true });
  });
}
const displayName = g => (lang === "zh" && g.zhName) ? g.zhName : g.name;
// English mode shows no Chinese at all; 中文 mode shows the English name underneath
const subName = g => (lang === "zh" && g.zhName) ? g.name : "";

// Chinese names: BGG often lists Simplified names, so prefer a Traditional one and
// convert Simplified characters when that's all there is (unambiguous characters only).
const S2T_S = "与专业丛东丝丢两严丧临为丽举么义乌乐乔习乡书买乱争亏亚产亩亲亵亿仅从仓仪们众优会伛伞伟传伤伥伦伧伪伫体佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖兰关兴兹养兽冁内冈册写军农冯决况冻净凉减凑凛凤凫凭凯击凿刍刘则刚创删刭刹刽刿剀剂剐剑剥剧劝办务劢动励劲劳势匀匦匮区医华协单卖卢卧卫却卺厅厉压厌厍厕厢厣厦厨厩厮县叁双变叙叠号叽吓吕吗吨听启吴呐呒呓呕呖呗员呙呛呜咏咙咛咝咤响哑哒哓哔哕哙哜哝哟唛唠唢唤啧啬啭啸喷喽喾嗫嗳嘘嘤嘱噜嚣园囱围囵国图圆圣圹场坏块坚坜坞坟坠垄垅垆垒垦垩垫垭垲垴埘埚堑堕墙壮声壳壶处备够头夹夺奁奂奋奖奥妆妇妈妩妪妫姗姹娄娅娆娇娈娱娲婴婵婶媪嫒嫔嫱嬷孙学孪宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴层屉届属屡屦屿岁岂岖岗岘岚岛岭岽岿峄峡峤峥峦峰崂崃崭嵘嵝巅巩巯币帅师帏帐帜带帧帮帱帻帼幂庄庆床庐庑库应庙庞废廪开异弃弑张弪弯弹强归彦彻径徕忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恒恳恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愠愤愦慑懑懒懔戆戋戏戗战戬户扑执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挚挛挝挞挟挠挡挢挣挤挥捞损捡换捣掳掴掷掸掺掼揽揿搀搁搂搅携摄摅摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斩断无旧时旷昙昵昼显晋晒晓晔晕晖暂暧机杀杂权条来杨杩构枞枢枣枥枧枨枪枫枭柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桠桡桢档桤桥桦桧桨桩梦检棂椁椟椠椤椭楼榄榇榈榉槛槟槠横樯樱橥橱橹橼檩欢欤欧歼殁殇残殒殓殚殡殴毂毕毙毡毵氇气氢氩氲汉汤汹沟没沣沤沥沦沧沩沪泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浊测浍济浏浑浒浓浔涛涝涞涟涠涡涣涤润涧涨涩渊渌渍渎渐渑渔渖渗温湾湿溃溅溆滗滚滞滠满滢滤滥滦滨滩潆潇潋潍潜潴澜濑濒灏灭灯灵灶灾灿炀炉炖炜炝点炽烁烂烃烛烦烧烨烩烫烬热焕焖焘爱爷牍牦牵牺犊状犷犸犹狈狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玛玮环现玺珐珑珲琏琐琼瑶瑷璎瓒瓮瓯电画畅畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘗瘘瘪瘫瘾瘿癞癣癫皑皱皲盏盐监盖盗盘眍眦睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硕硖硗硷碍碛碜碱礼祢祯祷祸禀禄禅离秃秆秘积称秽稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筚筛筝筹简箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮粽糁糇糍紧絷纟纠纡红纣纥约级纨纩纪纫纬纭纯纰纱纲纳纵纶纷纸纹纺纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绗绘给绚绛络绝绞统绠绡绢绣绥绦继绨绩绪绫续绮绯绰绲绳维绵绶绸绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缋缌缍缎缏缑缒缓缔缕编缗缘缙缚缛缜缝缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡群翘耢耧耸耻聂聋职聍联聩聪肃肠肤肮肴肾肿胀胁胆胧胨胪胫胶脉脍脐脑脓脔脚脱脶脸腭腻腼腽腾膑舆舣舰舱舻艰艺节芈芗芜芦苁苇苈苋苌苍苎茎茏茑茔茕茧荆荚荛荜荞荟荠荣荤荥荦荧荨荩荪荬荭荮莅莱莲莳莴莶莸莹莺莼萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藓蘖虏虑虚虬虮虱虽虾虿蚀蚁蚂蚕蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蝇蝈蝉蝼蝾螨衅衔补衬衮袄袜袭装裆裢裣裤褛褴见观规觅视觇览觉觊觋觌觎觏觐觑觞触觯誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讲讳讴讵讶讷许讹论讼讽设访诀诂诃评诅识诈诉诊诋诌词诎诏译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谟谠谡谢谣谤谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶贝贞负贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赓赔赕赖赘赙赚赛赜赠赡赢赣赵赶趋趱趸跃跄跞践跷跸跹跻踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辁辂较辄辅辆辇辈辉辊辋辍辎辏辐辑输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳选逊递逦逻遗遥邓邝邬邮邹邺邻郏郐郑郓郦郧郸酝酱酽酾酿释銮錾钅钆钇钉钊钋钌钍钎钏钐钒钓钔钕钗钙钚钛钜钝钞钠钡钢钣钤钦钧钨钩钪钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铌铍铎铐铑铒铕铖铗铘铙铛铜铝铞铟铠铡铢铣铤铥铧铨铩铪铫铬铭铮铯铰铱铳铴铵银铷铸铹铺铼铽铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗锘错锚锛锝锞锟锡锢锣锤锥锦锨锩锪锬锭键锯锰锱锲锴锵锶锷锸锹锺锻锼锾锿镀镁镂镄镅镆镇镉镊镌镍镏镐镑镒镓镔镖镗镘镙镛镜镝镞镟镡镣镤镥镦镧镨镩镪镫镬镭镯镱镲镳镶长门闩闪闫闭问闯闰闱闳间闵闶闷闸闹闺闻闼闽闾阀阁阂阃阄阅阆阈阉阊阋阌阍阎阏阐阑阒阔阕阖阗阙阚队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雇雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞲韦韧韩韪韫韬韵页顶顷顸项顺顼顽顾顿颀颁颂颃预颅领颇颈颉颊颌颍颏颐频颓颔颖颗题颚颛颜额颞颟颠颡颢颤颥颦颧风飑飒飓飕飘飙飚飞飨餍饣饧饨饩饪饫饬饭饮饯饰饱饲饴饵饶饷饺饼饽饿馀馁馄馅馆馇馈馊馋馍馏馐馑馒馓馔馕马驭驮驯驰驱驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骄骅骆骇骈骊骋验骏骐骑骒骓骖骗骘骚骛骜骝骞骟骠骡骢骣骤骥骧髅髋髌鬓魇魉鱼鱿鲁鲂鲅鲆鲇鲈鲋鲍鲎鲐鲑鲒鲔鲕鲚鲛鲜鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲸鲺鲻鲼鲽鳃鳄鳅鳆鳇鳊鳋鳌鳍鳎鳏鳐鳓鳔鳕鳖鳗鳘鳙鳜鳝鳞鳟鳢鸟鸠鸡鸢鸣鸥鸦鸨鸩鸪鸫鸬鸭鸯鸱鸲鸳鸵鸶鸷鸸鸹鸺鸽鸾鸿鹁鹂鹃鹄鹅鹆鹈鹉鹊鹋鹌鹎鹏鹑鹕鹗鹘鹚鹛鹜鹞鹣鹤鹦鹧鹨鹩鹪鹫鹬鹭鹰鹱鹳鹾麦麸麽黄黉黩黪黾鼋鼍鼹齐齑齿龀龃龄龅龆龇龈龉龊龋龌龙龚龛龟";
const S2T_T = "與專業叢東絲丟兩嚴喪臨為麗舉麼義烏樂喬習鄉書買亂爭虧亞產畝親褻億僅從倉儀們眾優會傴傘偉傳傷倀倫傖偽佇體僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗蘭關興茲養獸囅內岡冊寫軍農馮決況凍淨涼減湊凜鳳鳧憑凱擊鑿芻劉則剛創刪剄剎劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勻匭匱區醫華協單賣盧臥衛卻巹廳厲壓厭厙廁廂厴廈廚廄廝縣叄雙變敘疊號嘰嚇呂嗎噸聽啟吳吶嘸囈嘔嚦唄員咼嗆嗚詠嚨嚀噝吒響啞噠嘵嗶噦噲嚌噥喲嘜嘮嗩喚嘖嗇囀嘯噴嘍嚳囁噯噓嚶囑嚕囂園囪圍圇國圖圓聖壙場壞塊堅壢塢墳墜壟壠壚壘墾堊墊埡塏堖塒堝塹墮牆壯聲殼壺處備夠頭夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍奼婁婭嬈嬌孌娛媧嬰嬋嬸媼嬡嬪嬙嬤孫學孿寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷層屜屆屬屢屨嶼歲豈嶇崗峴嵐島嶺崬巋嶧峽嶠崢巒峰嶗崍嶄嶸嶁巔鞏巰幣帥師幃帳幟帶幀幫幬幘幗冪莊慶床廬廡庫應廟龐廢廩開異棄弒張弳彎彈強歸彥徹徑徠憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀恆懇慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣慍憤憒懾懣懶懍戇戔戲戧戰戩戶撲執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇摯攣撾撻挾撓擋撟掙擠揮撈損撿換搗擄摑擲撣摻摜攬撳攙擱摟攪攜攝攄搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕斬斷無舊時曠曇暱晝顯晉曬曉曄暈暉暫曖機殺雜權條來楊榪構樅樞棗櫪梘棖槍楓梟檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒椏橈楨檔榿橋樺檜槳樁夢檢欞槨櫝槧欏橢樓欖櫬櫚櫸檻檳櫧橫檣櫻櫫櫥櫓櫞檁歡歟歐殲歿殤殘殞殮殫殯毆轂畢斃氈毿氌氣氫氬氳漢湯洶溝沒灃漚瀝淪滄溈滬濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞濁測澮濟瀏渾滸濃潯濤澇淶漣潿渦渙滌潤澗漲澀淵淥漬瀆漸澠漁瀋滲溫灣溼潰濺漵潷滾滯灄滿瀅濾濫灤濱灘瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈灶災燦煬爐燉煒熗點熾爍爛烴燭煩燒燁燴燙燼熱煥燜燾愛爺牘犛牽犧犢狀獷獁猶狽獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣瑪瑋環現璽琺瓏琿璉瑣瓊瑤璦瓔瓚甕甌電畫暢疇癤療瘧癘瘍癧瘡瘋皰痾癰痙癢瘂癆瘓癇痴癉瘞瘻癟癱癮癭癩癬癲皚皺皸盞鹽監蓋盜盤瞘眥睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎碩硤磽礆礙磧磣鹼禮禰禎禱禍稟祿禪離禿稈秘積稱穢穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩篳篩箏籌簡簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧粽糝餱餈緊縶糹糾紆紅紂紇約級紈纊紀紉緯紜純紕紗綱納縱綸紛紙紋紡紐紓線紺紲紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絎繪給絢絳絡絕絞統綆綃絹繡綏絛繼綈績緒綾續綺緋綽緄繩維綿綬綢綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝繢緦綞緞緶緱縋緩締縷編緡緣縉縛縟縝縫縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨群翹耮耬聳恥聶聾職聹聯聵聰肅腸膚骯餚腎腫脹脅膽朧腖臚脛膠脈膾臍腦膿臠腳脫腡臉顎膩靦膃騰臏輿艤艦艙艫艱藝節羋薌蕪蘆蓯葦藶莧萇蒼苧莖蘢蔦塋煢繭荊莢蕘蓽蕎薈薺榮葷滎犖熒蕁藎蓀蕒葒葤蒞萊蓮蒔萵薟蕕瑩鶯蓴蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪蘚櫱虜慮虛虯蟣蝨雖蝦蠆蝕蟻螞蠶蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠅蟈蟬螻蠑蟎釁銜補襯袞襖襪襲裝襠褳襝褲褸襤見觀規覓視覘覽覺覬覡覿覦覯覲覷觴觸觶譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記講諱謳詎訝訥許訛論訟諷設訪訣詁訶評詛識詐訴診詆謅詞詘詔譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞謨讜謖謝謠謗謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖貝貞負貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜賡賠賧賴贅賻賺賽賾贈贍贏贛趙趕趨趲躉躍蹌躒踐蹺蹕躚躋躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輇輅較輒輔輛輦輩輝輥輞輟輜輳輻輯輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰郟鄶鄭鄆酈鄖鄲醞醬釅釃釀釋鑾鏨釒釓釔釘釗釙釕釷釺釧釤釩釣鍆釹釵鈣鈈鈦鉅鈍鈔鈉鋇鋼鈑鈐欽鈞鎢鉤鈧鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈮鈹鐸銬銠鉺銪鋮鋏鋣鐃鐺銅鋁銱銦鎧鍘銖銑鋌銩鏵銓鎩鉿銚鉻銘錚銫鉸銥銃鐋銨銀銣鑄鐒鋪錸鋱鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺鍩錯錨錛鍀錁錕錫錮鑼錘錐錦鍁錈鍃錟錠鍵鋸錳錙鍥鍇鏘鍶鍔鍤鍬鍾鍛鎪鍰鎄鍍鎂鏤鐨鎇鏌鎮鎘鑷鐫鎳鎦鎬鎊鎰鎵鑌鏢鏜鏝鏍鏞鏡鏑鏃鏇鐔鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐲鐿鑔鑣鑲長門閂閃閆閉問闖閏闈閎間閔閌悶閘鬧閨聞闥閩閭閥閣閡閫鬮閱閬閾閹閶鬩閿閽閻閼闡闌闃闊闋闔闐闕闞隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難僱雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韓韙韞韜韻頁頂頃頇項順頊頑顧頓頎頒頌頏預顱領頗頸頡頰頜潁頦頤頻頹頷穎顆題顎顓顏額顳顢顛顙顥顫顬顰顴風颮颯颶颼飄飆飈飛饗饜飠餳飩餼飪飫飭飯飲餞飾飽飼飴餌饒餉餃餅餑餓餘餒餛餡館餷饋餿饞饃餾饈饉饅饊饌饢馬馭馱馴馳驅駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵驕驊駱駭駢驪騁驗駿騏騎騍騅驂騙騭騷騖驁騮騫騸驃騾驄驏驟驥驤髏髖髕鬢魘魎魚魷魯魴鮁鮃鯰鱸鮒鮑鱟鮐鮭鮚鮪鮞鱭鮫鮮鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鯽鯖鯪鯫鯡鯤鯧鯝鯢鯰鯛鯨鯴鯔鱝鰈鰓鱷鰍鰒鰉鯿鰠鰲鰭鰨鰥鰩鰳鰾鱈鱉鰻鰵鱅鱖鱔鱗鱒鱧鳥鳩雞鳶鳴鷗鴉鴇鴆鴣鶇鸕鴨鴦鴟鴝鴛鴕鷥鷙鴯鴰鵂鴿鸞鴻鵓鸝鵑鵠鵝鵒鵜鵡鵲鶓鵪鵯鵬鶉鶘鶚鶻鷀鶥鶩鷂鶼鶴鸚鷓鷚鷯鷦鷲鷸鷺鷹鸌鸛鹺麥麩麼黃黌黷黲黽黿鼉鼴齊齏齒齔齟齡齙齠齜齦齬齪齲齷龍龔龕龜";
const S2T = new Map([...S2T_S].map((c, i) => [c, [...S2T_T][i]]));
const TRAD = new Set([...S2T_T]);
function zhNameOf(g) {
  const names = [g.cjkName, ...(g.altNames || [])].filter(n => n && /[\u3400-\u9fff]/.test(n) && !/[\u3040-\u30ff]/.test(n));
  if (!names.length) return "";
  const score = n => [...n].reduce((a, c) => a + (TRAD.has(c) ? 1 : S2T.has(c) ? -1 : 0), 0);
  const best = [...new Set(names)].sort((a, b) => score(b) - score(a))[0];
  return [...best].map(c => S2T.get(c) || c).join("");
}
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
  queueGithubSave();
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
  if (!(S.exp && editing) && g.type === "expansion") return false;
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
  if (S.cats.size && ![...S.cats].every(c => g.groups.cats.has(c))) return false;
  if (S.mechs.size && ![...S.mechs].every(c => g.groups.mechs.has(c))) return false;
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
  for (const k of ["cats", "mechs"]) for (const v of [...S[k]]) if (!GROUPS[k].some(x => x.id === v)) S[k].delete(v);
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
  renderEditBtn();
  const title = t("titleDefault");
  $("#title").textContent = title; document.title = title;
  $("#sort").innerHTML = SORTS.map(k => `<option value="${k}" ${S.sort === k ? "selected" : ""}>${t("s_" + k)}</option>`).join("");
}

// Friends are small player tokens. Every game shows until a token is picked;
// the picked friend's name stays visible, others show their name on hover.
const isLight = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + (n >> 8 & 255) * 587 + (n & 255) * 114) / 1000 > 170; };
function renderProfiles() {
  const row = $("#profileRow");
  if (!profiles.length && !editing) { row.innerHTML = ""; return; }
  let h = profiles.map(p => {
    const on = S.profile === p.id;
    return `<button class="tk ${on ? "on" : ""}" type="button" aria-pressed="${on}" data-prof="${esc(p.id)}" style="--p:${esc(p.color)}" aria-label="${esc(p.name)}">
      <span class="coin">${meeple(isLight(p.color) ? "#2a2257" : "#fff", "rgba(0,0,0,.2)")}</span><span class="nm">${esc(p.name)}</span></button>`;
  }).join("");
  if (editing) h += `<button class="tk add" type="button" id="editProfiles" aria-label="${t(profiles.length ? "editFriends" : "addFriend")}">
      <span class="coin">${profiles.length ? "✎" : "+"}</span><span class="nm">${t(profiles.length ? "editFriends" : "addFriend")}</span></button>`;
  if (S.profile) h += `<span class="pf-switch" role="group">` + ["played", "unplayed"].map(k =>
      `<button type="button" aria-pressed="${S.pfilter === k}" data-pf="${k}">${t(k)}</button>`).join("") + `</span>`;
  row.innerHTML = h;
}

// ------------------------------------------------------------ render: filters
function chip(label, pressed, attrs, cls = "chip") {
  return `<button type="button" class="${cls}" aria-pressed="${pressed}" ${attrs}>${label}</button>`;
}
// Language, categories and mechanics stay folded until someone opens them.
// A group with an active filter starts open, and a folded group shows how many are selected.
const opened = new Set();
const openActive = () => { for (const k of ["ld", "cats", "mechs"]) if (S[k].size) opened.add(k); };
function fold(key, title, active, chipsHtml) {
  const open = opened.has(key);
  return `<section class="fgroup fold ${open ? "open" : ""}">
    <button type="button" class="fold-head" data-fold="${key}" aria-expanded="${open}">
      <span>${title}</span>${!open && active ? `<span class="fold-count">${active}</span>` : ""}
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="chips" ${open ? "" : "hidden"}>${chipsHtml}</div>
  </section>`;
}

// "3–4 · Best" style summary beside the heading
function playerSummary() {
  if (!S.players.size) return "";
  const ns = [...S.players].sort((a, b) => a - b), parts = [];
  for (let i = 0; i < ns.length; i++) {
    let j = i; while (j + 1 < ns.length && ns[j + 1] === ns[j] + 1) j++;
    const lab = n => n === 8 ? "8+" : n;
    parts.push(i === j ? lab(ns[i]) : `${lab(ns[i])}–${lab(ns[j])}`); i = j;
  }
  return `<em>${parts.join(", ")}</em>`;
}
// the light behind Supports / Recommended / Best glides to the chosen option
const slidePos = {};
function placeSlider() {
  for (const [id, box] of [["body", $("#filterBody .pslide")], ["bar", $("#fbar .pslide")]]) {
    const on = box?.querySelector('[aria-pressed="true"]'), pill = box?.querySelector("i");
    if (!on || !pill || !on.offsetWidth) continue;   // hidden right now (closed dropdown, or the other layout)
    const to = { left: on.offsetLeft + "px", width: on.offsetWidth + "px" }, from = slidePos[id];
    if (from && (from.left !== to.left || from.width !== to.width) && !reduceMotion.matches)
      pill.animate([from, to], { duration: 220, easing: "cubic-bezier(.3,.7,.2,1)" });
    Object.assign(pill.style, to); slidePos[id] = to;
  }
}

// The same filter pieces go to two places: the slide-up panel on phones (as before)
// and, on computers, a row of pill buttons whose options drop down on hover or click.
let openDrop = "", pinned = false;
const CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
function renderFilters() {
  const parts = [];
  // players
  const pBody = `<div class="ptrack" role="group" aria-label="${t("players")}">` +
    Array.from({ length: 8 }, (_, i) => i + 1).map(n => `<button type="button" aria-pressed="${S.players.has(n)}" data-f="players" data-v="${n}">${n === 8 ? "8+" : n}</button>`).join("") +
    `</div><div class="pslide" role="group"><i></i>` + ["can", "rec", "best"].map(k =>
    `<button type="button" aria-pressed="${S.pmode === k}" data-pm="${k}">${t(k)}</button>`).join("") + `</div>`;
  const pSum = S.players.size ? `<em>${playerSummary().replace(/<\/?em>/g, "")}${S.pmode !== "can" ? " · " + t(S.pmode) : ""}</em>` : "";
  parts.push({ key: "players", label: t("fPlayers"), sum: pSum, body: pBody, cls: "pp",
    mobile: `<section class="fgroup"><h3 class="h-sum"><span>${t("players")}</span>${playerSummary()}</h3>${pBody}</section>` });
  // time and complexity
  for (const [key, label, list, set] of [["time", "time", TIME, S.time], ["weight", "weight", WEIGHT, S.weight]]) {
    const body = `<div class="chips">` + list.map(([k]) => chip(t(k), set.has(k), `data-f="${key}" data-v="${k}"`)).join("") + `</div>`;
    parts.push({ key, label: t(label), n: set.size, body, mobile: `<section class="fgroup"><h3>${t(label)}</h3>${body}</section>` });
  }
  // language requirement, categories, mechanics (folded on phones until opened)
  if (DATA.games.some(g => g.langDep)) {
    const c = [1, 2, 3, 4, 5].map(n => chip(t("l" + n), S.ld.has(n), `data-f="ld" data-v="${n}"`)).join("");
    parts.push({ key: "ld", label: t("fLang"), n: S.ld.size, body: `<div class="chips">${c}</div>`, mobile: fold("ld", t("langDep"), S.ld.size, c) });
  }
  for (const [kind, label] of [["cats", "categories"], ["mechs", "mechanics"]]) {
    const groups = GROUPS[kind].filter(x => S[kind].has(x.id) || DATA.games.some(g => g.groups[kind].has(x.id)));
    if (!groups.length) continue;
    const c = groups.map(x => chip(esc(x[lang] || x.en), S[kind].has(x.id), `data-f="${kind}" data-v="${x.id}"`)).join("");
    parts.push({ key: kind, label: t(label), n: S[kind].size, body: `<div class="chips">${c}</div>`, cls: "wide", mobile: fold(kind, t(label), S[kind].size, c) });
  }
  // edit-mode extras
  if (editing) {
    let tools = "";
    if (DATA.games.some(g => g.type === "expansion"))
      tools += `<label class="switch"><input type="checkbox" data-exp ${S.exp ? "checked" : ""}> ${t("includeExp")}</label>`;
    tools += `<a class="side-link" href="images.html">🖼️ ${t("picsLink")}</a>`;
    parts.push({ key: "tools", label: "✎ " + t("fTools"), body: `<div class="edit-tools">${tools}</div>`, mobile: `<section class="fgroup edit-tools">${tools}</section>` });
  }
  $("#filterBody").innerHTML = parts.map(x => x.mobile).join("");
  if (openDrop && !parts.some(x => x.key === openDrop)) openDrop = "";
  $("#fbar").innerHTML = parts.map(x => {
    const on = x.key === openDrop;
    return `<div class="fdrop${on ? " open" : ""}${x.sum || x.n ? " active" : ""}" data-drop="${x.key}">
      <button class="fbtn" type="button" aria-expanded="${on}">${x.label}${x.sum || ""}${x.n ? `<span class="cnt">${x.n}</span>` : ""}${CHEV}</button>
      <div class="fpanel ${x.cls || ""}">${x.body}</div></div>`;
  }).join("");
  placeSlider(); fitPanel();
}
// open one dropdown (or none); keep it on screen
function setDrop(key, pin = false) {
  const was = openDrop;
  openDrop = key; pinned = !!key && pin;
  document.querySelectorAll("#fbar .fdrop").forEach(d => {
    const on = d.dataset.drop === key;
    d.classList.toggle("open", on); d.querySelector(".fbtn").setAttribute("aria-expanded", on);
    // the drop-in animation plays only when a dropdown opens, not when its options are redrawn
    if (on && was !== key) { d.classList.add("opening"); setTimeout(() => d.classList.remove("opening"), 200); }
  });
  if (key) { fitPanel(); placeSlider(); }
}
function fitPanel() {
  const panel = $("#fbar .fdrop.open .fpanel"); if (!panel) return;
  panel.style.left = ""; panel.style.right = "";
  if (panel.getBoundingClientRect().right > innerWidth - 12) { panel.style.left = "auto"; panel.style.right = "0"; }
}

function activeFilterChips() {
  const out = [];
  if (S.q) out.push([`“${esc(S.q)}”`, "q", ""]);
  for (const n of S.players) out.push([`${n === 8 ? "8+" : n} ${t("pl")}${S.pmode !== "can" ? " · " + t(S.pmode) : ""}`, "players", n]);
  for (const k of S.time) out.push([t(k), "time", k]);
  for (const k of S.weight) out.push([t(k), "weight", k]);
  for (const n of S.ld) out.push([t("l" + n), "ld", n]);
  for (const v of S.cats) out.push([esc(groupLabel("cats", v)), "cats", v]);
  for (const v of S.mechs) out.push([esc(groupLabel("mechs", v)), "mechs", v]);
  return out;
}

// ------------------------------------------------------------ render: grid
function cardParts(g) {
  const [lo, hi] = timeOf(g);
  const badges = profiles.filter(p => playedWith(p.id, g.id)).slice(0, 4).map(p => meeple(p.color, "#fff")).join("");
  const sub = subName(g);
  return {
    cover: pic(g),
    over: `${g.type === "expansion" ? `<span class="tag-exp">${t("expansion")}</span>` : ""}${badges ? `<span class="played-badges">${badges}</span>` : ""}`,
    meta: `<h2>${esc(displayName(g))}</h2>
      ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
      <div class="facts">
        ${S.sort === "rating" && g.rating ? `<span class="hl" title="${t("bggRating")}">★ ${g.rating.toFixed(1)}</span>` : ""}
        ${S.sort === "year" && g.year ? `<span class="hl" title="${t("yr")}">${g.year}</span>` : ""}
        <span title="${t("players")}">${icons.players}${range(g.minPlayers, g.maxPlayers)}</span>
        ${lo || hi ? `<span title="${t("time")}" class="${S.sort === "short" || S.sort === "long" ? "hl" : ""}">${icons.time}${range(lo, hi)}′</span>` : ""}
        ${g.weight ? `<span title="${t("weight")}: ${weightLabel(g.weight)} (${g.weight.toFixed(1)})">${pips(g.weight)}</span>` : ""}
      </div>`,
  };
}
const cardEls = new Map();   // game id -> its card, kept between renders
function cardFor(g) {
  let el = cardEls.get(g.id);
  if (!el) {
    el = document.createElement("button");
    el.type = "button"; el.className = "card"; el.dataset.id = g.id;
    el.innerHTML = `<div class="cover"></div><span class="over"></span><div class="meta"></div>`;
    el._parts = {};
    cardEls.set(g.id, el);
  }
  const parts = cardParts(g);
  for (const k of ["cover", "over", "meta"]) {
    if (el._parts[k] === parts[k]) continue;
    el.querySelector("." + k).innerHTML = parts[k];
    el._parts[k] = parts[k];
    if (k === "cover") prepPics(el);
  }
  return el;
}
const setSpan = card => {
  const gap = parseFloat(getComputedStyle(card).marginBottom) || 0;
  // offsetHeight ignores animations in progress (a card fading in is briefly scaled down)
  card.style.gridRowEnd = "span " + Math.ceil((card.offsetHeight + gap) / ROW);
};
function render() {
  const list = filtered();
  const grid = $("#grid"), empty = $("#empty");
  if (!DATA.games.length) {
    grid.innerHTML = ""; cardEls.clear(); empty.hidden = false;
    empty.innerHTML = `<h2>${t("noData")}</h2><p>${t("noDataBody")}</p>`;
    return;
  }
  // remember where every visible card is, so the ones that stay can glide to their new spot
  const animate = !reduceMotion.matches && grid.childElementCount > 0;
  const before = new Map();
  if (animate) for (const el of grid.querySelectorAll(".card:not(.ghost)")) before.set(el, el.getBoundingClientRect());
  grid.querySelectorAll(".ghost").forEach(x => x.remove());
  const els = list.map(cardFor), keep = new Set(els);
  const gone = [...grid.querySelectorAll(".card")].filter(el => !keep.has(el));
  gone.forEach(el => el.remove());
  els.forEach((el, i) => { if (grid.children[i] !== el) grid.insertBefore(el, grid.children[i] || null); });
  els.forEach(el => { if (!before.has(el)) setSpan(el); masonry.observe(el); });
  // re-measure once everything has settled, in case a card changed size while it was hidden
  requestAnimationFrame(() => requestAnimationFrame(() => els.forEach(el => el.isConnected && setSpan(el))));
  if (animate) {
    const vis = r => r.bottom > -100 && r.top < innerHeight + 100;
    for (const el of els) {
      const a = before.get(el), b = el.getBoundingClientRect();
      if (a) {
        const dx = a.left - b.left, dy = a.top - b.top;
        if ((dx || dy) && (vis(a) || vis(b)))
          el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" });
      } else if (vis(b)) {
        el.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "none" }], { duration: 340, delay: 140, easing: "ease-out", fill: "backwards" });
      }
    }
    // cards that leave fade out where they were
    const box = grid.getBoundingClientRect();
    for (const el of gone) {
      const a = before.get(el); if (!a || !vis(a)) continue;
      const ghost = el.cloneNode(true);
      ghost.classList.add("ghost"); ghost.removeAttribute("data-id");
      Object.assign(ghost.style, { left: a.left - box.left + "px", top: a.top - box.top + "px", width: a.width + "px", height: a.height + "px" });
      grid.append(ghost);
      ghost.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(.9)" }], { duration: 260, easing: "ease-in", fill: "forwards" })
        .finished.then(() => ghost.remove());
    }
  }
  empty.hidden = list.length > 0;
  if (!list.length) empty.innerHTML = `<h2>${t("noneTitle")}</h2><p>${t("noneBody")}</p><button class="btn" type="button" data-clear>${t("clear")}</button>`;
  const chips = activeFilterChips();
  $("#activeChips").innerHTML = chips.map(([label, f, v]) =>
    `<button type="button" class="chip" aria-pressed="true" data-rm="${f}" data-v="${esc(v)}">${label}</button>`).join("") +
    (chips.length > 1 ? `<button type="button" class="linkish" data-clear>${t("clear")}</button>` : "");
  const nf = chips.length - (S.q ? 1 : 0);
  $("#filterBadge").textContent = nf || "";
  $("#pickBtn").disabled = $("#pickBtn2").disabled = !list.length;
}
// Masonry: every card spans as many 4px grid rows as its own height needs,
// so tall boxes, wide boxes and long names each get a card that fits them.
const ROW = 4;
const masonry = new ResizeObserver(entries => { for (const e of entries) if (e.target.isConnected) setSpan(e.target); });
function onImgError(e) {
  const g = byId.get(+e.target.dataset.ph);
  if (g) (e.target.closest(".pic") || e.target).outerHTML = placeholder(g);
}
function update(full = true) {
  writeHash();
  if (full) { renderFilters(); renderProfiles(); }
  render();
}

// ------------------------------------------------------------ detail dialog
// ------------------------------------------------------------ fly-in animation
// The clicked card's box art lifts off and flies into place in the game window,
// and flies back into its card when the window closes.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const FLY_MS = 420, EASE = "cubic-bezier(.2,.75,.15,1)";
let flight = null;   // { src } while a card's art is "away" in the window
let closing = false;
const coverOf = root => root?.querySelector(".cover img, .cover .ph");
const onScreen = r => r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
const cardCover = id => coverOf(document.querySelector(`#grid .card[data-id="${id}"]`));
const box = r => ({ left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });

function fly(fromEl, fromRect, toRect) {
  const c = fromEl.cloneNode(true);
  c.removeAttribute("data-ph"); c.classList.add("flyer"); c.style.visibility = "visible";
  Object.assign(c.style, box(fromRect));
  $("#gameDialog").append(c);
  return c.animate([box(fromRect), box(toRect)], { duration: FLY_MS, easing: EASE, fill: "forwards" }).finished.then(() => c);
}
function restoreSource() {
  if (flight?.src) flight.src.style.visibility = "";
  flight = null;
}

function openGame(id, fromPick = false, fromCard = null) {
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
      ${g.categories?.length ? `<h3>${t("categories")}</h3><div class="chips">${g.categories.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>` : ""}
      ${g.mechanics?.length ? `<h3>${t("mechanics")}</h3><div class="chips">${g.mechanics.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>` : ""}
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
  const d = $("#gameDialog"), body = $("#gameBody");
  const wasOpen = d.open;
  if (wasOpen) restoreSource();   // switching games inside the window: no flight
  const src = !wasOpen && !reduceMotion.matches ? coverOf(fromCard) : null;
  const srcRect = src?.getBoundingClientRect();
  const canFly = src && onScreen(srcRect);
  const target = coverOf(body);
  // the window's picture takes the same shape as the card's, so the landing spot is known before it loads
  if (target && src?.naturalWidth) target.style.aspectRatio = `${src.naturalWidth} / ${src.naturalHeight}`;
  d.classList.toggle("flip", !!canFly);
  if (!wasOpen) d.showModal();
  d.scrollTop = 0;
  if (wasOpen) { body.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 200, easing: "ease-out" }); return; }
  if (!canFly || !target) return;

  flight = { src };
  src.style.visibility = "hidden";
  target.style.visibility = "hidden";
  body.animate([{ opacity: 0, transform: "scale(.97)" }, { opacity: 1, transform: "none" }],
    { duration: 300, delay: 120, easing: "ease-out", fill: "backwards" });
  fly(src, srcRect, target.getBoundingClientRect()).then(c => {
    const land = () => { target.style.visibility = ""; c.remove(); };
    // keep the flying copy until the window's (larger) picture has loaded
    target.tagName === "IMG" && !target.complete ? target.addEventListener("load", land, { once: true }) || setTimeout(land, 1500) : land();
  });
}

function closeGame() {
  const d = $("#gameDialog"), body = $("#gameBody");
  if (!d.open || closing) return;
  const back = !reduceMotion.matches ? cardCover(+body.dataset.id) : null;
  const target = coverOf(body);
  const backRect = back?.getBoundingClientRect();
  if (!back || !target || !onScreen(backRect)) { d.close(); return; }
  closing = true;
  back.style.visibility = "hidden";
  d.querySelectorAll(".flyer").forEach(f => f.remove());
  const from = target.getBoundingClientRect();
  target.style.visibility = "hidden";
  body.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(.98)" }], { duration: 220, easing: "ease-in", fill: "forwards" });
  fly(target, from, backRect).then(c => {
    back.style.visibility = "";
    d.close(); c.remove(); closing = false;
    body.getAnimations().forEach(a => a.cancel());
  });
}
// ------------------------------------------------------------ rolling Random
// Box covers spin past like a slot machine, slow down and land on the pick;
// the winning cover then flies into the game window.
let rolling = null;
const rnd = a => a[Math.floor(Math.random() * a.length)];
function pickRandom(exclude = 0) {
  const list = filtered();
  if (!list.length || rolling) return;
  const pool = list.length > 1 ? list.filter(g => g.id !== exclude) : list;
  const pick = rnd(pool);
  if (reduceMotion.matches || list.length < 2) {
    openGame(pick.id, true, document.querySelector(`#grid .card[data-id="${pick.id}"]`));
    return;
  }
  const LAND = 30, N = LAND + 5;
  const items = [];
  for (let i = 0; i < N; i++) {
    if (i === LAND) { items.push(pick); continue; }
    let g = rnd(list), tries = 0;
    while ((g.id === items[i - 1]?.id || (Math.abs(i - LAND) <= 1 && g.id === pick.id)) && tries++ < 8) g = rnd(list);
    items.push(g);
  }
  const d = $("#rollDialog"), reel = $("#reel"), label = $("#rollLabel");
  reel.innerHTML = items.map((g, i) => `<div class="reel-item${i === LAND ? " land" : ""}" data-gid="${g.id}"><div class="cover">${
    (g.thumb || g.image) ? `<img src="${esc(g.thumb || g.image)}" alt="" decoding="async" referrerpolicy="no-referrer">` : placeholder(g)}</div></div>`).join("");
  reel.querySelectorAll("img").forEach(im => im.addEventListener("error", () => {
    const g = byId.get(+im.closest(".reel-item").dataset.gid); if (g) im.outerHTML = placeholder(g);
  }, { once: true }));
  label.textContent = t("rolling"); label.classList.remove("won");
  d.classList.remove("done");
  d.showModal();

  const first = reel.children[0], step = reel.children[1].offsetLeft - first.offsetLeft;
  const center = reel.parentElement.clientWidth / 2 - first.offsetWidth / 2;
  const from = center, to = center - LAND * step;
  const spin = reel.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
    { duration: 3000, easing: "cubic-bezier(.08,.72,.12,1)", fill: "forwards" });
  reel.animate([{ filter: "blur(3px)" }, { filter: "blur(2px)", offset: .35 }, { filter: "blur(0)" }], { duration: 2000, easing: "ease-in" });
  rolling = { spin };
  spin.finished.then(() => {
    const won = reel.children[LAND];
    won.classList.add("won"); d.classList.add("done");
    label.textContent = displayName(pick); label.classList.add("won");
    return new Promise(r => setTimeout(r, 650)).then(() => {
      if (!d.open) return;
      openGame(pick.id, true, won);   // the winning cover flies from the reel into the window
      d.close();
    });
  }).catch(() => {}).finally(() => { rolling = null; });
}

// ------------------------------------------------------------ profiles dialog
function openProfiles() {
  const names = allPlayerNames();
  let h = `<button class="d-close" type="button" aria-label="Close" data-close>×</button><div class="p-body">
    <h2>${t("pTitle")}</h2><p>${t("pIntro")}</p>`;
  h += GH ? `<div class="gh-status on"><span>● ${t("pSavedGh")}</span></div>` : ghStatus();
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
      ${GH ? "" : `<button class="btn light" type="button" data-export>${t("pExport")}</button>
      <label class="btn light" style="cursor:pointer">${t("pImport")}<input type="file" accept=".json,application/json" hidden data-import></label>`}
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
  const onSearch = e => {
    const other = e.target.id === "q" ? $("#q2") : $("#q");
    other.value = e.target.value;
    clearTimeout(qTimer); qTimer = setTimeout(() => { S.q = e.target.value.trim(); update(); requestAnimationFrame(checkBar); }, 120);
  };
  $("#q").addEventListener("input", onSearch);
  $("#q2").addEventListener("input", onSearch);
  $("#pickBtn2").addEventListener("click", () => pickRandom());
  $("#toTop").addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" }));
  // the slim bar appears once the big header is almost out of view
  const bar = $("#minibar"), head = $(".top");
  let barOn = false, ticking = false;
  const checkBar = () => {
    ticking = false;
    const headerGone = head.getBoundingClientRect().bottom < 8, q2 = $("#q2");
    // typing in the slim bar but the page has scrolled back up: carry on in the main search box
    if (!headerGone && document.activeElement === q2) { const q = $("#q"); q.focus({ preventScroll: true }); q.setSelectionRange(q.value.length, q.value.length); }
    const on = headerGone;
    if (on === barOn) return;
    barOn = on;
    bar.classList.toggle("show", on); bar.inert = !on;
    document.body.classList.toggle("scrolled", on);
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(checkBar); } }, { passive: true });
  addEventListener("resize", checkBar);
  $("#q2").addEventListener("blur", () => setTimeout(checkBar, 0));
  $("#sort").addEventListener("change", e => { S.sort = e.target.value; update(false); });
  $("#langBtn").addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh"; localStorage.setItem("bglist.lang", lang);
    renderStatic(); update();
  });
  $("#pickBtn").addEventListener("click", () => pickRandom());
  // tapping or pressing Esc during the roll skips straight to the result
  const rd = $("#rollDialog");
  rd.addEventListener("cancel", e => { e.preventDefault(); rolling?.spin.finish(); });
  rd.addEventListener("click", () => rolling?.spin.finish());
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
      // tap a friend to show your games together; tap again to go back to every game
      if (S.profile === b.dataset.prof) { S.profile = ""; S.pfilter = "all"; }
      else { S.profile = b.dataset.prof; S.pfilter = "played"; }
      update();
    }
  });

  const onFilterClick = e => {
    const b = e.target.closest("button"); if (!b || b.classList.contains("fbtn")) return;
    const f = b.dataset.f, v = b.dataset.v;
    if (f === "players") toggle(S.players, +v);
    else if (f === "time") toggle(S.time, v);
    else if (f === "weight") toggle(S.weight, v);
    else if (f === "ld") toggle(S.ld, +v);
    else if (f === "cats") toggle(S.cats, v);
    else if (f === "mechs") toggle(S.mechs, v);
    else if (b.dataset.pm) S.pmode = b.dataset.pm;
    else if (b.dataset.fold) { const k = b.dataset.fold; opened.has(k) ? opened.delete(k) : opened.add(k); renderFilters(); return; }
    else return;
    update();
  };
  const onFilterChange = e => { if (e.target.matches("[data-exp]")) { S.exp = e.target.checked; update(); } };
  for (const box of [$("#filterBody"), $("#fbar")]) { box.addEventListener("click", onFilterClick); box.addEventListener("change", onFilterChange); }

  // pill bar: hover opens a dropdown (and switches between them); a click keeps it open until clicked again
  const fbar = $("#fbar");
  let closeT;
  fbar.addEventListener("pointerover", e => {
    if (e.pointerType === "touch") return;
    clearTimeout(closeT);
    const d = e.target.closest(".fdrop");
    if (d && d.dataset.drop !== openDrop) setDrop(d.dataset.drop);
  });
  fbar.addEventListener("pointerleave", e => {
    if (e.pointerType === "touch" || pinned) return;
    closeT = setTimeout(() => setDrop(""), 320);
  });
  fbar.addEventListener("click", e => {
    const btn = e.target.closest(".fbtn"); if (!btn) return;
    const k = btn.closest(".fdrop").dataset.drop;
    if (openDrop === k && pinned) setDrop(""); else setDrop(k, true);
  });
  document.addEventListener("pointerdown", e => { if (openDrop && !e.target.closest("#fbar")) setDrop(""); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && openDrop) setDrop(""); });
  addEventListener("resize", () => fitPanel());

  document.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-clear")) {
      Object.assign(S, { q: "", players: new Set(), pmode: "can", time: new Set(), weight: new Set(), ld: new Set(), cats: new Set(), mechs: new Set() });
      $("#q").value = $("#q2").value = ""; update();
    } else if (b.dataset.rm) {
      const f = b.dataset.rm, v = b.dataset.v;
      if (f === "q") { S.q = ""; $("#q").value = $("#q2").value = ""; }
      else if (f === "players") S.players.delete(+v);
      else if (f === "ld") S.ld.delete(+v);
      else ({ time: S.time, weight: S.weight, cats: S.cats, mechs: S.mechs })[f].delete(v);
      update();
    }
  });

  $("#grid").addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openGame(+c.dataset.id, false, c); });

  const gd = $("#gameDialog");
  gd.addEventListener("click", e => {
    if (e.target === gd) return closeGame();
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-close")) closeGame();
    else if (b.hasAttribute("data-again")) { const cur = +$("#gameBody").dataset.id; gd.close(); pickRandom(cur); }
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
  gd.addEventListener("cancel", e => { e.preventDefault(); closeGame(); });   // Esc key
  gd.addEventListener("close", () => {
    $("#gameBody").dataset.id = "";
    restoreSource(); closing = false;
    gd.querySelectorAll(".flyer").forEach(f => f.remove());
    document.querySelectorAll("#grid .cover img, #grid .cover .ph").forEach(el => el.style.visibility = "");
  });

  const pd = $("#profileDialog");
  pd.addEventListener("click", e => {
    if (e.target === pd || e.target.closest("[data-close]")) pd.close();
    if (e.target.closest("[data-gh]")) { pd.close(); openEdit("github"); }
  });
  profileEvents();

  window.addEventListener("hashchange", () => { readHash(); openActive(); $("#q").value = $("#q2").value = S.q; renderStatic(); update(); });
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
  for (const g of DATA.games) {
    g.categories ||= []; g.mechanics ||= [];
    if (!g.domains?.length) delete g.domains;   // no BGG game type: sort by categories instead
    g.zhName = zhNameOf(g);
    g.groups = { cats: new Set(GROUPS.cats.filter(x => x.test(g)).map(x => x.id)), mechs: new Set(GROUPS.mechs.filter(x => x.test(g)).map(x => x.id)) };
  }
  byId = new Map(DATA.games.map(g => [g.id, g]));
  let fresh = prof;
  if (editing && GH) { try { fresh = await ghRead("data/profiles.json") || prof; } catch { /* fall back to the published copy */ } }
  loadProfiles(fresh);
  if (editing && GH && unsaved()) queueGithubSave(400);
  if (S.profile && !profiles.some(p => p.id === S.profile)) S.profile = "";
  S.pfilter = !S.profile ? "all" : S.pfilter === "unplayed" ? "unplayed" : "played";
  $("#q").value = $("#q2").value = S.q;
  openActive();
  renderStatic(); bind(); editEvents(); update();
}
boot();
})();
