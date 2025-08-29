// renderCell.js
export function renderCell(id, data) {
  return `
    <img class = "back-arrow" onclick="history.back()" src="media/angulo.png"></img>
    <h2>Cell: ${id}</h2>
    <p>Manufacturer: ${data.manufacturer}</p>
    <p>Model: ${data.model}</p>
    <p>Serial: ${data.serial}</p>
    <p>Carbon Footprint: ${data.carbon_footprint}</p>
    <p>Capacity: ${data.capacity}</p>
    <p>Voltage: ${data.voltage}</p>
    
  `;
}
