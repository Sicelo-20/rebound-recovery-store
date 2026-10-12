const CART_KEY = 'rebound-recovery-cart';
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = cart => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateBag(); };
const cartCount = () => getCart().reduce((sum, item) => sum + item.quantity, 0);
function updateBag(){ document.querySelectorAll('#bag-count').forEach(node => node.textContent = cartCount()); }
function addToCart(id, quantity = 1){ const cart = getCart(); const item = cart.find(entry => entry.id === id); if(item) item.quantity += quantity; else cart.push({id, quantity}); saveCart(cart); }
function formatZAR(value){ return new Intl.NumberFormat('en-ZA', {style:'currency',currency:'ZAR',maximumFractionDigits:0}).format(value); }
document.addEventListener('DOMContentLoaded', () => { updateBag(); document.querySelectorAll('#year').forEach(node => node.textContent = new Date().getFullYear()); });
