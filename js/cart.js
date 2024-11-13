// Función para cargar el carrito y mostrar productos en la pantalla de Detalle
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const cartItemsContainer = document.querySelector("#detalle .cart-items");
    const subtotalContainer = document.getElementById("subtotal-price");

    // Limpiar contenido previo
    cartItemsContainer.innerHTML = "";

    if (cart.articles.length === 0) { // Verifica si el carrito está vacío
        cartItemsContainer.innerHTML = "<p class='empty-cart'>El carrito está vacío.</p>";
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
    updateCosts(); //llamo a la función updateCosts() para que actualice los costos nuevamente
    updateCartBadge();
}

// Elimina un artículo del carrito
function removeArticle(index, cart) {
    cart.articles.splice(index, 1); // Elimina el artículo
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza localStorage
    loadCart(); // Vuelve a cargar el carrito
    updateCosts(); //llamo a la función updateCosts() para que actualice los costos nuevamente
    updateCartBadge();
}

// Función para mostrar la siguiente pantalla
function nextSection(idPantalla) {
    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(pantalla => pantalla.classList.remove('visible'));

    const pantallaActual = document.getElementById(idPantalla);
    pantallaActual.classList.add('visible');

    // Cambiar el color del título de la barra superior a negro
    const steps = document.querySelectorAll('.progress-bar .step');
    steps.forEach(step => {
        step.style.color = ''; // Restablecer el color anterior, si hay
    });

    // Cambiar el color del paso actual
    const pasoActual = pantallaActual.getAttribute('id');
    const pasoIndex = ['detalle', 'envio', 'pago', 'confirmacion'].indexOf(pasoActual);
    const step = steps[pasoIndex];

    // Cambiar el color del paso actual a negro
    step.style.color = 'black';  // Cambia el color a negro
}

// Función para mostrar la pantalla anterior
function previousSection(idPantalla) {
    nextSection(idPantalla);
}
//Punto 3 Costos entrega 7
// Creo la función updateCosts() que actualiza los costos (subtotal, costo de envío y total final)
function updateCosts() { 
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };

    // cálculo del subtotal total
    let total = 0;
    for (let i = 0; i < cart.articles.length; i++) { 
        total += cart.articles[i].cost * cart.articles[i].count;
    }

    // cálculo del costo de envío teniendo en cuenta el % del checkbox
    const envioSeleccionado = document.querySelector('input[name="metodo-envio"]:checked');
    let costoEnvio = 0;
    if (envioSeleccionado) {
        switch (envioSeleccionado.value) {
            case "envioPremium":
                costoEnvio = total * 0.15; // 15% envío premium
                break;
            case "envioExpress":
                costoEnvio = total * 0.07; // 7% envío express
                break;
            case "envioStandars":
                costoEnvio = total * 0.05; // 5% envío estanddar
                break;
        }
    }

    // suma del total + el subtotal
    const totalCompra = total + costoEnvio;

    // actualizo los valores
    document.getElementById("cost-subtotal").textContent = total.toFixed(2); 
    document.getElementById("cost-envio").textContent = costoEnvio.toFixed(2); 
    document.getElementById("cost-total").textContent = totalCompra.toFixed(2); 
}

// Función para mostrar el badge del carrito
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = cart.articles.length;
}

// Inicializa el carrito y la primera pantalla
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Cargar el carrito al inicio
    nextSection('detalle'); // Muestra la pantalla de Detalle inicialmente
});

