(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const dropItems = document.querySelectorAll(".dropdown-item.active");
    dropItems.forEach((el) => {
      el.closest(".dropdown-menu").previousElementSibling.innerText = el.innerText;
    });
  });
})();
