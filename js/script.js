document.addEventListener("DOMContentLoaded", () => {

  // Aкордеон
  const accordions = document.getElementsByClassName("accordion");
  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel) {
        panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
      }
    });
  }

  // Бургер-меню
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const body = document.body;

  if (burger && nav) {

    const openMenu = () => {
      burger.classList.add("active");
      nav.classList.add("open");   // твій CSS: .open { display: flex !important; }
      body.classList.add("nav-open");
    };

    const closeMenu = () => {
      burger.classList.remove("active");
      nav.classList.remove("open");
      body.classList.remove("nav-open");
    };

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nav.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Закрити при кліку поза меню
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
      }
    });

    // ESC закриває
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
      }
    });

    // При розширенні екрана — закриває
    window.addEventListener("resize", () => {
      if (window.innerWidth > 840) closeMenu();
    });
  }
});
