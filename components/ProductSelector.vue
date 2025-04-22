<template>
  <div class="relative">
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Seleccionar Producto</label>
      <input
        type="text"
        v-model="productQuery"
        @input="showSuggestions = true"
        @focus="showSuggestions = true"
        @blur="showSuggestions = false"
        class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
        :style="{
          'border-color': '#ebbe1c',
          'focus:border-color': '#e89e16',
          'focus:ring-color': '#ebbe1c40',
        }"
        placeholder="Buscar producto por codigo o nombre"
      />
      <div class="relative place-self-end -top-10 right-2">
        <button v-if="showSuggestions" @click="closeSuggestions" class="text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>
      <button
        v-if="productQuery"
        @click="clearQuery"
        class="absolute place-self-end top-10 text-gray-500 hover:text-gray-700"
        :class="{
          'right-[calc(50%+20px)]': !isMobile,
          'right-[calc(0%+20px)]': isMobile,
        }"
      >
        ✕
      </button>
    </div>

    <!-- Sugerencias de productos -->
    <div
      v-if="showSuggestions"
      class="absolute z-10 w-full mt-1 top-20 bg-white border-2 rounded-lg shadow-lg max-h-60 overflow-auto"
      style="border-color: #ebbe1c"
    >
      <ul class="divide-y divide-gray-200">
        <li
          v-for="product in filteredProducts"
          :key="product.id"
          @mousedown="selectProduct(product)"
          class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          style="color: #4e4e4d"
        >
          {{ product.descripcion }}
        <div class="text-sm mt-1" style="color: #4e4e4d80">{{ product.linea }}</div>
        </li>
        <li v-if="filteredProducts.length === 0" class="px-4 py-3 text-gray-400">
          No se encontraron productos
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import productsData from '../assets/json/products.json'

export default {
  name: 'ProductSelector',
  props: {
    productos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      productQuery: '',
      showSuggestions: false,
    }
  },
  computed: {
    filteredProducts() {
      return this.productos.filter(
        (product) =>
          product.descripcion.toLowerCase().includes(this.productQuery.toLowerCase()) ||
          product.linea.toLowerCase().includes(this.productQuery.toLowerCase())
      );
    },
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    selectProduct(product) {
      this.$emit('select', product);
      this.productQuery = product.descripcion;
      this.showSuggestions = false;
    },
    clearQuery() {
      this.productQuery = '';
      this.showSuggestions = false;
      this.$emit('clear');
    },
    closeSuggestions() {
      this.showSuggestions = false;
    }
  },
  created() {
    this.products = productsData;
  }
}
</script>