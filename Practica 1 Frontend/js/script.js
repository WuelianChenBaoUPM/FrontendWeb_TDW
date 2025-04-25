document.addEventListener('DOMContentLoaded', function() {
    const listaPersonas = document.getElementById("lista-personas");
    const listaEntidades = document.getElementById("lista-entidades");
    const listaProductos = document.getElementById("lista-productos");
    const enlaceCerrarSesion = document.getElementById("enlace-cerrar-sesion");
    const nombreUsuario = document.getElementById("nombre-usuario");

    function crearEnlaceDetalle(item, tipo) {
        const enlace = document.createElement('a');
        const usuario = sessionStorage.getItem('usuario');
        
        enlace.innerHTML = `<i class="fas fa-arrow-right" style="margin-right: 8px; color: #4ca1af;"></i>${item.nombre}`;
        enlace.style.textDecoration = "none";
        enlace.style.color = "inherit";
        enlace.style.display = "block";

        if (usuario) {
            enlace.href = `detalle.html?tipo=${tipo}&id=${encodeURIComponent(item.nombre)}`;
        } else {
            enlace.href = '#';
            enlace.onclick = (e) => {
                e.preventDefault();
                alert('Debes iniciar sesión para ver los detalles');
                sessionStorage.setItem('urlIntentada', `detalle.html?tipo=${tipo}&id=${encodeURIComponent(item.nombre)}`);
                window.location.href = 'login.html';
            };
        }
        return enlace;
    }

    function mostrarElementos(datos, lista, tipo) {
        lista.innerHTML = '';
        datos.forEach(item => {
            const elementoLista = document.createElement("li");
            elementoLista.appendChild(crearEnlaceDetalle(item, tipo));
            lista.appendChild(elementoLista);
        });
    }

    function cerrarSesion(e) {
        e.preventDefault();
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("rol");
        sessionStorage.removeItem("urlIntentada");
        window.location.href = "index.html";
    }

    function mostrarContenidoBasadoEnRol() {
        const rolUsuario = sessionStorage.getItem("rol");
        const usuarioLogeado = sessionStorage.getItem("usuario");
        const enlaceLogin = document.getElementById("enlace-login");
        const enlaceCerrarSesion = document.getElementById("enlace-cerrar-sesion");

        if (usuarioLogeado) {
            if (enlaceLogin) enlaceLogin.style.display = "none";
            if (enlaceCerrarSesion) {
                enlaceCerrarSesion.style.display = "inline-block";
                enlaceCerrarSesion.addEventListener("click", cerrarSesion);
            }
            if (nombreUsuario) {
                nombreUsuario.style.display = "block";
                nombreUsuario.textContent = `Conectado como: ${usuarioLogeado}`;
            }
        } else {
            if (enlaceLogin) enlaceLogin.style.display = "inline-block";
            if (enlaceCerrarSesion) enlaceCerrarSesion.style.display = "none";
            if (nombreUsuario) nombreUsuario.style.display = "none";
        }
    }

    function init() {
        if (listaPersonas && listaEntidades && listaProductos) {
            mostrarElementos(datos.personas, listaPersonas, 'persona');
            mostrarElementos(datos.entidades, listaEntidades, 'entidad');
            mostrarElementos(datos.productos, listaProductos, 'producto');
        }
        mostrarContenidoBasadoEnRol();
    }

    init();
});