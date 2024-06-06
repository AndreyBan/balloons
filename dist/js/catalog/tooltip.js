(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const filterInputs = document.querySelectorAll(".form-check-input");
    const tooltipOptions = {
      title: 'Найдено 23 товара <a href="#" style="padding-left: 8px;">Показать</a>',
      html: true,
      trigger: "",
      placement: "right",
      customClass: "catalog-tooltip",
      offset: [-14, 10]
    };
    filterInputs.forEach((el) => {
      el.addEventListener("change", async () => {
        const countItems = await getData();
        const wordCount = getNoun(countItems, "товар", "товара", "товаров");
        tooltipOptions.title = `Найдено ${countItems} ${wordCount} <a href="#" style="padding-left: 8px;">Показать</a>`;
        const tooltip = new bootstrap.Tooltip(el.nextElementSibling, tooltipOptions);
        clearTimeout(window.timer);
        hideAllTooltips();
        tooltip.show();
        window.timer = setTimeout(hideAllTooltips, 7e3);
      });
    });
  });
  function getData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(23));
    });
  }
  function hideAllTooltips() {
    const tooltips = document.querySelectorAll(".catalog-tooltip");
    tooltips.forEach((el) => el.remove());
  }
  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20)
      return five;
    n %= 10;
    if (n === 1)
      return one;
    if (n >= 2 && n <= 4)
      return two;
    return five;
  }
})();
