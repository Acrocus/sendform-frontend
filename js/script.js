// js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // ---------- ВСПЛИВНІ ЛОГИ ДЛЯ ДІАГНОСТИКИ ----------
  const log = (...args) => console.log("[site-script]", ...args);
  const warn = (...args) => console.warn("[site-script]", ...args);
  const error = (...args) => console.error("[site-script]", ...args);

  // ---------- data-link (переходи) ----------
  document.querySelectorAll("[data-link]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const href = btn.dataset.link;
      if (!href) {
        warn("data-link пуста на елементі:", btn);
        return;
      }
      // якщо хочеш — можна додати target handling (data-target="_blank")
      if (btn.dataset.target === "_blank") window.open(href, "_blank");
      else window.location.href = href;
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ---------- Аккордеони ----------
  const accordions = document.querySelectorAll(".accordion");
  accordions.forEach(btn => {
    const panel = btn.nextElementSibling && btn.nextElementSibling.classList.contains("panel")
      ? btn.nextElementSibling
      : null;

    // Ініціалізація доступності та стилів
    if (panel) {
      if (!panel.id) panel.id = "panel-" + Math.random().toString(36).slice(2, 9);
      btn.setAttribute("aria-controls", panel.id);
      btn.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
      panel.style.maxHeight = "0px";
      panel.style.overflow = "hidden";
      panel.style.transition = "max-height 0.25s ease";
    }

    btn.addEventListener("click", (e) => {
      // Якщо кнопка має data-link — це не аккордеон
      if (btn.dataset.link) return;
      if (!panel) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
        panel.style.maxHeight = "0px";
        btn.classList.remove("open");
      } else {
        btn.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.classList.add("open");
      }
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Перепідрахунок висот при зміні розміру
  window.addEventListener("resize", () => {
    document.querySelectorAll(".panel").forEach(panel => {
      const prev = panel.previousElementSibling;
      if (prev && prev.getAttribute("aria-expanded") === "true") {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "0px";
      }
    });
  });

  // ---------- Бургер (керує .nav згідно твого CSS) ----------
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const body = document.body;
  if (burger && nav) {
    const openMenu = () => {
      burger.classList.add("active");
      nav.classList.add("open"); // у тебе .open { display:flex !important }
      body.classList.add("nav-open");
      log("menu opened");
    };
    const closeMenu = () => {
      burger.classList.remove("active");
      nav.classList.remove("open");
      body.classList.remove("nav-open");
      log("menu closed");
    };

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nav.classList.contains("open")) closeMenu();
      else openMenu();
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 840 && nav.classList.contains("open")) closeMenu();
    });
  } else {
    if (!burger) warn("Не знайдено .burger в DOM");
    if (!nav) warn("Не знайдено .nav в DOM");
  }

  // ---------- Форма: відправка contactForm ----------
  (function setupForm() {
    const form = document.getElementById('contactForm');
    const responseBox = document.getElementById('response');

    if (!form) {
      warn("Форма #contactForm не знайдена");
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (responseBox) responseBox.innerText = "⏳ Надсилання...";
      if (submitBtn) submitBtn.disabled = true;

      log("Відправка форми:", data);

      try {
        const res = await fetch('https://sendform-backend.onrender.com/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        // Якщо не ok — логуй статус (може бути 4xx/5xx)
        if (!res.ok) {
          const text = await res.text().catch(()=>"(no body)");
          throw new Error(`HTTP ${res.status} ${res.statusText} — ${text}`);
        }

        // Спробуємо розпарсити JSON; якщо не JSON — повідомимо користувача
        let result;
        try {
          result = await res.json();
        } catch (err) {
          throw new Error("Сервер повернув не JSON або порожню відповідь");
        }

        log("Відповідь сервера:", result);

        if (responseBox) {
          responseBox.innerText = result && result.success
            ? "✅ Надіслано!"
            : "❌ Помилка: " + (result && result.error ? result.error : "Невідома помилка");
        }
      } catch (err) {
        error("Помилка при відправці форми:", err);
        if (responseBox) {
          responseBox.innerText = "❌ Помилка з’єднання або серверної відповіді. Перевір консоль.";
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  })();

  log("script.js ініціалізовано");
});
