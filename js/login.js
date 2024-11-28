document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío del formulario hasta validar
  
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  // Validación del formato del correo
  if (!emailPattern.test(usuario)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  // Enviar las credenciales al backend para autenticar al usuario
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, contrasena }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Almacenar el token JWT en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("sesionActiva", "true");
      localStorage.setItem("usuario", usuario);
      window.location.href = "index.html";  // Redirige al inicio
    } else {
      alert("Credenciales incorrectas.");
    }
  })
  .catch(error => {
    console.error("Error al autenticar:", error);
    alert("Error de conexión, intenta más tarde.");
  });
});
