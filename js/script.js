(function () {
    // ⬇️ Вивід тестового prompt
    prompt("hello");

    // ⬇️ Меню бургер
    document.querySelector('.burger').addEventListener('click', function () {
        this.classList.toggle('active');
        document.querySelector('.nav').classList.toggle('open');
    });

    // ⬇️ Аккордеон
    var acc = document.getElementsByClassName("accordionclick");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // ⬇️ Відправка форми
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("form");

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = {
                name: form.elements["name"].value,
                email: form.elements["email"].value,
                message: form.elements["message"].value
            };

            try {
                const response = await fetch("https://sendform-backend.onrender.com/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert("Повідомлення надіслано успішно ✅");
                    form.reset();
                } else {
                    alert("Помилка відправки ❌");
                }
            } catch (error) {
                alert("Помилка з'єднання ❗");
                console.error(error);
            }
        });
    });
})();
