function validarFormulario() { 
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contrasena").value.trim();

    // Validar que ambos campos estén llenos
    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
    } else {
        sessionStorage.setItem("sesionActiva", "true"); // Guardar la sesión al autenticarse

        sessionStorage.setItem("usuario", usuario); // Guardar el nombre de usuario
        window.location.href = "index.html";  
    }
}
