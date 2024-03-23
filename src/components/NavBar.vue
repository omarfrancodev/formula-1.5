<template>
  <Disclosure as="nav" class="fixed-navbar bg-redf1 overflow-clip" v-slot="{ open }">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <F1_5LogoMobile v-if="isMobile" />
        <F1_5Logo v-else />
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <a
          href="https://www.formula1.com/"
          target="_blank"
          class="text-darktext bg-white hover:bg-darkblue hover:text-white font-f1bold rounded-md text-base px-3 md:px-4 py-2 md:py4 text-center"
          >Go to F1</a
        >
        <DisclosureButton
          class="relative sm:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-darkblue hover:text-white"
        >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
          <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
        </DisclosureButton>
      </div>
      <div
        class="bg-transparent text-lg font-f1reg text-center items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar"
      >
        <ul class="sm:flex">
          <li class="me-0" v-for="(route, index) in router.options.routes" :key="index">
            <router-link
              :to="route.path"
              :class="{
                'w-full p-7 text-gray-300 hover:text-white hover:underline hover:underline-offset-4 focus:bg-darkblue focus:underline focus:underline-offset-4 focus:font-f1bold': true,
                active: currentView === route.path
              }"
            >
              {{ route.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <DisclosurePanel
        class="bg-transparent text-lg font-f1reg py-2 text-center items-center justify-between sm:hidden w-full md:flex md:w-auto md:order-1"
      >
        <div class="text-white">
          <DisclosureButton
            v-for="(route, index) in router.options.routes"
            :key="index"
            as="a"
            :href="route.path"
            :class="[
              currentView === route.path
                ? 'underline underline-offset-4 bg-darkblue font-f1bold'
                : 'text-gray-300 hover:text-white hover:underline hover:underline-offset-4',
              'block rounded-md py-2 text-base'
            ]"
            :aria-current="currentView ? 'page' : undefined"
            >{{ route.name }}</DisclosureButton
          >
        </div>
      </DisclosurePanel>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import F1_5Logo from '../assets/f1_logo 1.5.svg'
import F1_5LogoMobile from '../assets/f1_logo 1.5 mobile.svg'

const location = useRoute()
const router = useRouter()

const isMobile = window.innerWidth < 768
let currentView = computed(() => location.path)
</script>

<style scoped>
.fixed-navbar {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.active {
  @apply text-white underline underline-offset-4 bg-darkblue font-f1bold;
}
</style>
