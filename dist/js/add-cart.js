(() => {
  document.addEventListener("DOMContentLoaded", addToCart);
  function addToCart() {
    actionBtnCount();
    validateCount();
    btnAddCart();
    deleteItem();
    setCount();
    refreshCart();
  }
  const CARD = ".js-goods-card";
  const INPUT_COUNT = ".js-product-count";
  function refreshCart(firstLoad = false) {
    const textCountCart = document.querySelectorAll(".js-count-cart");
    const cartData = getLocalStorage("cart");
    let sumPrice = 0;
    cartData.forEach((el) => sumPrice += el["price"] * el["count"]);
    textCountCart.forEach((el) => {
      const textCart = el.parentElement.querySelector(".js-cart-text");
      el.innerText = cartData.length ?? "0";
      el.classList.toggle("show", !!cartData.length);
      textCart.innerText = cartData.length ? `${sumPrice} ₽` : "Корзина";
    });
  }
  function btnAddCart() {
    const buttons = document.querySelectorAll(".js-add-cart");
    buttons.forEach((el) => {
      el.addEventListener("click", () => {
        const product = el.closest(CARD);
        const cardId = product.getAttribute("data-id");
        const cardsById = document.querySelectorAll(`${CARD}[data-id='${cardId}']`);
        addItem(product);
        cardsById.forEach((item) => {
          item.querySelector(".js-product-label").classList.add("show");
          item.querySelector(".js-add-cart").setAttribute("hidden", "hidden");
        });
      });
    });
  }
  function addItem(product) {
    const properties = product.getAttributeNames();
    const propertiesData = properties.filter((el) => el.includes("data"));
    const propertiesNames = propertiesData.map((el) => el.replace("data-", ""));
    const addCountProducts = product.querySelector(INPUT_COUNT).value;
    const dataCart = {};
    product.setAttribute("data-count", addCountProducts);
    propertiesNames.forEach((el, i) => {
      dataCart[el] = product.getAttribute(propertiesData[i]);
    });
    setLocalCart(dataCart);
    refreshCart();
  }
  function setCount() {
    if (localStorage.cart) {
      const data = JSON.parse(localStorage.cart);
      data.forEach((el) => {
        const item = document.querySelectorAll(`${CARD}[data-id='${el.id}']`);
        item.forEach((item2) => {
          var _a;
          const countElements = item2.querySelector(INPUT_COUNT);
          const parentCount = countElements.parentElement;
          item2.setAttribute("data-count", el.count);
          countElements.value = el.count;
          parentCount.classList.add("show");
          (_a = parentCount.nextElementSibling) == null ? void 0 : _a.setAttribute("hidden", "hidden");
        });
      });
    }
  }
  function setLocalCart(data) {
    const dataLocal = getLocalStorage("cart");
    if (dataLocal.length) {
      const index = dataLocal.findIndex((el) => el.id === data.id);
      if (index >= 0 && +data.count > 0) {
        dataLocal[index] = data;
      } else {
        dataLocal.push(data);
      }
    } else {
      dataLocal.push(data);
    }
    setLocalStorage("cart", dataLocal);
  }
  function getLocalStorage(field) {
    const local = localStorage[field];
    return local ? JSON.parse(local) : [];
  }
  function setLocalStorage(field, data) {
    localStorage[field] = JSON.stringify(data);
  }
  function validateCount() {
    const inputs = document.querySelectorAll(INPUT_COUNT);
    inputs.forEach((el) => {
      el.addEventListener("change", () => {
        if (el.value % 1 > 0)
          el.value = Math.floor(el.value);
        if (el.value < 0)
          el.value = "1";
      });
    });
  }
  function actionBtnCount() {
    document.addEventListener("click", (e) => {
      const classList = e.target.classList;
      if (classList.contains("js-card-btn-inc")) {
        changeCount(e.target);
      } else if (classList.contains("js-card-btn-dec")) {
        changeCount(e.target, false);
      }
    });
  }
  function changeCount(el, increment = true) {
    const product = el.closest(CARD);
    const elID = product.getAttribute("data-id");
    const productsById = document.querySelectorAll(`${CARD}[data-id='${elID}']`);
    productsById.forEach((item) => {
      var _a;
      const countLabel = item.querySelector(".goods-card-buy__label");
      const countElement = countLabel.querySelector("input");
      let value = Number(countElement.value);
      if (!increment && value - 1 < 1) {
        const dataLocal = getLocalStorage("cart");
        const removeIndex = dataLocal.findIndex((el2) => el2.id === elID);
        countLabel.classList.remove("show");
        (_a = countLabel.nextElementSibling) == null ? void 0 : _a.removeAttribute("hidden");
        item.setAttribute("data-count", "0");
        dataLocal.splice(removeIndex, 1);
        setLocalStorage("cart", dataLocal);
        refreshCart();
        return false;
      }
      countElement.value = increment ? (++value).toString() : (--value).toString();
      addItem(item);
    });
  }
  function deleteItem() {
    document.addEventListener("click", (e) => {
      const classList = e.target.classList;
      if (classList.contains("js-delete-item")) {
        const parent = e.target.closest(CARD);
        const id = parent.getAttribute("data-id");
        const localData = getLocalStorage("cart");
        const idx = localData.findIndex((el) => el.id === id);
        localData.splice(idx, 1);
        setLocalStorage("cart", localData);
        parent.remove();
      }
    });
  }
})();
