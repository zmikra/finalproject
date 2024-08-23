document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// Verificar si la sesión está activa
if (sessionStorage.getItem("sesionActiva") !== "true") {
    // Redireccionar a login.html si no está autenticado
    window.location.href = "login.html";
}

function cerrarSesion() {
    // Eliminar la sesión
    sessionStorage.removeItem("sesionActiva");
    // Redirigir al login
    window.location.href = "login.html";
}