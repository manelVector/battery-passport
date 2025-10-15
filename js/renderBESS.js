// renderBESS.js

export function renderBESS(id, data) {
  let html = `
    <div class="frame"> 
    <h2>Battery Passport ID: ${data.passport_uuid}</h2>
      <div class="row"><div class="label">Serial:</div><div class="value">${data.serial}</div></div>
    </div>
    <div class="frame">
      <div class="accordion">
        <div class="accordion-title">General Information</div>
        <div class="accordion-content">
          <div class="row"><div class="label">Serial Number:</div><div class="value">${data.serial}</div></div>
          <div class="row"><div class="label">Description:</div><div class="value">${data.description}</div></div>
          <div class="row"><div class="label">Location:</div><div class="value">${data.location}</div></div>
          <div class="row"><div class="label">Power:</div><div class="value">${data.power}</div></div>
          <div class="row"><div class="label">Energy:</div><div class="value">${data.energy}</div></div>
        </div>
      </div>
    </div>
    <div class="frame">
      <img class ="interactive_img"src="media/BessString.png" usemap="#image-map">
      <map name="image-map">
    
  `;

  data.batpacks.forEach((bpId, i) => {
    html += `<area alt="BP${i+1}" title="BP${i+1}" href="index.html?id=${bpId}" coords="${getBPcoords(i)}" shape="rect">`;
  });

  html +=`</map>
          </img>
          </div>`;
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