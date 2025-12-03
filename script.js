// ============================================
// CONSTANTES Y VARIABLES GLOBALES
// ============================================

const USUARIO_CORRECTO = 'vvero';
const CONTRASEÑA_CORRECTA = 'HHLOCK86';
let carrito = [];
let productosGlobal = [];
let productoActual = null;
let fotosAdicionalesActuales = [];

// ============================================
// ALMACENAMIENTO LOCAL
// ============================================

function cargarDelLocal() {
    const productosGuardados = localStorage.getItem('productos');
    
    if (productosGuardados) {
        productosGlobal = JSON.parse(productosGuardados);
    } else {
        // Productos de ejemplo
        productosGlobal = [
            {
                id: 1,
                nombre: 'Camiseta Casual Azul',
                categoria: 'Camisetas',
                descripcion: 'Camiseta de algodón 100% cómoda y transpirable. Perfecta para el día a día.',
                precio: 29.99,
                imagen: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%234a90e2" width="200" height="250"/%3E%3Ctext x="50%" y="125" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle"%3ECamiseta Azul%3C/text%3E%3C/svg%3E',
                stock: 15,
                fecha: new Date().toISOString(),
                fotos: []
            },
            {
                id: 2,
                nombre: 'Pantalón Negro Elegante',
                categoria: 'Pantalones',
                descripcion: 'Pantalón clásico negro, ideal para ocasiones formales e informales.',
                precio: 59.99,
                imagen: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23333333" width="200" height="250"/%3E%3Ctext x="50%" y="125" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle"%3EPantalón Negro%3C/text%3E%3C/svg%3E',
                stock: 8,
                fecha: new Date().toISOString(),
                fotos: []
            },
            {
                id: 3,
                nombre: 'Vestido Rosa Floral',
                categoria: 'Vestidos',
                descripcion: 'Vestido ligero con estampado floral. Perfecto para primavera y verano.',
                precio: 79.99,
                imagen: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250"%3E%3Crect fill="%23ff69b4" width="200" height="250"/%3E%3Ctext x="50%" y="125" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle"%3EVestido Rosa%3C/text%3E%3C/svg%3E',
                stock: 12,
                fecha: new Date().toISOString(),
                fotos: []
            }
        ];
        guardarEnLocal();
    }
}

function guardarEnLocal() {
    localStorage.setItem('productos', JSON.stringify(productosGlobal));
}

// ============================================
// FUNCIONES DE AUTENTICACIÓN (ADMIN)
// ============================================

function validarLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-message');
    
    if (usuario === USUARIO_CORRECTO && password === CONTRASEÑA_CORRECTA) {
        localStorage.setItem('adminAutenticado', 'true');
        mostrarPanelAdmin();
        cargarProductosAdmin();
    } else {
        errorMsg.textContent = 'Usuario o contraseña incorrectos';
        errorMsg.classList.add('show');
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
}

function verificarAutenticacion() {
    const estaAutenticado = localStorage.getItem('adminAutenticado') === 'true';
    const loginContainer = document.getElementById('login-container');
    const adminPanel = document.getElementById('admin-panel');
    
    if (estaAutenticado && loginContainer && adminPanel) {
        loginContainer.style.display = 'none';
        adminPanel.style.display = 'block';
        cargarProductosAdmin();
    }
}

function logout() {
    localStorage.removeItem('adminAutenticado');
    location.reload();
}

function mostrarPanelAdmin() {
    const loginContainer = document.getElementById('login-container');
    const adminPanel = document.getElementById('admin-panel');
    
    if (loginContainer) loginContainer.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'block';
}

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================

function obtenerNuevoId() {
    if (productosGlobal.length === 0) return 1;
    return Math.max(...productosGlobal.map(p => p.id)) + 1;
}

