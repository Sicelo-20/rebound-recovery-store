function renderCart(){
  const content = document.getElementById('cart-content');
  const cart = getCart().filter(item => PRODUCTS[item.id]);
  if (!cart.length) {
    content.innerHTML = '<div class="empty-cart"><h2>Your bag is ready when you are.</h2><p>Start with one recovery tool, or choose the complete 3-stage bundle.</p><a class="button button-primary" href="index.html#shop">Shop recovery <span>→</span></a></div>';
    return;
  }
  const total = cart.reduce((sum, item) => sum + PRODUCTS[item.id].price * item.quantity, 0);
  content.innerHTML = `<div class="cart-layout"><div class="cart-items">${cart.map(item => { const p = PRODUCTS[item.id]; return `<article class="cart-item"><div><p class="cart-item-stage">${p.stage}</p><h2>${p.name}</h2><p class="cart-item-price">${formatZAR(p.price)} each</p><div class="cart-item-actions"><div class="cart-qty"><button data-change="-1" data-id="${p.id}" aria-label="Decrease ${p.name}">−</button><span>${item.quantity}</span><button data-change="1" data-id="${p.id}" aria-label="Increase ${p.name}">+</button></div><button class="remove" data-remove="${p.id}">Remove</button></div></div><strong class="cart-line-total">${formatZAR(p.price * item.quantity)}</strong></article>`; }).join('')}</div><aside class="cart-summary"><h2>Order summary</h2><div class="summary-line"><span>Subtotal</span><strong>${formatZAR(total)}</strong></div><div class="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div><div class="summary-line summary-total"><span>Total</span><strong>${formatZAR(total)}</strong></div><a href="checkout.html" class="checkout">CONTINUE TO CHECKOUT <span>→</span></a><p class="cart-note">Checkout layout is ready. Connect payment and fulfilment before accepting live orders.</p></aside></div>`;
  content.querySelectorAll('[data-change]').forEach(button => button.addEventListener('click', () => { const items = getCart(); const item = items.find(entry => entry.id === button.dataset.id); item.quantity += Number(button.dataset.change); saveCart(items.filter(entry => entry.quantity > 0)); renderCart(); }));
  content.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { saveCart(getCart().filter(item => item.id !== button.dataset.remove)); renderCart(); }));
}
document.addEventListener('DOMContentLoaded', renderCart);
