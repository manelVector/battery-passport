// interactiveBP.js

const buttonImages = {
  CELL1: 'media/cell_buttons/CELL1.png',
  CELL2: 'media/cell_buttons/CELL2.png',
  CELL3: 'media/cell_buttons/CELL3.png',
  CELL4: 'media/cell_buttons/CELL4.png',
  CELL5: 'media/cell_buttons/CELL5.png',
  CELL6: 'media/cell_buttons/CELL6.png',
  CELL7: 'media/cell_buttons/CELL7.png',
  CELL8: 'media/cell_buttons/CELL8.png',
  CELL9: 'media/cell_buttons/CELL9.png',
  CELL10: 'media/cell_buttons/CELL10.png',
  CELL11: 'media/cell_buttons/CELL11.png',
  CELL12: 'media/cell_buttons/CELL12.png',
  CELL13: 'media/cell_buttons/CELL13.png',
  CELL14: 'media/cell_buttons/CELL14.png',
  CELL15: 'media/cell_buttons/CELL15.png',
  CELL16: 'media/cell_buttons/CELL16.png',
  CELL17: 'media/cell_buttons/CELL17.png',
  CELL18: 'media/cell_buttons/CELL18.png',
  CELL19: 'media/cell_buttons/CELL19.png',
  CELL20: 'media/cell_buttons/CELL20.png'
};

export function initInteractiveBP(container) {
  const interactiveImg = container.querySelector('.interactive_img_bp');
  const areas = container.querySelectorAll('.area_bp');

  if (!interactiveImg || areas.length === 0) return;

  let activeCell = null;

  areas.forEach(area => {
    const cellId = area.getAttribute('alt');

    area.addEventListener('mouseenter', () => {
      interactiveImg.src = buttonImages[cellId];
    });

    area.addEventListener('mouseleave', () => {
      interactiveImg.src = activeCell ? buttonImages[activeCell] : 'media/CellStringPc.png';
    });

    area.addEventListener('click', e => {
      activeCell = cellId;
      interactiveImg.src = buttonImages[cellId];
    });
  });
}
