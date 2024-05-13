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

        if(window.innerWidth < 768) {
            tooltipOptions.offset = [-100, -152]
         }

            iconTooltip.addEventListener('click', () => {
                const tooltip = new bootstrap.Tooltip(iconTooltip, tooltipOptions)
                tooltip.show()
            })
    })
})()



