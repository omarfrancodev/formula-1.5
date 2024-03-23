<template>
  <div role="status" class="flex items-center justify-center animate-pulse">
    <div>
      <div v-if="isMobile" class="max-w-sm mx-auto">
        <LoaderMobile />
      </div>
      <div v-else>
        <Loader />
      </div>
      <p class="text-center text-gray text-xs md:text-lg font-f1bold">
        Loading content, please wait...
      </p>
    </div>
  </div>
</template>

<script setup>
const isMobile = window.innerWidth < 768
</script>

<script>
import LoaderMobile from '../assets/Loader Mobile.svg'
import Loader from '../assets/Loader.svg'
export default {
  name: 'LoadingComponent'
}
</script>
