# Variedades Veronica - Tienda de Ropa Online

¡Bienvenido a Variedades Veronica! Una tienda de ropa online moderna, completa y fácil de usar.

## 🎨 Características

### 👥 Para Clientes
- **Catálogo Dinámico**: Explora productos organizados por categorías
- **Sistema de Búsqueda**: Busca productos por nombre
- **Filtros**: Filtra por categoría
- **Carrito de Compras**: Agrega, modifica y elimina productos
- **Vista Detallada**: Información completa de cada producto
- **Interfaz Responsiva**: Funciona perfectamente en móviles y escritorio

### 🔐 Para Administradores
- **Panel Seguro**: Acceso protegido con usuario y contraseña
- **Subir Productos**: Agrega nuevos productos con foto, descripción y precio
- **Gestionar Productos**: Edita y elimina productos existentes
- **Almacenamiento Local**: Los datos se guardan automáticamente en el navegador

## 🔑 Credenciales de Administrador

```
Usuario: vvero
Contraseña: HHLOCK86
```

## 🚀 Cómo Usar

### Instalación Local

1. **Descarga o clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/variedades-veronica-web.git
   cd variedades-veronica-web
   ```

2. **Abre el proyecto**
   - Abre `index.html` en tu navegador web favorito
   - O usa un servidor local (recomendado)

### Usando un Servidor Local (Python)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre `http://localhost:8000` en tu navegador.

### Usando un Servidor Local (Node.js)

```bash
# Instala http-server globalmente
npm install -g http-server

# Ejecuta en la carpeta del proyecto
http-server
```

## 📁 Estructura del Proyecto

```
variedades-veronica-web/
├── index.html          # Página principal con catálogo
├── admin.html          # Panel de administrador
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── .gitignore          # Archivos ignorados en Git
└── README.md           # Este archivo
```

## 🛒 Funcionalidades Detalladas

### Catálogo de Productos
- Productos organizados en categorías (Camisetas, Pantalones, Vestidos, Accesorios, Zapatos)
- Búsqueda en tiempo real
- Filtrado por categoría
- Información clara de cada producto (nombre, descripción, precio, stock)

### Carrito de Compras
- Agregar/quitar productos
- Cambiar cantidades
- Visualización del total
- Opción de proceder al pago (contacto por email)

### Panel de Administrador
- Login seguro
- Subir nuevos productos con foto
- Visualizar todos los productos
- Eliminar productos

## 📦 Almacenamiento de Datos

Los datos se guardan en **localStorage** del navegador:
- **Productos**: Se almacenan en `productos`
- **Carrito**: Se almacena en `carrito`
- **Autenticación Admin**: Se guarda en `adminAutenticado`

> ⚠️ **Nota**: Los datos se eliminan si se borra el cache del navegador. Para una solución empresarial, se recomienda usar una base de datos.

## 🌐 Desplegar en Netlify

### Opción 1: Conectar con GitHub

1. **Crear un repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/variedades-veronica-web.git
   git push -u origin main
   ```

2. **Conectar con Netlify**
   - Ve a [netlify.com](https://netlify.com)
   - Inicia sesión con tu cuenta (babayagar007@gmail.com)
   - Haz clic en "New site from Git"
   - Selecciona GitHub y elige tu repositorio
   - Deja las configuraciones por defecto
   - Haz clic en "Deploy site"

### Opción 2: Deploy Manual

1. **Drag & Drop**
   - Ve a [netlify.com](https://netlify.com)
   - Inicia sesión con tu cuenta
   - Arrastra la carpeta `variedades-veronica-web` a la zona de drop
   - ¡Tu sitio estará en línea en segundos!

## 🎯 Categorías de Productos Disponibles

- 👕 **Camisetas**
- 👖 **Pantalones**
- 👗 **Vestidos**
- ✨ **Accesorios**
- 👞 **Zapatos**

## 📧 Contacto

- **Email**: babayagar007@gmail.com
- **WhatsApp**: [502 3950-9252](https://wa.me/50239509252)
- **GitHub**: [tu-usuario](https://github.com/tu-usuario)

## 📝 Licencia

Este proyecto es de uso libre para Variedades Veronica.

## 🔒 Seguridad

> ⚠️ **IMPORTANTE**: Las credenciales de administrador están hardcodeadas en el JavaScript (solo para demostración). Para un sitio en producción, implementa autenticación segura en un servidor backend.

## 🐛 Solución de Problemas

### Las imágenes no se muestran
- Asegúrate de que el archivo esté correctamente ubicado
- Usa rutas absolutas o relativas correctas
- Verifica que el formato de imagen sea soportado

### El carrito no guarda datos
- Verifica que localStorage esté habilitado en tu navegador
- Intenta limpiar el cache y recargar la página

### No puedo acceder al admin
- Usuario: `vvero`
- Contraseña: `HHLOCK86`
- Verifica que escribas correctamente (sensible a mayúsculas)

## 🚀 Mejoras Futuras

- [ ] Base de datos MySQL/MongoDB
- [ ] Pasarela de pagos integrada
- [ ] Sistema de usuarios registrados
- [ ] Órdenes y historial de compras
- [ ] Sistema de comentarios/valoraciones
- [ ] Panel de estadísticas de ventas

---

**Creado para Variedades Veronica** 🎉
