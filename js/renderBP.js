import { isMobile } from "./ui.js";

export function renderBP(id, data) {
  let html = `
  <div class="frame">
    <img class="back-arrow" onclick="history.back()" src="media/angulo.png"></img>
    <h2>Battery Passport ID: ${data.id_product_data.battery_passport_id}</h2>
      <div class="row"><div class="label">Model:</div><div class="value">${data.id_product_data.model}</div></div>
      <div class="row"><div class="label">Serial:</div><div class="value">${data.id_product_data.serial}</div></div>
      <div class="row"><div class="label">Batch:</div><div class="value">${data.id_product_data.batch}</div></div>
      <div class="row"><div class="label">Battery Status:</div><div class="value">${data.id_product_data.battery_status}</div></div>
  </div>

  <div class="frame">
    <div class="accordion">
      <div class="accordion-title">General Information</div>
      <div class="accordion-content">
          <div class="row"><div class="label">Manufacturer:</div><div class="value">${data.id_product_data.manufacturer}</div></div>
          <div class="row"><div class="label">Address:</div><div class="value">${data.id_product_data.address}</div></div>
          <div class="row"><div class="label">Web:</div><div class="value"><a href="${data.id_product_data.web_address}" target="_blank">${data.id_product_data.web_address}</a></div></div>
          <div class="row"><div class="label">Email:</div><div class="value"><a href="mailto:${data.id_product_data.mail_address}">${data.id_product_data.mail_address}</a></div></div>
          <div class="row"><div class="label">NIF:</div><div class="value">${data.id_product_data.NIF}</div></div>
          <div class="row"><div class="label">Manufacturing Place:</div><div class="value">${data.id_product_data.manufacturing_place}</div></div>
          <div class="row"><div class="label">Manufacturing Date:</div><div class="value">${data.id_product_data.manufacturing_date}</div></div>
          <div class="row"><div class="label">Warranty Period:</div><div class="value">${data.id_product_data.warranty_period}</div></div>
          <div class="row"><div class="label">Battery Category:</div><div class="value">${data.id_product_data.battery_category}</div></div>
          <div class="row"><div class="label">Battery Weight:</div><div class="value">${data.id_product_data.battery_weight}</div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Labels and Certifications</div>
      <div class="accordion-content">
      <div class="value">`;

  // Símbolos
  data.symbols_labels_doc_conformity.symbols_labels.forEach((symbol) => {
    if (symbol === "CE") {
      html += `<img class="symbols" src="media/ce_mark.png"></img>`;
    } else if (symbol === "WEEE") {
      html += `<img class="symbols" src="media/weee.png"></img>`;
    } else if (symbol === "UN38.3") {
      html += `<img class="symbols" src="media/un38_3.png"></img>`;
    }
  })


  html += `
        </div>
        <div class="row"><div class="label">Meaning:</div><div class="value">${data.symbols_labels_doc_conformity.meaning}</div></div>
        <div class="row"><div class="label">CE Doc:</div><div class="value"><a href="${data.symbols_labels_doc_conformity.CE_doc}" target="_blank">View Document</a></div></div>
        <div class="row"><div class="label">Extinguishing Agent:</div><div class="value">${data.symbols_labels_doc_conformity["extinguishing agent"]}</div></div>
        <div class="row"><div class="label">Carbon Footprint Label:</div><div class="value">${data.symbols_labels_doc_conformity.carbon_footprint_label}</div></div>
        <div class="row"><div class="label">Test Compliance:</div><div class="value"><a href="${data.symbols_labels_doc_conformity.test_compliance}" target="_blank">Compliance Link</a></div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Carbon Footprint</div>
      <div class="accordion-content">
        <div class="row"><div class="label">Carbon Footprint:</div><div class="value">${data.battery_carbon_footprint.carbon_footprint}</div></div>
        <div class="row"><div class="label">Raw Material Stage:</div><div class="value">${data.battery_carbon_footprint.raw_material_acquisition_and_pre_processing_lifecycle_stage}</div></div>
        <div class="row"><div class="label">Manufacturing Stage:</div><div class="value">${data.battery_carbon_footprint["main_product_production/manufacturing_lifecycle_stage"]}</div></div>
        <div class="row"><div class="label">Distribution Stage:</div><div class="value">${data.battery_carbon_footprint.distribution_lifecycle_stage}</div></div>
        <div class="row"><div class="label">End of Life:</div><div class="value">${data.battery_carbon_footprint.end_of_life_and_recycling_lifecycle_stage}</div></div>
        <div class="row"><div class="label">Performance Class:</div><div class="value">${data.battery_carbon_footprint.carbon_footprint_performance_class}</div></div>
        <div class="row"><div class="label">Study Link:</div><div class="value"><a href="${data.battery_carbon_footprint.study_weblink}" target="_blank">View Study</a></div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Materials & Composition</div>
      <div class="accordion-content">
        <div class="row"><div class="label">Chemistry:</div><div class="value">${data.battery_materials_and_composition.battery_chemistry}</div></div>
        <div class="row"><div class="label">Critical Materials:</div><div class="value">${data.battery_materials_and_composition.critical_raw_materials.join(", ")}</div></div>
        <div class="row"><div class="label">Cathode:</div><div class="value">${data.battery_materials_and_composition.materials_used.cathode}</div></div>
        <div class="row"><div class="label">Anode:</div><div class="value">${data.battery_materials_and_composition.materials_used.anode}</div></div>
        <div class="row"><div class="label">Electrolyte:</div><div class="value">${data.battery_materials_and_composition.materials_used.electrolyte}</div></div>
        <div class="row"><div class="label">Hazardous Substances:</div><div class="value">${data.battery_materials_and_composition.hazardous_substances.join(", ")}</div></div>
        <div class="row"><div class="label">Impact:</div><div class="value">${data.battery_materials_and_composition.impact.replace(/\. /g, '.<br>')}</div></div>
        <div class="value"><img class="symbols" src="media/ghs07.png"><img class="symbols" src="media/ghs08.png"></img></div>

        </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Circularity & Resource Efficiency</div>
      <div class="accordion-content">
        <div class="row"><div class="label">Manuals:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.dismantling_information.manuals}" target="_blank">View Manuals</a></div></div>
        <div class="row"><div class="label">Part Numbers:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.dismantling_information.part_numbers}" target="_blank">View Parts</a></div></div>
        <div class="row"><div class="label">Spare Parts Sources:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.dismantling_information.spare_parts_sources}" target="_blank">Sources</a></div></div>
        <div class="row"><div class="label">Safety Measures:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.dismantling_information.safety_measures}" target="_blank">Read</a></div></div>
        <div class="row"><div class="label">Pre-Consumer Recycled:</div><div class="value">${Object.entries(data.circularity_and_resource_efficiency.pre_consumer_recycled_content).map(([k,v])=>`${k}: ${v}`).join(", ")}</div></div>
        <div class="row"><div class="label">Post-Consumer Recycled:</div><div class="value">${Object.entries(data.circularity_and_resource_efficiency.post_consumer_recycled_content).map(([k,v])=>`${k}: ${v}`).join(", ")}</div></div>
        <div class="row"><div class="label">Renewable Content:</div><div class="value">${data.circularity_and_resource_efficiency.renewable_content_share}</div></div>
        <div class="row"><div class="label">End User Role:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.end_user_role}" target="_blank">More Info</a></div></div>
        <div class="row"><div class="label">Battery Collection & End of Life:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life}" target="_blank">Details</a></div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Performance & Durability</div>
      <div class="accordion-content">
        <div class="row"><div class="label">Nominal Voltage:</div><div class="value">${data.performance_and_durability.voltage_and_power.nominal_voltage}</div></div>
        <div class="row"><div class="label">Minimum Voltage:</div><div class="value">${data.performance_and_durability.voltage_and_power.minimum_voltage}</div></div>
        <div class="row"><div class="label">Maximum Voltage:</div><div class="value">${data.performance_and_durability.voltage_and_power.maximum_voltage}</div></div>
        <div class="row"><div class="label">Original Power Capability:</div><div class="value">${data.performance_and_durability.voltage_and_power.original_power_capability}</div></div>
        <div class="row"><div class="label">Maximum Permitted Power:</div><div class="value">${data.performance_and_durability.voltage_and_power.maximum_permitted_battery_power}</div></div>
        <div class="row"><div class="label">Expected Life:</div><div class="value">${data.performance_and_durability.lifetime.expected_calendar_life_years}, ${data.performance_and_durability.lifetime.expected_cycle_life}</div></div>
        <div class="row"><div class="label">Cycle Life Test:</div><div class="value">${data.performance_and_durability.lifetime.cycle_life_reference_test}</div></div>
        <div class="row"><div class="label">C-rate:</div><div class="value">${data.performance_and_durability.lifetime.c_rate_cycle_life_test}</div></div>
        <div class="row"><div class="label">Capacity Throughput:</div><div class="value">${data.performance_and_durability.temperature_and_throughput.capacity_throughput}</div></div>
        <div class="row"><div class="label">Temperature Range:</div><div class="value">${data.performance_and_durability.temperature_and_throughput.temperature_idle_range.lower_boundary} - ${data.performance_and_durability.temperature_and_throughput.temperature_idle_range.upper_boundary}</div></div>
      </div>
    </div>
  </div>

  <div class="frame">
    <img class="interactive_img" src="media/BatPack.png" usemap="#image-map">
    <map name="image-map">`;

  Object.entries(data.cell_info.cells_id).forEach(([key, cellId], i) => {
    html += `<area target="" alt="${key}" title="${key}" href="index.html?id=${cellId}" coords="${getCellCoords(i)}" shape="rect">`;
  });

  html += `
    </map>
  </div>`;

  return html;
}

function getCellCoords(index) {
  const coords = [
    "135,2082,564,2274","135,1863,565,2055","138,1643,570,1833","136,1423,564,1616",
    "136,1203,562,1396","135,987,562,1170","134,765,573,950","133,544,562,734",
    "128,324,565,515","126,106,561,296","651,108,1084,294","653,323,1081,518",
    "650,545,1079,734","656,765,1079,955","654,982,1078,1177","651,1203,1080,1399",
    "653,1420,1082,1614","655,1645,1079,1836","648,1863,1081,2054","653,2081,1085,2274"
  ];
  return coords[index] || "0,0,0,0";
}
