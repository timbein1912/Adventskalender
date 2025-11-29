// Hier trägst du deine Inhalte ein
// Du kannst für jeden Tag ein Bild oder Video + Text eintragen
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
  // ... bis 24 erweitern
};

// wenn du willst, kannst du hier reale Links zu deinen Bildern/Videos eintragen
// z.B. type: "video", src: "https://www.youtube.com/embed/DEIN_VIDEO_ID"

function initCalendar() {
  const calendar = document.getElementById("calendar");

  // heute (für Dezember gedacht)
  const today = new Date();
  //const currentDay = today.getDate(); // 1–31
  // TESTMODUS: alle Tage sofort freigeschaltet
  const currentDay = 24;


  for (let day = 1; day <= 24; day++) {
    const door = document.createElement("div");
    door.className = "door";
    door.textContent = day;

    if (day > currentDay) {
      // Türchen noch gesperrt
      door.classList.add("locked");
    } else {
      door.addEventListener("click", () => openDoor(day));
    }

    calendar.appendChild(door);
  }
}

function openDoor(day) {
  const modal = document.getElementById("modal");
  const contentDiv = document.getElementById("entry-content");

  const entry = entries[day];

  if (!entry) {
    contentDiv.innerHTML = `<h2>Tag ${day}</h2><p>Für diesen Tag hast du noch nichts eingetragen 😊</p>`;
  } else {
    let mediaHtml = "";
    if (entry.type === "image") {
      mediaHtml = `<img src="${entry.src}" alt="Tag ${day} Bild">`;
    } else if (entry.type === "video") {
      mediaHtml = `
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
          <iframe src="${entry.src}" frameborder="0" allowfullscreen
            style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>`;
    }

    contentDiv.innerHTML = `
      <h2>Tag ${day}</h2>
      ${mediaHtml}
      <p>${entry.text}</p>
    `;
  }

  modal.classList.remove("hidden");
}

// Modal schließen
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const close = document.getElementById("close");

  close.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  initCalendar();
});
