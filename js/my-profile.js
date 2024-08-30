// Verificar si la sesión está activa
if (sessionStorage.getItem("sesionActiva") !== "true") {
    // Redireccionar a login.html si no está autenticado
    window.location.href = "login.html";
}else {
    // Mostrar el nombre de usuario en la esquina superior derecha
    var usuario = sessionStorage.getItem("usuario");
    document.getElementById("nombreUsuario").textContent =  usuario;
}