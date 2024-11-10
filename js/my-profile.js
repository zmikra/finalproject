window.onload = function() {
    // Verifica si la sesión está activa
    if (localStorage.getItem("sesionActiva") === "true") {
        // Si el usuario está logueado, carga su información
        var usuarioEmail = localStorage.getItem("usuario"); // Obtener el email del usuario
        document.getElementById("email").value = usuarioEmail; // Mostrar el email en el campo correspondiente

        // Cargar datos previamente guardados en localStorage
        document.getElementById("nombre").value = localStorage.getItem("nombre") || "";
        document.getElementById("segundoNombre").value = localStorage.getItem("segundoNombre") || "";
        document.getElementById("apellido").value = localStorage.getItem("apellido") || "";
        document.getElementById("telefono").value = localStorage.getItem("telefono") || "";

        // Cargar la foto de perfil
        const avatar = document.getElementById("avatar");
        const savedAvatar = localStorage.getItem("avatar");
        if (savedAvatar) { // Cargar el avatar desde localStorage si existe
            avatar.src = savedAvatar;
        } else {
            avatar.src = "img/img_perfil.png";  // Cargar la imagen por defecto si no hay avatar guardado
            console.log('Cargando avatar por defecto.');
        }
    } else {
        alert("Debes iniciar sesión para acceder a tu perfil.");
        window.location.href = "login.html";  // Redirige a login.html si no está autenticado
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

function guardarDatos() {
    // Obtener los valores de los campos
    var nombre = document.getElementById("nombre").value.trim();
    var segundoNombre = document.getElementById("segundoNombre").value.trim();
    var apellido = document.getElementById("apellido").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var email = document.getElementById("email").value.trim(); // Este valor ya está cargado
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Validar que los campos obligatorios no estén vacíos
    if (nombre === "" || apellido === "" || email === "") {
        alert("Por favor, complete todos los campos obligatorios (*).");
        return; // Salir de la función si hay campos vacíos
    } else if (!emailPattern.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Guardar los datos en el almacenamiento local
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("segundoNombre", segundoNombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("email", email); // Guarda el email también

    alert("Datos guardados correctamente.");
}



