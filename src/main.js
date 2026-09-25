import "./style.css";

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("mobile-menu");
const backdrop = document.getElementById("menu-backdrop");
const iconOpen = document.getElementById("menu-icon-open");
const iconClose = document.getElementById("menu-icon-close");

function isOpen() {
  return toggle?.getAttribute("aria-expanded") === "true";
}

function setMenu(open) {
  if (!toggle || !menu || !backdrop || !iconOpen || !iconClose) return;

  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.classList.toggle("hidden", !open);
  backdrop.classList.toggle("hidden", !open);
  menu.hidden = !open;
  backdrop.hidden = !open;
  iconOpen.classList.toggle("hidden", open);
  iconClose.classList.toggle("hidden", !open);
  document.body.classList.toggle("overflow-hidden", open);
}

toggle?.addEventListener("click", () => setMenu(!isOpen()));
backdrop?.addEventListener("click", () => setMenu(false));

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isOpen()) setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 40rem)").matches && isOpen()) {
    setMenu(false);
  }
});
