<template>
  <header class="bg-white text-center py-3.5 px-2 font-f1reg text-black" v-show="!shouldHideHeader">
    <p class="text-sm">
      Because it is more interesting than the real Formula 1, we present Formula 1.5
    </p>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>
