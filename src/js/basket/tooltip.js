/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.05.2024
 **/
(() => {
    
    tooltipFreeInit()

    const total = {
        sum: 0,
        sumWithRetail: 0,
        retail: 0
    }
    // TODO: Запросом получить процент наценки
    const markup = 30

    document.addEventListener('DOMContentLoaded', renderItemsCart)
    document.querySelector('.js-cart-clean').addEventListener('click', () => {
        localStorage.cart = JSON.stringify([])
        totalBasket()
        computedBasket()
        computedPosition()
    })

    function renderItemsCart() {
        const localData = localStorage.cart ? JSON.parse(localStorage.cart) : null

        if (!localData || !localData.length) return false

        const ids = localData.map(el => el.id)

        // TODO: Добавить запрос на получение данных добавленных в корзину на основе ids

        const data = localData

        // TODO: После реализации запроса удалить данный кусок
        data.forEach(el => {
            Object.assign(el, {
                country_manufacture: 'Испания',
                price_discount: '435',
                count_items: '10 шт.'
            })
        })
        //******** end delete ********


        const html = getHtmlBasketItem(data)

        document.querySelector('.basket-table').insertAdjacentHTML('beforeend', html)
        document.querySelector('.js-markup').innerText = markup + '%'

        totalBasket()
        computedBasket()
        computedPosition()
    }

    function computedPosition() {
        const changeCountElements = document.querySelectorAll('.basket-table-count__btn')

        changeCountElements.forEach(el => {
            el.addEventListener('click', () => {
                setTimeout(() => {
                    const parent = el.closest('.js-goods-card')
                    const sum = parent.querySelector('.basket-table-item__sum')
                    const count = +parent.getAttribute('data-count')
                    const price = parseFloat(parent.getAttribute('data-price'))
                    let newSum = price * count
                    const retail = total.sumWithRetail < 1000
                        ? newSum * markup / 100
                        : 0
                    newSum += retail
                    sum.innerText = newSum.toFixed(2) + ' ₽'
                })
            })
        })
    }

    function computedBasket(elements = null) {
        if (!elements) {
            const changeCountElements = document.querySelectorAll('.basket-table-count__btn')
            const deleteElements = document.querySelectorAll('.js-delete-item')

            computedBasket(changeCountElements)
            computedBasket(deleteElements)

            return
        }
        elements.forEach(el => el.addEventListener('click', totalBasket))
    }

    function getHtmlBasketItem(data) {
        let html = ''

        data.forEach((el, i) => {
            const priceWithoutDiscount = (parseFloat(el['price_discount']) + (parseFloat(el['price_discount']) * (markup / 100))).toFixed(2)

            html += `<div class="basket-table-item js-goods-card"
                     data-name='${ el.name }'
                     data-price="${ el.price }"
                     data-number="${ el.number }"
                     data-count="${ el.count }"
                     data-id="${ el.id }">
                    <div class="basket-table-item__numb">${ ++i }</div>
                    <div class="basket-table-item__img">
                        <img src="./img/basket-picture.png" alt="img">
                    </div>
                    <div class="basket-desktop-text">
                        <div class="basket-table-item__article">${ el.number }</div>
                        <div class="basket-table-item__name">
                            <span class="basket-table-item__name--article">Артикул: ${ el.number }</span>
                            ${ el.name },  ${ el['count_items'] ?? '' }
                            <span class="basket-table-item__country">${ el['country_manufacture'] ?? '' }</span>
                        </div>
                        <div class="basket-table-item__price">
                            <span class="basket-table-item__price--old basket-table-item__price--stroke">${ el['price_discount'] ? el['price_discount'] + '₽' : '' }</span>
                            <span class="basket-table-item__price--percent">${ markup ? '+' + markup + '%' : '' }</span>
                            <span class="basket-table-item__price--now">${ priceWithoutDiscount ?? '' } ₽</span>
                        </div>
                        <div class="basket-table-count">
                            <div class="goods-card-buy__label js-product-label">
                                <span class="basket-table-count__btn basket-minus js-card-btn-dec">-</span>
                                <input type="number" class="basket-table-count__amount js-product-count"
                                       value="${ el.count }">
                                <span class="basket-table-count__btn basket-plus js-card-btn-inc">+</span>
                            </div>
                        </div>
                        <div class="basket-table-item__sum">${ (priceWithoutDiscount * el.count).toFixed(2) } ₽</div>
                    </div>
                    <img class="basket-table-item__delete js-delete-item" src="./img/svg/close-grey.svg" title="Удалить товар" alt="delete">
                </div>`
        })

        return html
    }

    function totalBasket() {
        total.sum = 0
        total.retail = 0
        total.sumWithRetail = 0

        const totalData = {
            count: document.getElementById('basket-amount'),
            price: document.getElementById('basket-price'),
            retail: document.getElementById('basket-retail'),
            total: document.getElementById('basket-sum'),
            priceTitle: document.querySelector('.js-price-title')
        }

        setTimeout(() => computedTotal(totalData))
    }

    function computedTotal (totalData) {
        const items = document.querySelectorAll('.js-goods-card')
        const localData = localStorage.cart ? JSON.parse(localStorage.cart) : []

        totalData.count.innerText = getTotalCount(localData)
        items.forEach(el => total.sum += +el.getAttribute('data-price') * +el.getAttribute('data-count'))

        total.retail = total.sum * markup / 100
        total.sumWithRetail = total.sum + total.retail

        totalData.total.innerText = total.sumWithRetail < 1000
            ? total.sumWithRetail.toFixed(2) + ' ₽'
            : total.sum.toFixed(2) + ' ₽'
        totalData.retail.innerText = total.retail.toFixed(2) + ' ₽'
        totalData.price.innerText = total.sum.toFixed(2) + ' ₽'

        totalData.priceTitle.innerHTML = total.sumWithRetail < 1000
            ? `Розничная наценка <img id="icon-tooltip" src="/img/svg/info.svg" alt="info">`
            : 'Ваша скидка'

        const priceWithoutRetail = document.querySelectorAll('.basket-table-item__price--old')
        const percentLabel = document.querySelectorAll('.basket-table-item__price--percent')
        const priceWithRetail = document.querySelectorAll('.basket-table-item__price--now')
        let display = 'none'

        if (total.sumWithRetail < 1000) {
            tooltipInit()
            display = 'inline'
        }

        priceWithoutRetail.forEach(el => el.classList.toggle('basket-table-item__price--stroke', display !== 'none'))
        percentLabel.forEach(el => el.style.display = display)
        priceWithRetail.forEach(el => el.style.display = display)
    }

    function getTotalCount(data) {
        let sum = 0

        data.forEach(el => sum += +el.count)

        return sum
    }

    function tooltipInit() {
        const iconTooltip = document.getElementById('icon-tooltip')
        const tooltipOptions = {
            title: 'Ваша сумма покупки составила менее 1000₽, добавьте товаров до 1000₽ , чтобы получить оптовую цену, указанную на сайте, или продолжите  оформление заказа по розничной цене',
            html: true,
            customClass: 'price-tooltip',
            placement: 'right',
            offset: [-40, 0]
        }

        if (window.matchMedia('max-width: 767px').matches) {
            tooltipOptions.offset = [-100, -152]
        }

        const tooltip = new bootstrap.Tooltip(iconTooltip, tooltipOptions)

        iconTooltip.addEventListener('mouseenter', () => tooltip.show())
        iconTooltip.addEventListener('mouseleave', () => tooltip.hide())
    }

    function tooltipFreeInit() {
        const iconTooltip = document.getElementById('icon-tooltip-free')
        const tooltipOptions = {
            title: 'Бесплатная доставка не распространяется на баллоны. Доставка и обмен гелиевых баллонов согласовывается с менеджером.',
            html: true,
            customClass: 'free-delivery-tooltip',
            placement: 'right',
            offset: [-40, 0]
        }

        const tooltip = new bootstrap.Tooltip(iconTooltip, tooltipOptions)

        iconTooltip.addEventListener('mouseenter', () => tooltip.show())
        iconTooltip.addEventListener('mouseleave', () => tooltip.hide())
    }

})()
