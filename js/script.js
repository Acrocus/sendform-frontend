// === Заміна onclick на data-link ===
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-link]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = btn.dataset.link;
    });
  });
});

// === ТВОЯ ФОРМА ===
(function () {
  const form = document.getElementById('contactForm');
  const responseBox = document.getElementById('response');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    responseBox.innerText = "⏳ Надсилання...";

    try {
      const res = await fetch('https://sendform-backend.onrender.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      responseBox.innerText = result.success
        ? "✅ Надіслано!"
        : "❌ Помилка: " + (result.error || "Невідома помилка");

    } catch (err) {
      responseBox.innerText = "❌ Помилка з’єднання з сервером.";
      console.error(err);
    }
  });
})();
