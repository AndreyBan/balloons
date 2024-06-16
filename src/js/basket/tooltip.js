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
        placement: 'right'
    }

    tooltips.forEach(el => {
        new bootstrap.Tooltip(el, {...tooltipOptions, offset: el.getAttribute('data-bs-offset') ?? [-40, 0] })
    })
}