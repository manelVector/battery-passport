const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const content = document.getElementById("content");

// 🔹 Rutas de carpetas
const folders = {
  bess: "json/bess/",
  bp: "json/bp/",
  cell: "json/cell/"
};

async function loadJSONForID(id) {
  for (const [type, folder] of Object.entries(folders)) {
    try {
      const res = await fetch(`${folder}${id}.json`);
      if (!res.ok) continue;  // ignorar 404
      const data = await res.json(); // solo parsear si existe
      return { type, data };
    } catch(e) {
      // error de red o JSON mal formado, seguir con la siguiente carpeta
      continue;
    }
  }
  return null; // si no se encuentra en ninguna carpeta
}



// 🔹 Función principal
(async () => {
  if (!id) {
    content.innerHTML = "<p>No ID provided.</p>";
    return;
  }

  const result = await loadJSONForID(id);
  if (!result) {
    content.innerHTML = "<p>ID not found in any folder.</p>";
    return;
  }

  const { type, data } = result;
  let html = "";

  if (type === "cell") {
    html += `<h2>Cell: ${id}</h2>`;
    html += `<p>Manufacturer: ${data.manufacturer}</p>`;
    html += `<p>Model: ${data.model}</p>`;
    html += `<p>Serial: ${data.serial}</p>`;
    html += `<p>Carbon Footprint: ${data.carbon_footprint}</p>`;
    html += `<p>Capacity: ${data.capacity}</p>`;
    html += `<p>Voltage: ${data.voltage}</p>`;

    html += `<div class ="back-button" onclick="history.back()">⬅ Back</div>`;
  }

  if (type === "bp") {
        // 🔹 Encabezado principal
    html += `<h2>Battery Pack: ${id}</h2>`;
    html += `<p><b>Battery Passport ID:</b> ${data.id_product_data.battery_passport_id}</p>`;
    html += `<p><b>Model:</b> ${data.id_product_data.model}</p>`;
    html += `<p><b>Serial:</b> ${data.id_product_data.serial}</p>`;
    html += `<p><b>Battery Status:</b> ${data.id_product_data.battery_status}</p>`;

    // 🔹 Acordeón: General Information
    html += `
    <div class="accordion">
      <div class="accordion-title">General Information</div>
      <div class="accordion-content">
          <p><b>Manufacturer:</b> ${data.id_product_data.manufacturer}</p>
          <p><b>Address:</b> ${data.id_product_data.address}</p>
          <p><b>Web:</b> <a href="${data.id_product_data.web_address}" target="_blank">${data.id_product_data.web_address}</a></p>
          <p><b>Email:</b> <a href="mailto:${data.id_product_data.mail_address}">${data.id_product_data.mail_address}</a></p>
          <p><b>NIF:</b> ${data.id_product_data.NIF}</p>
          <p><b>VAT:</b> ${data.id_product_data.VAT}</p>
          <p><b>Manufacturing Place:</b> ${data.id_product_data.manufacturing_place}</p>
          <p><b>Manufacturing Date:</b> ${data.id_product_data.manufacturing_date}</p>
          <p><b>Warranty Period:</b> ${data.id_product_data.warranty_period}</p>
          <p><b>Battery Category:</b> ${data.id_product_data.battery_category}</p>
          <p><b>Battery Weight:</b> ${data.id_product_data.battery_weight}</p>
          <p><b>Battery Status:</b> ${data.id_product_data.battery_status}</p>
      </div>
    </div>
    `;

    // 🔹 Acordeón: Labels and Certifications
    html += `
    <div class="accordion">
      <div class="accordion-title">Labels and Certifications</div>
      <div class="accordion-content">
          <p><b>Symbols & Labels:</b> ${data.symbols_labels_doc_conformity.symbols_labels.join(", ")}</p>
          <p><b>Meaning:</b> ${data.symbols_labels_doc_conformity.meaning}</p>
          <p><b>CE Doc:</b> ${data.symbols_labels_doc_conformity.CE_doc}</p>
          <p><b>Extinguishing Agent:</b> ${data.symbols_labels_doc_conformity["extinguishing agent"]}</p>
          <p><b>Carbon Footprint Label:</b> ${data.symbols_labels_doc_conformity.carbon_footprint_label}</p>
          <p><b>Test Compliance:</b> ${data.symbols_labels_doc_conformity.test_compliance}</p>
      </div>
    </div>
    `;

    // 🔹 Acordeón: Carbon Footprint
    html += `
    <div class="accordion">
      <div class="accordion-title">Carbon Footprint</div>
      <div class="accordion-content">
          <p><b>Carbon Footprint:</b> ${data.battery_carbon_footprint.carbon_footprint}</p>
          <p><b>Raw Material Acquisition:</b> ${data.battery_carbon_footprint.raw_material_acquisition_and_pre_processing_lifecycle_stage}</p>
          <p><b>Manufacturing Stage:</b> ${data.battery_carbon_footprint["main_product_production/manufacturing_lifecycle_stage"]}</p>
          <p><b>Distribution Stage:</b> ${data.battery_carbon_footprint.distribution_lifecycle_stage}</p>
          <p><b>End of Life & Recycling:</b> ${data.battery_carbon_footprint.end_of_life_and_recycling_lifecycle_stage}</p>
          <p><b>CF Performance Class:</b> ${data.battery_carbon_footprint.carbon_footprint_performance_class}</p>
          <p><b>Weblink:</b> <a href="${data.battery_carbon_footprint.study_weblink}" target="_blank">Study</a></p>
      </div>
    </div>
    `;

    // 🔹 Acordeón: Supply Chain Due Diligence
    html += `
    <div class="accordion">
      <div class="accordion-title">Supply Chain Due Diligence</div>
      <div class="accordion-content">
          <p>${data.supply_chain_due_diligence.Information_of_due_diligence_report}</p>
      </div>
    </div>
    `;

    // 🔹 Acordeón: Materials and Composition
    html += `
    <div class="accordion">
      <div class="accordion-title">Materials and Composition</div>
      <div class="accordion-content">
          <p><b>Battery Chemistry:</b> ${data.battery_materials_and_composition.battery_chemistry}</p>
          <p><b>Critical Raw Materials:</b> ${data.battery_materials_and_composition.critical_raw_materials.join(", ")}</p>
          <p><b>Materials Used:</b></p>
          <ul>
            <li><b>Cathode:</b> ${data.battery_materials_and_composition.materials_used.cathode}</li>
            <li><b>Anode:</b> ${data.battery_materials_and_composition.materials_used.anode}</li>
            <li><b>Electrolyte:</b> ${data.battery_materials_and_composition.materials_used.electrolyte}</li>
          </ul>
          <p><b>Hazardous Substances:</b> ${data.battery_materials_and_composition.hazardous_substances.join(", ")}</p>
          <p><b>Impact:</b> Environment: ${data.battery_materials_and_composition.impact.environment}, Human Health: ${data.battery_materials_and_composition.impact.human_health}, Safety: ${data.battery_materials_and_composition.impact.safety}, Persons: ${data.battery_materials_and_composition.impact.persons}</p>
      </div>
    </div>
    `;

    // 🔹 Acordeón: Circularity & Resource Efficiency
    html += `
    <div class="accordion">
      <div class="accordion-title">Circularity & Resource Efficiency</div>
      <div class="accordion-content">
          <p><b>Manuals:</b> ${data.circularity_and_resource_efficiency.dismantling_information.manuals}</p>
          <p><b>Part Numbers:</b> ${data.circularity_and_resource_efficiency.dismantling_information.part_numbers.join(", ")}</p>
          <p><b>Spare Parts Sources:</b> ${data.circularity_and_resource_efficiency.dismantling_information.spare_parts_sources}</p>
          <p><b>Safety Measures:</b> ${data.circularity_and_resource_efficiency.dismantling_information.safety_measures.join(", ")}</p>
          <p><b>Pre-consumer Recycled Content:</b> Nickel: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.nickel_share}, Cobalt: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.cobalt_share}, Lithium: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.lithium_share}, Lead: ${data.circularity_and_resource_efficiency.pre_consumer_recycled_content.lead_share}</p>
          <p><b>Post-consumer Recycled Content:</b> Nickel: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.nickel_share}, Cobalt: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.cobalt_share}, Lithium: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.lithium_share}, Lead: ${data.circularity_and_resource_efficiency.post_consumer_recycled_content.lead_share}</p>
          <p><b>Renewable Content Share:</b> ${data.circularity_and_resource_efficiency.renewable_content_share}</p>
          <p><b>End User Role:</b> Waste Prevention: ${data.circularity_and_resource_efficiency.end_user_role.waste_prevention}, Separate Collection: ${data.circularity_and_resource_efficiency.end_user_role.separate_collection}</p>
          <p><b>Battery Collection & End of Life:</b> Collection: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.collection}, Second Life: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.second_life_preparation}, Treatment: ${data.circularity_and_resource_efficiency.battery_collection_and_end_of_life.treatment}</p>
      </div>
    </div>
    `;
        // 🔹 Imagen con celdas clicables
    html += `<img src="media/BatPack.png" usemap="#image-map">`;
    html += `<map name="image-map">`;
    Object.entries(data.cell_info.cells_id).forEach(([key, cellId], i) => {
      html += `<area target="" alt="${key}" title="${key}" href="index.html?id=${cellId}" coords="${getCellCoords(i)}" shape="rect">`;
    });
    html += `</map>`;
    html += `</img>`;

    // 🔹 Botón Back simple
    html += `<div class="back-button" onclick="history.back()">⬅ Back</div>`;
  }

  if (type === "bess") {

    html += `<p><b>BESS ID:</b> ${id}</p>`;
    html += `<p><b>Battery Passport ID:</b> ${data.passport_uuid}</p>`;
    html += `<div class="accordion">`;
    html += `  <div class="accordion-title">General Information</div>`;
    html += `  <div class="accordion-content">`;
    html += `      <p><b>Serial Number:</b> ${data.serial}</p>`;
    html += `      <p><b>Description:</b> ${data.description}</p>`;
    html += `      <p><b>Location:</b> ${data.location}</p>`;
    html += `      <p><b>Power:</b> ${data.power}</p>`;
    html += `      <p><b>Energy:</b> ${data.energy}</p>`;
    html += `  </div>`;
    html += `</div>`;

    html += `<img src="media/BessString.png" usemap="#image-map">`;
    html += `<map name="image-map">`;
    data.batpacks.forEach((bpId, i) => {
      html += `<area target="" alt="BP${i+1}" title="BP${i+1}" href="index.html?id=${bpId}" coords="${getBPcoords(i)}" shape="rect">`;
    });
    html += `</map>`;
    html += `</img>`;
  }

  content.innerHTML = html;

  
      // Activar los desplegables
  document.querySelectorAll('.accordion-title').forEach(title => {
    title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      content.classList.toggle('open');
      title.classList.toggle('active');
    });
  });
  if (typeof imageMapResize === "function") imageMapResize();
})();

