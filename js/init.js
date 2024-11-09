const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function(url) {
    let result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
};

document.addEventListener("DOMContentLoaded", function() {

    // Verificar si la sesión está activa
    if (localStorage.getItem("sesionActiva") !== "true") {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html";  // Redireccionar a login.html si no está autenticado
    } else {  
        var usuario = localStorage.getItem("usuario");
        document.querySelector(".dropdown-toggle").textContent = usuario; // Mostrar el nombre de usuario en la esquina superior derecha
    }

    // Botón de "Cerrar sesión"
    const cerrarSesion = document.getElementById("cerrarSesion");

    cerrarSesion.addEventListener("click", function(event) {
        event.preventDefault();  // Evita la acción predeterminada del enlace

        localStorage.removeItem("usuario");  // Elimina el usuario de sessionStorage
        localStorage.setItem("sesionActiva", "false");  // Cambia el estado de la sesión
        localStorage.clear();  // Limpia todo el localStorage
        sessionStorage.clear();// Limpia todo el sessionStorage
        window.location.href = "login.html";  // Redirige a la página de inicio de sesión
    });
});


// Función para actualizar el badge con el total de productos
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const badge = document.getElementById("cart-badge");

    if (!badge) return; // Sale si el badge no existe

    // Calcula el total de productos en el carrito
    const totalProducts = cart.articles.reduce((total, article) => total + article.count, 0);
    badge.textContent = totalProducts > 0 ? totalProducts : ''; // Muestra el número o deja vacío si es 0
}

// Llama a `updateCartBadge` al cargar la página
updateCartBadge();

// Escuchar cambios en `localStorage` para actualizar el badge en todas las pestañas
window.addEventListener("storage", (event) => {
    if (event.key === "cart") {
        updateCartBadge(); // Actualiza el badge cuando el carrito cambia en otra pestaña
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Verifica si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Evento para manejar el cambio de tema en todo el sitio
    const checkbox = document.getElementById('themeDark');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const theme = this.checked ? 'night' : 'day';
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    }

    // Función para aplicar el tema
    function applyTheme(theme) {
        if (theme === 'night') {
            document.body.classList.add('night-mode');
        } else {
            document.body.classList.remove('night-mode');
        }
    }
});
