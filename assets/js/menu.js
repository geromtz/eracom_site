const btnMenu = document.querySelector('.burguer_menu_container');
const navItems = document.querySelectorAll('.nav_item');
const navMenu = document.querySelector('.nav_bar');
const body = document.body;

btnMenu.addEventListener("click", () => {
  btnMenu.classList.toggle("active");
  navMenu.classList.toggle("show_menu");
  body.classList.toggle('menu-active');
  navItems.forEach(item => {
    item.classList.toggle('show_menu_item');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const currentYearElement = document.getElementById('currentYear');
  const currentYear = new Date().getFullYear();
  currentYearElement.textContent = currentYear;
});

