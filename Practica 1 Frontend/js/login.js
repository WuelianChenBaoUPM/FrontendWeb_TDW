const botonLogin = document.getElementById("boton-login");
const mensajeLogin = document.getElementById("mensaje-login");

botonLogin.addEventListener("click", () => {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    const usuarioEncontrado = datos.usuarios.find(user => 
        user.usuario === usuario && user.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        sessionStorage.setItem("usuario", usuario);
        sessionStorage.setItem("rol", usuarioEncontrado.rol);
        mensajeLogin.textContent = "Inicio de sesión exitoso. Redireccionando...";
        mensajeLogin.style.color = "green";
        
        setTimeout(() => {
            const urlIntentada = sessionStorage.getItem('urlIntentada');
            window.location.href = urlIntentada || 'index.html';
            sessionStorage.removeItem('urlIntentada');
        }, 1500);
    } else {
        mensajeLogin.textContent = "Usuario o contraseña incorrectos.";
        mensajeLogin.style.color = "red";
    }
});