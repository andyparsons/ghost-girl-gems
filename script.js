// Ghost Girl Gems — tiny interactions

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Logo always returns to the very top of the home page
const brand = document.querySelector(".brand");
if (brand) {
  brand.addEventListener("click", (e) => {
    // On the home page the href is "#top" — scroll to the very top (works on
    // repeat clicks too). On other pages it's "index.html#top" — let it navigate.
    if (brand.getAttribute("href").charAt(0) === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", location.pathname);
    }
  });
}

// Re-align to a hash target as async content (Instagram embeds) loads and
// shifts the layout — e.g. landing on index.html#contact from the About page.
// Keeps the target in view until the page settles, but yields the moment the
// user scrolls themselves.
if (location.hash) {
  let userMoved = false;
  const align = () => {
    if (userMoved || !location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
  };
  ["wheel", "touchstart", "keydown"].forEach((e) =>
    window.addEventListener(e, () => { userMoved = true; }, { passive: true, once: true })
  );
  window.addEventListener("load", align);
  // Re-align as Instagram embeds load and grow the page (can take several seconds)
  const ro = "ResizeObserver" in window ? new ResizeObserver(align) : null;
  if (ro) ro.observe(document.body);
  [300, 800, 1500, 2500, 4000, 6000, 9000].forEach((t) => setTimeout(align, t));
  setTimeout(() => ro && ro.disconnect(), 10000);
}

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
