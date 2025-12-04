// js/script.js

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // 1) Переходи по data-link
  // -------------------------
  document.querySelectorAll("[data-link]").forEach(btn => {
    btn.addEventListener("click", () => {
      const href = btn.dataset.link;
      if (!href) return;
      // відкривати в тому самому вікні
      window.location.href = href;
    });
    // accessibility: Enter/Space
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // -------------------------
  // 2) Бургер меню
  // -------------------------
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");      // header nav
  const bigMenu = document.querySelector(".big_menu"); // (опціонально) великий блок
  const body = document.body;

  if (burger && nav) {
    // Клас, який додаємо при відкритті меню
    const OPEN_CLASS = "nav-open";

    const openMenu = () => {
      burger.classList.add("active");
      nav.classList.add("active");
      body.classList.add(OPEN_CLASS); // можна використовувати для блокування прокрутки
    };

    const closeMenu = () => {
      burger.classList.remove("active");
      nav.classList.remove("active");
      body.classList.remove(OPEN_CLASS);
    };

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nav.classList.contains("active")) closeMenu();
      else openMenu();
    });

    // Закрити меню при кліку поза ним
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("active")) return;
      // якщо клік не всередині nav і не по бургеру — закрити
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    // Закрити по Esc
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) closeMenu();
    });
  }

  // -------------------------
  // 3) Аккордеони (всі кнопки .accordion)
  // -------------------------
  document.querySelectorAll(".accordion").forEach(btn => {
    // для доступності: aria-controls -> id панелі, aria-expanded
    // якщо панель — наступний sibling з класом .panel
    const panel = btn.nextElementSibling && btn.nextElementSibling.classList.contains("panel")
      ? btn.nextElementSibling
      : null;

    // Ініціалізація aria
    if (panel) {
      // гарантуємо id у панелі
      if (!panel.id) panel.id = "panel-" + Math.random().toString(36).slice(2, 9);
      btn.setAttribute("aria-controls", panel.id);
      btn.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      // приховати css-wise: краще мати .panel { display: none } у CSS
      // але якщо немає — приховаємо тут
      if (!panel.style.maxHeight) panel.style.maxHeight = "0px";
      panel.style.overflow = "hidden";
      panel.style.transition = "max-height 0.25s ease";
    }

    btn.addEventListener("click", (e) => {
      // якщо кнопка призначена для переходу (data-link) — нехай обробляється як кнопка переходу
      if (btn.dataset.link) return;

      if (!panel) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";

      if (expanded) {
        // закрити
        btn.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
        panel.style.maxHeight = "0px";
        btn.classList.remove("open");
      } else {
        // відкрити
        btn.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.classList.add("open");
      }
    });

    // Дозволити клавішами
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // При ресайзі скинути maxHeight, щоб правильно підрахувати висоту при повторному відкритті
  window.addEventListener("resize", () => {
    document.querySelectorAll(".panel").forEach(panel => {
      if (panel.previousElementSibling && panel.previousElementSibling.getAttribute("aria-expanded") === "true") {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0px";
      }
    });
  });
}); // DOMContentLoaded end

// -------------------------
// 4) Форма — відправка
// -------------------------
(function () {
  const form = document.getElementById('contactForm');
  const responseBox = document.getElementById('response');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (responseBox) responseBox.innerText = "⏳ Надсилання...";
    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await fetch('https://sendform-backend.onrender.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // якщо сервер не повертає JSON — викине виняток
      let result;
      try {
        result = await res.json();
      } catch {
        throw new Error("Сервер повернув не JSON або порожню відповідь");
      }

      if (responseBox) {
        responseBox.innerText = result && result.success
          ? "✅ Надіслано!"
          : "❌ Помилка: " + (result && result.error ? result.error : "Невідома помилка");
      }
    } catch (err) {
      console.error('Помилка при надсиланні форми:', err);
      if (responseBox) responseBox.innerText = "❌ Помилка з’єднання з сервером.";
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
})();
