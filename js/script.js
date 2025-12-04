// -------------------------
// 2) Бургер меню (відкриває small_menu на малих екранах)
// -------------------------
const burger = document.querySelector(".burger");
const smallMenu = document.querySelector(".small_menu");
const body = document.body;

const MOBILE_WIDTH = 900; // ширина, до якої працює бургер

if (burger && smallMenu) {

  const openMenu = () => {
    burger.classList.add("active");
    smallMenu.classList.add("active");
    body.classList.add("nav-open"); // блокуємо прокрутку
  };

  const closeMenu = () => {
    burger.classList.remove("active");
    smallMenu.classList.remove("active");
    body.classList.remove("nav-open");
  };

  // відкриваємо / закриваємо меню
  burger.addEventListener("click", (e) => {
    if (window.innerWidth > MOBILE_WIDTH) return; // працює тільки для мобільних
    e.stopPropagation();

    if (smallMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Закриття при кліку поза меню
  document.addEventListener("click", (e) => {
    if (window.innerWidth > MOBILE_WIDTH) return;
    if (!smallMenu.classList.contains("active")) return;

    if (!smallMenu.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  });

  // Закриття по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && smallMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Якщо розтягнути екран — меню закривається
  window.addEventListener("resize", () => {
    if (window.innerWidth > MOBILE_WIDTH) closeMenu();
  });
}
