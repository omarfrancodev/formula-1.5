<template>
  <fwb-footer class="bg-custom-color">
    <fwb-footer-copyright
      class="text-black-500"
      by="Donnermar"
      href="https://github.com/omarfrancodev"
      copyright-message="I have no Rights LMFAO."
    />
    <fwb-p class="custom-text-black"
      >Data provided by
      <fwb-a class="custom-text-blue" href="https://ergast.com/mrd/">Ergast.</fwb-a> Unofficial
      Formula 1 web site and content.</fwb-p
    >
  </fwb-footer>
</template>

<script setup>
import { FwbFooter, FwbFooterCopyright, FwbA, FwbP } from 'flowbite-vue'
</script>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped>
.bg-custom-color {
  background-color: #f9cfcf;
  margin-bottom: auto;
}

.custom-text-black {
  font-family: 'Titillium Web', sans-serif;
  color: #000000;
}

.custom-text-blue {
  font-family: 'Titillium Web', sans-serif;
  color: #0000ff;
}
</style>
