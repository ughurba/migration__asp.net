//swiper

new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper(".swiper-container", {
  centeredSlides: true,

  loop: true,
  grabCursor: true,
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//---------------------------------------//

const secound = document.querySelector(".secund");

let num = 60;

function timer() {
  setInterval(() => {
    num--;
    if (num === 0) {
      num = 60;
    }
    if (num < 10) {
      num = "0" + num;
    }
    secound.textContent = num;
  }, 1000);
}

timer();

//modal window
const selectLocation = document.querySelector(".select-location-text");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal-window");
const btnCategories = document.querySelector(".all-categories");
const subCategories = document.querySelector(".dropdown-categories");

function modalWindowClassAddHandler() {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function modalWindowClassRemoveHandler() {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
}

function categoriesWindowRemoveHandler() {
  if (subCategories.classList.contains("categories-hidden")) {
    subCategories.classList.remove("categories-hidden");
  } else {
    subCategories.classList.add("categories-hidden");
  }
}

closeBtn.addEventListener("click", modalWindowClassRemoveHandler);
selectLocation.addEventListener("click", modalWindowClassAddHandler);
btnCategories.addEventListener("click", categoriesWindowRemoveHandler);
