// Ghost Girl Gems — tiny interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Shrink-on-scroll header
const siteHeader = document.querySelector(".site-header");
const onScroll = () => siteHeader.classList.toggle("scrolled", window.scrollY > 30);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

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

// Contact form → Web3Forms (emails submissions to info@ghostgirlgems.com)
const form = document.querySelector(".contact-form");
const statusEl = document.getElementById("form-status");

function setStatus(msg, kind) {
  if (!statusEl) return;
  statusEl.textContent = msg;
  statusEl.className = "form-status " + kind;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const key = form.querySelector('[name="access_key"]')?.value || "";
  if (!key || key.startsWith("YOUR_")) {
    setStatus("Form isn't connected yet — add your Web3Forms access key. Meanwhile, email info@ghostgirlgems.com.", "err");
    return;
  }

  setStatus("Sending…", "sending");
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const json = await res.json();
    if (json.success) {
      setStatus("Thanks! Your message has been sent. 👻", "ok");
      form.reset();
    } else {
      setStatus("Sorry, something went wrong. Please email info@ghostgirlgems.com.", "err");
    }
  } catch {
    setStatus("Network error. Please email info@ghostgirlgems.com directly.", "err");
  }
});
