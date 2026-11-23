const PRODUCTS = {
  tee:{name:"Футболка Core",price:5990,description:"Чёрный / базовая коллекция"},
  hoodie:{name:"Худи Motion",price:12990,description:"Графит / daily wear"},
  pants:{name:"Брюки Active",price:9490,description:"Чёрный / training"},
  lighttee:{name:"Футболка Light",price:6490,description:"Светлый / basic"},
  shorts:{name:"Шорты Flex",price:7490,description:"Чёрный / training"},
  greenhoodie:{name:"Худи Street",price:13990,description:"Оливковый / streetwear"}
};
const readCart=()=>{try{return JSON.parse(localStorage.getItem("volt-cart")||"{}")}catch{return {}}};
const saveCart=cart=>localStorage.setItem("volt-cart",JSON.stringify(cart));
const money=value=>new Intl.NumberFormat("ru-RU").format(value)+" ₸";
function updateCount(){const cart=readCart();const count=Object.values(cart).reduce((sum,n)=>sum+n,0);document.querySelectorAll(".cart-count").forEach(el=>el.textContent=count)}
document.querySelectorAll("[data-add]").forEach(button=>button.addEventListener("click",()=>{const cart=readCart();const id=button.dataset.add;cart[id]=(cart[id]||0)+1;saveCart(cart);updateCount();const old=button.innerHTML;button.innerHTML="ДОБАВЛЕНО ✓";setTimeout(()=>button.innerHTML=old,900)}));
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(item=>item.classList.remove("active"));button.classList.add("active");document.querySelectorAll(".catalog-grid .product-card").forEach(card=>{card.hidden=button.dataset.filter!=="all"&&card.dataset.category!==button.dataset.filter})}));
const menuButton=document.querySelector(".menu-toggle");if(menuButton){menuButton.addEventListener("click",()=>{const nav=document.querySelector(".main-nav");const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰"})}
function renderCart(){const container=document.querySelector("#cart-items");const totalBox=document.querySelector("#cart-total");if(!container||!totalBox)return;const cart=readCart();const ids=Object.keys(cart).filter(id=>PRODUCTS[id]&&cart[id]>0);if(!ids.length){container.innerHTML='<p class="empty-cart">ТВОЯ КОРЗИНА ПОКА ПУСТА.</p><a class="button button-green" href="catalog.html">ПЕРЕЙТИ В КАТАЛОГ ↗</a>';totalBox.hidden=true;return}let total=0;container.innerHTML=ids.map(id=>{const p=PRODUCTS[id],qty=cart[id],sum=p.price*qty;total+=sum;return `<div class="cart-row"><div><h3>${p.name} × ${qty}</h3><p>${p.description}</p></div><strong>${money(sum)}</strong><button class="remove-item" data-remove="${id}" aria-label="Удалить ${p.name}">УДАЛИТЬ</button></div>`}).join("");totalBox.hidden=false;totalBox.innerHTML=`<span>ИТОГО</span><strong>${money(total)}</strong><a href="mailto:hello@volt.example?subject=Заказ%20VOLT">ОФОРМИТЬ ЗАКАЗ ↗</a>`;container.querySelectorAll("[data-remove]").forEach(button=>button.addEventListener("click",()=>{const cart=readCart();delete cart[button.dataset.remove];saveCart(cart);updateCount();renderCart()}))}
updateCount();renderCart();