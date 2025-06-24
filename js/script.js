(function () {
  // Вивід тестового prompt (можеш прибрати)
  prompt("hello");

  // ☰ Бургер-меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      this.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  // 🔽 Аккордеон
  const acc = document.getElementsByClassName("accordionclick");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel && panel.style) {
        panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
      }
    });
  }

  // 📤 Відправка форми
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    if (!form) {
      console.warn("⚠️ Форма не знайдена.");
      return;
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value;
      const message = form.querySelector('[name="message"]')?.value;

      if (!name || !message) {
        alert("⚠️ Заповніть усі поля.");
        return;
      }

      try {
        const response = await fetch("https://sendform-backend.onrender.com/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, message })
        });

        const result = await response.json();
        alert(result.success ? "✅ Повідомлення надіслано!" : "❌ Помилка: " + result.error);
        form.reset();
      } catch (error) {
        console.error("⛔ Помилка запиту:", error);
        alert("❗ Не вдалося надіслати форму. Спробуйте пізніше.");
      }
    });
  });
})();
