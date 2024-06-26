/**
 * Retrieves the number of rounds per season for the specified season.
 *
 * @param {number} season - The season for which to retrieve the number of rounds.
 * @returns {Promise<number>} - A promise that resolves to the total number of rounds for the specified season.
 * @throws {Error} - If the API request fails or if no results are found for the specified season.
 * @throws {Error} - If an unexpected error occurs.
 */
export async function getRoundsAndCircuitsPerSeason(season) {
  try {
    const url = `https://ergast.com/api/f1/${season}.json`
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error('API request failed')
    }
    const data = await response.json()

    if (data.MRData?.total === 0) {
      return 0
    }
    return data.MRData.total
  } catch (error) {
    throw new Error('An unexpected error has occurred ' + error)
  }
}
