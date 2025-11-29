// ===== Einstellungen =====
const DEBUG_ALWAYS_OPEN = true; // zum Testen: alle Türchen offen
// =========================

// Inhalte pro Tag
const entries = {
  1: {
    type: "image",
    src: "https://via.placeholder.com/400x250?text=Tag+1",
    text: "Tag 1: Ich bin so froh, dass es dich gibt ❤️"
  },
  2: {
    type: "image",
    src: "https://via.placeholder.com/400x250?text=Tag+2",
    text: "Tag 2: Erinnerst du dich an unseren ersten gemeinsamen Moment?"
  },
  3: {
    type: "image",
    src: "https://via.placeholder.com/400x250?text=Tag+3",
    text: "Tag 3: Heute bekommst du eine virtuelle Umarmung 🤗"
  }
  // ...weitere Tage selbst ergänzen
};

// DOM-Elemente holen (Script ist am Ende von index.html, DOM ist also schon da)
const calendar = document.getElementById("calendar");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const entryContent = document.getElementById("entry-content");

// heutiger Tag (für Dezember gedacht)
const today = new Date();
let currentDay = today.getDate();

// zum Testen alle Türchen öffnen
if (DEBUG_ALWAYS_OPEN) {
  currentDay = 24;
}

function initCalendar() {
  for (let day = 1; day <= 24; day++) {
    const door = document.createElement("div");
    door.className = "door";
    door.textContent = day;

    if (day > currentDay) {
      door.classList.add("locked");
    } else {
      door.addEventListener("click", () => openDoor(day));
    }

    calendar.appendChild(door);
  }
}

function openDoor(day) {
  const entry = entries[day];

  if (!entry) {
    entryContent.innerHTML = `
      <h2>Tag ${day}</h2>
      <p>Für diesen Tag hast du noch keinen Inhalt eingetragen 😊</p>
    `;
  } else {
    let mediaHtml = "";
    if (entry.type === "image") {
      mediaHtml = `<img src="${entry.src}" alt="Tag ${day}">`;
    } else if (entry.type === "video") {
      mediaHtml = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
          <iframe src="${entry.src}" frameborder="0" allowfullscreen
            style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>`;
    }

    entryContent.innerHTML = `
      <h2>Tag ${day}</h2>
      ${mediaHtml}
      <p>${entry.text}</p>
    `;
  }

  modal.classList.remove("hidden");
}

// Modal schließen über X
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Modal schließen, wenn man auf den dunklen Hintergrund klickt
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Kalender initialisieren
initCalendar();
