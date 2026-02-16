// Renderiza produtos na tela
const productList = document.getElementById("productList");

products.forEach(product => {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  col.innerHTML = `
    <div class="card product-card">
      <img src="${product.image}" class="card-img-top">
      <div class="card-body text-center">
        <h5>${product.name}</h5>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">
          Adicionar
        </button>
      </div>
    </div>
  `;
  productList.appendChild(col);
});

updateCart();
