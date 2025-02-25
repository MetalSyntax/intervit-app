# Aplicación de Registro de Visitas Comerciales

Aplicación web para gestión de visitas comerciales con registro de productos, desarrollada con Vue.js, Nuxt.js y Tailwind CSS.

## 🚀 Características Principales

- **Formulario Inteligente:**
  - Campos para fecha de visita (automática)
  - Registro de cliente con validación
  - Selectores para frecuencia de visita y región/zona (Venezuela)
  
- **Gestión de Productos:**
  - Selector de productos desde JSON local
  - Vista previa detallada de productos seleccionados
  - Sistema de agregar/eliminar productos
  - Listado interactivo con detalles completos (código, descripción, línea)

- **Exportación de Datos:**
  - Generación de CSV con todos los registros
  - Nombre de archivo dinámico con fecha
  - Restablecimiento automático de campos post-exportación

- **UI/UX Avanzada:**
  - Notificaciones toast animadas
  - Diseño responsivo adaptativo
  - Paleta de colores personalizada (#e89e16, #ebbe1c, #4e4e4d, #d43123)
  - Efectos hover y transiciones suaves
  - Feedback visual para acciones críticas

- **Componentes Reutilizables:**
  - Navbar con logo personalizable
  - Formulario modular con validaciones
  - Sistema de notificaciones integrado
  - Footer dinámico con copyright

## 🛠 Tecnologías Utilizadas

- **Frontend:**
  - Vue.js 3.x
  - Nuxt.js
  - Tailwind CSS 4.x
  - PostCSS
  - Autoprefixer

- **Funcionalidades Adicionales:**
  - Transiciones CSS personalizadas
  - Local JSON management

## 📁 Estructura del Proyecto

```bash
├── assets/
│   ├── data/                # JSON de productos
│   └── styles/             # Configuraciones CSS globales
├── components/             # Componentes Vue reutilizables
├── layouts/                # Diseños principales
├── pages/                  # Vistas de la aplicación
├── static/                 # Assets estáticos (logo.png)
├── nuxt.config.js          # Configuración de Nuxt
├── tailwind.config.js      # Configuración de Tailwind
└── package.json
```
## ⚙️ Configuración
1. Variables de Entorno:
```bash
NUXT_PORT=3000
NUXT_HOST=localhost
```
2. Tailwind Customization:

Editar `tailwind.config.js` para:
   - Ajustar colores corporativos
   - Modificar breakpoints responsivos
   - Personalizar clases utilitarias

3. Datos de Productos:

Modificar `/assets/data/products.json` para:
- Agregar/eliminar productos
- Actualizar códigos y descripciones

## 🖥 Instalación
1. Clonar repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```
2. Instalar dependencias:
```bash
npm install
```
3. Iniciar servidor de desarrollo:
```bash
npm run dev
```
4. Compilar para producción:
```bash
npm run build
npm start
```
## 🎨 Personalización

1. Tema de Colores
Modificar en `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#e89e16',
      secondary: '#ebbe1c',
      dark: '#4e4e4d',
      accent: '#d43123'
    }
  }
}
```
2. Regiones de Venezuela
Editar en el componente principal:

```javascript
regionesVenezuela: [
  'Capital', 
  'Central',
  'Los Llanos',
  'Andina',
  'Zuliana',
  'Sur',
  'Oriente'
]
```
3. Notificaciones
Ajustar en el método `guardarCSV`:

```javascript
// Duración de la notificación (ms)
setTimeout(() => {
  this.mostrarNotificacion = false
}, 5000) // 5 segundos
```

## 📄 Licencia
MIT License - Ver archivo LICENSE para detalles.

Nota: Asegúrese de tener Node.js ≥14.x y npm ≥6.x instalados.