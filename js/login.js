document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el envío del formulario hasta validar

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!usuario || !contrasena) {
      alert("Por favor, completa todos los campos.");
      return;
  }

  if (!emailPattern.test(usuario)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
  }

  try {
      // Realizar la llamada al backend
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usuario, contrasena })
      });

      const data = await response.json();

      if (response.ok) {
          // Guardar el token en localStorage
          localStorage.setItem("token", data.token);
          console.log("token");
          localStorage.setItem("sesionActiva", "true");
          localStorage.setItem("usuario", usuario);

          // Redirigir al usuario a la página principal
          window.location.href = "index.html";
      } else {
          const errorData = await response.json();
          alert(errorData.message || "Usuario o contraseña incorrectos. Intenta de nuevo.");
      }
  } catch (error) {
      console.error("Error al intentar autenticar:", error);
      alert("Hubo un problema al conectarse con el servidor. Por favor, intenta más tarde.");
  }
});
