// renderBP.js (versión ampliada con todos los campos excepto cell_info)
export function renderBP(id, data) {
  let html = /*html*/`
  <div class="container">
  <div class="frame">
    <h3>Battery Passport ID: ${data.id_product_data.battery_passport_id}</h3>
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
          <div class="row"><div class="label">Date of Putting Into Service:</div><div class="value">${data.id_product_data.date_of_putting_into_service}</div></div>
          <div class="row"><div class="label">Warranty Period:</div><div class="value">${data.id_product_data.warranty_period}</div></div>
          <div class="row"><div class="label">Battery Category:</div><div class="value">${data.id_product_data.battery_category}</div></div>
          <div class="row"><div class="label">Battery Weight:</div><div class="value">${data.id_product_data.battery_weight}</div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Labels and Certifications</div>
      <div class="accordion-content">
        <div class="centered-content">`;

  data.symbols_labels_doc_conformity.symbols_labels.forEach((symbol) => {
    if (symbol === "CE") {
      html += `<img class="symbols" src="media/ce_mark.png" alt="CE Mark"></img>`;
    } else if (symbol === "WEEE") {
      html += `<img class="symbols" src="media/weee.png" alt="WEEE"></img>`;
    } else if (symbol === "UN38.3") {
      html += `<img class="symbols" src="media/un38_3.png" alt="UN38.3"></img>`;
    } 
  });

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
      <div class="accordion-title">Supply Chain Due Diligence</div>
      <div class="accordion-content">
        <div class="row"><div class="label">Due Diligence Report:</div><div class="value">${data.supply_chain_due_diligence.Information_of_due_diligence_report || "No information provided"}</div></div>
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
        <div class="row"><div class="label">Impact:</div></div>
        <div class="centered-content">${data.battery_materials_and_composition.impact.replace(/\. /g, '.<br>')}</div>
        <div class="centered-content"><img class="symbols" src="media/ghs07.png"></img><img class="symbols" src="media/ghs08.png"></img></div>
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
        <div class="row"><div class="label">End User Role in Waste Prevention:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.end_user_role_in_waste_prevention}" target="_blank">More Info</a></div></div>
        <div class="row"><div class="label">End User Separate Collection Role:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.end_user_separate_collection_role}" target="_blank">Details</a></div></div>
        <div class="row"><div class="label">Battery Collection & End of Life:</div><div class="value"><a href="${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life}" target="_blank">Details</a></div></div>
      </div>
    </div>

    <div class="accordion">
      <div class="accordion-title">Performance & Durability</div>
      <div class="accordion-content">
        ${renderPerformance(data.performance_and_durability)}
      </div>
    </div>
  </div>

  <div class="interactive">
    <img class="interactive_img_bp" src="media/CellString.png" usemap="#image-map">
    <map name="image-map">`;

  data.cell_info.cells_id.forEach((cellId, i) => {
    html += `<area class="area_bp" alt="CELL${i+1}" title="CELL${i+1}" href="index.html?id=${cellId}" coords="${getCellCoords(i)}" shape="rect">`;
  });

  html += `
    </map>
  </div></div>`;
  return html;
}

// ---- Funciones auxiliares ----

function renderPerformance(perf) {
  return `
    <div class="row"><div class="label">State of Charge:</div><div class="value">${perf.voltage_and_power.state_of_charge}</div></div>
    <div class="row"><div class="label">Minimum Voltage:</div><div class="value">${perf.voltage_and_power.minimum_voltage}</div></div>
    <div class="row"><div class="label">Maximum Voltage:</div><div class="value">${perf.voltage_and_power.maximum_voltage}</div></div>
    <div class="row"><div class="label">Nominal Voltage:</div><div class="value">${perf.voltage_and_power.nominal_voltage}</div></div>
    <div class="row"><div class="label">Rated Capacity:</div><div class="value">${perf.voltage_and_power.rated_capacity}</div></div>
    <div class="row"><div class="label">Remaining Capacity:</div><div class="value">${perf.voltage_and_power.remaining_capacity}</div></div>
    <div class="row"><div class="label">Original Power Capability:</div><div class="value">${perf.voltage_and_power.original_power_capability}</div></div>
    <div class="row"><div class="label">Remaining Power Capability:</div><div class="value">${perf.voltage_and_power.remaining_power_capability}</div></div>
    <div class="row"><div class="label">Power Fade:</div><div class="value">${perf.voltage_and_power.power_fade}</div></div>
    <div class="row"><div class="label">Max Permitted Power:</div><div class="value">${perf.voltage_and_power.maximum_permitted_battery_power}</div></div>

    <div class="row"><div class="label">Initial Round Trip Efficiency:</div><div class="value">${perf.energy_efficiency.initial_round_trip_efficiency}</div></div>
    <div class="row"><div class="label">Round Trip Efficiency (50% Life):</div><div class="value">${perf.energy_efficiency.round_trip_efficiency_at_50pct_cycle_life}</div></div>
    <div class="row"><div class="label">Remaining Round Trip Efficiency:</div><div class="value">${perf.energy_efficiency.remaining_round_trip_efficiency}</div></div>
    <div class="row"><div class="label">Efficiency Fade:</div><div class="value">${perf.energy_efficiency.energy_round_trip_efficiency_fade}</div></div>

    <div class="row"><div class="label">Self Discharge Rate:</div><div class="value">${perf.self_discharge_and_resistance.self_discharge_rate_evolution}</div></div>
    <div class="row"><div class="label">Initial Internal Resistance (Cell):</div><div class="value">${perf.self_discharge_and_resistance.initial_internal_resistance_cell}</div></div>
    <div class="row"><div class="label">Initial Internal Resistance (Pack):</div><div class="value">${perf.self_discharge_and_resistance.initial_internal_resistance_pack}</div></div>
    <div class="row"><div class="label">Internal Resistance Increase (Pack):</div><div class="value">${perf.self_discharge_and_resistance.internal_resistance_increase_pack}</div></div>

    <div class="row"><div class="label">Expected Calendar Life:</div><div class="value">${perf.lifetime.expected_calendar_life_years}</div></div>
    <div class="row"><div class="label">Expected Cycle Life:</div><div class="value">${perf.lifetime.expected_cycle_life}</div></div>
    <div class="row"><div class="label">Number of Full Cycles:</div><div class="value">${perf.lifetime.number_of_full_cycles}</div></div>
    <div class="row"><div class="label">Cycle Life Reference Test:</div><div class="value">${perf.lifetime.cycle_life_reference_test}</div></div>
    <div class="row"><div class="label">C-Rate Test:</div><div class="value">${perf.lifetime.c_rate_cycle_life_test}</div></div>
    <div class="row"><div class="label">Capacity Fade:</div><div class="value">${perf.lifetime.capacity_fade}</div></div>

    <div class="row"><div class="label">Energy Throughput:</div><div class="value">${perf.temperature_and_throughput.energy_throughtput}</div></div>
    <div class="row"><div class="label">Capacity Throughput:</div><div class="value">${perf.temperature_and_throughput.capacity_throughput}</div></div>
    <div class="row"><div class="label">Average Temperature:</div><div class="value">${perf.temperature_and_throughput.temperature_information}</div></div>
    <div class="row"><div class="label">Idle Temp Range:</div><div class="value">${perf.temperature_and_throughput.temperature_idle_range.lower_boundary} - ${perf.temperature_and_throughput.temperature_idle_range.upper_boundary}</div></div>
    <div class="row"><div class="label">Time Above Upper Boundary:</div><div class="value">${perf.temperature_and_throughput.time_above_upper_boundary}</div></div>
    <div class="row"><div class="label">Time Below Lower Boundary:</div><div class="value">${perf.temperature_and_throughput.time_below_lower_boundary}</div></div>

    <div class="row"><div class="label">Deep Discharge Events:</div><div class="value">${perf.events_and_safety.number_of_deep_discharge_events}</div></div>
    <div class="row"><div class="label">Overcharge Events:</div><div class="value">${perf.events_and_safety.number_of_overcharge_events}</div></div>
    <div class="row"><div class="label">Accidents:</div><div class="value">${perf.events_and_safety.accidents_information}</div></div>
  `;
}

function getCellCoords(index) {
  const coords = [
    "383,5088,1440,5516",
    "394,4624,1434,5003",
    "380,4131,1420,4494",
    "360,3585,1482,4004",
    "375,3123,1437,3494",
    "369,2626,1437,2989",
    "363,2115,1451,2506",
    "358,1626,1451,2000",
    "369,1128,1446,1482",
    "360,614,1440,988",
    "1723,594,2806,1000",
    "1726,1118,2797,1492",
    "1734,1622,2799,1993",
    "1735,2105,2806,2511",
    "1720,2600,2800,2995",
    "1723,3113,2806,3490",
    "1703,3581,2814,4000",
    "1706,4088,2823,4502",
    "1709,4600,2808,4997",
    "1706,5084,2808,5510"
  ];
  return coords[index] || "0,0,0,0";
}


