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