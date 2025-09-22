// ------------------------ HAMBURGER TOGGLE ------------------------
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if(menu.style.display === 'flex'){
    menu.style.opacity = 0;
    setTimeout(() => { menu.style.display = 'none'; }, 300);
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    setTimeout(() => { menu.style.opacity = 1; }, 50);
  }
});

// ------------------------ SCRIPTS DATABASE ------------------------
const scripts = [
  {
    name: "99 Nights in the Forest",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/refs/heads/main/99nightsintheforestloader.lua"))()`,
    announcement: "Bypassed Latest Anticheat!",
    features: ["Fast Load", "No Lag", "Auto Collect Items", "Smooth Teleport"],
    changelog: ["Bypassed Latest Anticheat", "Fixed Lag Issues", "Improved Features UI"],
    type: "Key System",
    status: "Undetected"
  },
  {
    name: "Galactic Adventure",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/main/galacticloader.lua"))()`,
    announcement: "New Galaxy Update Compatible!",
    features: ["Auto Farm", "Teleport Anywhere", "Glitch Free"],
    changelog: ["Added Galaxy Mode", "Improved Smoothness"],
    type: "Keyless",
    status: "Undetected"
  },
  {
    name: "Mystic Quest",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/main/mysticloader.lua"))()`,
    announcement: "Updated for Mystic Realms",
    features: ["Speed Boost", "Resource Magnet", "Teleport Shortcuts"],
    changelog: ["Updated Mystic Realm", "Fixed small bugs"],
    type: "Key System",
    status: "Detected"
  }
];

// ------------------------ PAGE NAVIGATION ------------------------
const pageButtons = document.querySelectorAll("#menu button");
const pages = document.querySelectorAll(".page");

pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(p => { p.classList.remove("active-page"); });
    document.getElementById(btn.dataset.page).classList.add("active-page");
    // fade menu out
    hamburger.classList.remove('active');
    menu.style.opacity = 0;
    setTimeout(() => { menu.style.display = 'none'; }, 300);
  });
});

// ------------------------ RENDER SCRIPTS ------------------------
const gameList = document.getElementById("gameList");
const searchBox = document.getElementById("searchBox");
const filterKey = document.getElementById("filterKey");
const filterStatus = document.getElementById("filterStatus");

function renderGames() {
  gameList.innerHTML = "";
  const query = searchBox.value.toLowerCase();
  const keyFilter = filterKey.value;
  const statusFilter = filterStatus.value;
  scripts.filter(g => g.name.toLowerCase().includes(query) &&
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
      </div>
    `;
    // animate card entry
    card.style.opacity = 0;
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = 1;
      card.style.transform = "scale(1)";
    }, i*100);
    card.addEventListener("click", () => openScriptPage(i));
    gameList.appendChild(card);
  });
}

[searchBox, filterKey, filterStatus].forEach(el => {
  el.addEventListener("input", renderGames);
  el.addEventListener("change", renderGames);
});
renderGames();

// ------------------------ SCRIPT PAGE ------------------------
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
  // Animate script page content
  scriptName.textContent = g.name;
  scriptName.style.opacity = 0;
  scriptLoader.textContent = g.loader;
  scriptLoader.style.opacity = 0;
  scriptFeatures.innerHTML = g.features.map(f => `<li>${f}</li>`).join("");
  scriptFeatures.style.opacity = 0;
  scriptChangelog.innerHTML = g.changelog.map(c => `<li>${c}</li>`).join("");
  scriptChangelog.style.opacity = 0;
  scriptAnnouncement.textContent = g.announcement || "";
  scriptAnnouncement.style.opacity = 0;

  setTimeout(() => { scriptName.style.transition = "all 0.5s"; scriptName.style.opacity = 1; }, 100);
  setTimeout(() => { scriptLoader.style.transition = "all 0.5s"; scriptLoader.style.opacity = 1; }, 300);
  setTimeout(() => { scriptFeatures.style.transition = "all 0.5s"; scriptFeatures.style.opacity = 1; }, 500);
  setTimeout(() => { scriptChangelog.style.transition = "all 0.5s"; scriptChangelog.style.opacity = 1; }, 700);
  setTimeout(() => { scriptAnnouncement.style.transition = "all 0.5s"; scriptAnnouncement.style.opacity = 1; }, 900);
}

backBtn.addEventListener("click", () => {
  pages.forEach(p => p.classList.remove("active-page"));
  document.getElementById("scripts").classList.add("active-page");
});

// ------------------------ COPY BUTTON ------------------------
copyLoader.addEventListener("click", () => {
  navigator.clipboard.writeText(scriptLoader.textContent);
  copyLoader.textContent = "Copied!";
  copyLoader.style.transform = "scale(1.2)";
  setTimeout(() => { 
    copyLoader.textContent = "Copy Loader"; 
    copyLoader.style.transform = "scale(1)"; 
  }, 1500);
});
