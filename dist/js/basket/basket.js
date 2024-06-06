(()=>{const a={sum:0,sumWithRetail:0,retail:0},r=30;document.addEventListener("DOMContentLoaded",p),document.querySelector(".js-cart-clean").addEventListener("click",()=>{localStorage.cart=JSON.stringify([]),u(),l(),d()});function p(){const e=localStorage.cart?JSON.parse(localStorage.cart):null;if(!e||!e.length){m();return}e.map(n=>n.id);const s=e;s.forEach(n=>{Object.assign(n,{country_manufacture:"Испания",price_discount:"435",count_items:"10 шт."})});const t=_(s);document.querySelector(".basket-table").insertAdjacentHTML("beforeend",t),document.querySelector(".js-markup").innerText=r+"%",u(),l(),d()}function d(){document.querySelectorAll(".basket-table-count__btn").forEach(s=>{s.addEventListener("click",()=>{setTimeout(()=>{const t=s.closest(".js-goods-card"),n=t.querySelector(".basket-table-item__sum"),o=+t.getAttribute("data-count");let i=parseFloat(t.getAttribute("data-price"))*o;const c=a.sumWithRetail<1e3?i*r/100:0;i+=c,n.innerText=i.toFixed(2)+" ₽"})})})}function l(e=null){if(!e){const s=document.querySelectorAll(".basket-table-count__btn"),t=document.querySelectorAll(".js-delete-item");l(s),l(t);return}e.forEach(s=>s.addEventListener("click",u))}function _(e){let s="";return e.forEach((t,n)=>{const o=(parseFloat(t.price_discount)+parseFloat(t.price_discount)*(r/100)).toFixed(2);s+=`<div class="basket-table-item js-goods-card"
                     data-name='${t.name}'
                     data-price="${t.price}"
                     data-number="${t.number}"
                     data-count="${t.count}"
                     data-id="${t.id}">
                    <div class="basket-table-item__numb">${++n}</div>
                    <div class="basket-table-item__img">
                        <img src="./img/basket-picture.png" alt="img">
                    </div>
                    <div class="basket-table-item__article">${t.number}</div>
                    <div class="basket-table-item__name">
                        <span class="basket-table-item__name--article">Артикул: ${t.number}</span>
                        ${t.name},  ${t.count_items??""}
                        <span class="basket-table-item__country">${t.country_manufacture??""}</span>
                    </div>
                    <div class="basket-table-item__price">
                        <span class="basket-table-item__price--old basket-table-item__price--stroke">${t.price_discount?t.price_discount+"₽":""}</span>
                        <span class="basket-table-item__price--percent">${"+"+r+"%"}</span>
                        <span class="basket-table-item__price--now">${o??""} ₽</span>
                    </div>
                    <div class="basket-table-count">
                        <div class="goods-card-buy__label js-product-label">
                            <span class="basket-table-count__btn basket-minus js-card-btn-dec">-</span>
                            <input type="number" class="basket-table-count__amount js-product-count"
                                   value="${t.count}">
                            <span class="basket-table-count__btn basket-plus js-card-btn-inc">+</span>
                        </div>
                    </div>
                        <div class="basket-table-item__sum">${(o*t.count).toFixed(2)} ₽</div>
                    <img class="basket-table-item__delete js-delete-item" src="./img/svg/close-grey.svg" title="Удалить товар" alt="delete">
                </div>`}),s}function u(){a.sum=0,a.retail=0,a.sumWithRetail=0;const e={count:document.getElementById("basket-amount"),price:document.getElementById("basket-price"),retail:document.getElementById("basket-retail"),total:document.getElementById("basket-sum"),priceTitle:document.querySelector(".js-price-title")};setTimeout(()=>k(e))}function m(){document.querySelector(".basket-table").insertAdjacentHTML("beforeend",'<div class="basket-empty">В корзине ничего нет</div')}function k(e){const s=document.querySelectorAll(".js-goods-card"),t=localStorage.cart?JSON.parse(localStorage.cart):[];if(e.count.innerText=g(t),!t.length){e.total.innerText="0 ₽",e.retail.innerText="0 ₽",e.price.innerText="0 ₽",document.querySelectorAll(".js-goods-card").forEach(c=>c.remove()),m();return}s.forEach(c=>a.sum+=+c.getAttribute("data-price")*+c.getAttribute("data-count")),a.retail=a.sum*r/100,a.sumWithRetail=a.sum+a.retail,e.total.innerText=a.sumWithRetail<1e3?a.sumWithRetail.toFixed(2)+" ₽":a.sum.toFixed(2)+" ₽",e.retail.innerText=a.retail.toFixed(2)+" ₽",e.price.innerText=a.sum.toFixed(2)+" ₽",e.priceTitle.innerHTML=a.sumWithRetail<1e3?`Розничная наценка <img class="js-tooltip" src="/img/svg/info.svg" alt="info"
            data-bs-custom-class="price-tooltip"
            data-bs-title="Ваша сумма покупки составила менее 1000₽, добавьте товаров до 1000₽ , чтобы получить оптовую цену, указанную на сайте, или продолжите  оформление заказа по розничной цене">`:"Ваша скидка";const n=document.querySelectorAll(".basket-table-item__price--old"),o=document.querySelectorAll(".basket-table-item__price--percent"),b=document.querySelectorAll(".basket-table-item__price--now");let i="none";a.sumWithRetail<1e3&&(tooltipInit(),i="inline"),n.forEach(c=>c.classList.toggle("basket-table-item__price--stroke",i!=="none")),o.forEach(c=>c.style.display=i),b.forEach(c=>c.style.display=i)}function g(e){let s=0;return e.forEach(t=>s+=+t.count),s}})();
