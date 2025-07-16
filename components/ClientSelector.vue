<template>
  <div class="relative">
    <div>
      <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Seleccionar Cliente</label>
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
        placeholder="Buscar cliente por nombre"
      />
      <div class="relative place-self-end -top-10 right-2">
        <button v-if="showSuggestions" @click="closeSuggestions" class="text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>
      <button
        v-if="clientQuery"
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

    <!-- Client Suggestions -->
    <div
      v-if="showSuggestions"
      class="absolute z-10 w-full mt-1 top-20 bg-white border-2 rounded-lg shadow-lg max-h-60 overflow-auto"
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
          {{ client.cliente }}
          <span class="text-sm text-gray-500">({{ client.region }}/{{ client.zona }})</span>
        </li>
        <li v-if="filteredClients.length === 0" class="px-4 py-3 text-gray-400">
          No se encontraron clientes
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientSelector',
  props: {
    value: {
      type: Object,
      default: null
    },
    merchant: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      clientQuery: '',
      showSuggestions: false,
      clients: []
    }
  },
  computed: {
    filteredClients() {
      if (!this.clients || !Array.isArray(this.clients)) {
        return [];
      }
      
      let filtered = this.clients;
      
      // Show all clients for these specific merchants
      const specialMerchants = ['COOR.TRADE MARKETING', 'GERENTE ADM. VENTAS', 'DIRECCIÓN NACIONAL'];
      if (this.merchant && specialMerchants.includes(this.merchant.toUpperCase())) {
        // Don't filter by merchant for these special cases
      } else if (this.merchant) {
        filtered = filtered.filter(client => client.mercaderista === this.merchant);
      }
      
      if (this.clientQuery) {
        filtered = filtered.filter(client => 
          client.cliente.toLowerCase().includes(this.clientQuery.toLowerCase())
        );
      }
      
      return filtered;
    },
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    selectClient(client) {
      this.clientQuery = client.cliente;
      this.$emit('input', client);
      this.$emit('select', client);
      this.showSuggestions = false;
    },
    clearQuery() {
      this.clientQuery = '';
      this.$emit('input', null);
    },
    closeSuggestions() {
      this.showSuggestions = false;
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.clientQuery = newVal.cliente;
        } else {
          this.clientQuery = '';
        }
      },
      immediate: true
    }
  },
  created() {
    this.isLoading = true;
    import('@/assets/json/clients.json')
      .then((module) => {
        const clients = module.default || module;
        if (Array.isArray(clients)) {
          this.clients = clients;
        } else {
          console.error('Invalid clients data format:', clients);
          this.error = 'Error loading clients data';
        }
      })
      .catch(error => {
        console.error('Error loading clients:', error);
        this.error = 'Error loading clients data';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
</script>