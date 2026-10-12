function renderCheckout(){
  const cart = getCart().filter(item => PRODUCTS[item.id]);
  if (!cart.length) { window.location.replace('cart.html'); return; }
  const subtotal = cart.reduce((sum, item) => sum + PRODUCTS[item.id].price * item.quantity, 0);
  document.getElementById('checkout-items').innerHTML = cart.map(item => { const p = PRODUCTS[item.id]; return `<article class="checkout-item"><div><p>${p.stage}</p><h3>${p.name}</h3><small>Quantity: ${item.quantity}</small></div><strong>${formatZAR(p.price * item.quantity)}</strong></article>`; }).join('');
  document.getElementById('checkout-subtotal').textContent = formatZAR(subtotal);
  document.getElementById('checkout-total').textContent = formatZAR(subtotal);
  document.getElementById('place-order-total').textContent = formatZAR(subtotal);
  document.querySelectorAll('.delivery-choice input').forEach(input => input.addEventListener('change', () => document.querySelectorAll('.delivery-choice').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked))));
  document.querySelectorAll('.payment-choice input').forEach(input => input.addEventListener('change', () => { document.querySelectorAll('.payment-choice').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked)); document.getElementById('card-panel').classList.toggle('hidden', input.value !== 'card' || !input.checked); document.getElementById('ozow-panel').classList.toggle('hidden', input.value !== 'ozow' || !input.checked); }));
  document.getElementById('checkout-form').addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; const error = document.getElementById('form-error'); if (!form.checkValidity()) { form.reportValidity(); error.textContent = 'Please complete your contact and delivery details.'; return; } error.textContent = 'Payment processing is not connected yet—your checkout design is ready for a live payment provider.'; });
}
document.addEventListener('DOMContentLoaded', renderCheckout);