function agregarProducto(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('prod-nombre').value;
    const categoria = document.getElementById('prod-categoria').value;
    const descripcion = document.getElementById('prod-descripcion').value;
    const precio = parseFloat(document.getElementById('prod-precio').value);
    const stock = parseInt(document.getElementById('prod-stock').value);
    const fileInput = document.getElementById('prod-foto');
    const mensaje = document.getElementById('form-message');
    
    if (!fileInput.files[0]) {
        mensaje.textContent = 'Por favor selecciona una foto';
        mensaje.classList.add('error');
        mensaje.classList.remove('success');
        mensaje.style.display = 'block';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const nuevoProducto = {
            id: obtenerNuevoId(),
            nombre,
            categoria,
            descripcion,
            precio,
            stock,
            imagen: e.target.result,
            fecha: new Date().toISOString(),
            fotos: fotosAdicionalesActuales
        };
        
        productosGlobal.push(nuevoProducto);
        guardarEnLocal();
        
        mensaje.textContent = '✓ Producto agregado exitosamente y guardado en la página. Los clientes lo podrán ver en el catálogo.';
        mensaje.classList.add('success');
        mensaje.classList.remove('error');
        mensaje.style.display = 'block';
        
        document.getElementById('form-producto').reset();
        document.getElementById('preview').style.display = 'none';
        document.getElementById('preview-img').classList.remove('active');
        document.getElementById('preview-fotos-adicionales').innerHTML = '';
        fotosAdicionalesActuales = [];
        
        setTimeout(() => {
            mensaje.style.display = 'none';
            cargarProductosAdmin();
        }, 2000);
    };
    
    reader.readAsDataURL(fileInput.files[0]);
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto? Se eliminará del catálogo que ven los clientes.')) {
        productosGlobal = productosGlobal.filter(p => p.id !== id);
        guardarEnLocal();
        cargarProductosAdmin();
        
        const mensaje = document.getElementById('form-message');
        if (mensaje) {
            mensaje.textContent = '✓ Producto eliminado del catálogo.';
            mensaje.classList.add('success');
            mensaje.classList.remove('error');
            mensaje.style.display = 'block';
            
            setTimeout(() => {
                mensaje.style.display = 'none';
            }, 3000);
        }
    }
}

function cargarProductosAdmin() {
    const container = document.getElementById('admin-productos-container');
    if (!container) return;
    
    if (productosGlobal.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No hay productos agregados aún.</p>';
        return;
    }
    
    container.innerHTML = productosGlobal.map(producto => `
        <div class="admin-producto-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="admin-producto-img">
            <div class="admin-producto-info">
                <h3 class="admin-producto-nombre">${producto.nombre}</h3>
                <p style="color: #666; font-size: 0.9rem;">${producto.categoria}</p>
                <p class="admin-producto-precio">Q${producto.precio.toFixed(2)}</p>
                <p class="admin-producto-stock">Stock: ${producto.stock} unidades</p>
                <p style="color: #999; font-size: 0.8rem; margin-bottom: 1rem;">${producto.descripcion.substring(0, 50)}...</p>
                <div class="admin-producto-acciones">
                    <button class="btn-editar" onclick="editarProducto(${producto.id})">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editarProducto(id) {
    alert('La función de editar será implementada en la siguiente versión.');
}

// ============================================
// FUNCIONES DE CATÁLOGO
// ============================================

function renderizarProductos(productos = productosGlobal) {
    const container = document.getElementById('productos-container');
    const sinProductos = document.getElementById('sin-productos');
    
    if (!container) return;
    
    if (productos.length === 0) {
        container.innerHTML = '';
        sinProductos.style.display = 'block';
        return;
    }
    
    sinProductos.style.display = 'none';
    container.innerHTML = productos.map(producto => `
        <div class="producto-card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <p class="producto-categoria">${producto.categoria}</p>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion.substring(0, 80)}...</p>
                <p class="producto-precio">Q${producto.precio.toFixed(2)}</p>
                <p class="producto-stock">${producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}</p>
                <div class="producto-acciones">
                    <button class="btn-ver-detalles" onclick="abrirModalProducto(${producto.id})" style="flex: 1;">Ver Detalles</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filtrarProductos() {
    const busqueda = document.getElementById('buscador').value.toLowerCase();
    const categoria = document.getElementById('filtro-categoria').value;
    
    let productosFiltrados = productosGlobal.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(busqueda);
        const coincideCategoria = !categoria || producto.categoria === categoria;
        return coincideNombre && coincideCategoria;
    });
    
    renderizarProductos(productosFiltrados);
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// FUNCIONES DE MODAL PRODUCTO
// ============================================

function abrirModalProducto(id) {
    const producto = productosGlobal.find(p => p.id === id);
    if (!producto) return;
    
    productoActual = producto;
    
    document.getElementById('modal-producto-nombre').textContent = producto.nombre;
    document.getElementById('modal-producto-descripcion').textContent = producto.descripcion;
    document.getElementById('modal-producto-precio').textContent = producto.precio.toFixed(2);
    document.getElementById('modal-producto-stock').textContent = producto.stock > 0 ? `${producto.stock} disponibles` : 'Agotado';
    document.getElementById('modal-producto-img').src = producto.imagen;
    
    // Generar miniaturas de fotos adicionales
    const thumbnailsContainer = document.getElementById('modal-fotos-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    if (producto.fotos && producto.fotos.length > 0) {
        producto.fotos.forEach((foto, index) => {
            const img = document.createElement('img');
            img.src = foto;
            img.className = 'modal-foto-thumbnail';
            if (index === 0) img.classList.add('active');
            img.onclick = function() {
                document.getElementById('modal-producto-img').src = foto;
                document.querySelectorAll('.modal-foto-thumbnail').forEach(el => el.classList.remove('active'));
                img.classList.add('active');
            };
            thumbnailsContainer.appendChild(img);
        });
    }
    
    const modal = document.getElementById('producto-modal');
    modal.classList.add('active');
}

function cerrarModalProducto() {
    document.getElementById('producto-modal').classList.remove('active');
    productoActual = null;
}

function contactarPorWhatsApp() {
    if (!productoActual) return;
    
    const nombre = productoActual.nombre;
    const precio = productoActual.precio;
    const mensaje = encodeURIComponent(`Hola, me interesa el producto: ${nombre} - Precio: Q${precio.toFixed(2)}`);
    const whatsappUrl = `https://wa.me/50239509252?text=${mensaje}`;
    
    window.open(whatsappUrl, '_blank');
}

// ============================================
// FUNCIONES DE CARRITO
// ============================================

// ============================================
// FUNCIONES DE TABS (ADMIN)
// ============================================

function cambiarTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    const tabSeleccionado = document.getElementById(`tab-${tabName}`);
    if (tabSeleccionado) {
        tabSeleccionado.classList.add('active');
    }
    
    // Marcar botón como activo
    event.target.classList.add('active');
}

