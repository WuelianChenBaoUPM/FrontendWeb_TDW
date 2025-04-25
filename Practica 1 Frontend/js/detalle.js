document.addEventListener('DOMContentLoaded', () => {
    // Verificación de autenticación
    const usuario = sessionStorage.getItem('usuario');
    const rol = sessionStorage.getItem('rol');

    if (!usuario || !rol) {
        sessionStorage.setItem('urlIntentada', window.location.href);
        window.location.href = 'login.html';
        return;
    }

    // Obtener parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get('tipo');
    const id = params.get('id');

    // Mapeo de tipos a colecciones (CORRECCIÓN CLAVE)
    const coleccion = {
        'persona': 'personas',
        'entidad': 'entidades',
        'producto': 'productos'
    }[tipo] || tipo;

    // Buscar el item
    const item = datos[coleccion]?.find(item => 
        item.nombre.toLowerCase() === id.toLowerCase()
    );

    if (!item) {
        document.getElementById('contenido-detalle').innerHTML = `
            <div class="error">
                <h3>Elemento no encontrado</h3>
                <p>No se encontró "${id}" en ${coleccion}</p>
            </div>
        `;
        return;
    }

    // Construir HTML del detalle
    let html = `
        <div class="detalle-container">
            <div class="detalle-imagen">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="detalle-info">
                <h2>${item.nombre}</h2>
                <p><strong>Creación:</strong> ${item.nacimiento}</p>
    `;

    if (item.defuncion) {
        html += `<p><strong>Disolución:</strong> ${item.defuncion}</p>`;
    }

    if (item.wiki) {
        html += `<a href="${item.wiki}" target="_blank">Ver en Wikipedia</a>`;
    }

    if (tipo === 'entidad' && item.personasRelacionadas) {
        html += `<h3>Personas relacionadas:</h3><ul>`;
        item.personasRelacionadas.forEach(persona => {
            html += `<li>${persona}</li>`;
        });
        html += `</ul>`;
    }

    html += `</div></div>`;
    document.getElementById('contenido-detalle').innerHTML = html;

    // Cerrar sesión
    document.getElementById('enlace-cerrar-sesion').addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
});