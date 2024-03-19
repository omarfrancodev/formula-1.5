<template>
  <fwb-navbar class="bg-redF1 nav-bar">
    <template #logo>
      <F1_5Logo />
    </template>
    <template #default="{ isShowMenu }">
      <fwb-navbar-collapse class="bg-secondaryDark" :is-show-menu="isShowMenu">
        <fwb-navbar-link class="nav-link text-white" :class="{ active: isActive('/') }" link="/">
          Home
        </fwb-navbar-link>
        <fwb-navbar-link
          class="nav-link text-white"
          :class="{ active: isActive('/results') }"
          link="/results"
        >
          Results
        </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup>
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from 'flowbite-vue'
</script>

<script>
import F1_5Logo from '../assets/f1_logo 1.5.svg'

export default {
  methods: {
    isActive(route) {
      return this.$route.path === route
    }
  },
  components: { F1_5Logo }
}
</script>

<style scoped>
.nav-link {
  font-family: 'Titillium Web', sans-serif;
  font-size: large;
  text-decoration: none;
}

.nav-link.active {
  color: #7883bc;
  text-decoration: underline;
}
</style>
