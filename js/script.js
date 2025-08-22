  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById("content");

      if (id && data[id]) {
        const item = data[id];
        let html = "";

        if (item.type === "cell") {
          html = `
            <div class="accordion">
              <div class="accordion-title">General Information</div>
              <div class="accordion-content">
                <p><b>Manufacturer:</b> ${item.manufacturer}</p>
                <p><b>Model:</b> ${item.model}</p>
                <p><b>Manufacture Date:</b> ${item.manufacture_date}</p>
                <p><b>Carbon Footprint:</b> ${item.carbon_footprint}</p>
                <p><b>Capacity:</b> ${item.capacity}</p>
                <p><b>Voltage:</b> ${item.voltage}</p>
              </div>
            </div>

            <div class="accordion">
              <div class="accordion-title">EOL Tests</div>
              <div class="accordion-content">
                <p><b>Voltage:</b> ${item.EOLvoltage}</p>
                <p><b>Resistance:</b> ${item.EOLresistance}</p>
                <p><b>Current:</b> ${item.EOLcurrent}</p>
              </div>
            </div>

          `;
        }else if (item.type === "batpack") {
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

            <div class="accordion">
            <div class="accordion-title">Performance & Durability</div>
            <div class="accordion-content">
                <p><b>Capacity / Energy / Power / SOH:</b> ${item.performance_durability.capacity_energy_power_soh}</p>
                <p><b>Expected Lifetime:</b> ${item.performance_durability.expected_lifetime}</p>
                <p><b>Negative Events:</b> ${item.performance_durability.negative_events}</p>
            </div>
            </div>

            <img src="media/BatPack.png" usemap="#image-map">

            <map name="image-map">
                <area target="" alt="Cell10" title="Cell10" href="index.html?id=BESS01" coords="126,106,561,296" shape="rect">
                <area target="" alt="Cell9" title="Cell9" href="" coords="128,324,565,515" shape="rect">
                <area target="" alt="Cell8" title="Cell8" href="" coords="133,544,562,734" shape="rect">
                <area target="" alt="Cell7" title="Cell7" href="" coords="134,765,573,950" shape="rect">
                <area target="" alt="Cell6" title="Cell6" href="" coords="135,987,562,1170" shape="rect">
                <area target="" alt="Cell5" title="Cell5" href="" coords="136,1203,562,1396" shape="rect">
                <area target="" alt="Cell4" title="Cell4" href="" coords="136,1423,564,1616" shape="rect">
                <area target="" alt="Cell3" title="Cell3" href="" coords="138,1643,570,1833" shape="rect">
                <area target="" alt="Cell2" title="Cell2" href="" coords="135,1863,565,2055" shape="rect">
                <area target="" alt="Cell1" title="Cell1" href="" coords="135,2082,564,2274" shape="rect">
                <area target="" alt="Cell20" title="Cell20" href="" coords="653,2081,1085,2274" shape="rect">
                <area target="" alt="Cell19" title="Cell19" href="" coords="648,1863,1081,2054" shape="rect">
                <area target="" alt="Cell18" title="Cell18" href="" coords="655,1645,1079,1836" shape="rect">
                <area target="" alt="Cell17" title="Cell17" href="" coords="653,1420,1082,1614" shape="rect">
                <area target="" alt="Cell16" title="Cell16" href="" coords="651,1203,1080,1399" shape="rect">
                <area target="" alt="Cell15" title="Cell15" href="" coords="654,982,1078,1177" shape="rect">
                <area target="" alt="Cell14" title="Cell14" href="" coords="656,765,1079,955" shape="rect">
                <area target="" alt="Cell13" title="Cell13" href="" coords="650,545,1079,734" shape="rect">
                <area target="" alt="Cell12" title="Cell12" href="" coords="653,323,1081,518" shape="rect">
                <area target="" alt="Cell11" title="Cell11" href="" coords="651,108,1084,294" shape="rect">
            </map>

            <div class="pack-grid">
            ${item.cells.map((cellId, i) => `<a href="index.html?id=${cellId}" class="cell-button">Cell ${i+1}</a>`).join("")}
            </div>
        `;
        } else if (item.type === "bess") {
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
            <div class="pack-grid">
                ${item.batpacks.map((packId, i) => `<a href="index.html?id=${packId}" class="pack-button">Battery Pack ${i+1}</a>`).join("")}
            </div>
              
            
          `;
        }

        // Back button if it has a parent
        if (item.parent) {
          html += `
            <a href="index.html?id=${item.parent}" class="back-button">
              ⬅ Back to ${item.parent}
            </a>
          `;
        }

        content.innerHTML = html;
        // 🔹 Llama a imageMapResize tras crear el contenido dinámico
      if (typeof imageMapResize === 'function') {
        imageMapResize();
      }

      } else {
        content.innerHTML = "<p>ID not found in the database.</p>";
      }
        // Activar los desplegables
      document.querySelectorAll('.accordion-title').forEach(title => {
        title.addEventListener('click', () => {
          const content = title.nextElementSibling;
          content.classList.toggle('open');
          title.classList.toggle('active');  // añade/quita clase para la flecha
        });
      });
    });