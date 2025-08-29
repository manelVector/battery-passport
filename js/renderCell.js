// renderCell.js
export function renderCell(id, data) {
  return `
  <div class="frame">
    <img class = "back-arrow" onclick="history.back()" src="media/angulo.png"></img>
    <h2>Cell: ${id}</h2>
    <div class="row"><div class="label">Manufacturer:</div><div class="value"> ${data.manufacturer}</div></div>
    <div class="row"><div class="label">Model:</div><div class="value"> ${data.model}</div></div>
    <div class="row"><div class="label">Serial:</div><div class="value"> ${data.serial}</div></div>
    <div class="row"><div class="label">Carbon Footprint:</div><div class="value"> ${data.carbon_footprint}</div></div>
    <div class="row"><div class="label">Capacity:</div><div class="value"> ${data.capacity}</div></div>
    <div class="row"><div class="label">Voltage:</div><div class="value"> ${data.voltage}</div></div>
  </div>
    
  `;
}
