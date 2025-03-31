<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Section -->
    <div class="text-center mb-8">
      <h1 class="text-xl font-bold mb-2 uppercase" style="color: #4e4e4d">Bienvenido!, {{ mercaderistaName }}</h1>
    </div>

    <h1 class="text-xl font-bold mb-4" style="color: rgb(78, 78, 77);"><span style="color: rgb(232, 158, 22);"></span> Seguimiento para el Punto de Venta </h1>

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
      <h2 class="text-xl font-semibold mb-4" style="color: #4e4e4d">Productos</h2>
      
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
      clientes: [
        { id: 1, nombre: "FARMATODO CARICUAO PLAZA" },
        { id: 2, nombre: "FARMATODO CARICUAO" },
        { id: 3, nombre: "FARMATODO MADRE CABRINI" },
        { id: 4, nombre: "REDVITAL YAGUARA" },
        { id: 5, nombre: "FARMATODO BARROCA" },
        { id: 6, nombre: "FARMATODO ARCOS" },
        { id: 7, nombre: "FARMATODO OLIVOS" },
        { id: 8, nombre: "FARMATODO METRO CENTER" },
        { id: 9, nombre: "FARMATODO CATÍA BOULEVARD" },
        { id: 10, nombre: "FARMATODO NUEVA CARACAS" },
        { id: 11, nombre: "FARMATODO CONGRESO" },
        { id: 12, nombre: "FARMATODO PUNCERES" },
        { id: 13, nombre: "FARMATODO VENECIA" },
        { id: 14, nombre: "FARMATODO CLAVELINA" },
        { id: 15, nombre: "FARMATODO ÁVILA" },
        { id: 16, nombre: "FARMATODO TOPACIO" },
        { id: 17, nombre: "FARMATODO ZONA FRANCA" },
        { id: 18, nombre: "FARMATODO MATERNIDAD" },
        { id: 19, nombre: "FARMATODO ROBLES" },
        { id: 20, nombre: "FARMATODO PIRÍNEO" },
        { id: 21, nombre: "FARMATODO ANTINEA" },
        { id: 22, nombre: "FARMATODO RÍO FARO" },
        { id: 23, nombre: "FARMATODO VESTUARI" },
        { id: 24, nombre: "FARMATODO MONJE" },
        { id: 25, nombre: "FARMATODO ELEANOR" },
        { id: 26, nombre: "LOCATEL ZOOLÓGICO" },
        { id: 27, nombre: "LOCATEL LA YAGUARA" },
        { id: 28, nombre: "LOCATEL GALERÍA LA VEGA" },
        { id: 29, nombre: "LOCATEL SAN MARTIN" },
        { id: 30, nombre: "LOCATEL PLAZA BOLIVAR" },
        { id: 31, nombre: "LOCATEL LA MARRÓN" },
        { id: 32, nombre: "MARA PLUS LA CANDELARIA" },
        { id: 33, nombre: "MARA PLUS BELLA ARTES" },
        { id: 34, nombre: "MEGAFARMA AV. BOLIVAR" },
        { id: 35, nombre: "FARMADON AV. BOLIVAR" },
        { id: 36, nombre: "MEGAFARMA SAN SIMON" },
        { id: 37, nombre: "FARMATODO BOULEVARD" },
        { id: 38, nombre: "FARMATODO PLAZA 7" },
        { id: 39, nombre: "MEGAFARMA CHIMBORAZO" },
        { id: 40, nombre: "FARMADON CHIMBORAZO" },
        { id: 41, nombre: "FARMADON" },
        { id: 42, nombre: "HOSPISALUD" },
        { id: 43, nombre: "FARMAPAZ" },
        { id: 44, nombre: "EL PODEROSO HOSPITAL" },
        { id: 45, nombre: "AUTOMERCADO MAXI" },
        { id: 46, nombre: "FARMADON PIAR" },
        { id: 47, nombre: "MEGAFARMA PIAR" },
        { id: 48, nombre: "FARMAPAZ LOS GUARITOS" },
        { id: 49, nombre: "FARMADON LOS GUARITOS" },
        { id: 50, nombre: "FARMAPAZ AV. EL EJÉRCITO" },
        { id: 51, nombre: "AUTOMERCADO MAXI" },
        { id: 52, nombre: "FARMAPAZ LA PUENTE" },
        { id: 53, nombre: "FARMADON BOQUERON" },
        { id: 54, nombre: "AUTOMERCADO GRAN MAX" },
        { id: 55, nombre: "FARMATODO TIPURO" },
        { id: 56, nombre: "MEGAFARMA TIPURO" },
        { id: 57, nombre: "MYKASA PALMA REAL" },
        { id: 58, nombre: "FARMADON PALMA REAL" },
        { id: 59, nombre: "FARMADON SERVIMAS" },
        { id: 60, nombre: "AUTOMERCADO LA VISTIMA" },
        { id: 61, nombre: "FARMADON PASEO DE TIPURO" },
        { id: 62, nombre: "MEGAFARMA LA PAZ" },
        { id: 63, nombre: "FARMAPAZ LA PAZ" },
        { id: 64, nombre: "FARMATODO LUIS DEL VALLE" },
        { id: 65, nombre: "FARMAPAZ LUIS DEL VALLE" },
        { id: 66, nombre: "FARMADON LUIS DEL VALLE" },
        { id: 67, nombre: "MEGAFARMA LUIS DEL VALLE" },
        { id: 68, nombre: "AUTOMERCADO MERCA MUNDO" },
        { id: 69, nombre: "AIKOZ PLC" },
        { id: 70, nombre: "MAS X MENOS JUDIBANA" },
        { id: 71, nombre: "MAS X MENOS GUARAGUAO" },
        { id: 72, nombre: "MAS X MENOS CALLE BOLIVAR" },
        { id: 73, nombre: "FARMATODO LOS CEREZOS" },
        { id: 74, nombre: "FARMATODO PASEO COLON" },
        { id: 75, nombre: "FARMATODO CALLE LIBERTAD" },
        { id: 76, nombre: "AIKOZ LECHERIA" },
        { id: 77, nombre: "MAS X MENOS LECHERIA" },
        { id: 78, nombre: "TODOHOGAR LECHERIAS" },
        { id: 79, nombre: "TODOHOGAR COLINA" },
        { id: 80, nombre: "HAO SUPERMARKET" },
        { id: 81, nombre: "DELEITE CAFÉ" },
        { id: 82, nombre: "LIMPIATODO LECHERIAS" },
        { id: 83, nombre: "TODOHOGAR LA CHICA" },
        { id: 84, nombre: "LIMPIATODO LA CHICA" },
        { id: 85, nombre: "FARMAOFERTAS" },
        { id: 86, nombre: "AIKOZ NUEVA BARCELONA" },
        { id: 87, nombre: "FARMATODO NEVERI" },
        { id: 88, nombre: "MERK TODOS" },
        { id: 89, nombre: "FARMATODO PUENTE REAL" },
        { id: 90, nombre: "AIKOZ VENECIA" },
        { id: 91, nombre: "MAS X MENOS HIPER" },
        { id: 92, nombre: "TODOHOGAR HOSPITAL" },
        { id: 93, nombre: "TODOHOGAR INTERCOMUNAL" },
        { id: 94, nombre: "TODOHOGAR VISTAMAR" },
        { id: 95, nombre: "FARMACIA VISTAMAR" },
        { id: 96, nombre: "FARMACIA JOCARI" },
        { id: 97, nombre: "MEGABARATON" },
        { id: 98, nombre: "ALIMEX 666" },
        { id: 99, nombre: "LIMPIATODO SUCRE" },
        { id: 100, nombre: "LIMPIATODO LIBERTAD" },
        { id: 101, nombre: "FARMACIA REGINA" },
        { id: 102, nombre: "LA POLLERA" },
        { id: 103, nombre: "FARMACIA NUEVO SIGLO C.C CHURUN MERU" },
        { id: 104, nombre: "FARMACIA NUEVO SIGLO SAMBIL" },
        { id: 105, nombre: "FARMACIA SAN IGNACIO C.C EL LLANERO" },
        { id: 106, nombre: "MERKAFUR ESTE" },
        { id: 107, nombre: "COMERCIAL EL MAGO" },
        { id: 108, nombre: "FARMACIA SAN IGNACIO DE LA 33" },
        { id: 109, nombre: "NATURAL ES MEJOR - BIO NATURAL" },
        { id: 110, nombre: "AL NATURAL ES MEJOR, C.A." },
        { id: 111, nombre: "CENTRO DE ORIENTACIÓN NATURISTA" },
        { id: 112, nombre: "HIPERMERCADO KARI" },
        { id: 113, nombre: "PERFUMERIA PROFESIONAL" },
        { id: 114, nombre: "FARMACIA SAN IGNACIO LAS MERCEDES" },
        { id: 115, nombre: "HIPERMERCADO KARI C.C TRAKI" },
        { id: 116, nombre: "FARMACIA SAN IGNACIO CENTRO" },
        { id: 117, nombre: "MERKAFUR CABUDARE" },
        { id: 118, nombre: "LA POLLERA C.C MANGO CENTER" },
        { id: 119, nombre: "COOPERATIVA EL TRIUNFO" },
        { id: 120, nombre: "FARMACIA SAN IGNACIO SAN FRANCISCO" },
        { id: 121, nombre: "FARMACIA SAN IGNACIO CON 55" },
        { id: 122, nombre: "MERKAFUR" },
        { id: 123, nombre: "HIPERMERCADO KARI" },
        { id: 124, nombre: "FARMACIA SAN IGNACIO DE LA 61" },
        { id: 125, nombre: "FARMACIA SAN IGNACIO 49 CON 25" },
        { id: 126, nombre: "IMPULSO FARMACIA NUEVO SIGLO 20 CON 31" },
        { id: 127, nombre: "COMERCIAL EL MAGO" },
        { id: 128, nombre: "HIPERMERCADO KARI" },
        { id: 129, nombre: "SAN IGNACIO DE LA 42" },
        { id: 130, nombre: "NATURAESSENCE" },
        { id: 131, nombre: "SAN IGNACIO DE LA 33 CON 26" },
        { id: 132, nombre: "MAXICONSUMO" },
        { id: 133, nombre: "HIPERMERCADO PEKIN EL GUAMO" },
        { id: 134, nombre: "FARMACIA LALA" },
        { id: 135, nombre: "HIPERMERCADO EL GUAMO" },
        { id: 136, nombre: "FARMACIA ISABELL" },
        { id: 137, nombre: "BODEGON LA CARIBEÑA III" },
        { id: 138, nombre: "DIAMARKET UNARE" },
        { id: 139, nombre: "FARMACARACAS" },
        { id: 140, nombre: "ALIMENTOS CASA EL PRIMO" },
        { id: 141, nombre: "FARMALLOVIZNA" },
        { id: 142, nombre: "FARMALIVIO" },
        { id: 143, nombre: "HIPERMERCADO UNARE CENTER" },
        { id: 144, nombre: "BODEGON LA CARIBEÑA I" },
        { id: 145, nombre: "SANTO TOME CENTRAL DE UNARE" },
        { id: 146, nombre: "LLOVIZNA MARKET" },
        { id: 147, nombre: "FARMACIA NAZARET" },
        { id: 148, nombre: "FARMACIA 286" },
        { id: 149, nombre: "UNARE CENTER" },
        { id: 150, nombre: "MAYORISTA" },
        { id: 151, nombre: "FARMARORAIMA" },
        { id: 152, nombre: "FARMACARONI" },
        { id: 153, nombre: "FARMAGUAYANA" },
        { id: 154, nombre: "FARMATEPUY" },
        { id: 155, nombre: "FARMACIA PZO" },
        { id: 156, nombre: "BODEGON LA CARIBEÑA" },
        { id: 157, nombre: "SANTO TOME CENTRAL CASTILLITO" },
        { id: 158, nombre: "FARMACIA HOSPIFARMA" },
        { id: 159, nombre: "FARMAECONOMIA SAN ELIAS" },
        { id: 160, nombre: "BODEGON LA CARIBEÑA II" },
        { id: 161, nombre: "FARMACIA AMAZONIA" },
        { id: 162, nombre: "SUPER ELITE" },
        { id: 163, nombre: "COQUETERIA" },
        { id: 164, nombre: "H MARKET" },
        { id: 165, nombre: "FARMACIA MANAL" },
        { id: 166, nombre: "FARMACENTRO" },
        { id: 167, nombre: "FARMACIA SANTO TOME" },
        { id: 168, nombre: "FARMAOFERTA LA ECONOMICA" },
        { id: 169, nombre: "FARMAOFERTA TIERRA SANTA" },
        { id: 170, nombre: "FARMAHORRO LA ECONOMICA" },
        { id: 171, nombre: "FARMA SALUD PLUS 1" },
        { id: 172, nombre: "HIPER VIP" },
        { id: 173, nombre: "FARMACIA EL DORADO" },
        { id: 174, nombre: "FARMAAHORRO LA ECONOMICA" },
        { id: 175, nombre: "TIENDA NATURISTA LINO" },
        { id: 176, nombre: "FARMACIA FARMAX" },
        { id: 177, nombre: "FARMACIA LA 45" },
        { id: 178, nombre: "FARMASALUD 17 DE DICIEMBRE" },
        { id: 179, nombre: "LOCATEL CHACAITO" },
        { id: 180, nombre: "FARMATODO GRISELDA" },
        { id: 181, nombre: "FARMATODO NÁCAR" },
        { id: 182, nombre: "MARAPLUS LA FLORIDA" },
        { id: 183, nombre: "FARMATODO NATALIA" },
        { id: 184, nombre: "FARMATODO OPALO" },
        { id: 185, nombre: "FARMATUYA" },
        { id: 186, nombre: "FARMATODO OCUMITO TERRAZA DE ÁVILA" },
        { id: 187, nombre: "REDVITAL LA URBINA" },
        { id: 188, nombre: "FARMATODO MIRENA ROMUGO GALLEGO" },
        { id: 189, nombre: "FARMATODO CORINA LA URBINA" },
        { id: 190, nombre: "FARMATUYA PETARE" },
        { id: 191, nombre: "FARMATODO MONTAÑAL PETARE" },
        { id: 192, nombre: "HIPERMERCADO HUMMY PETARE" },
        { id: 193, nombre: "EL PÁRAMO PALO VERDE" },
        { id: 194, nombre: "FARMATODO ÁMBAR SAN IGNACIO" },
        { id: 195, nombre: "FARMATODO LUZMAR CHACAO" },
        { id: 196, nombre: "FARMATUYA CHACAO" },
        { id: 197, nombre: "FARMATODO TEO C.C.C.T" },
        { id: 198, nombre: "FARMABIEN CHACAO" },
        { id: 199, nombre: "FARMATODO ÍNDIGO SAMBIL CHACAO" },
        { id: 200, nombre: "FARMATODO RUBY SAMBIL AUTOPISTAS CHACAO" },
        { id: 201, nombre: "FARMATODO SAN PASTÓR LA CALIFORNIA" },
        { id: 202, nombre: "LOCATEL LA CALIFORNIA" },
        { id: 203, nombre: "FARMATODO ÉL LÍDER" },
        { id: 204, nombre: "FARMATODO LA CARLOTA" },
        { id: 205, nombre: "FARMATODO CUARZO MILENIUM" },
        { id: 206, nombre: "FARMATODO LA MÚCURA BOYACAN" },
        { id: 207, nombre: "FARMATODO ALBITA LOS PALOS" },
        { id: 208, nombre: "FARMATODO MELANIE LOS PALOS GRANDES" },
        { id: 209, nombre: "FARMATODO TOBOGÁN" },
        { id: 210, nombre: "LOCATEL LA CASTELLANA" },
        { id: 211, nombre: "FARMATODO GRISELDA" },
        { id: 212, nombre: "LOCATEL CHACAITO" },
        { id: 213, nombre: "FARMATODO TEPUY LAS MERCEDES" },
        { id: 214, nombre: "FARMATODO AUTANA LAS MERCEDES" },
        { id: 215, nombre: "LOCATEL LA MERCEDES" },
        { id: 216, nombre: "FARMATODO MARFIL BELLO MONTE" },
        { id: 217, nombre: "FARMATODO SAN PASTOR LA CALIFORNIA" },
        { id: 218, nombre: "FARMATODO LA CARLOTA LOS DOS CAMINOS" },
        { id: 219, nombre: "FARMATODO LA MÚCURA BOYACAN" },
        { id: 220, nombre: "FARMATODO ALBITA LOS PALOS GRANDES" },
        { id: 221, nombre: "FARMATODO MELANIE LOS PALOS GRANDES" },
        { id: 222, nombre: "FARMATODO MIRENA ROMUGO GALLEGO" },
        { id: 223, nombre: "FARMATODO MONTAÑAL LEVRU" },
        { id: 224, nombre: "LOCATEL PETARE" },
        { id: 225, nombre: "HIPERMERCADO HUMMY PETARE" },
      ],
      productos: [
        {
          codigo: "PT-0004",
          descripcion: "RHELEN ARNICA PLUS FLIP TOP 240 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0005",
          descripcion: "RHELEN ARNICA PLUS TARRO 250 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0006",
          descripcion: "RHELEN ARNICA ROLL ON PLUS 90 ML",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0011",
          descripcion: "RHELEN ARNICA PLUS 100 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0012",
          descripcion: "RHELEN ARNICA SPRAY X 120 ML",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0014",
          descripcion: "RHELEN ARNICA PLUS CRISTAL 250 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0026",
          descripcion: "GEL COOL ICE 250 CC AZUL",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0034",
          descripcion: "ACEITE CREMOSO DE ARNICA 250 ML",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0038",
          descripcion: "RHELEN CREMA REFRESCANTE PARA LOS PIES 250 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0046",
          descripcion: "RHELEN ARNICA ROLL ON 90 ML",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0153",
          descripcion: "RHELEN ARNICA CRISTAL 100 GR",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0314",
          descripcion: "RHELEN ARNICA ROLL ON KIDS 90 ML - SIN MENTOL",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0073",
          descripcion: "LINAZEITE ACEITE DE LINAZA 30 CPS  (E)",
          linea: "LINAZEITE",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0074",
          descripcion: "LINAZEITE ACEITE DE LINAZA 60 CPS (E)",
          linea: "LINAZEITE",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0077",
          descripcion: "VITAL WAY OMEGA MAX III 50 SOFT (E)",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0274",
          descripcion: "LINAZA MOLIDA LIFESYSTEM x 250GR (E)",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0275",
          descripcion: "LINAZA CON AVENA LIFESYSTEM x 250GR (E)",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0382",
          descripcion: "PROTEINA LS SOYA SABOR A CHOCOLATE 250 GR",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0383",
          descripcion: "PROTEINA LS SOYA SABOR A VAINILLA 250 GR",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0386",
          descripcion: "PROTEINA LS HUEVO SABOR A CHOCOLATE 250 GR",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0387",
          descripcion: "PROTEINA LS HUEVO SABOR A VAINILLA 250 GR",
          linea: "NUTRICIONAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0009",
          descripcion:
            "RHELEN SIN SAL CREMA PARA PEINAR CAYENA Y VIT. E 300 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0010",
          descripcion:
            "RHELEN SIN SAL CREMA PARA PEINAR SABILA Y COLAGENO 300 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0028",
          descripcion: "ACONDICIONADOR NUTRITIVO REVITALIZANTE SIN SAL  400 ml",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0029",
          descripcion: "ACONDICIONADOR REESTRUCTURANTE SIN SAL 400 ml",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0041",
          descripcion: "RHELEN BAÑO DE CREMA SIN SAL SABILA Y COLAGENO 250 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0042",
          descripcion:
            "RHELEN BAÑO DE CREMA SIN SAL CAYENA Y VITAMINA E 250 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0043",
          descripcion:
            "RHELEN SIN SAL CREMA PARA PEINAR SABILA Y COLAGENO 150 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0044",
          descripcion:
            "RHELEN SIN SAL CREMA PARA PEINAR CAYENA Y VIT. E 150 ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0422",
          descripcion: "CHAMPU NUTRITIVO REVITALIZANTE SIN SAL 400ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0423",
          descripcion: "CHAMPU NUTRITIVO REVITALIZANTE SIN SAL 250ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0424",
          descripcion: "CHAMPU REESTRUCTURANTE SIN SAL 400ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0425",
          descripcion: "CHAMPU REESTRUCTURANTE SIN SAL 250ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0426",
          descripcion: "ACONDICIONADOR NUTRITIVO REVITALIZANTE SIN SAL 250ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0427",
          descripcion: "ACONDICIONADOR REESTRUCTURANTE SIN SAL 250ML",
          linea: "RHELEN CAPILAR",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0007",
          descripcion: "RHELEN CREMA CORPORAL CON VITAMINA E 400 ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0036",
          descripcion: "RHELEN BODY CARE TROPICAL 400 ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0037",
          descripcion: "RHELEN   BODY CARE FRESH 400ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0059",
          descripcion: "RHELEN CREMA CORPORAL CON VITAMINA E 250 ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0060",
          descripcion: "RHELEN BODY CARE TROPICAL 250 ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0061",
          descripcion: "RHELEN BODY CARE FRESH 250 ML",
          linea: "RHELEN CORPORAL",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0438",
          descripcion: "RHELEN GEL HIDRATANTE INTIMO 40 ML",
          linea: "RHELEN INTIMA",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0439",
          descripcion:
            "RHELEN SOLUCION JABONOSA INTIMA CON ACIDO LACTICO 250 ML",
          linea: "RHELEN INTIMA",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
        {
          codigo: "PT-0441",
          descripcion: "ARNICA AEROSOL",
          linea: "ARNICA RHELEN",
          cantidad: 0,
          carasIntervit: 0,
          carasCompetencia: 0,
        },
      ],
      productosCompetencia: [
        { id: 1, nombre: "FC PHARMA COLOR GRIS" },
        { id: 2, nombre: "FC PHARMA COLOR AMARILLO" },
        { id: 3, nombre: "FC PHARMA COLOR AZUL" },
        { id: 4, nombre: "BY COHER" },
        { id: 5, nombre: "PROSALUD" },
        { id: 6, nombre: "DULCILINA" },
        { id: 7, nombre: "PURE EGG" },
        { id: 8, nombre: "ACON PANTENE RESTAURACION" },
        { id: 9, nombre: "ACON PANTENE 3 MINUTOS 170" },
        { id: 10, nombre: "CREMA P PEINAR PANTENE 200G" },
        { id: 11, nombre: "CREMA P PEINAR PANTENE 100G" },
        { id: 12, nombre: "PANTENE PROV S/S RESTAURACION 400ML/MYSTIC" },
        { id: 13, nombre: "PANTENE PROV S/S SHAMPOO 400ML" },
        { id: 14, nombre: "ACONDICIONADOR S/S 400ML - PANTENE" },
        { id: 15, nombre: "DERMO HUMECTANTE VITM E 400ML" },
        { id: 16, nombre: "LOCION CORPORAL SECOS EVERY NIGHT 250G" },
        { id: 17, nombre: "CRENA CORP EVERY NIGHT 4000ML" },
        { id: 18, nombre: "DERMOX HUMECTANTE EVERY NIGHT 400" },
        { id: 19, nombre: "DERMOX CREMA CORPORAL 350ML" },
        { id: 20, nombre: "INTYLACT" },
        { id: 21, nombre: "PERLAVIS FC PHARMA" },
        { id: 22, nombre: "FC PHARMA AEROSOL/ DENCORUB" },
      ],
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