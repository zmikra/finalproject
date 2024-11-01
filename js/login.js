document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario hasta validar
  
    const usuario = document.getElementById("usuario");
    const contrasena = document.getElementById("contrasena");
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
    if (!emailPattern.test(usuario.value)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    localStorage.setItem("sesionActiva", "true"); // Guardar la sesión al autenticarse
    localStorage.setItem("usuario", usuario.value); // Guardar el nombre de usuario
    window.location.href = "index.html"; 
  });
  