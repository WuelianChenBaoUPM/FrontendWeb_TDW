// writer.js - Maneja todas las funciones de writer
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario es writer
    const rol = sessionStorage.getItem('rol');
    if (rol !== 'writer') return;

    // Mostrar botones de creación
    document.getElementById('writer-actions').style.display = 'block';

    // Configurar botones de creación
    document.getElementById('btn-crear-persona').addEventListener('click', () => mostrarFormulario('persona'));
    document.getElementById('btn-crear-entidad').addEventListener('click', () => mostrarFormulario('entidad'));
    document.getElementById('btn-crear-producto').addEventListener('click', () => mostrarFormulario('producto'));

    // Añadir botones de edición/eliminación
    añadirAccionesWriter();

    // Configurar modal
    document.querySelector('.cerrar-modal').addEventListener('click', cerrarModal);
});

function añadirAccionesWriter() {
    // Para personas
    document.querySelectorAll('#lista-personas li').forEach(item => {
        const nombre = item.querySelector('a').textContent.trim();
        item.innerHTML += `
            <div class="acciones-writer">
                <button class="btn-editar" data-tipo="persona" data-id="${nombre}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-eliminar" data-tipo="persona" data-id="${nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    // Para entidades
    document.querySelectorAll('#lista-entidades li').forEach(item => {
        const nombre = item.querySelector('a').textContent.trim();
        item.innerHTML += `
            <div class="acciones-writer">
                <button class="btn-editar" data-tipo="entidad" data-id="${nombre}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-eliminar" data-tipo="entidad" data-id="${nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    // Para productos
    document.querySelectorAll('#lista-productos li').forEach(item => {
        const nombre = item.querySelector('a').textContent.trim();
        item.innerHTML += `
            <div class="acciones-writer">
                <button class="btn-editar" data-tipo="producto" data-id="${nombre}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-eliminar" data-tipo="producto" data-id="${nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    // Event listeners para los botones
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tipo = e.target.closest('button').dataset.tipo;
            const id = e.target.closest('button').dataset.id;
            mostrarFormulario(tipo, id);
        });
    });

    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tipo = e.target.closest('button').dataset.tipo;
            const id = e.target.closest('button').dataset.id;
            if (confirm(`¿Estás seguro de eliminar este ${tipo}?`)) {
                eliminarElemento(tipo, id);
            }
        });
    });
}

function mostrarFormulario(tipo, id = null) {
    const modal = document.getElementById('modal-crear');
    const titulo = document.getElementById('titulo-modal');
    const formulario = document.getElementById('formulario-modal');

    // Configurar título
    titulo.textContent = id ? `Editar ${tipo}` : `Nueva ${tipo}`;

    // Obtener elemento si es edición
    let elemento = null;
    if (id) {
        elemento = datos[tipo + 's'].find(item => item.nombre === id);
    }

    // Generar formulario
    formulario.innerHTML = generarFormHTML(tipo, elemento);

    // Configurar envío del formulario
    document.getElementById('form-modal').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarElemento(tipo, id);
    });

    // Mostrar modal
    modal.style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-crear').style.display = 'none';
}

function generarFormHTML(tipo, elemento = null) {
    return `
        <form id="form-modal" class="form-modal">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" value="${elemento?.nombre || ''}" required>
            </div>
            
            <div class="form-group">
                <label for="nacimiento">Año de ${tipo === 'producto' ? 'creación' : 'nacimiento'}:</label>
                <input type="number" id="nacimiento" value="${elemento?.nacimiento || ''}" required>
            </div>
            
            ${tipo !== 'producto' ? `
            <div class="form-group">
                <label for="defuncion">Año de ${tipo === 'entidad' ? 'disolución' : 'defunción'}:</label>
                <input type="number" id="defuncion" value="${elemento?.defuncion || ''}">
            </div>
            ` : ''}
            
            <div class="form-group">
                <label for="imagen">URL de la imagen:</label>
                <input type="url" id="imagen" value="${elemento?.imagen || ''}" placeholder="ej: ./images/nombre.jpg">
            </div>
            
            <div class="form-group">
                <label for="wiki">URL de Wikipedia:</label>
                <input type="url" id="wiki" value="${elemento?.wiki || ''}" placeholder="ej: https://es.wikipedia.org/wiki/Nombre">
            </div>
            
            ${tipo === 'entidad' ? `
            <div class="form-group">
                <label for="personas-relacionadas">Personas relacionadas (separar por comas):</label>
                <textarea id="personas-relacionadas">${elemento?.personasRelacionadas?.join(', ') || ''}</textarea>
            </div>
            ` : ''}
            
            <div class="form-actions">
                <button type="submit" class="btn-guardar">
                    <i class="fas fa-save"></i> ${elemento ? 'Actualizar' : 'Guardar'}
                </button>
                <button type="button" class="btn-cancelar" onclick="cerrarModal()">Cancelar</button>
            </div>
        </form>
    `;
}

function guardarElemento(tipo, idOriginal) {
    const coleccion = tipo + 's';
    const nuevoElemento = {
        nombre: document.getElementById('nombre').value,
        nacimiento: parseInt(document.getElementById('nacimiento').value),
        imagen: document.getElementById('imagen').value || `./images/default-${tipo}.jpg`,
        wiki: document.getElementById('wiki').value || ''
    };

    // Campos opcionales
    if (tipo !== 'producto') {
        const defuncion = document.getElementById('defuncion').value;
        if (defuncion) nuevoElemento.defuncion = parseInt(defuncion);
    }

    // Personas relacionadas para entidades
    if (tipo === 'entidad') {
        const personas = document.getElementById('personas-relacionadas').value;
        if (personas) {
            nuevoElemento.personasRelacionadas = personas.split(',').map(p => p.trim());
        }
    }

    // Actualizar o crear
    if (idOriginal) {
        // Edición
        const index = datos[coleccion].findIndex(item => item.nombre === idOriginal);
        if (index !== -1) {
            datos[coleccion][index] = nuevoElemento;
        }
    } else {
        // Creación
        datos[coleccion].push(nuevoElemento);
    }

    // Cerrar modal y recargar
    cerrarModal();
    window.location.reload();
}

function eliminarElemento(tipo, id) {
    const coleccion = tipo + 's';
    datos[coleccion] = datos[coleccion].filter(item => item.nombre !== id);
    window.location.reload();
}