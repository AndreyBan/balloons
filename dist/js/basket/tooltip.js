(()=>{f();const s={sum:0,sumWithRetail:0,retail:0},l=30;document.addEventListener("DOMContentLoaded",p),document.querySelector(".js-cart-clean").addEventListener("click",()=>{localStorage.cart=JSON.stringify([]),u(),r(),d()});function p(){const e=localStorage.cart?JSON.parse(localStorage.cart):null;if(!e||!e.length)return!1;e.map(n=>n.id);const a=e;a.forEach(n=>{Object.assign(n,{country_manufacture:"Испания",price_discount:"435",count_items:"10 шт."})});const t=b(a);document.querySelector(".basket-table").insertAdjacentHTML("beforeend",t),document.querySelector(".js-markup").innerText=l+"%",u(),r(),d()}function d(){document.querySelectorAll(".basket-table-count__btn").forEach(a=>{a.addEventListener("click",()=>{setTimeout(()=>{const t=a.closest(".js-goods-card"),n=t.querySelector(".basket-table-item__sum"),c=+t.getAttribute("data-count");let o=parseFloat(t.getAttribute("data-price"))*c;const i=s.sumWithRetail<1e3?o*l/100:0;o+=i,n.innerText=o.toFixed(2)+" ₽"})})})}function r(e=null){if(!e){const a=document.querySelectorAll(".basket-table-count__btn"),t=document.querySelectorAll(".js-delete-item");r(a),r(t);return}e.forEach(a=>a.addEventListener("click",u))}function b(e){let a="";return e.forEach((t,n)=>{const c=(parseFloat(t.price_discount)+parseFloat(t.price_discount)*(l/100)).toFixed(2);a+=`<div class="basket-table-item js-goods-card"
                     data-name='${t.name}'
                     data-price="${t.price}"
                     data-number="${t.number}"
                     data-count="${t.count}"
                     data-id="${t.id}">
                    <div class="basket-table-item__numb">${++n}</div>
                    <div class="basket-table-item__img">
                        <img src="./img/basket-picture.png" alt="img">
                    </div>
                    <div class="basket-desktop-text">
                        <div class="basket-table-item__article">${t.number}</div>
                        <div class="basket-table-item__name">
                            <span class="basket-table-item__name--article">Артикул: ${t.number}</span>
                            ${t.name},  ${t.count_items??""}
                            <span class="basket-table-item__country">${t.country_manufacture??""}</span>
                        </div>
                        <div class="basket-table-item__price">
                            <span class="basket-table-item__price--old basket-table-item__price--stroke">${t.price_discount?t.price_discount+"₽":""}</span>
                            <span class="basket-table-item__price--percent">${"+"+l+"%"}</span>
                            <span class="basket-table-item__price--now">${c??""} ₽</span>
                        </div>
                        <div class="basket-table-count">
                            <div class="goods-card-buy__label js-product-label">
                                <span class="basket-table-count__btn basket-minus js-card-btn-dec">-</span>
                                <input type="number" class="basket-table-count__amount js-product-count"
                                       value="${t.count}">
                                <span class="basket-table-count__btn basket-plus js-card-btn-inc">+</span>
                            </div>
                        </div>
                        <div class="basket-table-item__sum">${(c*t.count).toFixed(2)} ₽</div>
                    </div>
                    <img class="basket-table-item__delete js-delete-item" src="./img/svg/close-grey.svg" title="Удалить товар" alt="delete">
                </div>`}),a}function u(){s.sum=0,s.retail=0,s.sumWithRetail=0;const e={count:document.getElementById("basket-amount"),price:document.getElementById("basket-price"),retail:document.getElementById("basket-retail"),total:document.getElementById("basket-sum"),priceTitle:document.querySelector(".js-price-title")};setTimeout(()=>_(e))}function _(e){const a=document.querySelectorAll(".js-goods-card"),t=localStorage.cart?JSON.parse(localStorage.cart):[];e.count.innerText=g(t),a.forEach(i=>s.sum+=+i.getAttribute("data-price")*+i.getAttribute("data-count")),s.retail=s.sum*l/100,s.sumWithRetail=s.sum+s.retail,e.total.innerText=s.sumWithRetail<1e3?s.sumWithRetail.toFixed(2)+" ₽":s.sum.toFixed(2)+" ₽",e.retail.innerText=s.retail.toFixed(2)+" ₽",e.price.innerText=s.sum.toFixed(2)+" ₽",e.priceTitle.innerHTML=s.sumWithRetail<1e3?'Розничная наценка <img id="icon-tooltip" src="/img/svg/info.svg" alt="info">':"Ваша скидка";const n=document.querySelectorAll(".basket-table-item__price--old"),c=document.querySelectorAll(".basket-table-item__price--percent"),m=document.querySelectorAll(".basket-table-item__price--now");let o="none";s.sumWithRetail<1e3&&(k(),o="inline"),n.forEach(i=>i.classList.toggle("basket-table-item__price--stroke",o!=="none")),c.forEach(i=>i.style.display=o),m.forEach(i=>i.style.display=o)}function g(e){let a=0;return e.forEach(t=>a+=+t.count),a}function k(){const e=document.getElementById("icon-tooltip"),a={title:"Ваша сумма покупки составила менее 1000₽, добавьте товаров до 1000₽ , чтобы получить оптовую цену, указанную на сайте, или продолжите  оформление заказа по розничной цене",html:!0,customClass:"price-tooltip",placement:"right",offset:[-40,0]};window.matchMedia("max-width: 767px").matches&&(a.offset=[-100,-152]);const t=new bootstrap.Tooltip(e,a);e.addEventListener("mouseenter",()=>t.show()),e.addEventListener("mouseleave",()=>t.hide())}function f(){const e=document.getElementById("icon-tooltip-free"),a={title:"Бесплатная доставка не распространяется на баллоны. Доставка и обмен гелиевых баллонов согласовывается с менеджером.",html:!0,customClass:"free-delivery-tooltip",placement:"right",offset:[-40,0]},t=new bootstrap.Tooltip(e,a);e.addEventListener("mouseenter",()=>t.show()),e.addEventListener("mouseleave",()=>t.hide())}})();
