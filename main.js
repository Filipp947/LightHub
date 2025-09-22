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

  scripts.filter(g => 
    g.name.toLowerCase().includes(query) &&
    (keyFilter === "" || g.type === keyFilter) &&
    (statusFilter === "" || g.status === statusFilter)
  ).forEach((g, i) => {
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

    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 0 80px rgba(200,132,252,0.8), 0 0 100px rgba(138,43,226,0.5)";
      card.style.transform = "scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 0 15px rgba(138,43,226,0.4)";
      card.style.transform = "scale(1)";
    });

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
  scriptLoader.textContent = g.loader;
  scriptFeatures.innerHTML = g.features.map(f => `<span class="feature-chip glow-chip">${f}</span>`).join("");
  scriptChangelog.innerHTML = g.changelog.map(c => `<li>${c}</li>`).join("");
  scriptAnnouncement.textContent = g.announcement || "";

  // Fade in sequence
  [scriptName, scriptLoader, scriptFeatures, scriptChangelog, scriptAnnouncement].forEach((el, i) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = "all 0.5s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i*200);
  });

  // feature chip hover glow
  document.querySelectorAll(".feature-chip").forEach(chip => {
    chip.addEventListener("mouseenter", () => {
      chip.style.transform = "scale(1.1) rotateZ(2deg)";
      chip.style.boxShadow = "0 0 30px #ffccff, 0 0 50px #c084fc, 0 0 70px #8a2be2";
    });
    chip.addEventListener("mouseleave", () => {
      chip.style.transform = "scale(1) rotateZ(0deg)";
      chip.style.boxShadow = "0 0 15px #c084fc, 0 0 25px #8a2be2";
    });
  });
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
  copyLoader.style.boxShadow = "0 0 40px #ffccff, 0 0 60px #c084fc, 0 0 80px #8a2be2";
  setTimeout(() => { 
    copyLoader.textContent = "Copy Loader"; 
    copyLoader.style.transform = "scale(1)"; 
    copyLoader.style.boxShadow = "0 0 15px #c084fc, 0 0 25px #8a2be2, 0 0 35px #ffccff";
  }, 1500);
});
