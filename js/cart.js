let cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };

// Función para cargar el carrito y mostrar productos en la pantalla de Detalle
function loadCart() {

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

// Función para mostrar la siguiente pantalla con validación
function nextSectionWithValidation(idPantalla) {
    let valid = true;

    // Realizar validaciones según la pantalla
    switch (idPantalla) {
        case 'envio':
            valid = validarCantidadProductos();
            break;
        case 'pago':
            valid = validarDireccion() && validarEnvio();
            break;
        case 'confirmacion':
            valid = validarPago();
            break;
    }

    if (!valid) {
        return; // Si no es válido, no pasa a la siguiente pantalla
    }

    // Si la validación pasa, entonces cambiamos de pantalla
    nextSection(idPantalla);
}

// Función para cambiar a la siguiente pantalla
function nextSection(idPantalla) {
    // Verificar que idPantalla no sea null
    if (!idPantalla) {
        return;
    }

    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(pantalla => {
        // Solo se oculta la pantalla si su id es diferente del que se está mostrando
        if (pantalla.id !== idPantalla) {
            pantalla.classList.remove('visible');
        }
    });

    const pantallaActual = document.getElementById(idPantalla);
    
    // Si pantallaActual es null (no se encuentra el idPantalla), no hacemos nada
    if (!pantallaActual) {
        console.error(`Error: no se encuentra el elemento con el id "${idPantalla}"`);
        return;
    }

    pantallaActual.classList.add('visible');

    // Cambiar el color del título de la barra superior a negro
    const steps = document.querySelectorAll('.progress-bar .step');
    steps.forEach(step => {
        step.style.color = ''; // Restablecer el color anterior
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

// Función para mostrar la cantidad total de productos en el badge del carrito
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const totalItems = cart.articles.reduce((acc, item) => acc + item.count, 0); // Sumar la cantidad de cada artículo
    const cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = totalItems;
}


// Inicializa el carrito y la primera pantalla
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Cargar el carrito al inicio
    nextSection('detalle'); // Muestra la pantalla de Detalle inicialmente
});

// PUNTO 4 - ENTREGA 7

// Funcion para validad la cantidad de productos
function validarCantidadProductos() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };

    if (cart.articles.length === 0) {
        alert("El carrito está vacío. Agrega productos para continuar.");
        return false;
    }

    // Verificamos que todos los productos tengan una cantidad mayor que 0
    for (let article of cart.articles) {
        if (article.count <= 0) {
            alert(`La cantidad para el producto "${article.name}" debe ser mayor a 0.`);
            return false;
        }
    }
    return true;
}

// Funcion para validar los campos de direccion
function validarDireccion() {
    var departamento = document.getElementById("departamento").value.trim();
    var localidad = document.getElementById("localidad").value.trim();
    var calle = document.getElementById("calle").value.trim();
    var numero = document.getElementById("numero").value.trim();
    var esquina = document.getElementById("esquina").value.trim();

    if (departamento === "" || localidad === "" || calle === "" || numero === "" || esquina === "") {
        alert("Por favor, complete todos los campos.");
        return false; 
    }
    return true;
}

// Funcion para validar el metodo de envio
function validarEnvio() {
    const envioSeleccionado = document.querySelector('input[name="metodo-envio"]:checked');
    if (!envioSeleccionado) {
        alert("Por favor, seleccione una forma de envío.");
        return false;
    }
    return true;
}

// Funcion para validar metodo de pago
function validarPago() {
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked');
    if (!metodoPago) {
        alert("Por favor, seleccione una forma de pago.");
        return false;
    }
    return true;
}



// Asociar cada botón "Siguiente" con la función de validación
document.querySelectorAll('.boton-siguiente').forEach(boton => {
    boton.addEventListener('click', () => {
        const siguientePantalla = boton.getAttribute('data-next'); 
        nextSectionWithValidation(siguientePantalla);
    });
});

// Elimina el carrito al comprar artículos
function clearCart() {
    cart.articles = [];
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza localStorage
    loadCart(); // Vuelve a cargar el carrito
    updateCosts(); // Actualiza los costos nuevamente
    updateCartBadge();
}

// Función para mandar el carrito al backend
async function saveCartToBackend() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };

    if (cart.articles.length === 0) {
        alert("El carrito está vacío. Agrega productos para continuar.");
        return;
    }

    const cartData = {
        user: "usuario@ejemplo.com",  // cambia al usuario autenticado
        cartItems: cart.articles
    };

    const token = localStorage.getItem("token");

    if (!token) {
        alert("No has iniciado sesión. Debes iniciar sesión para continuar.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cartData)
        });

        if (!response.ok) {
            throw new Error("Error al guardar el carrito.");
        }

        const result = await response.json();
        console.log(result);
        alert("Carrito guardado correctamente.");
        clearCart(); // limpia el carrito local después de la compra
        loadCart();
        updateCartBadge();
    } catch (error) {
        console.error("Error:", error);
    }
}

function finalizarCompra() {
    if (validarDireccion() && validarEnvio() && validarCantidadProductos() && validarPago()) {
        // Bajar opacidad y mostrar cursor de espera en la pantalla actual
        document.body.style.opacity = 0.4;
        document.body.style.cursor = 'wait';

        // Esperar 2 segundos antes de cambiar de sección
        setTimeout(() => {
            // Restaurar opacidad y cursor antes de cambiar de sección
            document.body.style.opacity = 1;
            document.body.style.cursor = 'default';

            // Cambiar a la sección de confirmación y limpiar el carrito
            nextSection('confirmacion');
            saveCartToBackend(); // Llamo a saveCartToBackend para guardar el carrito al backend
            clearCart();
        }, 2000);
    }
}





