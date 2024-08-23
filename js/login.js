function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
    } else {
        window.location.href = "index.html";
    }
}