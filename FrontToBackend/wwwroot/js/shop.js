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

//categories

const plusBtn = document.querySelectorAll(".fa-plus");
const subMenu = document.querySelectorAll(".sub-menu");
const minusBtn = document.querySelectorAll(".bi-dash");
plusBtn.forEach((plus) => {
  function showProductCategoriesHandler() {
    const plusId = plus.getAttribute("data-id");

    subMenu.forEach((menu) => {
      const menuId = menu.getAttribute("data-id");

      if (menuId == plusId) {
        styleAndClasslist(menu, "hidden-categories", "remove", plus, "none");

        minusBtn.forEach((minus) => {
          const minusId = minus.getAttribute("data-id");
          if (minusId == plusId) {
            styleAndClasslist(minus, "hidden", "remove");
          }

          function minusHiddenHandler() {
            if (minusId == menuId) {
              styleAndClasslist(minus, "hidden", "add", plus, "block");
              styleAndClasslist(menu, "hidden-categories", "add");
            }
          }

          minus.addEventListener("click", minusHiddenHandler);
        });
      }
    });
  }

  plus.addEventListener("click", showProductCategoriesHandler);
});

const styleAndClasslist = (
  item,
  className,
  propClasslist,
  displayItem,
  display
) => {
  if (displayItem !== undefined || display !== undefined) {
    displayItem.style.display = display;
  }

  if (propClasslist === "add") {
    item.classList.add(className);
  } else if (propClasslist === "remove") {
    item.classList.remove(className);
  }
};

//goods number ////////////////////

const goods = document.querySelectorAll(".goods-product");
const numbers = document.querySelectorAll(".numbers");
const leftArrow = document.querySelector(".bi-arrow-left");

goods.forEach((product) => {
  const productId = product.getAttribute("data-id");

  numbers.forEach((number) => {
    const numberId = number.getAttribute("data-id");

    function jumpByNumbers() {
      numberId == 1
        ? (leftArrow.style.display = "none")
        : (leftArrow.style.display = "block");

      if (!product.classList.contains("hidden-goods")) {
        styleAndClasslist(product, "hidden-goods", "add");
      }

      numbers.forEach((num) => {
        if (num.classList.contains("number-background")) {
          styleAndClasslist(num, "number-background", "remove");
        }
      });

      if (productId == numberId) {
        styleAndClasslist(product, "hidden-goods", "remove");
      }

      styleAndClasslist(number, "number-background", "add");
    }

    number.addEventListener("click", jumpByNumbers);
  });
});

//-------------------basket-------------------------------------//

const buttonCount = document.querySelectorAll(".button-count");
const btnAddtoCard = document.querySelectorAll(".button-goods");
const totalBasket = document.querySelector(".price-count-basket");
const countBasket = document.querySelector(".count-basket");

if (localStorage.getItem("basket") !== null) {
  sizeBasket();
  totalGoods();
}

function addingItemToCartHandler(ev) {
  ev.preventDefault();

  if (localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", JSON.stringify([]));
  }
  console.log(this.parentElement.parentElement);
  let productId = this.parentElement.parentElement.getAttribute("data-id");
  let goodsList = JSON.parse(localStorage.getItem("basket"));

  if (!renderBasketCount(productId)) {
    goodsList.push({
      id: productId,
      img: this.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.getAttribute(
        "src"
      ),
      title:
        this.parentElement.parentElement.firstElementChild.nextElementSibling
          .firstElementChild.textContent,
      price:
        this.parentElement.parentElement.lastElementChild.previousElementSibling
          .lastElementChild.firstElementChild.textContent,
      count: 1,
      total: 0,
    });

    goodsList.forEach((product) => {
      this.nextElementSibling.firstElementChild.nextElementSibling.textContent =
        product.count;
    });
    localStorage.setItem("basket", JSON.stringify(goodsList));
    sizeBasket();
    totalGoods();
  }

  styleButtonCount("none", "flex", this);
}

function styleButtonCount(propDisplayOne, propDisplayTwo, element) {
  buttonCount.forEach((btnCount) => {
    const btnCountId = btnCount.getAttribute("data-btn");
    const btnAddId = element.getAttribute("data-btn");
    if (btnCountId == btnAddId) {
      element.style.display = propDisplayOne;
      btnCount.style.display = propDisplayTwo;
    }
  });
}

function renderBasketCount(productId) {
  let goodsList = JSON.parse(localStorage.getItem("basket"));

  let existProduct = goodsList.find((p) => p.id == productId);

  if (existProduct !== undefined) {
    existProduct.count++;
    localStorage.setItem("basket", JSON.stringify(goodsList));
    totalGoods();
    return true;
  }
}

function sizeBasket() {
  let goodsList = JSON.parse(localStorage.getItem("basket"));
  countBasket.textContent = goodsList.length;
}

function totalGoods() {
  let sum = 0;
  let goodsList = JSON.parse(localStorage.getItem("basket"));
  goodsList.forEach((product) => {
    sum += product.price * product.count;
  });

  totalBasket.textContent = "$" + sum.toFixed(2);
}

btnAddtoCard.forEach((btn) => {
  btn.addEventListener("click", addingItemToCartHandler);
});

// --------------------------------///

const minusBtnCount = document.querySelectorAll(".btn-count-minus");
const plusBtnCount = document.querySelectorAll(".btn-count-plus");

if (minusBtnCount !== null || plusBtnCount !== null) {
  minusBtnCount.forEach((minusBtn) => {
    minusBtn.addEventListener("click", decreaseCountHandler);
  });
  plusBtnCount.forEach((plusBtn) => {
    plusBtn.addEventListener("click", increaseCountHandler);
  });
}

function decreaseCountHandler() {
  let goodsList = JSON.parse(localStorage.getItem("basket"));
  let parentId =
    this.parentElement.parentElement.parentElement.getAttribute("data-id");

  goodsList.forEach((element) => {
    let num = 0;
    if (element.id === parentId) {
      element.count--;
      num = element.count;
      this.nextElementSibling.textContent = num;

      element.total = descendingTotal(element.price, element.total).toFixed(2);

      localStorage.setItem("basket", JSON.stringify(goodsList));
      totalGoods();

      if (element.count === 0) {
        styleButtonCount(
          "flex",
          "none",
          this.parentElement.previousElementSibling
        );
        removeElementInBasket(element.id);
        location.reload();
      }
    }
  });
}

function increaseCountHandler() {
  let goodsList = JSON.parse(localStorage.getItem("basket"));
  let parentId =
    this.parentElement.parentElement.parentElement.getAttribute("data-id");
  goodsList.forEach((element) => {
    let num = 0;
    if (parentId == element.id) {
      element.count++;
      num = element.count;

      this.previousElementSibling.textContent = num;
      element.total = increasingNumber(element.price, element.total).toFixed(2);
      localStorage.setItem("basket", JSON.stringify(goodsList));
      totalGoods();
    }
  });
}

function removeElementInBasket(id) {
  let goodsList = JSON.parse(localStorage.getItem("basket"));
  let filteredList = goodsList.filter((product) => product.id !== id);

  localStorage.setItem("basket", JSON.stringify(filteredList));
  goodsList = JSON.parse(localStorage.getItem("basket"));
}

const descendingTotal = (price, total) => total - price;

const increasingNumber = (price, total) => Number(total) + Number(price);
