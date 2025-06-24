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
   
    



 