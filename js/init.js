const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
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
}

// Verificar si la sesión está activa
if (sessionStorage.getItem("sesionActiva") !== "true") {
  // Redireccionar a login.html si no está autenticado
  window.location.href = "login.html";
}else {
  // Mostrar el nombre de usuario en la esquina superior derecha
  var usuario = sessionStorage.getItem("usuario");
  document.querySelector(".dropdown-toggle").textContent =  usuario;
}

// Entrega 5 Punto 2

document.addEventListener("DOMContentLoaded", function() {
  // Botón de "Cerrar sesión"
  const cerrarSesion = document.getElementById("cerrarSesion");

  cerrarSesion.addEventListener("click", function(event) {
    event.preventDefault(); // Evita la acción predeterminada del enlace

    sessionStorage.removeItem("usuario"); // Elimina el usuario del localStorage
    sessionStorage.setItem("sesionActiva", "false");
    
    window.location.href = "login.html"; // Redirige a la página de inicio de sesión
  });
});
