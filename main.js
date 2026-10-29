const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Bağla" : "Menyu";
  document.body.classList.toggle("menu-open", open);
}

menuBtn.addEventListener("click", () => {
  setMenu(menu.hidden);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menu.hidden) setMenu(false);
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((other) => {
      other.classList.remove("open");
      other.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!open) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const tabs = [...document.querySelectorAll("[data-tab]")];
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const id = tab.dataset.tab;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll("[data-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.panel !== id;
    });
  });
});

document.querySelector(".lead-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  const business = String(data.get("business") || "").trim();
  const pkg = String(data.get("package") || "").trim();
  const msg = String(data.get("message") || "").trim();

  const waText = `Salam, DeyerX komandası.\n\nSMM və reklam xidməti ilə bağlı müraciət etmək istəyirəm.\n\nAd, soyad: ${name}\nBiznes: ${business}\nMaraqlandığım xidmət: ${pkg}\nQeyd: ${msg || "Yoxdur"}\n\nDetalları danışıb biznesim üçün plan qurmaq istərdim.`;

  window.open(`https://wa.me/994559710409?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
});
