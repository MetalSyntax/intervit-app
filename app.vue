<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-1">
      <LoginForm v-if="!isLoggedIn" @login="handleLogin" />
      <MainForm v-else :mercaderista="formData.mercaderista" @logout="handleLogout" />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LoginForm from './components/LoginForm.vue'
import MainForm from './components/MainForm.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    LoginForm,
    MainForm
  },
  data() {
    return {
      isLoggedIn: false,
      formData: {
        mercaderista: ''
      }
    }
  },
  methods: {
    handleLogin(mercaderista) {
      this.isLoggedIn = true
      this.formData.mercaderista = mercaderista.nombre
    },
    handleLogout() {
      this.isLoggedIn = false
      this.formData.mercaderista = ''
    }
  }
}
</script>
