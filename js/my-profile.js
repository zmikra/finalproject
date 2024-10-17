window.onload = function() {
    // Verifica si la sesión está activa
    if (sessionStorage.getItem("sesionActiva") !== "true") {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html"; // Redirigir a la página de login
    } else {
        // Si el usuario está logueado, carga su información
        var usuarioEmail = sessionStorage.getItem("usuario"); // Obtener el email del usuario
        document.getElementById("email").value = usuarioEmail; // Mostrar el email en el campo correspondiente

        // Cargar datos previamente guardados en localStorage
        document.getElementById("nombre").value = sessionStorage.getItem("nombre") || "";
        document.getElementById("segundoNombre").value = sessionStorage.getItem("segundoNombre") || "";
        document.getElementById("apellido").value = sessionStorage.getItem("apellido") || "";
        document.getElementById("telefono").value = sessionStorage.getItem("telefono") || "";

     
    }
};

function guardarDatos() {
    
    // Obtener los valores de los campos
    var nombre = document.getElementById("nombre").value.trim();
    var segundoNombre = document.getElementById("segundoNombre").value.trim();
    var apellido = document.getElementById("apellido").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var email = document.getElementById("email").value.trim(); // Este valor ya está cargado

    // Validar que los campos obligatorios no estén vacíos
    if (nombre === "" || apellido === "" || email === "") {
        alert("Por favor, complete todos los campos obligatorios (*).");
        return; // Salir de la función si hay campos vacíos
    }

    // Guardar los datos en el almacenamiento local
    sessionStorage.setItem("nombre", nombre);
    sessionStorage.setItem("segundoNombre", segundoNombre);
    sessionStorage.setItem("apellido", apellido);
    sessionStorage.setItem("telefono", telefono);

    alert("Datos guardados correctamente.");
}