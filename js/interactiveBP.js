// interactiveBP.js

const buttonImages = {
  cell1: 'media/cell_buttons/CELL1.png',
  cell2: 'media/cell_buttons/CELL2.png',
  cell3: 'media/cell_buttons/CELL3.png',
  cell4: 'media/cell_buttons/CELL4.png',
  cell5: 'media/cell_buttons/CELL5.png',
  cell6: 'media/cell_buttons/CELL6.png',
  cell7: 'media/cell_buttons/CELL7.png',
  cell8: 'media/cell_buttons/CELL8.png',
  cell9: 'media/cell_buttons/CELL9.png',
  cell10: 'media/cell_buttons/CELL10.png',
  cell11: 'media/cell_buttons/CELL11.png',
  cell12: 'media/cell_buttons/CELL12.png',
  cell13: 'media/cell_buttons/CELL13.png',
  cell14: 'media/cell_buttons/CELL14.png',
  cell15: 'media/cell_buttons/CELL15.png',
  cell16: 'media/cell_buttons/CELL16.png',
  cell17: 'media/cell_buttons/CELL17.png',
  cell18: 'media/cell_buttons/CELL18.png',
  cell19: 'media/cell_buttons/CELL19.png',
  cell20: 'media/cell_buttons/CELL20.png',
};

export function initInteractiveBP(container) {
  const interactiveImg = container.querySelector('.interactive_img');
  const areas = container.querySelectorAll('.area_bp');

  if (!interactiveImg || areas.length === 0) return;

  let activeCell = null;

  areas.forEach(area => {
    const cellId = area.getAttribute('alt');

    area.addEventListener('mouseenter', () => {
      interactiveImg.src = buttonImages[cellId];
    });

    area.addEventListener('mouseleave', () => {
      interactiveImg.src = activeCell ? buttonImages[activeCell] : 'media/cellString.png';
    });

    area.addEventListener('click', e => {
      activeCell = cellId;
      interactiveImg.src = buttonImages[cellId];
    });
  });
}
