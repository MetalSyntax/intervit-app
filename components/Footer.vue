<template>
  <footer class="bg-white py-6 border-t-2" style="border-color: #e89e16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-sm" style="color: #4e4e4d">
        Todos los derechos reservados © {{ new Date().getFullYear() }}. Creado por
        <a href="https://metalsyntax.vercel.app/">MetalSyntax</a> para Intervit.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script> 