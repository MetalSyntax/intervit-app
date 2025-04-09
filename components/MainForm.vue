<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Section -->
    <div class="text-center mb-8">
      <h1 class="text-xl font-bold mb-2 uppercase" style="color: #4e4e4d">Bienvenido!, {{ mercaderistaName }}</h1>
    </div>

    <h1 class="text-lg font-bold mb-4" style="color: rgb(78, 78, 77);"><span style="color: rgb(232, 158, 22);"></span> Seguimiento para el Punto de Venta </h1>

    <!-- Date Input -->
    <div class="mb-8">
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Fecha de Visita</label>
      <input
        type="date"
        v-model="formData.fechaVisita"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
      />
    </div>

    <!-- Client Section -->
    <ClientSelector
      v-model="formData.cliente"
      :clientes="clientes"
      @select="handleClientSelect"
    />

    <!-- Frequency and Region Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label
          class="block text-sm font-medium mb-2"
          style="color: #4e4e4d"
          >Frecuencia del cliente</label
        >
        <select
          v-model="formData.frecuencia"
          class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none appearance-none bg-no-repeat bg-right pr-10 transition-all"
          :style="{
            'border-color': '#ebbe1c',
            'focus:border-color': '#e89e16',
          }"
        >
          <option value="Semanal">Visita Semanal</option>
          <option value="Quincenal">Visita Quincenal</option>
          <option value="Mensual">Visita Mensual</option>
        </select>
      </div>

      <div>
        <label
          class="block text-sm font-medium mb-2"
          style="color: #4e4e4d"
          >Región/Zona</label
        >
        <select
          v-model="formData.region"
          class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none appearance-none bg-no-repeat bg-right pr-10 transition-all"
          :style="{
            'border-color': '#ebbe1c',
            'focus:border-color': '#e89e16',
          }"
        >
          <option
            v-for="region in regionesVenezuela"
            :key="region"
            :value="region"
          >
            {{ region }}
          </option>
        </select>
      </div>
    </div>

    <!-- Product Section -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-4" style="color: rgb(78, 78, 77);"> Selección de Productos </h3>
      
      <ProductSelector
        ref="productSelector"
        v-model="selectedProduct"
        :productos="productos"
        @select="handleProductSelect"
      />

      <ProductDetailsForm
        ref="productDetailsForm"
        v-if="selectedProduct"
        :product="selectedProduct"
        :productos-competencia="productosCompetencia"
        @update:cantidad="updateProductField('cantidad', $event)"
        @update:carasIntervit="updateProductField('carasIntervit', $event)"
        @update:carasCompetencia="updateProductField('carasCompetencia', $event)"
        @update:precioIntervit="updateProductField('precioIntervit', $event)"
        @update:presencia="updateProductField('presencia', $event)"
        @update:lote="updateProductField('lote', $event)"
        @update:fechaVencimiento="updateProductField('fechaVencimiento', $event)"
        @update:productoCompetencia="updateProductField('productoCompetencia', $event)"
        @update:precioCompetencia="updateProductField('precioCompetencia', $event)"
      />

      <button
        v-if="selectedProduct"
        @click="addProduct"
        class="mt-4 w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Agregar Producto
      </button>
    </div>

    <!-- Products List -->
    <h3 class="text-lg font-semibold my-4" style="color: rgb(78, 78, 77);">Productos Agregados </h3>
    <div v-if="formData.productos.length" class="mt-8">
      <h2 class="text-xl font-semibold mb-4" style="color: #4e4e4d">Productos Agregados</h2>
      <div class="space-y-4">
        <div
          v-for="(producto, index) in formData.productos"
          :key="index"
          class="bg-white p-4 rounded-lg border-2"
          style="border-color: #ebbe1c"
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-center">
            <div class="w-full">
              <p class="font-medium" style="color: #4e4e4d">
                {{ producto.descripcion }}
              </p>
              <div class="text-sm mt-1 space-x-4">
                <span style="color: #e89e16">{{
                  producto.codigo
                }}</span>
                <span style="color: #4e4e4d80">{{
                  producto.linea
                }}</span>
                <span style="color: #4e4e4d"
                  >Qt.
                  <span style="color: #e89e16">{{
                    producto.cantidad
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >N.Caras Intervit:
                  <span style="color: #e89e16">{{
                    producto.carasIntervit
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >N.Caras Competencia:
                  <span style="color: #e89e16">{{
                    producto.carasCompetencia
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >$P. Intervit:
                  <span style="color: #e89e16">{{
                    producto.precioIntervit
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >Presencia:
                  <span style="color: #e89e16">{{
                    producto.presencia
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >Lote:
                  <span style="color: #e89e16">{{
                    producto.lote
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >Vence:
                  <span style="color: #e89e16">{{
                    producto.fechaVencimiento
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >Comp.:
                  <span style="color: #4e4e4d">{{
                    producto.productoCompetencia
                  }}</span></span
                >
                <span style="color: #4e4e4d"
                  >$P. Comp.
                  <span style="color: #e89e16">{{
                    producto.precioCompetencia
                  }}</span></span
                >
              </div>
            </div>
            <button
              @click="removeProduct(index)"
              class="text-red-500 hover:text-red-700 mt-4 md:mt-0 text-center md:text-right"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center p-6 text-gray-400 mt-8"
    >
      No hay productos agregados
    </div>

    <!-- Save Button -->
    <div class="mt-8 text-center">
      <button
        @click="saveForm"
        :disabled="!formData.productos.length"
        class="bg-yellow-500 text-white py-3 px-8 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Guardar Registro
      </button>
    </div>

    <div class="text-center mt-8">
      <button @click="$emit('logout')" class="px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors" style="background: rgb(212, 49, 35); color: white; cursor: pointer;">
        Cerrar sesión
      </button>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      Registro guardado exitosamente
    </div>
  </div>
</template>

<script>
import ClientSelector from './ClientSelector.vue'
import ProductSelector from './ProductSelector.vue'
import ProductDetailsForm from './ProductDetailsForm.vue'
import clientes from '../assets/json/clients.json';
import productos from '../assets/json/products.json';
import productosCompetencia from '../assets/json/productsCompetencia.json';

export default {
  name: 'MainForm',
  components: {
    ClientSelector,
    ProductSelector,
    ProductDetailsForm
  },
  props: {
    mercaderista: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    mercaderistaName() {
      return typeof this.mercaderista === 'object' ? this.mercaderista.nombre : this.mercaderista
    }
  },
  data() {
    return {
      formData: {
        fechaVisita: '',
        cliente: '',
        frecuencia: 'Semanal',
        region: 'Capital',
        productos: []
      },
      selectedProduct: null,
      showToast: false,
      regionesVenezuela: [
        "Capital",
        //"Central",
        //"Los Llanos",
        //"Andina",
        //"Zuliana",
        //"Sur",
        "Oriente",
        "Barquisimeto",
      ],
      clientes: clientes,
      productos: productos,
      productosCompetencia: productosCompetencia,
    }
  },
  methods: {
    handleClientSelect(cliente) {
      this.formData.cliente = cliente.nombre
    },
    handleProductSelect(producto) {
      this.selectedProduct = {
        ...producto,
        cantidad: 0,
        carasIntervit: 0,
        carasCompetencia: 0,
        precioIntervit: 0,
        presencia: '',
        lote: '',
        fechaVencimiento: '',
        productoCompetencia: '',
        precioCompetencia: 0
      }
    },
    updateProductField(field, value) {
      if (this.selectedProduct) {
        this.selectedProduct[field] = value
      }
    },
    addProduct() {
      if (this.selectedProduct) {
        this.formData.productos.push({ ...this.selectedProduct })
        this.selectedProduct = null
        this.$refs.productDetailsForm?.clearProductSearch()
        this.$refs.productSelector?.clearSelection()
      }
    },
    removeProduct(index) {
      this.formData.productos.splice(index, 1)
    },
    saveForm() {
      const csvContent = [
        [
          "Fecha",
          "Cliente",
          "Mercaderista",
          "Frecuencia",
          "Region",
          "Codigo Producto",
          "Descripcion",
          "Linea",
          "Cantidad",
          "Numero de Caras Intervit",
          "Numero de Caras Competencia",
          "Precio Intervit",
          "presencia",
          "lote",
          "Fecha Vencimiento",
          "Producto Competencia",
          "Precio Competencia",
        ],
        ...this.formData.productos.map((product) => [
          this.getFormattedDateTime(),
          this.formData.cliente,
          this.mercaderistaName,
          this.formData.frecuencia,
          this.formData.region,
          product.codigo,
          product.descripcion,
          product.linea,
          product.cantidad,
          product.carasIntervit,
          product.carasCompetencia,
          product.precioIntervit,
          product.presencia,
          product.lote,
          product.fechaVencimiento,
          product.productoCompetencia,
          product.precioCompetencia,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      // Descargar archivo
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Registro_${this.mercaderistaName}_${this.getFormattedDateTime()}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restablecer campos
      this.formData = {
        fechaVisita: new Date().toISOString().split("T")[0],
        cliente: "",
        frecuencia: "",
        region: "",
        productos: []
      };
      this.selectedProduct = null;

      // Mostrar notificación
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
    getFormattedDateTime() {
      const date = new Date();
      return date
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/,/g, "")
        .replace(/:/g, "-");
    }
  }
}
</script> 