// ============================================
// EVENTOS LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    cargarDelLocal();
    
    // Verificar si estamos en la página de admin
    if (document.getElementById('login-container')) {
        verificarAutenticacion();
    }
    
    // Renderizar productos en catálogo
    if (document.getElementById('productos-container')) {
        renderizarProductos();
    }
    
    // Event listeners para búsqueda y filtros
    const buscador = document.getElementById('buscador');
    const filtroCategoria = document.getElementById('filtro-categoria');
    
    if (buscador) {
        buscador.addEventListener('input', filtrarProductos);
    }
    
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', filtrarProductos);
    }
    
    // Preview de imagen en formulario de admin
    const fileInput = document.getElementById('prod-foto');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('preview');
                const previewContainer = document.getElementById('preview-img');
                preview.src = event.target.result;
                preview.style.display = 'block';
                previewContainer.classList.add('active');
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
    
    // Preview de fotos adicionales
    const fotosAdicionalesInput = document.getElementById('prod-fotos-adicionales');
    if (fotosAdicionalesInput) {
        fotosAdicionalesInput.addEventListener('change', function(e) {
            fotosAdicionalesActuales = [];
            const previewContainer = document.getElementById('preview-fotos-adicionales');
            previewContainer.innerHTML = '';
            
            // Máximo 10 fotos
            const maxFotos = Math.min(e.target.files.length, 10);
            let fotosProcessadas = 0;
            
            for (let i = 0; i < maxFotos; i++) {
                const file = e.target.files[i];
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    fotosAdicionalesActuales.push(event.target.result);
                    fotosProcessadas++;
                    
                    // Crear elemento de preview
                    const container = document.createElement('div');
                    container.className = 'preview-foto-item';
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    
                    const btnRemover = document.createElement('button');
                    btnRemover.className = 'preview-foto-remove';
                    btnRemover.textContent = '×';
                    btnRemover.type = 'button';
                    btnRemover.onclick = function(e) {
                        e.preventDefault();
                        const index = fotosAdicionalesActuales.indexOf(event.target.result);
                        if (index > -1) {
                            fotosAdicionalesActuales.splice(index, 1);
                            container.remove();
                        }
                    };
                    
                    container.appendChild(img);
                    container.appendChild(btnRemover);
                    previewContainer.appendChild(container);
                    
                    if (fotosProcessadas === maxFotos && maxFotos < e.target.files.length) {
                        alert(`Solo se pueden subir máximo 10 fotos adicionales. Se cargaron ${maxFotos} fotos.`);
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        const productoModal = document.getElementById('producto-modal');
        
        if (event.target === productoModal) {
            productoModal.classList.remove('active');
        }
    });
});

// Hacer activo el link de navegación según la sección actual
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let actualSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            actualSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${actualSection}`) {
            link.classList.add('active');
        }
    });
});
