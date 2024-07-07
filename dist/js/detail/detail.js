(() => {
  document.addEventListener("DOMContentLoaded", () => {
    initDetailSlider();
    showMoreCategory();
  });
  function getValueForMedia(values = [1, 2, 3]) {
    const media = {
      lg: matchMedia("(min-width: 1025px)").matches,
      md: matchMedia("(max-width: 1024px) and (min-width: 768px)").matches,
      xs: matchMedia("(max-width: 767px)").matches
    };
    if (values.length === 3) {
      if (media.xs)
        return values[0];
      else if (media.md)
        return values[1];
      else if (media.lg)
        return values[2];
      else
        return values[0];
    } else {
      throw "Not correct count params in getValueForMedia";
    }
  }
  function showMoreCategory() {
    const categories = document.querySelectorAll(".other-category-item");
    const countShowMore = document.querySelector(".js-more-count");
    const btnShowMore = document.querySelector(".js-btn-show-more");
    const heightCategory = document.querySelector(".other-category-wrap").clientHeight;
    const valuesHeight = getValueForMedia([158, 158, 158]);
    let i = categories.length;
    if (heightCategory > valuesHeight) {
      while (document.querySelector(".other-category-wrap").clientHeight > valuesHeight && i > 0) {
        categories[i - 1].classList.add("hide");
        i--;
      }
      countShowMore.innerText = categories.length - i - 1;
      let contentBtn = "";
      btnShowMore.addEventListener("click", (e) => {
        e.preventDefault();
        btnShowMore.classList.toggle("show");
        const condStateBtn = btnShowMore.classList.contains("show");
        if (condStateBtn) {
          contentBtn = btnShowMore.innerHTML;
        }
        btnShowMore.innerHTML = condStateBtn ? "Скрыть" : contentBtn;
        visibilityMoreCategory(condStateBtn);
      });
    } else {
      btnShowMore.classList.add("hide");
    }
  }
  function visibilityMoreCategory(show = false) {
    const findDeleteClass = show ? "hide" : "show";
    const actionAddClass = show ? "show" : "hide";
    const categoryHidden = document.querySelectorAll(`.other-category-item.${findDeleteClass}`);
    categoryHidden.forEach((el) => {
      el.classList.remove(findDeleteClass);
      el.classList.add(actionAddClass);
    });
  }
  function initDetailSlider() {
    let thumbs = new Swiper(".detail-thumbs-slider", {
      spaceBetween: 24,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          spaceBetween: 8
        },
        768: {
          spaceBetween: 16
        },
        1024: {
          spaceBetween: 24
        }
      }
    });
    new Swiper(".detail-slider", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      thumbs: {
        swiper: thumbs
      }
    });
  }
})();
