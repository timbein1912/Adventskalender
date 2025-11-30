// script.js

// Debug-Modus über ?debug aktivieren
const params = new URLSearchParams(window.location.search);
const DEBUG = params.has("debug");

document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");

  // Zahlen 1–24 in ein Array
  const days = Array.from({ length: 24 }, (_, i) => i + 1);

  // Array mischen, damit die Türchen durcheinander stehen
  days.sort(() => Math.random() - 0.5);

  //const today = new Date();
  //const today = new Date(2024, 11, 5); // Jahr egal, Monat 11 = Dezember
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dez

  if (DEBUG) {
    document.body.classList.add("debug-mode");
    console.log("DEBUG-MODUS: Alle Türchen sind offen.");
  }

  days.forEach(day => {
    const link = document.createElement("a");
    link.className = "door";
    link.href = `doors/${day}.html`;
    link.textContent = day;

    // leichte Zufallsverschiebung in x/y Richtung
    const offsetX = (Math.random() - 0.5) * 12; // -6px bis +6px
    const offsetY = (Math.random() - 0.5) * 12;
    link.style.setProperty("--offsetX", `${offsetX}px`);
    link.style.setProperty("--offsetY", `${offsetY}px`);

    // Sperrlogik nur wenn nicht im Debug-Modus
    if (!DEBUG) {
      const isDecember = currentMonth === 11; // Dezember
      const isOpen = isDecember && day <= currentDay;

      if (!isOpen) {
        link.classList.add("locked");
        link.addEventListener("click", (e) => {
          e.preventDefault();
          alert("Dieses Türchen ist noch geschlossen!");
        });
      }
    }

    calendar.appendChild(link);
  });
});
