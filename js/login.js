function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
    } else {
        sessionStorage.setItem("sesionActiva", "true"); // Guardar la sesión al autenticarse

        sessionStorage.setItem("usuario", usuario); // Guardar el nombre de usuario
        window.location.href = "index.html";  
    }
}