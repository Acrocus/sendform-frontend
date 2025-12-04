(function() {
    prompt("hello");
    document.querySelector('.burger').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.nav').classList.toggle('open');
    });

    var acc = document.getElementsByClassName("accordionclick");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


})();
   
    



 /*
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('https://sendform-backend.onrender.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    document.getElementById('response').innerText = result.success
      ? "✅ Надіслано!"
      : "❌ Помилка: " + result.error;
  } catch (err) {
    console.error('❌ Помилка при надсиланні форми:', err);
    document.getElementById('response').innerText = "❌ Помилка з’єднання з сервером.";
  }
});
 
