<template>
  <header class="bg-white text-center py-2 md:py-3 px-1 font-f1reg text-black">
    <p class="text-xs md:text-base">
      Because it is more interesting than the real Formula 1, we present Formula 1.5
    </p>
  </header>
</template>

<script>
export default {
  computed: {
    shouldHideHeader() {
      return this.currentScrollPosition > this.lastScrollPosition
    }
  },
  name: 'HeaderComponent'
}
</script>
