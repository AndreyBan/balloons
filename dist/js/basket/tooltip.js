/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.05.2024
 **/
tooltipInit()

function tooltipInit() {
    const tooltips = document.querySelectorAll('.js-tooltip')
    const tooltipOptions = {
        html: true,
        placement: 'right',
        offset: [-40, 0]
    }

    tooltips.forEach(el => {
        const tooltip = new bootstrap.Tooltip(el, tooltipOptions)

        el.addEventListener('mouseenter', () => tooltip.show())
        el.addEventListener('mouseleave', () => tooltip.hide())
    })
}