// interactiveBESS.js

const buttonImagesPC = {
  BP1: 'media/bp_buttons_pc/BP1.png',
  BP2: 'media/bp_buttons_pc/BP2.png',
  BP3: 'media/bp_buttons_pc/BP3.png',
  BP4: 'media/bp_buttons_pc/BP4.png',
  BP5: 'media/bp_buttons_pc/BP5.png',
  BP6: 'media/bp_buttons_pc/BP6.png',
  BP7: 'media/bp_buttons_pc/BP7.png',
  BP8: 'media/bp_buttons_pc/BP8.png',
  BP9: 'media/bp_buttons_pc/BP9.png',
  BP10: 'media/bp_buttons_pc/BP10.png',
  BP11: 'media/bp_buttons_pc/BP11.png',
  BP12: 'media/bp_buttons_pc/BP12.png',
  BP13: 'media/bp_buttons_pc/BP13.png',
};
const buttonImagesPHONE = {
  BP1: 'media/bp_buttons_pc/BP1.png',
  BP2: 'media/bp_buttons_pc/BP2.png',
  BP3: 'media/bp_buttons_pc/BP3.png',
  BP4: 'media/bp_buttons_pc/BP4.png',
  BP5: 'media/bp_buttons_pc/BP5.png',
  BP6: 'media/bp_buttons_pc/BP6.png',
  BP7: 'media/bp_buttons_pc/BP7.png',
  BP8: 'media/bp_buttons_pc/BP8.png',
  BP9: 'media/bp_buttons_pc/BP9.png',
  BP10: 'media/bp_buttons_pc/BP10.png',
  BP11: 'media/bp_buttons_pc/BP11.png',
  BP12: 'media/bp_buttons_pc/BP12.png',
  BP13: 'media/bp_buttons_pc/BP13.png',
};

export function initInteractiveBESS(container) {
  const interactiveImg = container.querySelector('.interactive_img_bess');
  const areas = container.querySelectorAll('.area_bess');

  if (!interactiveImg || areas.length === 0) return;

  let activeBP = null;

  areas.forEach(area => {
    const bpId = area.getAttribute('alt');

    area.addEventListener('mouseenter', () => {
      interactiveImg.src = buttonImagesPC[bpId];
    });

    area.addEventListener('mouseleave', () => {
      interactiveImg.src = activeBP ? buttonImagesPC[activeBP] : 'media/BessString.png';
    });

    area.addEventListener('click', e => {
      activeBP = bpId;
      interactiveImg.src = buttonImagesPC[bpId];
    });
  });
}
