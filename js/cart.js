// Función para mostrar el producto almacenado en el localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const cartContainer = document.getElementById("cart-container");

    cartContainer.innerHTML = `<h2>Mi carrito</h2>`;

    if (cart.articles.length === 0) { // Verifica si el carrito contiene productos
        cartContainer.innerHTML = `<p class="empty-cart">El carrito está vacío.</p>`;
        updateCartBadge(); // Actualiza el badge en caso de carrito vacío
        return; // Salimos de la función si el carrito está vacío
    }

    let total = 0;

    cart.articles.forEach((article, index) => {
        const articleSubtotal = article.cost * article.count;
        total += articleSubtotal;

        cartContainer.innerHTML += `
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

    // Mostrar el subtotal
    cartContainer.innerHTML += `
        <div class="total">
            <h4>Importe total: $ ${total}</h4>
        </div>
    `;

    // Agregar eventos a los campos de cantidad y a los botones de eliminar
    cart.articles.forEach((article, index) => {
        const quantityInput = document.getElementById(`quantity-${article.id}`); // Referenciación al campo de cantidad
        quantityInput.addEventListener("input", () => {
            const newQuantity = parseInt(quantityInput.value);
            const newSubtotal = article.cost * newQuantity;
            document.getElementById(`subtotal-${article.id}`).textContent = `Subtotal: ${article.currency} ${newSubtotal}`;

            article.count = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el carrito en localStorage
            
            // Actualizar el subtotal
            let updatedTotal = 0;
            cart.articles.forEach(article => {
                updatedTotal += article.cost * article.count;
            });
            document.querySelector('.total h4').textContent = `Importe total: $ ${updatedTotal}`;
            updateCartBadge(); // Actualizar el badge
        });

        // Agregar evento de eliminar
        const removeButton = document.querySelector(`.remove-button[data-index="${index}"]`);
        removeButton.addEventListener("click", () => {
            cart.articles.splice(index, 1); // Elimina el artículo del carrito
            localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el localStorage
            loadCart(); // Vuelve a cargar el carrito
            updateCartBadge(); // Actualizar el badge
        });
    });

    updateCartBadge(); // Llama a la función para actualizar el badge al cargar el carrito
}

// Llama a `loadCart()` solo si estamos en `cart.html`
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}
