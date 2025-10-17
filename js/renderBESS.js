// renderBESS.js

export function renderBESS(id, data) {
  let html = `
    <div class="frame"> 
      <h3>BESS Passport ID: ${data.general_info.battery_passport_id}</h3>
      <div class="row"><div class="label">BESS Model:</div><div class="value">${data.general_info.bess_model}</div></div>
      <div class="row"><div class="label">Batch Number:</div><div class="value">${data.general_info.batch_number}</div></div>
      <div class="row"><div class="label">Serial Number:</div><div class="value">${data.general_info.serial}</div></div>
    </div>

    <div class="frame">
      <div class="accordion">
        <div class="accordion-title">Manufacturer</div>
        <div class="accordion-content">
          <div class="row"><div class="label">Name:</div><div class="value">${data.manufacturer.name}</div></div>
          <div class="row"><div class="label">Registered Trade Name:</div><div class="value">${data.manufacturer.registered_trade_name}</div></div>
          <div class="row"><div class="label">Postal Address:</div><div class="value">${data.manufacturer.postal_address}</div></div>
          <div class="row"><div class="label">Web Address:</div><div class="value"><a href="${data.manufacturer.web_address}" target="_blank">${data.manufacturer.web_address}</a></div></div>
          <div class="row"><div class="label">Email Address:</div><div class="value"><a href="mailto:${data.manufacturer.email_address}">${data.manufacturer.email_address}</a></div></div>
          <div class="row"><div class="label">Manufacturer ID:</div><div class="value">${data.manufacturer.manufacturer_id}</div></div>
          <div class="row"><div class="label">Manufacturing Place:</div><div class="value">${data.manufacturer.manufacturing_place}</div></div>
          <div class="row"><div class="label">Manufacturing Date:</div><div class="value">${data.manufacturer.manufacturing_date}</div></div>
          <div class="row"><div class="label">Warranty Period:</div><div class="value">${data.manufacturer.warranty_period}</div></div>
        </div>
      </div>


      <div class="accordion">
        <div class="accordion-title">Technical Specs</div>
        <div class="accordion-content">
          <div class="row"><div class="label">BESS Category:</div><div class="value">${data.technical_specs.bess_category}</div></div>
          <div class="row"><div class="label">BESS Status:</div><div class="value">${data.technical_specs.bess_status}</div></div>
          <div class="row"><div class="label">Battery Type:</div><div class="value">${data.technical_specs.battery_type}</div></div>
          <div class="row"><div class="label">Dimensions:</div><div class="value">${data.technical_specs.dimensions}</div></div>
          <div class="row"><div class="label">Weight:</div><div class="value">${data.technical_specs.weight}</div></div>
          <div class="row"><div class="label">Rated Capacity (Ah):</div><div class="value">${data.technical_specs.rated_capacity_ah}</div></div>
          <div class="row"><div class="label">Rated Energy (kWh):</div><div class="value">${data.technical_specs.rated_energy_kwh}</div></div>
          <div class="row"><div class="label">Rated AC Power:</div><div class="value">${data.technical_specs.rated_ac_power}</div></div>
          <div class="row"><div class="label">Rated AC Voltage:</div><div class="value">${data.technical_specs.rated_ac_voltage}</div></div>
          <div class="row"><div class="label">Rated Grid Frequency:</div><div class="value">${data.technical_specs.rated_grid_frequency}</div></div>
          <div class="row"><div class="label">DC Voltage Range:</div><div class="value">${data.technical_specs.dc_voltage_range}</div></div>
          <div class="row"><div class="label">AC Voltage Range:</div><div class="value">${data.technical_specs.ac_voltage_range}</div></div>
          <div class="row"><div class="label">Max AC Current:</div><div class="value">${data.technical_specs.max_ac_current}</div></div>
          <div class="row"><div class="label">Aux. Power Input Voltage:</div><div class="value">${data.technical_specs.aux_power_input_voltage}</div></div>
          <div class="row"><div class="label">Aux. Power Input Current:</div><div class="value">${data.technical_specs.aux_power_input_current}</div></div>
          <div class="row"><div class="label">Aux. Power Frequency:</div><div class="value">${data.technical_specs.aux_power_frequency}</div></div>
          <div class="row"><div class="label">Operating Temperature:</div><div class="value">${data.technical_specs.operating_temperature}</div></div>
          <div class="row"><div class="label">IP Rating:</div><div class="value">${data.technical_specs.ip_rating}</div></div>
          <div class="row"><div class="label">Cooling Method:</div><div class="value">${data.technical_specs.cooling_method}</div></div>
          <div class="row"><div class="label">Inverter Topology:</div><div class="value">${data.technical_specs.inverter_topology}</div></div>
          <div class="row"><div class="label">Altitude:</div><div class="value">${data.technical_specs.altitude}</div></div>
          <div class="row"><div class="label">Testing and Standards:</div><div class="value">${data.technical_specs.testing_and_standards}</div></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Compliance Labels</div>
        <div class="accordion-content">
          <div class="row"><div class="label">Symbols:</div><div class="value">`;
  
  // Mostrar iconos de compliance_labels
  data.compliance_labels.symbols_labels.forEach(symbol => {
    if (symbol === "CE") html += `<img class="symbols" src="media/ce_mark.png">`;
    else if (symbol === "WEEE") html += `<img class="symbols" src="media/weee.png">`;
    else if (symbol === "UN38.3") html += `<img class="symbols" src="media/un38_3.png">`;
    else if (symbol === "Refer to the instruction manual") html += `<img class="symbols" src="media/instruction_manual.png">`;
  });

  html += `</div></div></div></div></div>`;

  // Batpacks interactive image (mantener igual)
  html += `
    <div class="frame">
      <img class="interactive_img" src="media/BessString.png" usemap="#image-map">
      <map name="image-map">`;

  data.batpacks.forEach((bpId, i) => {
    html += `<area alt="BP${i+1}" title="BP${i+1}" href="index.html?id=${bpId}" coords="${getBPcoords(i)}" shape="rect">`;
  });

  html += `</map></div>`;

  return html;
}

function getBPcoords(index) {
  const coords = [
    "105,80,542,296","109,340,537,557","110,604,534,828","112,869,533,1092","112,1138,537,1360",
    "108,1400,534,1623","105,1668,534,1890","638,74,1066,299","637,338,1066,561","637,607,1070,828",
    "641,869,1067,1094","642,1135,1068,1355","642,1403,1060,1624","636,1667,1060,1888"
  ];
  return coords[index] || "0,0,0,0";
}
