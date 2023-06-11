<template>
  <Navbar/>

  <section class="main-section">
    <router-view/>
  </section>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%
}
body {
  background: #e5e5e5;
}
#app {
  font-family: sans-serif;
  display: flex;
}
.main-section {
  flex: 1 1 auto;
}
</style>
