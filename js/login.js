function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
    } else {
        localStorage.setItem("sesionActiva", "true"); // Guardar la sesión al autenticarse

        localStorage.setItem("usuario", usuario); // Guardar el nombre de usuario
        window.location.href = "index.html";  
    }
}