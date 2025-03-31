<template>
  <div class="grid grid-cols-2 gap-6 pt-4 items-end">
    <!-- Cantidad en Inventario -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Cantidad de productos en el inventario</label>
      <input
        type="number"
        v-model.number="product.cantidad"
        @input="$emit('update:cantidad', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="Cantidad"
      />
    </div>
    <!-- Número de caras de Intervit -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Número de caras de Intervit</label>
      <input
        type="number"
        v-model.number="product.carasIntervit"
        @input="$emit('update:carasIntervit', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="N Caras Intervit"
      />
    </div>

    <!-- Número de caras de Competencia -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Número de caras de Competencia</label>
      <input
        type="number"
        v-model.number="product.carasCompetencia"
        @input="$emit('update:carasCompetencia', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="N Caras Competencia"
      />
    </div>

    <!-- $ PRECIO INTERVIT -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Precio Intervit (USD)</label>
      <input
        type="number"
        v-model.number="product.precioIntervit"
        @input="$emit('update:precioIntervit', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="$ Precio Intervit"
      />
    </div>

    <!-- PRESENCIA -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Presencia en Punto de Venta</label>
      <select
        v-model="product.presencia"
        @change="$emit('update:presencia', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
      >
        <option value="">Seleccione</option>
        <option value="Si">Sí</option>
        <option value="No">No</option>
      </select>
    </div>

    <!-- LOTE -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Número de Lote</label>
      <input
        type="number"
        v-model.number="product.lote"
        @input="$emit('update:lote', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="Número de Lote"
      />
    </div>

    <!-- FECHA DE VENCIMIENTO -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Fecha de Vencimiento</label>
      <input
        type="date"
        v-model="product.fechaVencimiento"
        @input="$emit('update:fechaVencimiento', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
      />
    </div>

    <!-- PRODUCTO DE LA COMPETENCIA -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Producto de la Competencia</label>
      <input
        type="text"
        v-model="productoCompetenciaQuery"
        @input="showSuggestions = true"
        @focus="showSuggestions = true"
        class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all pr-10"
        :style="{
          'border-color': '#ebbe1c',
          'focus:border-color': '#e89e16',
          'focus:ring-color': '#ebbe1c40',
        }"
        placeholder="Buscar o seleccionar producto"
      />

      <div class="relative">
        <button
          v-if="productoCompetenciaQuery || product.productoCompetencia"
          @mousedown.prevent="clearProductSearch"
          class="absolute right-3 top-[-25px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>

      <div
        v-show="showSuggestions && filteredProductosCompetencia.length"
        class="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border-2"
        style="border-color: #ebbe1c; max-height: 200px; overflow-y: auto;"
      >
        <ul>
          <li
            v-for="producto in filteredProductosCompetencia"
            :key="producto.id"
            @mousedown.prevent="selectProductCompetencie(producto)"
            class="px-4 py-2 hover:bg-yellow-50 cursor-pointer transition-colors"
            :style="{ color: '#4e4e4d' }"
          >
            {{ producto.nombre }}
          </li>
          <li v-if="filteredProductosCompetencia.length === 0" class="px-4 py-3 text-gray-400">
            No se encontraron productos
          </li>
        </ul>
      </div>

      <div v-if="showSuggestions && filteredProductosCompetencia.length" class="relative transform -translate-y-1/2">
        <button
          @mousedown.prevent="showSuggestions = false"
          class="absolute top-[-35px] right-2 text-gray-500 hover:text-gray-700 text-sm focus:outline-none"
        >
          Cerrar
        </button>
      </div>
    </div>

    <!-- $ PRECIO DE LA COMPETENCIA -->
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Precio Competencia (USD)</label>
      <input
        type="number"
        v-model.number="product.precioCompetencia"
        @input="$emit('update:precioCompetencia', $event.target.value)"
        class="w-full px-4 py-3 rounded-lg border-2 text-center"
        style="border-color: #ebbe1c"
        placeholder="$ Precio Competencia"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailsForm',
  props: {
    product: {
      type: Object,
      required: true
    },
    productosCompetencia: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      productoCompetenciaQuery: '',
      showSuggestions: false
    }
  },
  computed: {
    filteredProductosCompetencia() {
      if (!this.productoCompetenciaQuery) return this.productosCompetencia;
      const query = this.productoCompetenciaQuery.toLowerCase();
      return this.productosCompetencia.filter((producto) =>
        producto.nombre.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    selectProductCompetencie(producto) {
      this.$emit('update:productoCompetencia', producto.nombre);
      this.productoCompetenciaQuery = producto.nombre;
      this.showSuggestions = false;
    },
    clearProductSearch() {
      this.productoCompetenciaQuery = '';
      this.$emit('update:productoCompetencia', '');
      this.showSuggestions = false;
    }
  },
  // Expose methods to parent component
  expose: ['clearProductSearch']
}
</script> 