<template>
  <header class="header">
    <h1>Because it is more interesting than the real Formula 1, we present Formula 1.5</h1>
  </header>
  <NavBar />
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  name: 'MainHeader',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  background-color: #ffffff;
  padding: 10px;
}

.header h1 {
  font-family: 'Titillium Web', sans-serif;
  color: #000000;
}
</style>
