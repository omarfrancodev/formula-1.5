import { getRoundsAndCircuitsPerSeason } from "./F1RoundsAndCircuitSeason.js";
import { processDataFormula1, showDataRaceOnHTML } from "./F1DataPerRace.js";
import { getDriversPerSeason } from "./F1DriversData.js";
import {
  updateStandings,
  showStandingsOnHTML,
} from "./F1CalculatedStandings.js";

const season = 2021;
const seasonData = await getRoundsAndCircuitsPerSeason(season);
const driversList = await getDriversPerSeason(season);
const circuitsList = seasonData.circuits;
console.log(driversList)
console.log(circuitsList)

const excludedDrivers = ["max_verstappen", "perez"];

let driverStandings = [];
let constructorsStandings = [];
let promises = [];

for (let i = 1; i <= seasonData.rounds; i++) {
  const promise = processDataFormula1(season, i, excludedDrivers)
    .then((processedData) => {
      if (processedData) {
        updateStandings(processedData, driverStandings, constructorsStandings);
        showDataRaceOnHTML(processedData);
      }
    })
    .catch((error) => {
      console.error("Error when processing Formula 1 data:", error);
    });
  promises.push(promise);
}

Promise.all(promises).then(() => {
  showStandingsOnHTML(driverStandings, constructorsStandings);
  console.log("Formula 1 data processed successfully");
});
