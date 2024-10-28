// Contenedor donde se mostraran los articulos del carrito
const cartContainer = document.getElementById("cart-container");

// Funcion para mostrar el producto almacenado en el localStorage
function loadCart() {
    const product = JSON.parse(localStorage.getItem("producto"));

    if (!product) { // Me fijo si el carrito contiene productos
        cartContainer.innerHTML = `<p class="empty-cart">El carrito está vacío.</p>`;
    } else { 

        cartContainer.innerHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" width="100">
                <h2>${product.name}</h2>
                <p>Precio: ${product.currency} ${product.price}</p>
                <label for="quantity">Cantidad:</label>
                <input type="number" id="quantity" value="${product.quantity}" min="1">
                <p id="subtotal">Subtotal: ${product.currency} ${product.price * product.quantity}</p>
            </div>
        `;

        const quantityInput = document.getElementById("quantity"); // Referenciacion al campo de cantidad

        quantityInput.addEventListener("input", () => {
            const newQuantity = quantityInput.value;
            const newSubtotal = product.price * newQuantity;
            document.getElementById("subtotal").textContent = `Subtotal: ${product.currency} ${newSubtotal}`;

            product.quantity = newQuantity;
            localStorage.setItem("producto", JSON.stringify(product));
        });
    }
}

loadCart(); //Llamamos a la funcion para cargar el carrito al iniciar la pagina