// ------------------------ HAMBURGER TOGGLE ------------------------
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if (menu.style.display === 'flex') {
    menu.style.opacity = 0;
    setTimeout(() => { menu.style.display = 'none'; }, 300);
  } else {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    setTimeout(() => { menu.style.opacity = 1; }, 50);
  }
});

const scripts = [
  {
    name: "99 Nights in the Forest",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/refs/heads/main/99nightsintheforestloader.lua"))()`,
    announcement: "Bypassed Latest Anticheat!",
    features: [
      "Kill Aura",
      "Chop Aura",
      "Aura Radius",
      "Enable Hitbox",
      "Hitbox Size",
      "Auto Eat",
      "Auto Upgrade Campfire",
      "Auto Cook",
      "Auto Collect Coins",
      "Auto Pick Flower",
      "Enable Esp Items",
      "Esp Entity",
      "Esp Entity",
      "Enable Esp Entity",
      "ESP Players",
      "Bring",
      "Bring Scrap to Workbench",
      "Bring Wood to Workbench",
      "Teleport to campfire",
      "Teleport to stronghold",
      "Teleport To Children",
      "Enable Fly",
      "Speed Changer",
      "Noclip",
      "Instant Interact",
      "Disable Deer",
      "Fullbright",
      "Auto Plant Saplings",
      "Delete Fog",
      "Vibrant Colors",
      "FPS Boost",
      "Show FPS",
      "Show Ping",
      "Anti AFK Kick",
      "Anti Void"
    ],
    changelog: ["Bypassed Latest Anticheat", "Fixed Lag Issues", "Improved Features UI"],
    type: "Key System",
    status: "Undetected"
  }
];


// ------------------------ PAGE NAVIGATION ------------------------
const pageButtons = document.querySelectorAll("#menu button");
const pages = document.querySelectorAll(".page");

pageButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pages.forEach(p => p.classList.remove("active-page"));
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
    }, i * 100);

    card.addEventListener("click", () => openScriptPage(i));
    gameList.appendChild(card);
  });
}

[searchBox, filterKey, filterStatus].forEach(el => {
  el.addEventListener("input", renderGames);
  el.addEventListener("change", renderGames);
});
renderGames();

// ------------------------ INDIVIDUAL SCRIPT PAGE ------------------------
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

  // Animate and fill content
  scriptName.textContent = g.name;
  scriptLoader.textContent = g.loader;
  scriptAnnouncement.textContent = g.announcement || "";

  // Animate opacity
  [scriptName, scriptLoader, scriptAnnouncement, scriptFeatures, scriptChangelog].forEach(el => {
    el.style.opacity = 0;
  });

  // FEATURES as chips
  scriptFeatures.innerHTML = "";
  g.features.forEach(f => {
    const chip = document.createElement("span");
    chip.className = "feature-chip";
    chip.textContent = f;
    scriptFeatures.appendChild(chip);
  });

  // CHANGELOG
  scriptChangelog.innerHTML = "";
  const ul = document.createElement("ul");
  g.changelog.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    ul.appendChild(li);
  });
  scriptChangelog.appendChild(ul);

  // fade-in sequentially
  setTimeout(() => { scriptName.style.transition = "all 0.5s"; scriptName.style.opacity = 1; }, 100);
  setTimeout(() => { scriptAnnouncement.style.transition = "all 0.5s"; scriptAnnouncement.style.opacity = 1; }, 300);
  setTimeout(() => { scriptLoader.style.transition = "all 0.5s"; scriptLoader.style.opacity = 1; }, 500);
  setTimeout(() => { scriptFeatures.style.transition = "all 0.5s"; scriptFeatures.style.opacity = 1; }, 700);
  setTimeout(() => { scriptChangelog.style.transition = "all 0.5s"; scriptChangelog.style.opacity = 1; }, 900);
}

// Back button
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
