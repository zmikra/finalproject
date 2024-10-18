window.onload = function() {
    // Cargar el tema guardado 
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Verifica si la sesión está activa
    if (sessionStorage.getItem("sesionActiva") === "true") {
        // Si el usuario está logueado, carga su información
        var usuarioEmail = sessionStorage.getItem("usuario"); // Obtener el email del usuario
        document.getElementById("email").value = usuarioEmail; // Mostrar el email en el campo correspondiente

        // Cargar datos previamente guardados en sessionStorage
        document.getElementById("nombre").value = sessionStorage.getItem("nombre") || "";
        document.getElementById("segundoNombre").value = sessionStorage.getItem("segundoNombre") || "";
        document.getElementById("apellido").value = sessionStorage.getItem("apellido") || "";
        document.getElementById("telefono").value = sessionStorage.getItem("telefono") || "";

        // Cargar la foto de perfil
        const avatar = document.getElementById("avatar");
        const savedAvatar = localStorage.getItem("avatar");
        if (savedAvatar) { // Cargar el avatar desde localStorage si existe
            avatar.src = savedAvatar;
        }else {
            avatar.src = "img/img_perfil.png";  // Cargar la imagen por defecto si no hay avatar guardado
            console.log('Cargando avatar por defecto.');
        }
    }

    // Evento para manejar la carga de la foto de perfil
    document.getElementById("profile-pic").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Mostrar la imagen cargada
                document.getElementById("avatar").src = e.target.result;
                // Guardar la imagen en localStorage
                localStorage.setItem("avatar", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
};

function applyTheme(theme) {
    if (theme === 'night') {
        document.body.classList.add('night-mode');
        const checkbox = document.getElementById('themeDark');
        if (checkbox) checkbox.checked = true;
    } else {
        document.body.classList.remove('night-mode');
        const checkbox = document.getElementById('themeDark');
        if (checkbox) checkbox.checked = false;
    }
}

// Evento de clic que hace el cambio de tema 
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


