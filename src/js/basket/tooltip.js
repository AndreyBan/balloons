(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const iconTooltip = document.getElementById('icon-tooltip');
        const offset = window.matchMedia('(min-width: 768px)').matches ? [-40, 0] : [-100, -152];

        const tooltipOptions = {
            title: 'Ваша сумма покупки составила менее 1000₽, добавьте товаров до 1000₽ , чтобы получить оптовую цену, указанную на сайте, или продолжите  оформление заказа по розничной цене',
            html: true,
            customClass: 'price-tooltip',
            placement: 'right',
            offset: offset
        };

        const tooltip = new bootstrap.Tooltip(iconTooltip, tooltipOptions);

        iconTooltip.addEventListener('mouseenter', () => tooltip.show());
        iconTooltip.addEventListener('mouseleave', () => tooltip.hide());
    });
})();