(() => {
  window.addEventListener("load", () => document.body.classList.add("loaded"));
  document.addEventListener("DOMContentLoaded", initScripts);
  function initScripts() {
    showSubmenu();
    hoverShowCategory();
    stickyHeader();
    showHintSearch();
    openCatalog();
    mobileShowCategory();
    toTop();
  }
  function toTop() {
    const btnToTop = document.querySelector(".js-to-up");
    toggleShowBtnToUp(btnToTop);
    btnToTop.addEventListener("click", () => {
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  function toggleShowBtnToUp(btn) {
    document.addEventListener("scroll", (e) => {
      const heightWindow = window.innerHeight;
      const scrollPosition = window.scrollY;
      const conditionShowBtn = scrollPosition > heightWindow;
      btn.classList.toggle("show", conditionShowBtn);
    });
  }
  function showHintSearch() {
    const search = document.querySelectorAll("[data-search]");
    const hintContent = document.querySelector(".js-hint-result");
    search.forEach((el) => {
      el.addEventListener("input", () => {
        let hint = el.value.length > 2;
        if (hint) {
          let result = [
            {
              name: "Шарики сердце",
              link: "link-1"
            },
            {
              name: "Шарики 8 марта",
              link: "link-2"
            },
            {
              name: "Шарики с днем рожденья",
              link: "link-3"
            }
          ];
          hintContent.innerHTML = "";
          result.forEach((item) => {
            const html = `<li class="header-search-hint__item">
                                <a href="#${item.link}" class="header-search-hint__link">${item.name}</a>
                            </li>`;
            hintContent.insertAdjacentHTML("afterbegin", html);
          });
        }
        el.closest(".header-search").setAttribute("data-hint", hint);
      });
    });
  }
  function openCatalog() {
    const btnCatalog = document.querySelectorAll(".js-open-catalog");
    const closeMobile = document.querySelector(".catalog-menu-head__close");
    const bodyClass = document.body.classList;
    const catalogShow = "show-catalog";
    btnCatalog.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        bodyClass.toggle(catalogShow);
      });
    });
    closeMobile.addEventListener("click", () => bodyClass.remove(catalogShow));
  }
  function showSubmenu() {
    const dropdownElementList = document.querySelectorAll(".js-dropdown .nav-link");
    const dropdownList = [...dropdownElementList].map((el) => new bootstrap.Dropdown(el));
    dropdownElementList.forEach((el, i) => {
      const parent = el.closest(".js-dropdown");
      let timeOut;
      el.addEventListener("mouseenter", () => {
        parent.classList.add("dropdown-show");
        timeOut = setTimeout(() => {
          if (parent.classList.contains("dropdown-show")) {
            dropdownList[i].show();
          }
        }, 100);
      });
      parent.addEventListener("mouseleave", () => {
        parent.classList.remove("dropdown-show");
        clearTimeout(timeOut);
        dropdownList[i].hide();
      });
    });
  }
  function hoverShowCategory() {
    const categories = document.querySelectorAll(".js-catalog-list > li");
    categories.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const category = el.getAttribute("data-category");
        const content = document.querySelector(`.catalog-category-content[data-content-category='${category}']`);
        if (content) {
          content.classList.add("show");
          content.getSiblings().forEach((el2) => el2.classList.remove("show"));
        }
        el.classList.add("active");
        el.getSiblings().forEach((el2) => el2.classList.remove("active"));
      });
    });
  }
  function mobileShowCategory() {
    const categories = document.querySelectorAll(".js-catalog-list-mobile li > a");
    categories.forEach((el) => {
      el.addEventListener("click", () => {
        const menuItem = el.parentElement;
        menuItem.getSiblings().forEach((li) => li.classList.remove("is-open"));
        menuItem.querySelectorAll(".is-open").forEach((element) => {
          element.classList.remove("is-open");
        });
        menuItem.classList.toggle("is-open");
      });
    });
  }
  function stickyHeader() {
    setStickyHeader();
    window.addEventListener("scroll", setStickyHeader);
  }
  function setStickyHeader() {
    if (matchMedia("(min-width: 992px)").matches) {
      if (scrollY > 72) {
        document.body.classList.add("header-fixed");
      } else {
        document.body.classList.remove("header-fixed");
      }
    }
  }
  function getNextPrevElements(el, next, arr = []) {
    let checkEl = next ? el == null ? void 0 : el.nextElementSibling : el == null ? void 0 : el.previousElementSibling;
    if (checkEl != null) {
      arr.push(checkEl);
      return getNextPrevElements(checkEl, next, arr);
    } else
      return arr;
  }
  Object.prototype.getSiblings = function() {
    return [...getNextPrevElements(this, false), ...getNextPrevElements(this, true)];
  };
})();
