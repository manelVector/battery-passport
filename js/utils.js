// utils.js
export function getCellCoords(index) {
  const coords = [
    "135,2082,564,2274", "135,1863,565,2055", /* ... */
  ];
  return coords[index] || "0,0,0,0";
}

export function getBPcoords(index) {
  const coords = [
    "105,80,542,296","109,340,537,557", /* ... */
  ];
  return coords[index] || "0,0,0,0";
}
