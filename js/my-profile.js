window.onload = function() {
    // cargamos el tema guardado 
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Verifica si la sesión está activa
    if (sessionStorage.getItem("sesionActiva") !== "true") {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html"; // Redirigir a la página de login
    } else {
        // Si el usuario está logueado, carga su información
        var usuarioEmail = sessionStorage.getItem("usuario"); // Obtener el email del usuario
        document.getElementById("email").value = usuarioEmail; // Mostrar el email en el campo correspondiente

        // Cargar datos previamente guardados en sessionStorage
        document.getElementById("nombre").value = sessionStorage.getItem("nombre") || "";
        document.getElementById("segundoNombre").value = sessionStorage.getItem("segundoNombre") || "";
        document.getElementById("apellido").value = sessionStorage.getItem("apellido") || "";
        document.getElementById("telefono").value = sessionStorage.getItem("telefono") || "";
    }
};

function applyTheme(theme) {
    if (theme === 'night') {
        document.body.classList.add('night-mode');
        const checkbox = document.getElementById('themeDark');
        if (checkbox) checkbox.checked = true; /*si el tema es night, añade la clase nightmode y 
        si el checkbox está marcado, retorna true y cambia a darkmode*/
    } else {
        document.body.classList.remove('night-mode');
        const checkbox = document.getElementById('themeDark');
        if (checkbox) checkbox.checked = false; /*remueve la clase nightmode y si el checkbox está marcado
        devuelve false y nos muestra nuevamente el lightmode*/
    }
}

// evento de clic que hace el cambio de tema 
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('themeDark');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const theme = this.checked ? 'night' : 'day';
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    }
});

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

