export function updateStandings(data, driverStandings, constructorsStandings) {
  data.raceStandings.forEach((result) => {
    const existingDriver = driverStandings.find((d) => d.driverId === result.Driver.driverId)
    if (existingDriver) {
      existingDriver.Pts += result.points
    } else {
      driverStandings.push({
        driverId: result.Driver.driverId,
        Driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
        Team: result.Constructor.name,
        Pts: result.points
      })
    }
  })

  data.raceStandings.forEach((result) => {
    const existingConstructor = constructorsStandings.find(
      (c) => c.constructorId === result.Constructor.constructorId
    )
    if (existingConstructor) {
      existingConstructor.Pts += result.points
    } else {
      constructorsStandings.push({
        constructorId: result.Constructor.constructorId,
        Constructor: `${result.Constructor.name}`,
        Pts: result.points
      })
    }
  })
}

export function orderByPoints(standings) {
  let aux = standings.sort((a, b) => b.Pts - a.Pts)
  aux.forEach((result, index) => {
    result.Pos = index + 1
  })
  return aux
}
