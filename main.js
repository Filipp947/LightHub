// ==========================
// CONFIGURABLE SCRIPTS ARRAY
// ==========================
const scripts = [
  {
    name: "99 Nights in the Forest",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/main/99nightsintheforestloader.lua"))()`,
    announcement: "Bypassed latest anticheat!",
    features: ["Auto Farm", "Teleport Anywhere", "God Mode"],
    changelog: ["v1.2 - Fixed lag issues", "v1.1 - Added teleport feature", "v1.0 - Initial release"],
    type: "Key System",
    status: "Undetected"
  },
  {
    name: "Epic Adventure Script",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/main/epicadventure.lua"))()`,
    announcement: "Works perfectly with mobile!",
    features: ["Infinite Coins", "Auto Quest", "Unlock Skins"],
    changelog: ["v1.1 - Added mobile support", "v1.0 - Initial release"],
    type: "Keyless",
    status: "Detected"
  }
  // Add more scripts here
];

// ==========================
// HAMBURGER & MENU
// ==========================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.style.display = (menu.style.display === "flex" ? "none" : "flex");
  menu.style.flexDirection = "column";
});

// ==========================
// PAGE NAVIGATION
// ==========================
const pages = document.querySelectorAll(".page");
const pageButtons = document.querySelectorAll("#menu button");
pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(p => p.classList.remove("active-page"));
    document.getElementById(btn.dataset.page).classList.add("active-page");
    menu.style.display = "none";
    hamburger.classList.remove("active");
  });
});

// ==========================
// GAME LIST RENDERING
// ==========================
const gameList = document.getElementById("gameList");
const searchBox = document.getElementById("searchBox");
const filterKey = document.getElementById("filterKey");
const filterStatus = document.getElementById("filterStatus");

function renderGames() {
  gameList.innerHTML = "";
  const query = searchBox.value.toLowerCase();
  const keyFilter = filterKey.value;
  const statusFilter = filterStatus.value;

  scripts
    .filter(g => g.name.toLowerCase().includes(query) &&
                 (keyFilter === "" || g.type === keyFilter) &&
                 (statusFilter === "" || g.status === statusFilter))
    .forEach((g, i) => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <h3>${g.name}</h3>
        <div class="badges">
          <span class="badge yellow">${g.type}</span>
          <span class="badge ${g.status === "Undetected" ? "green" : "red"}">${g.status}</span>
        </div>`;
      card.addEventListener("click", () => openScriptPage(i));
      gameList.appendChild(card);
    });
}

// Search and filter events
[searchBox, filterKey, filterStatus].forEach(el => {
  el.addEventListener("input", renderGames);
  el.addEventListener("change", renderGames);
});
renderGames();

// ==========================
// INDIVIDUAL SCRIPT PAGE
// ==========================
const scriptPage = document.getElementById("scriptPage");
const backBtn = document.getElementById("backBtn");
const scriptName = document.getElementById("scriptName");
const scriptLoader = document.getElementById("scriptLoader");
const scriptFeatures = document.getElementById("scriptFeatures");
const scriptChangelog = document.getElementById("scriptChangelog");
const copyLoader = document.getElementById("copyLoader");
const scriptAnnouncement = document.getElementById("scriptAnnouncement");

function openScriptPage(index) {
  const g = scripts[index];
  pages.forEach(p => p.classList.remove("active-page"));
  scriptPage.classList.add("active-page");

  // Set content
  scriptName.textContent = g.name;
  scriptLoader.textContent = g.loader;
  scriptFeatures.innerHTML = g.features.map(f => `<li>${f}</li>`).join("");
  scriptChangelog.innerHTML = g.changelog.map(c => `<li>${c}</li>`).join("");
  scriptAnnouncement.textContent = g.announcement || "";

  // Animate content
  scriptPage.querySelectorAll(".card, .scroll-box, h2, h3").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(15px)";
    setTimeout(() => {
      el.style.transition = "all 0.5s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 50);
  });
}

// Back button
backBtn.addEventListener("click", () => {
  pages.forEach(p => p.classList.remove("active-page"));
  document.getElementById("scripts").classList.add("active-page");
});

// Copy loader
copyLoader.addEventListener("click", () => {
  navigator.clipboard.writeText(scriptLoader.textContent);
  copyLoader.textContent = "Copied!";
  copyLoader.style.background = "#8a2be2";
  setTimeout(() => {
    copyLoader.textContent = "Copy Loader";
    copyLoader.style.background = "#c084fc";
  }, 1500);
});
