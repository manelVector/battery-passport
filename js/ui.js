// ui.js
export function initAccordion() {
  document.querySelectorAll('.accordion-title').forEach(title => {
    title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      content.classList.toggle('open');
      title.classList.toggle('active');
    });
  });
}

export function initImageMaps() {
  if (typeof imageMapResize === "function") imageMapResize();
}
