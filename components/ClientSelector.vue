<template>
  <div class="relative">
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Nombre del Cliente</label>
      <input
        type="text"
        v-model="clientQuery"
        @input="showSuggestions = true"
        @focus="showSuggestions = true"
        @blur="showSuggestions = false"
        class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
        :style="{
          'border-color': '#ebbe1c',
          'focus:border-color': '#e89e16',
          'focus:ring-color': '#ebbe1c40',
        }"
        placeholder="Buscar o seleccionar cliente"
      />

      <div class="absolute right-3 top-10">
        <button v-if="showSuggestions && filteredClients.length" @click="closeSuggestions" class="text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>

      <button v-if="clientQuery" @click="clearQuery" class="absolute right-3 top-10 text-gray-500 hover:text-gray-700">
        ✕
      </button>
    </div>

    <!-- Sugerencias de clientes -->
    <div
      v-if="showSuggestions && filteredClients.length"
      class="absolute z-10 w-full mt-1 bg-white border-2 rounded-lg shadow-lg max-h-60 overflow-auto"
      style="border-color: #ebbe1c"
    >
      <ul class="divide-y divide-gray-200">
        <li
          v-for="client in filteredClients"
          :key="client.id"
          @mousedown="selectClient(client)"
          class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          style="color: #4e4e4d"
        >
          {{ client.nombre }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientSelector',
  props: {
    clientes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      clientQuery: '',
      showSuggestions: false
    }
  },
  computed: {
    filteredClients() {
      return this.clientes.filter((client) =>
        client.nombre.toLowerCase().includes(this.clientQuery.toLowerCase())
      );
    }
  },
  methods: {
    selectClient(client) {
      this.$emit('select', client);
      this.clientQuery = client.nombre;
      this.showSuggestions = false;
    },
    clearQuery() {
      this.clientQuery = '';
      this.showSuggestions = false;
      this.$emit('clear');
    },
    closeSuggestions() {
      this.showSuggestions = false;
    }
  }
}
</script> 