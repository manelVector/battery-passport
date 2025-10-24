// renderCell.js
export function renderCell(id, data) {
  let html = /*html*/`
  <div class = "container">
    <div class="frame">
      <h3>Cell: ${id}</h3>
    </div>
    <div class ="frame">
      <div class="accordion">
        <div class="accordion-title active">General Information</div>
        <div class="accordion-content open">
          <div class="row"><div class="label">Manufacturer:</div><div class="value">${data.manufacturer_name}</div></div>
          <div class="row"><div class="label">EU Distributor:</div><div class="value">${data.eu_distributor_name}</div></div>
          <div class="row"><div class="label">Manufacturing Place:</div><div class="value">${data.manufacturing_place}</div></div>
          <div class="row"><div class="label">Cell Model:</div><div class="value">${data.cell_model}</div></div>
          <div class="row"><div class="label">Cell Chemistry:</div><div class="value">${data.cell_chemistry}</div></div>
          <div class="row"><div class="label">Cell Mass:</div><div class="value">${data.cell_mass}</div></div>
          <div class="row"><div class="label">Cell Dimensions:</div><div class="value">${data.cell_dimensions}</div></div>
          <div class="row"><div class="label">Extinguishing Agent:</div><div class="value">${data.extinguishing_agent}</div></div>
          <div class="row"><div class="label">Nominal Voltage:</div><div class="value">${data.nominal_voltage}</div></div>
          <div class="row"><div class="label">Minimum Voltage:</div><div class="value">${data.minimum_voltage}</div></div>
          <div class="row"><div class="label">Maximum Voltage:</div><div class="value">${data.maximum_voltage}</div></div>
          <div class="row"><div class="label">Cell Capacity (Ah):</div><div class="value">${data.cell_capacity_ah}</div></div>
          <div class="row"><div class="label">Cell Capacity (Wh):</div><div class="value">${data.cell_capacity_wh}</div></div>
          <div class="row"><div class="label">Internal Resistance:</div><div class="value">${data.internal_resistance}</div></div>
          <div class="row"><div class="label">Temperature Range Idle:</div><div class="value">${data.temperature_idle_lower} - ${data.temperature_idle_upper}</div></div>
          <div class="row"><div class="label">Testing & Certifications:</div><div class="value">${data.testing_and_certifications}</div></div>
        </div>
      </div>
    </div>

    <div class="interactive">
      <img class="interactive_img" src="media/cell.png" usemap="#image-map">
    </div>
  </div>
  `;

  return html;
}
