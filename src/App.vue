<template>
  <div id="app" class="bg-background">
    <HeaderComponent />
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    NavBar,
    FooterComponent
  }
}
</script>
