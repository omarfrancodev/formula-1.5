<template>
  <div
    class="bg-darkblue flex flex-wrap items-center justify-center text-gray-400 font-f1reg text-sm"
  >
    <ul class="flex flex-wrap -mb-px">
      <li v-for="(view, idx) in subViews" :key="idx" class="me-2">
        <a
          href="#"
          class="inline-block py-3 md:py-3 px-3 md:px-20 border-b-4 border-transparent hover:border-indigo-500 hover:bg-white/[0.12] focus:text-indigo-500 focus:border-indigo-500"
          aria-current="page"
          >{{ view }}</a
        >
      </li>
    </ul>
  </div>
  <div
    class="py-6 md:py-10 px-5 md:px-32 overflow-x-auto font-titillium text-justify text-base md:text-lg"
  >
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded bg-red-600 px-4 py-2 text-left text-white hover:bg-red-700"
      >
        <span>What is inside of Results?</span>
        <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-white" />
      </DisclosureButton>
      <DisclosurePanel class="p-4 bg-white rounded-b">
        <p>
          Here you can see the
          <a href="#" class="underline text-redf1 hover:text-lightbluetext">race-by-race results</a>
          and the
          <a href="#" class="underline text-redf1 hover:text-lightbluetext">standings</a> (with
          charts) of
          <a href="#note" class="text-redf1 hover:text-lightbluetext font-bold">F1.5*</a> for both
          <span class="font-bold"> Drivers</span> and <span class="font-bold">Constructors</span>,
          for the season and excluding the drivers or teams of your choice (by default takes the
          current season ({{ season }}) and
          <span class="text-[#e3071d] font-bold">Red Bull</span> is excluded) for this reason
          <u>the content may take a moment to load</u>
        </p>
      </DisclosurePanel>
    </Disclosure>
  </div>
  <BottomNote id="note" />
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
const subViews = ['Standings', 'Races', 'Charts']
</script>

<script>
import BottomNote from '../components/BottomNote.vue'
export default {
  name: 'ResultsView',
  created() {
    document.title = 'F1.5 - Results'
  },
  components: {
    BottomNote
  }
}
</script>
