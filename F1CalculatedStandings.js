export function updateStandings(data, driverStandings, constructorsStandings) {
  data.raceStandings.forEach((result) => {
    const existingDriver = driverStandings.find(
      (d) => d.Driver.driverId === result.Driver.driverId
    );
    if (existingDriver) {
      existingDriver.Points += result.points;
    } else {
      driverStandings.push({
        Driver: result.Driver,
        Position: result.position,
        Car: result.Constructor.name,
        Points: result.points,
      });
    }
  });

  data.raceStandings.forEach((result) => {
    const existingConstructor = constructorsStandings.find(
      (c) => c.Constructor.constructorId === result.Constructor.constructorId
    );
    if (existingConstructor) {
      existingConstructor.Points += result.points;
    } else {
      constructorsStandings.push({
        Constructor: result.Constructor,
        Points: result.points,
      });
    }
  });
  driverStandings = orderByPoints(driverStandings);
  constructorsStandings = orderByPoints(constructorsStandings);
}

function orderByPoints(standings) {
  return standings.sort((a, b) => {
    if (b.Points !== a.Points) {
      return b.Points - a.Points;
    } else {
      return a.Position - b.Position;
    }
  });
}

export async function showStandingsOnHTML(
  driverStandings,
  constructorsStandings
) {
  createTable("Drivers", driverStandings, true);
  createTable("Constructors", constructorsStandings, false);
}

function createTable(title, standings, isDriver) {
  const resultDiv = document.getElementById("result");

  const titleTable = document.createElement("h2");
  titleTable.textContent = `${title} Standings`;
  resultDiv.appendChild(titleTable);

  const table = document.createElement("table");

  const headerRow = table.insertRow();

  let headers = [];
  if (isDriver) {
    headers = ["Position", "Name", "Nationality", "Car", "Points"];
  } else {
    headers = ["Position", "Team", "Points"];
  }
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  standings.forEach((data, index) => {
    const row = table.insertRow();
    row.insertCell().textContent = index + 1;
    if (isDriver) {
      row.insertCell().textContent = `${data.Driver.givenName} ${data.Driver.familyName}`;
      row.insertCell().textContent = `${data.Driver.nationality}`;
      row.insertCell().textContent = data.Car;
    } else {
      row.insertCell().textContent = `${data.Constructor.name}`;
    }
    row.insertCell().textContent = data.Points;
  });

  resultDiv.appendChild(table);
}
