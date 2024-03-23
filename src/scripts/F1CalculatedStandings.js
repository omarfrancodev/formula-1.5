export function updateStandings(data, driverStandings, constructorsStandings) {
  data.raceStandings.forEach((result) => {
    const existingDriver = driverStandings.find((d) => d.driverId === result.Driver.driverId)
    if (existingDriver) {
      existingDriver.Points += result.points
    } else {
      driverStandings.push({
        driverId: result.Driver.driverId,
        Name: `${result.Driver.givenName} ${result.Driver.familyName}`,
        Nationality: `${result.Driver.nationality}`,
        Constructor: result.Constructor.name,
        Points: result.points
      })
    }
  })

  data.raceStandings.forEach((result) => {
    const existingConstructor = constructorsStandings.find(
      (c) => c.constructorId === result.Constructor.constructorId
    )
    if (existingConstructor) {
      existingConstructor.Points += result.points
    } else {
      constructorsStandings.push({
        constructorId: result.Constructor.constructorId,
        Name: `${result.Constructor.name}`,
        Points: result.points
      })
    }
  })
}

export function orderByPoints(standings) {
  let aux = standings.sort((a, b) => b.Points - a.Points)
  aux.forEach((result, index) => {
    result.Position = index + 1
  })
  return aux
}
