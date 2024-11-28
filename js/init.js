const CATEGORIES_URL = "http://localhost:3000/emercado-api/cats/cat";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api/products_comments/";
const CART_INFO_URL = "http://localhost:3000/emercado-api/user_cart/";
const CART_BUY_URL = "http://localhost:3000/emercado-api/cart/buy.json";

// Muestra el spinner de carga
const showSpinner = () => document.getElementById("spinner-wrapper").style.display = "block";

// Oculta el spinner de carga
const hideSpinner = () => document.getElementById("spinner-wrapper").style.display = "none";

// Función para obtener datos en formato JSON desde una URL
const getJSONData = (url) => {
    const result = {};
    showSpinner();
    const token = localStorage.getItem("token");
  
    return fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
      })
      .catch((error) => {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
      });
  };
  

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si la sesión está activa
    if (localStorage.getItem("sesionActiva") !== "true") {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html";  // Redirecciona a login.html si no está autenticado
    } else {
        const usuario = localStorage.getItem("usuario");
        document.querySelector(".dropdown-toggle").textContent = usuario; // Muestra el nombre de usuario
    }

    // Evento de "Cerrar sesión"
    const cerrarSesion = document.getElementById("cerrarSesion");
    cerrarSesion.addEventListener("click", (event) => {
        event.preventDefault();  // Evita la acción predeterminada del enlace
        localStorage.clear();  // Elimina el usuario y limpia el localStorage y sessionStorage
        window.location.href = "login.html";  // Redirige a la página de inicio de sesión
    });

    // Verifica y aplica el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Evento para manejar el cambio de tema
    const checkbox = document.getElementById('themeDark');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            const theme = checkbox.checked ? 'night' : 'day';
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    }

    // Función para aplicar el tema
    function applyTheme(theme) {
        document.body.classList.toggle('night-mode', theme === 'night');
    }
});

// Función para actualizar el badge con el total de productos
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
    const badge = document.getElementById("cart-badge");

    if (!badge) return; // Sale si el badge no existe

    // Calcula el total de productos en el carrito
    const totalProducts = cart.articles.reduce((total, article) => total + article.count, 0);
    badge.textContent = totalProducts > 0 ? totalProducts : '';  // Muestra el número o deja vacío si es 0
}

// Llama a `updateCartBadge` al cargar la página
updateCartBadge();

// Escuchar cambios en `localStorage` para actualizar el badge en todas las pestañas
window.addEventListener("storage", (event) => {
    if (event.key === "cart") updateCartBadge();  // Actualiza el badge cuando el carrito cambia en otra pestaña
});
