(() => {
    document.addEventListener('DOMContentLoaded', () => {
        
    })
})

let pickup = document.getElementById('pickup');
let delivery = document.getElementById('delivery');
let deliveryNNRegion = document.getElementById('deliveryNNRegion');

let pickupPoints = document.querySelector('.pickup-points');
let deliveryArea = document.querySelector('.delivery-area');

let warningFreeDelivery = document.querySelector('.address-warning--free');
let warningRegionDelivery = document.querySelector('.address-warning--region');

document.querySelectorAll('input[name="form-delivery-type"]').forEach(btn => {
    btn.addEventListener('change', () => {
        if (pickup.checked) {
            deliveryArea.classList.remove('block-visible')
            pickupPoints.classList.add('block-visible')

            warningFreeDelivery.classList.remove('block-visible')
            warningFreeDelivery.classList.add('block-hidden')

            warningRegionDelivery.classList.remove('block-visible')
            warningRegionDelivery.classList.add('block-hidden')
        }
        if (delivery.checked) {
            deliveryArea.classList.add('block-visible')
            pickupPoints.classList.remove('block-visible')
            
            warningFreeDelivery.classList.remove('block-hidden')
            warningFreeDelivery.classList.add('block-visible')

            if (deliveryNNRegion.checked) {
                warningRegionDelivery.classList.remove('block-hidden')
                warningRegionDelivery.classList.add('block-visible')
            }
        }
    })
})

document.querySelectorAll('input[name="form-delivery-area"]').forEach(btn => {
    btn.addEventListener('change', () => {
        if (deliveryNNRegion.checked) {
            warningRegionDelivery.classList.remove('block-hidden')
            warningRegionDelivery.classList.add('block-visible')
        } else {
            warningRegionDelivery.classList.remove('block-visible')
            warningRegionDelivery.classList.add('block-hidden')
        }
    })
})