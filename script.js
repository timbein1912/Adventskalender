// script.js

// Prüfe, ob Debug-Modus aktiv ist (z.B. index.html?debug)
const params = new URLSearchParams(window.location.search);
const DEBUG = params.has("debug");

document.addEventListener("DOMContentLoaded", () => {
  const doors = document.querySelectorAll(".door");

  if (DEBUG) {
    console.log("Adventskalender: DEBUG-MODUS AKTIV – alle Türchen offen.");
    // Optional: Markiere die Seite optisch als Debug
    document.body.classList.add("debug-mode");
    return; // nichts sperren
  }

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dez

  doors.forEach(door => {
    const day = parseInt(door.textContent, 10);

    // Türchen nur in Dezember freigeben und nur bis zum aktuellen Tag
    if (currentMonth !== 11 || day > currentDay) {
      door.classList.add("locked");
      door.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Dieses Türchen ist noch geschlossen!");
      });
    }
  });
});
