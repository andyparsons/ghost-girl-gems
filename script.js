// Ghost Girl Gems — tiny interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const pill = document.querySelector(".book-pill");

function closeMenu() {
  nav.classList.remove("open");
  pill.classList.remove("show");
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  pill.classList.toggle("show", open);
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

// Close after tapping any link in the menu or the pill
[...nav.querySelectorAll("a"), pill].forEach((a) =>
  a.addEventListener("click", closeMenu)
);

// Demo form — no backend yet; connect to a real booking/contact service later
document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks! This is a placeholder form — hook it up to your booking or email service.");
});
