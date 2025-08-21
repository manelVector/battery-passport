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
              <div class="accordion-title">General Info</div>
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
        } else if (item.type === "batpack") {
          html = `
            <div class="accordion">
              <div class="accordion-title">Battery Pack ${id}</div>
              <div class="accordion-content">
                <p><b>UUID:</b> ${item.uuid}</p>
                <p><b>Description:</b> ${item.description}</p>
                <p><b>Total Cells:</b> ${item.total_cells}</p>
                <p><b>Nominal Voltage:</b> ${item.nominal_voltage}</p>
                <p><b>Total Capacity:</b> ${item.total_capacity}</p>
              </div>
              </div>
                <div class="cell-grid">
                  ${item.cells.map((cellId, i) => `<a href="index.html?id=${cellId}" class="cell-button">Cell ${i+1}</a>`).join("")}
                </div>
              
            
          `;
        } else if (item.type === "bess") {
          html = `
            <div class="accordion">
              <div class="accordion-title">BESS ID: ${id}</div>
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