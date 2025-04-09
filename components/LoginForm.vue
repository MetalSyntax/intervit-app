<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background: #4e4e4d">
    <div class="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
      <div class="relative mb-6">
        <label class="block text-sm font-medium mb-2" style="color: #4e4e4d">Mercaderista</label>
        <input
          type="text"
          v-model="searchQuery"
          @input="showSuggestions = true"
          @focus="showSuggestions = true"
          class="w-full px-4 py-3 rounded-lg border-2 focus:ring-2 focus:outline-none transition-all"
          :style="{
            'border-color': '#ebbe1c',
            'focus:border-color': '#e89e16',
          }"
          placeholder="Busque o seleccione su nombre"
        />
        <div class="absolute right-3 top-10">
          <button v-if="showSuggestions" @click="closeMercSuggestions" class="text-gray-500 hover:text-gray-700">
            Cerrar
          </button>
        </div>

        <button v-if="searchQuery" @click="clearMercQuery" class="absolute right-3 top-10 text-gray-500 hover:text-gray-700">
          ✕
        </button>

        <div
          v-if="showSuggestions && filteredMercadistas.length"
          class="absolute z-10 w-full mt-1 bg-white border-2 rounded-lg shadow-lg max-h-60 overflow-auto"
          style="border-color: #ebbe1c"
        >
          <ul class="divide-y divide-gray-200">
            <li
              v-for="mercaderista in filteredMercadistas"
              :key="mercaderista.id"
              @click="selectMercaderista(mercaderista)"
              class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              style="color: #4e4e4d"
            >
              {{ mercaderista.nombre }}
            </li>
          </ul>
        </div>
      </div>

      <button
        @click="handleLogin"
        class="w-full px-6 py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform"
        :style="{
          background: selectedMercaderista ? '#e89e16' : '#ebbe1c60',
          color: 'white',
          cursor: selectedMercaderista ? 'pointer' : 'not-allowed',
        }"
      >
        Ingresar al Sistema
      </button>
    </div>
  </div>
</template>

<script>
import mercaderistas from '../assets/json/mercaderistas.json';

export default {
  name: 'LoginForm',
  data() {
    return {
      searchQuery: '',
      showSuggestions: false,
      selectedMercaderista: null,
      mercadistas: mercaderistas
    }
  },
  computed: {
    filteredMercadistas() {
      return this.mercadistas.filter((m) =>
        m.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    selectMercaderista(mercaderista) {
      this.selectedMercaderista = mercaderista;
      this.searchQuery = mercaderista.nombre;
      this.showSuggestions = false;
    },
    clearMercQuery() {
      this.searchQuery = "";
      this.showSuggestions = false;
    },
    closeMercSuggestions() {
      this.showSuggestions = false;
    },
    handleLogin() {
      if (this.selectedMercaderista) {
        this.$emit('login', this.selectedMercaderista);
      }
    }
  }
}
</script> 