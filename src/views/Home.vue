<template>
  <div>Content of the page Home</div>
  <div id="result"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getRoundsAndCircuitsPerSeason } from '../scripts/F1RoundsPerSeason'
import { processDataFormula1, showDataRaceOnHTML } from '../scripts/F1ProcessDataPerRace.js'
import { getDriversPerSeason } from '../scripts/F1DriversData.js'
import { updateStandings, showStandingsOnHTML } from '../scripts/F1CalculatedStandings.js'
onMounted(async () => {
  const startTime = performance.now()

  const season = 2024
  const rounds = await getRoundsAndCircuitsPerSeason(season)
  const driversList = await getDriversPerSeason(season)
  console.log(driversList)

  const excludedDrivers = ['max_verstappen', 'perez']

  let driverStandings = []
  let constructorsStandings = []
  let races = []
  let promises = []

  const resultDiv = document.getElementById('result')

  const titleTable = document.createElement('h2')
  titleTable.textContent = `Season ${season}`
  resultDiv.appendChild(titleTable)

  for (let i = 1; i <= rounds; i++) {
    const promise = processDataFormula1(season, i, excludedDrivers)
      .then((data) => {
        if (data) {
          races.push(data)
          updateStandings(data, driverStandings, constructorsStandings)
        }
      })
      .catch((error) => {
        console.error('Error when processing Formula 1 data:', error)
      })
    promises.push(promise)
  }

  Promise.all(promises).then(() => {
    races = races.sort((a, b) => a.raceRound - b.raceRound)
    races.forEach((r) => showDataRaceOnHTML(r))
    showStandingsOnHTML(driverStandings, constructorsStandings)
    const endTime = performance.now()
    const timePassed = (endTime - startTime) / 1000
    console.log(`Time passed: ${timePassed} seconds`)
    console.log('Formula 1 data processed successfully')
  })
})
</script>

<script>
export default {
  name: 'MainHome'
}
</script>
