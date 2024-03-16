/**
 * Retrieves the list of drivers for a given season.
 *
 * @param {number} season - The season for which to retrieve the drivers.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the list of driver IDs.
 * @throws {Error} - If the API request fails or an unexpected error occurs.
 */
export async function getDriversPerSeason(season) {
  try {
    const url = `https://ergast.com/api/f1/${season}/drivers.json`;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("API request failed");
    }
    const data = await response.json();

    if (!data.MRData?.DriverTable?.Drivers) {
      return [];
    }

    const driverList = data.MRData.DriverTable.Drivers;

    return driverList;
  } catch (error) {
    throw new Error("An unexpected error has occurred " + error);
  }
}
