// Carrinho armazenado na memória
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualiza o carrinho visualmente
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
      ${item.name} (${item.qty})
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Adiciona produto ao carrinho
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

// Remove item
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Abre/fecha carrinho
function toggleCart() {
  document.getElementById("cart").classList.toggle("active");
}

// Checkout via WhatsApp
function checkout() {
  let message = "Pedido:%0A";
  cart.forEach(item => {
    message += `${item.qty}x ${item.name}%0A`;
  });

  window.open(`https://wa.me/5500000000000?text=${message}`);
}
