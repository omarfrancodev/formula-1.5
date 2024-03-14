/**
 * Retrieves Formula 1 data for a specific season and round.
 *
 * @param {number} season - The season for which to retrieve the data.
 * @param {number} round - The round for which to retrieve the data.
 * @returns {Promise<Object>} - A promise that resolves to the Formula 1 data.
 * @throws {Error} - If the API request fails or an unexpected error occurs.
 */
async function getDataFormula1(season, round) {
  try {
    const url = `https://ergast.com/api/f1/${season}/${round}/results.json`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("API request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An unexpected error has ocurred");
  }
}

/**
 * Process the data for a Formula 1 race.
 *
 * @param {number} season - The season of the race.
 * @param {number} round - The round of the race.
 * @returns {Object|null} - The processed race data or null if no results found.
 */
export async function processDataFormula1(season, round, excludedDrivers) {
  const data = await getDataFormula1(season, round);
  if (data === undefined) {
    throw new Error("Failed to retrieve data from getDataFormula1");
  }
  if (data.MRData.total === 0) {
    throw new Error("No results found for the specified round");
  }
  const race = data.MRData.RaceTable.Races[0];
  if (!race) {
    console.error("No race data found");
    return null;
  }

  const resultsFilters = race.Results.filter(
    (result) => !excludedDrivers.includes(result.Driver.driverId)
  ).sort((a, b) => a.position - b.position);

  const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  let fastestLap = null;
  let fastestLapRank = 20;

  resultsFilters.forEach((result, index) => {
    const points = index < 10 ? POINTS[index] : 0;
    const position = index + 1;

    result.points = points;
    result.position = position;
    result.positionText =
      result.positionText === "R" ? result.positionText : String(position);

    if (
      result.FastestLap &&
      parseInt(result.FastestLap.rank) < fastestLapRank
    ) {
      fastestLap = result;
      fastestLapRank = parseInt(result.FastestLap.rank);
    }
  });

  if (fastestLap && fastestLapRank <= 10 && fastestLap.position <= 10) {
    fastestLap.points += 1;
  }

  return {
    season: race.season,
    raceRound: race.round,
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    raceLocality: race.Circuit.Location.locality,
    raceCountry: race.Circuit.Location.country,
    raceStandings: resultsFilters,
  };
}

export function showDataRaceOnHTML(data) {
  const resultDiv = document.getElementById("result");

  const ulElement = document.createElement("ul");

  const seasonLi = document.createElement("li");
  seasonLi.textContent = `Season: ${data.season}`;

  const roundLi = document.createElement("li");
  roundLi.textContent = `Round: ${data.raceRound}`;

  const nameLi = document.createElement("li");
  nameLi.textContent = `Race Name: ${data.raceName}`;

  const circuitLi = document.createElement("li");
  circuitLi.textContent = `Circuit Name: ${data.circuitName}`;

  const localityLi = document.createElement("li");
  localityLi.textContent = `Locality: ${data.raceLocality}`;

  const countryLi = document.createElement("li");
  countryLi.textContent = `Country: ${data.raceCountry}`;

  ulElement.appendChild(seasonLi);
  ulElement.appendChild(roundLi);
  ulElement.appendChild(nameLi);
  ulElement.appendChild(circuitLi);
  ulElement.appendChild(localityLi);
  ulElement.appendChild(countryLi);

  const table = document.createElement("table");

  const headerRow = table.insertRow();
  const headers = [
    "Position",
    "Points",
    "Code Name",
    "Driver",
    "Number",
    "Constructor",
    "Fastest Lap",
    "Interval",
  ];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  data.raceStandings.forEach((driverData) => {
    const driver = driverData.Driver;
    const constructor = driverData.Constructor;
    const interval = driverData.Time;
    const fastestLap = driverData.FastestLap;

    const row = table.insertRow();
    row.insertCell().textContent = driverData.positionText;
    row.insertCell().textContent = driverData.points;
    row.insertCell().textContent = driver.code;
    row.insertCell().textContent = `${driver.givenName} ${driver.familyName}`;
    row.insertCell().textContent = driver.permanentNumber;
    row.insertCell().textContent = constructor.name;
    if (fastestLap?.Time) {
      row.insertCell().textContent = fastestLap.Time.time;
    } else {
      row.insertCell().textContent = "N/A";
    }
    if (interval?.time) {
      row.insertCell().textContent = interval.time;
    } else {
      row.insertCell().textContent = driverData.status;
    }
  });

  resultDiv.appendChild(ulElement);
  resultDiv.appendChild(table);
}
