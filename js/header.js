document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".menu");
  if (menu) {
    menu.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
  }
});
