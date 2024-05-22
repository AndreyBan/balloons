(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const iconTooltip = document.getElementById('icon-tooltip')
        const tooltipOptions = {
            title: 'Ваша сумма покупки составила менее 1000₽, добавьте товаров до 1000₽ , чтобы получить оптовую цену, указанную на сайте, или продолжите  оформление заказа по розничной цене',
            html: true,
            customClass: 'price-tooltip',
            placement: 'right',
            offset: [-40, 0]
        }

        if(window.matchMedia('max-width: 767px').matches) {
            tooltipOptions.offset = [-100, -152]
         }
         const tooltip = new bootstrap.Tooltip(iconTooltip, tooltipOptions)

         iconTooltip.addEventListener('mouseenter', () => tooltip.show())
         iconTooltip.addEventListener('mouseleave', () => tooltip.hide())
    })
})()



