const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Cargamos los tres JSON en paralelo
Promise.all([
  fetch("cells_data.json").then(res => res.json()),
  fetch("bp_data.json").then(res => res.json()),
  fetch("bess_data.json").then(res => res.json())
]).then(([cellsData, batpacksData, bessData]) => {
  const allData = { ...cellsData, ...batpacksData, ...bessData };
  const content = document.getElementById("content");

  if (id && allData[id]) {
    const item = allData[id];
    let html = "";

    // Detectamos tipo
    let type = "cell";
    if (item.general_information) type = "batpack";
    if (item.batpacks) type = "bess";

    if (type === "cell") {
      html = `
        <div class="accordion">
          <div class="accordion-title">General Information</div>
          <div class="accordion-content">
            <p><b>Manufacturer:</b> ${item.GeneralInfo.manufacturer}</p>
            <p><b>Model:</b> ${item.GeneralInfo.model}</p>
            <p><b>Manufacture Date:</b> ${item.GeneralInfo.manufacture_date}</p>
            <p><b>Carbon Footprint:</b> ${item.GeneralInfo.carbon_footprint}</p>
            <p><b>Capacity:</b> ${item.GeneralInfo.capacity}</p>
            <p><b>Voltage:</b> ${item.GeneralInfo.voltage}</p>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-title">EOL Tests</div>
          <div class="accordion-content">
            <p><b>Voltage:</b> ${item.EolTest.EOLvoltage}</p>
            <p><b>Resistance:</b> ${item.EolTest.EOLresistance}</p>
            <p><b>Current:</b> ${item.EolTest.EOLcurrent}</p>
          </div>
        </div>
      `;
    } else if (type === "batpack") {
      html = `
        <p><b>Battery Pack ID:</b> ${id}</p>
        <p><b>Battery Passport ID:</b> ${item.passport_uuid}</p>          

        <div class="accordion">
          <div class="accordion-title">General Information</div>
          <div class="accordion-content">
              <p><b>Manufacturing Info:</b> ${item.general_information.manufacturing_info}</p>
              <p><b>Battery Category:</b> ${item.general_information.battery_category}</p>
              <p><b>Battery Weight:</b> ${item.general_information.battery_weight}</p>
              <p><b>Battery Status:</b> ${item.general_information.battery_status}</p>
          </div>
        </div>
                  <div class="accordion">
          <div class="accordion-title">Labels and Certifications</div>
          <div class="accordion-content">
              <p><b>Symbols & Labels:</b> ${item.labels_certifications.symbols_labels.join(", ")}</p>
              <p><b>Meaning:</b> ${item.labels_certifications.meaning}</p>
              <p><b>Declaration of Conformity:</b> ${item.labels_certifications.declaration_conformity}</p>
              <p><b>Compliance of Test Results:</b> ${item.labels_certifications.test_compliance}</p>
          </div>
          </div>

          <div class="accordion">
          <div class="accordion-title">Carbon Footprint</div>
          <div class="accordion-content">
              <p><b>Carbon Footprint:</b> ${item.carbon_footprint.carbon_footprint}</p>
              <p><b>Weblink to CF Study:</b> <a href="${item.carbon_footprint.weblink}" target="_blank">Study</a></p>
              <p><b>CF Performance Class:</b> ${item.carbon_footprint.performance_class}</p>
          </div>
          </div>

          <div class="accordion">
          <div class="accordion-title">Supply Chain Due Diligence</div>
          <div class="accordion-content">
              <p><b>Due Diligence Report:</b> ${item.supply_chain.due_diligence_report}</p>
          </div>
          </div>

          <div class="accordion">
          <div class="accordion-title">Materials and Composition</div>
          <div class="accordion-content">
              <p><b>Hazardous Substances:</b> ${item.materials_composition.hazardous_substances}</p>
              <p><b>Battery Chemistry:</b> ${item.materials_composition.battery_chemistry}</p>
              <p><b>Critical Raw Materials:</b> ${item.materials_composition.critical_raw_materials.join(", ")}</p>
              <p><b>Cathode:</b> ${item.materials_composition.materials_detailed.cathode}</p>
              <p><b>Anode:</b> ${item.materials_composition.materials_detailed.anode}</p>
              <p><b>Electrolyte:</b> ${item.materials_composition.materials_detailed.electrolyte}</p>
          </div>
          </div>

          <div class="accordion">
          <div class="accordion-title">Circularity & Resource Efficiency</div>
          <div class="accordion-content">
              <p><b>Recycled Content Shares:</b> ${item.circularity_resource_efficiency.recycled_content}</p>
              <p><b>Manuals:</b> <a href="${item.circularity_resource_efficiency.manuals_disassembly}" target="_blank">Disassembly Manual</a></p>
              <p><b>Spare Parts:</b> ${item.circularity_resource_efficiency.spare_parts}</p>
              <p><b>Safety Measures:</b> ${item.circularity_resource_efficiency.safety_measures}</p>
          </div>
          </div>

        <img src="media/BatPack.png" usemap="#image-map">
        <map name="image-map">
          ${item.cells.map((cellId, i) => `
            <area target="" alt="Cell${i+1}" title="Cell${i+1}" href="index.html?id=${cellId}" coords="${getCellCoords(i)}" shape="rect">
          `).join("")}
        </map>
      `;
    } else if (type === "bess") {
      html = `
        <p><b>BESS ID:</b> ${id}</p>
        <p><b>Battery Passport ID:</b> ${item.passport_uuid}</p>
        <div class="accordion">
          <div class="accordion-title">General Information</div>
          <div class="accordion-content">
              <p><b>UUID:</b> ${item.uuid}</p>
              <p><b>Description:</b> ${item.description}</p>
              <p><b>Location:</b> ${item.location}</p>
              <p><b>Power:</b> ${item.power}</p>
              <p><b>Energy:</b> ${item.energy}</p>
          </div>
        </div>

        <img src="media/BessString.png" usemap="#image-map">
        <map name="image-map">
          ${item.batpacks.map((bpId, i) => `
            <area target="" alt="BP${i+1}" title="BP${i+1}" href="index.html?id=${bpId}" coords="${getBPcoords(i)}" shape="rect">
          `).join("")}
        </map>
      `;
    }

    // Botón volver dinámico
    const parent = findParent(id, allData);
    if (parent) {
      html += `
        <a href="index.html?id=${parent}" class="back-button">
          ⬅ Back to ${parent}
        </a>
      `;
    }

    content.innerHTML = html;

    if (typeof imageMapResize === 'function') imageMapResize();

    // Activar los desplegables
    document.querySelectorAll('.accordion-title').forEach(title => {
      title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        content.classList.toggle('open');
        title.classList.toggle('active');
      });
    });
  } else {
    content.innerHTML = "<p>ID not found in the database.</p>";
  }
});

// 🔹 Helper para encontrar el padre
function findParent(childId, allData) {
  for (const [key, val] of Object.entries(allData)) {
    if (val.cells && val.cells.includes(childId)) return key; // batpack -> cell
    if (val.batpacks && val.batpacks.includes(childId)) return key; // bess -> batpack
  }
  return null;
}

// 🔹 Helpers para mantener tus coords originales
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
