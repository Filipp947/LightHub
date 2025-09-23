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

// Hamburger hover glow animation
hamburger.addEventListener('mouseenter', () => {
  hamburger.style.boxShadow = '0 0 15px #c084fc';
});
hamburger.addEventListener('mouseleave', () => {
  if(!hamburger.classList.contains('active')) hamburger.style.boxShadow = 'none';
});

// ------------------------ SCRIPTS DATA ------------------------
const scripts = [
  {
    name: "99 Nights in the Forest",
    loader: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Filipp947/LightHub/refs/heads/main/99nightsintheforestloader.lua"))()`,
    announcement: "Bypassed Latest Anticheat!",
    features: [
      "Kill Aura","Chop Aura","Enable Hitbox","Hitbox Size",
      "Auto Eat","Auto Upgrade Campfire","Auto Cook","Auto Collect Coins","Auto Pick Flower",
      "Enable Esp Items","Esp Entity","Enable Esp Entity","ESP Players",
      "Bring","Bring Scrap to Workbench","Bring Wood to Workbench",
      "Teleport to campfire","Teleport to stronghold","Teleport To Children",
      "Enable Fly","Speed Changer","Noclip","Instant Interact","Disable Deer",
      "Fullbright","Auto Plant Saplings","Delete Fog","Vibrant Colors","FPS Boost","Show FPS","Show Ping","Anti AFK Kick","Anti Void"
    ],
    changelog: ["Bypassed Latest Anticheat","Fixed Lag Issues","Improved Features UI"],
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
    const wrapper = document.createElement("div");
    wrapper.className = "glow-wrapper";

    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <h3>${g.name}</h3>
      <div class="badges">
        <span class="badge yellow">${g.type}</span>
        <span class="badge ${g.status === "Undetected" ? "green" : "red"}">${g.status}</span>
      </div>
    `;

    // Animate card entry
    card.style.opacity = 0;
    card.style.transform = "scale(0.95)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = 1;
      card.style.transform = "scale(1)";
    }, i * 100);

    // Hover glow effect
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 50px rgba(200,132,252,0.7)';
      card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 0 20px rgba(138,43,226,0.4)';
      card.style.transform = 'scale(1)';
    });

    card.addEventListener("click", () => openScriptPage(i));
    wrapper.appendChild(card);
    gameList.appendChild(wrapper);
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

  // Fill content
  scriptName.textContent = g.name;
  scriptLoader.textContent = g.loader;
  scriptAnnouncement.textContent = g.announcement || "";

  // Reset opacity for sequential fade-in
  [scriptName, scriptLoader, scriptAnnouncement, scriptFeatures, scriptChangelog].forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";
  });

  // FEATURES as glowing chips
  scriptFeatures.innerHTML = "";
  g.features.forEach(f => {
    const chip = document.createElement("span");
    chip.className = "feature-chip";
    chip.textContent = f;
    chip.style.opacity = 0;
    scriptFeatures.appendChild(chip);

    // Animate each chip
    setTimeout(() => {
      chip.style.transition = 'all 0.4s ease';
      chip.style.opacity = 1;
      chip.style.transform = 'translateY(0)';
    }, 100 + Math.random()*300);
  });

  // CHANGELOG
  scriptChangelog.innerHTML = "";
  g.changelog.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    li.style.opacity = 0;
    scriptChangelog.appendChild(li);

    // Animate each changelog item
    setTimeout(() => {
      li.style.transition = 'all 0.5s ease';
      li.style.opacity = 1;
      li.style.transform = 'translateY(0)';
    }, 150 + Math.random()*300);
  });

  // Sequential fade-in
  setTimeout(() => fadeIn(scriptName), 100);
  setTimeout(() => fadeIn(scriptAnnouncement), 200);
  setTimeout(() => fadeIn(scriptLoader), 300);
  setTimeout(() => fadeIn(scriptFeatures), 400);
  setTimeout(() => fadeIn(scriptChangelog), 500);
}

function fadeIn(el) {
  el.style.transition = "all 0.5s ease";
  el.style.opacity = 1;
  el.style.transform = "translateY(0)";
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

// ------------------------ DISCORD BUTTON ------------------------
document.querySelector(".copy-btn[href='#']").addEventListener("click", (e) => {
  e.preventDefault();
  window.open("YOUR_DISCORD_LINK_HERE", "_blank");
});
