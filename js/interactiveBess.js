// interactiveBESS.js

const buttonImages = {
  BP1: 'media/bp_buttons/BP1.png',
  BP2: 'media/bp_buttons/BP2.png',
  BP3: 'media/bp_buttons/BP3.png',
  BP4: 'media/bp_buttons/BP4.png',
  BP5: 'media/bp_buttons/BP5.png',
  BP6: 'media/bp_buttons/BP6.png',
  BP7: 'media/bp_buttons/BP7.png',
  BP8: 'media/bp_buttons/BP8.png',
  BP9: 'media/bp_buttons/BP9.png',
  BP10: 'media/bp_buttons/BP10.png',
  BP11: 'media/bp_buttons/BP11.png',
  BP12: 'media/bp_buttons/BP12.png',
  BP13: 'media/bp_buttons/BP13.png',
};

export function initInteractiveBESS(container) {
  const interactiveImg = container.querySelector('.interactive_img_bess');
  const areas = container.querySelectorAll('.area_bess');

  if (!interactiveImg || areas.length === 0) return;

  let activeBP = null;

  areas.forEach(area => {
    const bpId = area.getAttribute('alt');

    area.addEventListener('mouseenter', () => {
      interactiveImg.src = buttonImages[bpId];
    });

    area.addEventListener('mouseleave', () => {
      interactiveImg.src = activeBP ? buttonImages[activeBP] : 'media/BessString.png';
    });

    area.addEventListener('click', e => {
      activeBP = bpId;
      interactiveImg.src = buttonImages[bpId];
    });
  });
}
