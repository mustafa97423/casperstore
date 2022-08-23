const hamburger = document.querySelector(".hamburger");
const nav_ul = document.querySelector(".nav-ul");

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
      hamburger.classList.toggle('active');
      nav_ul.classList.toggle('active');
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener('click', closeMenu));

function closeMenu() {
      hamburger.classList.remove("active");
      nav_ul.classList.remove("active");
}
