function validarFormulario() { 
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contrasena").value.trim();

    // Validar que ambos campos estén llenos
    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
    } else {
        sessionStorage.setItem("sesionActiva", "true"); 
        sessionStorage.setItem("usuario", usuario); 
        window.location.href = "index.html";  
    }
}
