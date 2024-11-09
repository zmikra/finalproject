// Función para cargar el carrito y mostrar productos en la pantalla de Detalle
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const cartItemsContainer = document.querySelector("#detalle .cart-items");
    const subtotalContainer = document.getElementById("subtotal-price");

    // Limpiar contenido previo
    cartItemsContainer.innerHTML = "";

    if (cart.articles.length === 0) { // Verifica si el carrito está vacío
        cartItemsContainer.innerHTML = `<p class="empty-cart">El carrito está vacío.</p>`;
        updateCartBadge(); // Actualiza el badge si el carrito está vacío
        subtotalContainer.textContent = "$ 0";
        return; // Salimos de la función si el carrito está vacío
    }

    let total = 0;

    cart.articles.forEach((article, index) => {
        const articleSubtotal = article.cost * article.count;
        total += articleSubtotal;

        cartItemsContainer.innerHTML += `
            <div class="product">
                <img src="${article.image}" alt="${article.name}" width="100">
                <div class="product-details">
                    <h5>${article.name}</h5>
                    <div style="display: flex; align-items: center;">
                        <label>Cantidad:
                            <input type="number" id="quantity-${article.id}" value="${article.count}" min="1" style="width: 50px; margin-right: 5px;">
                        </label>
                        <button class="remove-button" data-index="${index}">Eliminar</button>              
                    </div>
                    <p id="precio-${article.id}">Precio: $ ${article.cost}</p>
                </div>
                <p id="subtotal-${article.id}">Subtotal: ${article.currency} ${articleSubtotal}</p>
            </div>
        `;
    });

    // Mostrar el subtotal en la pantalla de Detalle
    subtotalContainer.textContent = `$ ${total}`;

    // Agregar eventos a los campos de cantidad y botones de eliminar
    cart.articles.forEach((article, index) => {
        const quantityInput = document.getElementById(`quantity-${article.id}`);
        quantityInput.addEventListener("input", () => updateQuantity(article, quantityInput, cart));

        const removeButton = document.querySelector(`.remove-button[data-index="${index}"]`);
        removeButton.addEventListener("click", () => removeArticle(index, cart));
    });

    updateCartBadge();
}

// Actualiza la cantidad de un artículo y el total
function updateQuantity(article, quantityInput, cart) {
    const newQuantity = parseInt(quantityInput.value);
    const newSubtotal = article.cost * newQuantity;
    document.getElementById(`subtotal-${article.id}`).textContent = `Subtotal: ${article.currency} ${newSubtotal}`;

    article.count = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el carrito en localStorage

    let updatedTotal = 0;
    cart.articles.forEach(item => {
        updatedTotal += item.cost * item.count;
    });
    document.getElementById("subtotal-price").textContent = `$ ${updatedTotal}`;
    updateCartBadge();
}

// Elimina un artículo del carrito
function removeArticle(index, cart) {
    cart.articles.splice(index, 1); // Elimina el artículo
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza localStorage
    loadCart(); // Vuelve a cargar el carrito
    updateCartBadge();
}

// Función para mostrar la siguiente pantalla
function nextSection(idPantalla) {
    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(pantalla => pantalla.classList.remove('visible'));

    const pantallaActual = document.getElementById(idPantalla);
    pantallaActual.classList.add('visible');
}

// Función para mostrar la pantalla anterior
function previousSection(idPantalla) {
    nextSection(idPantalla);
}

// Inicializa el carrito y la primera pantalla
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Cargar el carrito al inicio
    nextSection('detalle'); // Muestra la pantalla de Detalle inicialmente
});
