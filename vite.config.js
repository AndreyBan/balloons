export default {
    root: 'src',
    base: './',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                index: './src/index.html',
                detail: './src/detail.html',
                catalog: './src/catalog.html',
                registrationPage: './src/registration.html',
                recovery: './src/recovery.html',
                addAddress: './src/add-address.html',
                edit: './src/edit.html',
                editOrganization: './src/edit-organization.html',
                lk: './src/lk.html',
                login: './src/login.html',
                agreement: './src/agreement.html',
                policy: './src/policy.html',
                guarantee: './src/guarantee.html',
                about: './src/about.html',
                generalInfo: './src/contacts.html',
                deliveryPickup: './src/delivery-pickup.html',
                consumption: './src/consumption.html',
                delivery: './src/delivery-russia.html',
                deliveryCity: './src/delivery-city.html',
                payment: './src/payment.html',
                manufacturers: './src/manufacturers.html',
                manufacturersDetail: './src/manufacturers-detail.html',
                news: './src/news.html',
                'news/detail': './src/news-detail.html',
                states: './src/states.html',
                'states/detail': './src/states-detail.html',
                basket: './src/basket.html',
                order: './src/order.html',
                orderComplete: './src/order-complete.html',
                favorite: './src/favorite.html',
                currentOrder: './src/current-order.html',
                myOrders: './src/my-orders.html',
                error404: './src/404.html',
                error500: './src/500.html',
                common: './src/js/common.js',
                'order/map': './src/js/order/map.js',
                'basket/basket': './src/js/basket/basket.js',
                'add-cart': './src/js/add-cart.js',
                'goods-sliders': './src/js/goods-sliders.js',
                main: './src/js/main.js',
                registration: './src/js/registration.js',
                validate: './src/js/validate.js',
                gallery: './src/js/gallery.js',
                'detail/detail': './src/js/detail/detail.js',
                'catalog/tooltip': './src/js/catalog/tooltip.js',
                'catalog/dropdown-sort': './src/js/catalog/dropdown-sort.js',
            },
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "js/[name].js",
            }
        },
        minify: false
    },
    css: {
        devSourcemap: true
    }
}