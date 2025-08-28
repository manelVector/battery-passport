// renderCell.js
export function renderCell(id, data) {
  return `
    <h2>Cell: ${id}</h2>
    <p>Manufacturer: ${data.manufacturer}</p>
    <p>Model: ${data.model}</p>
    <p>Serial: ${data.serial}</p>
    <p>Carbon Footprint: ${data.carbon_footprint}</p>
    <p>Capacity: ${data.capacity}</p>
    <p>Voltage: ${data.voltage}</p>
    <div class="back-button" onclick="history.back()">⬅ Back</div>
  `;
}
