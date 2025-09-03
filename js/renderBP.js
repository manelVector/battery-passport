export function renderBP(id, data) {
    let html = 
    `<div class="frame">
      <img class="back-arrow" onclick="history.back()" src="media/angulo.png"></img>
      <h2>Battery Pack: ${id}</h2>
        <div class="row"><div class="label">Battery Passport ID:</div><div class="value">${data.id_product_data.battery_passport_id}</div></div>
        <div class="row"><div class="label">Model:</div><div class="value">${data.id_product_data.model}</div></div>
        <div class="row"><div class="label">Serial:</div><div class="value">${data.id_product_data.serial}</div></div>
        <div class="row"><div class="label">Battery Status:</div><div class="value">${data.id_product_data.battery_status}</div></div>
      </div>
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
            <div class="row"><div class="label">VAT:</div><div class="value">${data.id_product_data.VAT}</div></div>
            <div class="row"><div class="label">Manufacturing Place:</div><div class="value">${data.id_product_data.manufacturing_place}</div></div>
            <div class="row"><div class="label">Manufacturing Date:</div><div class="value">${data.id_product_data.manufacturing_date}</div></div>
            <div class="row"><div class="label">Warranty Period:</div><div class="value">${data.id_product_data.warranty_period}</div></div>
            <div class="row"><div class="label">Battery Category:</div><div class="value">${data.id_product_data.battery_category}</div></div>
            <div class="row"><div class="label">Battery Weight:</div><div class="value">${data.id_product_data.battery_weight}</div></div>
            <div class="row"><div class="label">Battery Status:</div><div class="value">${data.id_product_data.battery_status}</div></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Labels and Certifications</div>
        <div class="accordion-content">`;
        data.symbols_labels_doc_conformity.symbols_labels.forEach((symbol, i) => {
          if (data.symbols_labels_doc_conformity.symbols_labels[i]==="CE"){
            html += `<img class = "symbols" src="media/ce_mark.png"></img>`;  
          }else if(data.symbols_labels_doc_conformity.symbols_labels[i]==="WEEE"){
            html += `<img class = "symbols"src="media/weee.png"></img>`;
          }else if(data.symbols_labels_doc_conformity.symbols_labels[i]==="UN38.3"){
            html += `<img class = "symbols"src="media/un38_3.png"></img>`;
          }
        });

      html += `
            <div class="row"><div class="label">Meaning:</div><div class="value">${data.symbols_labels_doc_conformity.meaning}</div></div>
            <div class="row"><div class="label">CE Doc:</div><div class="value">${data.symbols_labels_doc_conformity.CE_doc}</div></div>
            <div class="row"><div class="label">Extinguishing Agent:</div><div class="value">${data.symbols_labels_doc_conformity["extinguishing agent"]}</div></div>
            <div class="row"><div class="label">Carbon Footprint Label:</div><div class="value">${data.symbols_labels_doc_conformity.carbon_footprint_label}</div></div>
            <div class="row"><div class="label">Test Compliance:</div><div class="value">${data.symbols_labels_doc_conformity.test_compliance}</div></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Carbon Footprint</div>
        <div class="accordion-content">
            <div class="row"><div class="label">Carbon Footprint:</div><div class="value">${data.battery_carbon_footprint.carbon_footprint}</div></div>
            <div class="row"><div class="label">Raw Material Acquisition:</div><div class="value">${data.battery_carbon_footprint.raw_material_acquisition_and_pre_processing_lifecycle_stage}</div></div>
            <div class="row"><div class="label">Manufacturing Stage:</div><div class="value">${data.battery_carbon_footprint["main_product_production/manufacturing_lifecycle_stage"]}</div></div>
            <div class="row"><div class="label">Distribution Stage:</div><div class="value">${data.battery_carbon_footprint.distribution_lifecycle_stage}</div></div>
            <div class="row"><div class="label">End of Life & Recycling:</div><div class="value">${data.battery_carbon_footprint.end_of_life_and_recycling_lifecycle_stage}</div></div>
            <div class="row"><div class="label">CF Performance Class:</div><div class="value">${data.battery_carbon_footprint.carbon_footprint_performance_class}</div></div>
            <div class="row"><div class="label">Weblink:</div><div class="value"><a href="${data.battery_carbon_footprint.study_weblink}" target="_blank">Study</a></div></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Supply Chain Due Diligence</div>
        <div class="accordion-content">
            <p>${data.supply_chain_due_diligence.Information_of_due_diligence_report}</p>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Materials and Composition</div>
        <div class="accordion-content">
            <div class="row"><div class="label">Battery Chemistry:</div><div class="value">${data.battery_materials_and_composition.battery_chemistry}</div></div>
            <div class="row"><div class="label">Critical Raw Materials:</div><div class="value">${data.battery_materials_and_composition.critical_raw_materials.join(", ")}</div></div>
            <div class="row"><div class="label">Cathode:</div><div class="value">${data.battery_materials_and_composition.materials_used.cathode}</div></div>
            <div class="row"><div class="label">Anode:</div><div class="value">${data.battery_materials_and_composition.materials_used.anode}</div></div>
            <div class="row"><div class="label">Electrolyte:</div><div class="value">${data.battery_materials_and_composition.materials_used.electrolyte}</div></div>
            <div class="row"><div class="label">Hazardous Substances:</div><div class="value">${data.battery_materials_and_composition.hazardous_substances.join(", ")}</div></div>
            <div class="row"><div class="label">Impact:</div><div class="value">Environment: ${data.battery_materials_and_composition.impact.environment}, Human Health: ${data.battery_materials_and_composition.impact.human_health}, Safety: ${data.battery_materials_and_composition.impact.safety}, Persons: ${data.battery_materials_and_composition.impact.persons}</div></div>
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-title">Circularity & Resource Efficiency</div>
        <div class="accordion-content">
            <div class="row"><div class="label">Manuals:</div><div class="value">${data.circularity_and_resource_efficiency.dismantling_information.manuals}</div></div>
            <div class="row"><div class="label">Part Numbers:</div><div class="value">${data.circularity_and_resource_efficiency.dismantling_information.part_numbers.join(", ")}</div></div>
            <div class="row"><div class="label">Spare Parts Sources:</div><div class="value">${data.circularity_and_resource_efficiency.dismantling_information.spare_parts_sources}</div></div>
            <div class="row"><div class="label">Safety Measures:</div><div class="value">${data.circularity_and_resource_efficiency.dismantling_information.safety_measures.join(", ")}</div></div>
            <div class="row"><div class="label">Pre-consumer Recycled Content:</div><div class="value">Nickel: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.nickel_share}, Cobalt: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.cobalt_share}, Lithium: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.lithium_share}, Lead: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.lead_share}</div></div>
            <div class="row"><div class="label">Post-consumer Recycled Content:</div><div class="value">Nickel: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.nickel_share}, Cobalt: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.cobalt_share}, Lithium: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.lithium_share}, Lead: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.lead_share}</div></div>
            <div class="row"><div class="label">Renewable Content Share:</div><div class="value">${data.circularity_and_resource_efficiency.renewable_content_share}</div></div>
            <div class="row"><div class="label">End User Role:</div><div class="value">Waste Prevention: ${data.circularity_and_resource_efficiency.end_user_role.waste_prevention}, Separate Collection: ${data.circularity_and_resource_efficiency.end_user_role.separate_collection}</div></div>
            <div class="row"><div class="label">Battery Collection & End of Life:</div><div class="value">Collection: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.collection}, Second Life: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.second_life_preparation}, Treatment: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.treatment}</div></div>
        </div>
      </div>
    </div>
    <div class="frame">
      <img class ="interactive_img" src="media/BatPack.png" usemap="#image-map">
      <map name="image-map">`;
      Object.entries(data.cell_info.cells_id).forEach(([key, cellId], i) => {
        html += `<area target="" alt="${key}" title="${key}" href="index.html?id=${cellId}" coords="${getCellCoords(i)}" shape="rect">`;
      });
      html += `</map>
              </img>
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