// 🔹 Coordenadas de ejemplo para los BP en BESS


function getCellCoords(index) {
  const coords = [
    "135,2082,564,2274",//1   
    "135,1863,565,2055",//2
    "138,1643,570,1833",//3
    "136,1423,564,1616",//4
    "136,1203,562,1396",//5
    "135,987,562,1170",//6
    "134,765,573,950",// 7
    "133,544,562,734",// 8
    "128,324,565,515",// 9
    "126,106,561,296", // 10
    "651,108,1084,294",//11
    "653,323,1081,518",//12
    "650,545,1079,734",//13
    "656,765,1079,955",//14
    "654,982,1078,1177",//15
    "651,1203,1080,1399",//16
    "653,1420,1082,1614",//17
    "655,1645,1079,1836",//18
    "648,1863,1081,2054",//19
    "653,2081,1085,2274"//20
  ];
  return coords[index] || "0,0,0,0";
}
function getBPcoords(index) {
  const coords = [
    "105,80,542,296","109,340,537,557","110,604,534,828","112,869,533,1092","112,1138,537,1360",
    "108,1400,534,1623","105,1668,534,1890","638,74,1066,299","637,338,1066,561","637,607,1070,828",
    "641,869,1067,1094","642,1135,1068,1355","642,1403,1060,1624","636,1667,1060,1888"
  ];
  return coords[index] || "0,0,0,0";
}