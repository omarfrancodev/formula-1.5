<template>
  <div
    class="pt-6 md:pt-10 px-5 md:px-28 overflow-x-auto font-titillium text-justify text-base md:text-lg"
  >
    <p>
      This page shows the <span class="font-bold"> Drivers'</span> and
      <span class="font-bold">Constructors'</span> standings for the current
      <a href="#note" class="text-redf1 hover:text-lightbluetext font-bold">F1.5*</a> season ({{
        season
      }}), without the <span class="text-[#001d49] font-bold">Red Bull</span> team. For this reason
      we have to recalculate the scores and <u>the content may take some time to load</u>.<br />
      You can view the full season results, filter by teams or drivers, or check other seasons in
      the <span v-if="isMobile">Menu</span><span v-else>Navigation Bar</span> (<span
        class="text-[#001d49] font-bold"
        >Red Bull</span
      >
      is excluded by default).
    </p>
  </div>
  <div class="py-4 md:py-8 px-0 md:px-28">
    <LoadingComponent v-if="isLoading" />
    <div v-else-if="timeout">
      <p class="py-3 md:py-6 px-2 md:px-4 text-redf1 text-xl md:text-3xl font-f1bold">
        Something wrong happened, we are trying to solve it...
      </p>
    </div>
    <div v-else class="bg-white">
      <p class="pt-3 md:pt-6 px-3 md:px-6 text-black text-lg md:text-2xl font-f1wide">
        Season {{ season }}
      </p>
      <p class="pt-3 md:pt-6 px-3 md:px-6 text-black text-sm md:text-base font-f1wide">
        {{ titleD }}
      </p>
      <TableComponent
        :items="driverStandings"
        :columns="['Pos', 'Driver', 'Team', 'Pts']"
        :accessName="['Position', 'Name', 'Constructor', 'Points']"
      />
      <p class="pt-3 md:pt-6 px-3 md:px-6 text-black text-sm md:text-base font-f1wide">
        {{ titleC }}
      </p>
      <TableComponent
        :items="constructorsStandings"
        :columns="['Pos', 'Team', 'Pts']"
        :accessName="['Position', 'Name', 'Points']"
      />
    </div>
  </div>
  <BottomNote id="note" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRoundsAndCircuitsPerSeason } from '../scripts/F1RoundsPerSeason'
import { processDataFormula1 } from '../scripts/F1ProcessDataPerRace.js'
import { updateStandings, orderByPoints } from '../scripts/F1CalculatedStandings.js'
import LoadingComponent from '../components/Loading.vue'

const titleD = ref('Driver Standings')
const titleC = ref('Constructor Standings')

const driverStandings = ref([])
const constructorsStandings = ref([])
const isLoading = ref(true)
const timeout = ref(false)

const d = new Date()
const season = ref(d.getFullYear())
const isMobile = window.innerWidth < 768
let promises = []

onMounted(async () => {
  let rounds = ''

  try {
    rounds = await getRoundsAndCircuitsPerSeason(season.value)
  } catch (error) {
    timeout.value = true
    console.error('Error when processing Formula 1 data:', error)
  }
  const excludedDrivers = ['max_verstappen', 'perez']

  for (let i = 1; i <= rounds; i++) {
    const promise = processDataFormula1(season.value, i, excludedDrivers)
      .then((data) => {
        if (data) {
          updateStandings(data, driverStandings.value, constructorsStandings.value)
        }
      })
      .catch((error) => {
        timeout.value = true
        console.error('Error when processing Formula 1 data:', error)
      })
    promises.push(promise)
  }
  Promise.all(promises).then(() => {
    orderByPoints(driverStandings.value)
    orderByPoints(constructorsStandings.value)

    isLoading.value = false
  })
})
</script>

<script>
import TableComponent from '../components/Table.vue'
import BottomNote from '../components/BottomNote.vue'

export default {
  name: 'HomeView',
  components: {
    TableComponent,
    LoadingComponent,
    BottomNote
  }
}
</script>
