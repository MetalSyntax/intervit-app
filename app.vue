<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-white shadow-md" style="border-bottom: 3px solid #e89e16">
      <div class="mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex-shrink-0 flex items-center">
            <a href="/">
              <img src="assets/img/logo-intervit.png" class="w-48"/>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="flex-1">
      <div class="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-2xl overflow-hidden" style="border: 2px solid #ebbe1c">
          <!-- Encabezado formulario -->
          <div class="px-8 py-6 border-b-2" style="border-color: #e89e16">
            <h1 class="text-xl font-bold" style="color: #4e4e4d">
              <span style="color: #e89e16">▶</span> Seguimiento para el Punto de Venta

            </h1>
          </div>

          <!-- Cuerpo del formulario -->
          <div class="px-8 py-6 space-y-6">
            <!-- Sección de datos básicos -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Fecha de Visita</label>
                <input
                  type="date"
                  v-model="formData.fecha"
                  class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
                  :style="{ 'border-color': '#ebbe1c', 'focus:border-color': '#e89e16', 'focus:ring-color': '#ebbe1c40' }"
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Nombre del Cliente</label>
                <input
                  type="text"
                  v-model="formData.cliente"
                  class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
                  :style="{ 'border-color': '#ebbe1c', 'focus:border-color': '#e89e16', 'focus:ring-color': '#ebbe1c40' }"
                  placeholder="Ingrese nombre completo"
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Frecuencia del cliente</label>
                <select
                  v-model="formData.frecuencia"
                  class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none appearance-none bg-no-repeat bg-right pr-10 transition-all"
                  :style="{ 
                    'border-color': '#ebbe1c',
                    'focus:border-color': '#e89e16'
                  }"
                >
                  <option value="Semanal">Visita Semanal</option>
                  <option value="Quincenal">Visita Quincenal</option>
                  <option value="Mensual">Visita Mensual</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Región/Zona</label>
                <select
                  v-model="formData.region"
                  class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none appearance-none bg-no-repeat bg-right pr-10 transition-all"
                  :style="{ 
                    'border-color': '#ebbe1c',
                    'focus:border-color': '#e89e16'
                  }"
                >
                  <option v-for="region in regionesVenezuela" :key="region" :value="region">
                    {{ region }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Selector de productos -->
            <div class="space-y-4">
              <div class="border-t-2 pt-6" style="border-color: #ebbe1c30">
                <h3 class="text-xl font-semibold mb-4" style="color: #4e4e4d">
                  <span style="color: #e89e16">▶</span> Selección de Productos
                </h3>

                <!-- Detalles del producto seleccionado 
                <div v-if="selectedProduct" class="mb-6 p-4 rounded-lg bg-gray-50 border-2" style="border-color: #ebbe1c">
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p class="font-medium" style="color: #4e4e4d">Código:</p>
                      <p style="color: #e89e16">{{ selectedProduct.código }}</p>
                    </div>
                    <div>
                      <p class="font-medium" style="color: #4e4e4d">Descripción:</p>
                      <p style="color: #4e4e4d">{{ selectedProduct.descripción }}</p>
                    </div>
                    <div>
                      <p class="font-medium" style="color: #4e4e4d">Línea:</p>
                      <p style="color: #4e4e4d">{{ selectedProduct.línea }}</p>
                    </div>
                  </div>
                </div> -->

                <select
                  v-model="selectedProduct"
                  class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
                  :style="{ 
                    'border-color': '#ebbe1c',
                    'focus:border-color': '#e89e16',
                    'focus:ring-color': '#ebbe1c40'
                  }"
                >
                  <option :value="null">Seleccione un producto...</option>
                  <option
                    v-for="product in productos"
                    :key="product.código"
                    :value="product"
                  >
                    {{ product.código }} - {{ product.descripción }}
                  </option>
                </select>

                <button
                  @click="agregarProducto"
                  class="mt-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
                  :disabled="!selectedProduct"
                  :style="{ 
                    'background': selectedProduct ? '#e89e16' : '#ebbe1c60',
                    'color': 'white',
                    'cursor': selectedProduct ? 'pointer' : 'not-allowed'
                  }"
                >
                  ➕ Agregar Producto
                </button>
              </div>

              <!-- Lista de productos agregados -->
              <div class="border-t-2 pt-6" style="border-color: #ebbe1c30">
                <h3 class="text-xl font-semibold mb-4" style="color: #4e4e4d">
                  <span style="color: #e89e16">▶</span> Productos Agregados
                </h3>

                <div v-if="productosAgregados.length === 0" class="text-center p-6 text-gray-400">
                  No hay productos agregados
                </div>

                <ul v-else class="space-y-3">
                  <li
                    v-for="(product, index) in productosAgregados"
                    :key="index"
                    class="flex items-center justify-between p-4 rounded-lg border-2 hover:shadow-md transition-all"
                    style="border-color: #ebbe1c"
                  >
                    <div class="flex-1">
                      <p class="font-medium" style="color: #4e4e4d">{{ product.descripción }}</p>
                      <div class="text-sm mt-1 space-x-4">
                        <span style="color: #e89e16">{{ product.código }}</span>
                        <span style="color: #4e4e4d80">{{ product.línea }}</span>
                      </div>
                    </div>
                    <button
                      @click="eliminarProducto(index)"
                      class="ml-4 px-3 py-1 rounded-md hover:bg-opacity-20 transition-colors"
                      style="background: #d4312340; color: #d43123"
                    >
                      ✕ Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Pie del formulario -->
          <div class="px-8 py-6 border-t-2" style="border-color: #e89e16">
            <button
              @click="guardarCSV"
              class="w-full px-6 py-4 rounded-lg font-bold text-lg hover:scale-[1.02] transition-transform relative overflow-hidden"
              :style="{
                'background': productosAgregados.length ? '#ebbe1c' : '#ebbe1c60',
                'color': '#4e4e4d',
                'cursor': productosAgregados.length ? 'pointer' : 'not-allowed'
              }"
              :disabled="!productosAgregados.length"
            >
              <span class="relative z-10">💾 Guardar Registro</span>
              <span 
                v-if="productosAgregados.length"
                class="absolute inset-0 bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"
              ></span>
            </button>
          </div>

          <!-- Notificación Toast -->
          <transition name="slide-fade">
            <div 
              v-if="mostrarNotificacion"
              class="fixed bottom-8 right-8 p-4 rounded-lg shadow-xl flex items-center space-x-3"
              style="background: #e89e16; color: #4e4e4d; border: 2px solid #ebbe1c"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="font-semibold">¡Registro guardado exitosamente!</span>
            </div>
          </transition>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white py-6 border-t-2" style="border-color: #e89e16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm" style="color: #4e4e4d">
          Todos los derechos reservados © {{ new Date().getFullYear() }}. Creado por <a href="https://metalsyntax.vercel.app/">MetalSyntax</a> para Intervit.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fecha: new Date().toISOString().split("T")[0],
        cliente: "",
        frecuencia: "Semanal",
        region: "",
      },
      mostrarNotificacion: false,
      selectedProduct: null,
      productosAgregados: [],
      regionesVenezuela: [
        "Capital",
        "Central",
        "Los Llanos",
        "Andina",
        "Zuliana",
        "Sur",
        "Oriente",
      ],
      productos: [
        {
          código: "PT-0004",
          descripción: "RHELEN ARNICA PLUS FLIP TOP 240 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0005",
          descripción: "RHELEN ARNICA PLUS TARRO 250 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0006",
          descripción: "RHELEN ARNICA ROLL ON PLUS 90 ML",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0011",
          descripción: "RHELEN ARNICA PLUS 100 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0012",
          descripción: "RHELEN ARNICA SPRAY X 120 ML",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0014",
          descripción: "RHELEN ARNICA PLUS CRISTAL 250 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0026",
          descripción: "GEL COOL ICE 250 CC AZUL",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0034",
          descripción: "ACEITE CREMOSO DE ARNICA 250 ML",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0038",
          descripción:
            "RHELEN CREMA REFRESCANTE PARA LOS PIES 250 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0046",
          descripción: "RHELEN ARNICA ROLL ON 90 ML",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0153",
          descripción: "RHELEN ARNICA CRISTAL 100 GR",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0314",
          descripción:
            "RHELEN ARNICA ROLL ON KIDS 90 ML - SIN MENTOL",
          línea: "ARNICA RHELEN",
        },
        {
          código: "PT-0073",
          descripción: "LINAZEITE ACEITE DE LINAZA 30 CPS  (E)",
          línea: "LINAZEITE",
        },
        {
          código: "PT-0074",
          descripción: "LINAZEITE ACEITE DE LINAZA 60 CPS (E)",
          línea: "LINAZEITE",
        },
        {
          código: "PT-0077",
          descripción: "VITAL WAY OMEGA MAX III 50 SOFT (E)",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0274",
          descripción: "LINAZA MOLIDA LIFESYSTEM x 250GR (E)",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0275",
          descripción: "LINAZA CON AVENA LIFESYSTEM x 250GR (E)",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0382",
          descripción:
            "PROTEINA LS SOYA SABOR A CHOCOLATE 250 GR",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0383",
          descripción:
            "PROTEINA LS SOYA SABOR A VAINILLA 250 GR",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0386",
          descripción:
            "PROTEINA LS HUEVO SABOR A CHOCOLATE 250 GR",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0387",
          descripción:
            "PROTEINA LS HUEVO SABOR A VAINILLA 250 GR",
          línea: "NUTRICIONAL",
        },
        {
          código: "PT-0009",
          descripción:
            "RHELEN SIN SAL CREMA PARA PEINAR CAYENA Y VIT. E 300 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0010",
          descripción:
            "RHELEN SIN SAL CREMA PARA PEINAR SABILA Y COLAGENO 300 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0028",
          descripción:
            "ACONDICIONADOR NUTRITIVO REVITALIZANTE SIN SAL  400 ml",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0029",
          descripción:
            "ACONDICIONADOR REESTRUCTURANTE SIN SAL 400 ml",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0041",
          descripción:
            "RHELEN BAÑO DE CREMA SIN SAL SABILA Y COLAGENO 250 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0042",
          descripción:
            "RHELEN BAÑO DE CREMA SIN SAL CAYENA Y VITAMINA E 250 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0043",
          descripción:
            "RHELEN SIN SAL CREMA PARA PEINAR SABILA Y COLAGENO 150 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0044",
          descripción:
            "RHELEN SIN SAL CREMA PARA PEINAR CAYENA Y VIT. E 150 ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0422",
          descripción:
            "CHAMPU NUTRITIVO REVITALIZANTE SIN SAL 400ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0423",
          descripción:
            "CHAMPU NUTRITIVO REVITALIZANTE SIN SAL 250ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0424",
          descripción: "CHAMPU REESTRUCTURANTE SIN SAL 400ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0425",
          descripción: "CHAMPU REESTRUCTURANTE SIN SAL 250ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0426",
          descripción:
            "ACONDICIONADOR NUTRITIVO REVITALIZANTE SIN SAL 250ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0427",
          descripción:
            "ACONDICIONADOR REESTRUCTURANTE SIN SAL 250ML",
          línea: "RHELEN CAPILAR",
        },
        {
          código: "PT-0007",
          descripción:
            "RHELEN CREMA CORPORAL CON VITAMINA E 400 ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0036",
          descripción: "RHELEN BODY CARE TROPICAL 400 ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0037",
          descripción: "RHELEN   BODY CARE FRESH 400ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0059",
          descripción:
            "RHELEN CREMA CORPORAL CON VITAMINA E 250 ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0060",
          descripción: "RHELEN BODY CARE TROPICAL 250 ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0061",
          descripción: "RHELEN BODY CARE FRESH 250 ML",
          línea: "RHELEN CORPORAL",
        },
        {
          código: "PT-0438",
          descripción: "RHELEN GEL HIDRATANTE INTIMO 40 ML",
          línea: "RHELEN INTIMA",
        },
        {
          código: "PT-0439",
          descripción:
            "RHELEN SOLUCION JABONOSA INTIMA CON ACIDO LACTICO 250 ML",
          línea: "RHELEN INTIMA",
        },
        {
          código: "PT-0441",
          descripción: "ARNICA AEROSOL",
          línea: "ARNICA RHELEN",
        },
      ],
    };
  },
  methods: {
    agregarProducto() {
      if (this.selectedProduct) {
        this.productosAgregados.push({ ...this.selectedProduct });
        this.selectedProduct = null;
      }
    },
    eliminarProducto(index) {
      this.productosAgregados.splice(index, 1);
    },
    guardarCSV() {
      const csvContent = [
        [
          "Fecha",
          "Cliente",
          "Frecuencia",
          "Región",
          "Código Producto",
          "Descripción",
          "Línea",
        ],
        ...this.productosAgregados.map((product) => [
          this.formData.fecha,
          this.formData.cliente,
          this.formData.frecuencia,
          this.formData.region,
          product.código,
          product.descripción,
          product.línea,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");
      
        // Descargar archivo
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute('download', `Registro_${this.formData.cliente}_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restablecer campos
      this.formData = {
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        cliente: '',
        frecuencia: 'Semanal',
        region: this.regionesVenezuela[0] || '' // Mantener región si hay opciones
      }
      this.productosAgregados = []
      this.selectedProduct = null

      // Mostrar notificación
      this.mostrarNotificacion = true
      setTimeout(() => {
        this.mostrarNotificacion = false
      }, 3000)
    },
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
