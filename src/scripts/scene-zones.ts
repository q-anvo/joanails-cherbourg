const TOUR_START = 2600;
const TOUR_STEP = 2400;
const TAG_PADDING = 30;

const zones = [...document.querySelectorAll<SVGAElement>('.zone')];
const layer = document.querySelector<SVGSVGElement>('svg.zones');

/*
 * Instagram's in-app browser can leave the tags unpainted after the first paint until the
 * scene is hidden and shown again, so the layer is hidden for one frame to force a repaint.
 */
const repaint = () => {
  if (!layer) return;
  layer.style.visibility = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => layer.style.removeProperty('visibility')));
};

/* zone tags hug their text once Belleza is in */
document.fonts.ready.then(() => {
  for (const zone of zones) {
    const text = zone.querySelector<SVGTextElement>('.tag text');
    const rect = zone.querySelector<SVGRectElement>('.tag rect');
    if (!text || !rect) continue;
    const width = text.getComputedTextLength() + TAG_PADDING;
    rect.setAttribute('width', width.toFixed(1));
    rect.setAttribute('x', (Number(text.getAttribute('x')) - width / 2).toFixed(1));
  }
  repaint();
});

layer?.addEventListener('animationend', (event) => {
  if (event.target === layer) repaint();
});

/* the zones light up in turn, and the first hover ends the tour */
let turn = 0;
let timer = 0;
let ended = false;

const cue = () => {
  const lit = turn++ % zones.length;
  zones.forEach((zone, i) => zone.classList.toggle('cue', i === lit));
};

const endTour = () => {
  ended = true;
  clearTimeout(timer);
  clearInterval(timer);
  zones.forEach((zone) => zone.classList.remove('cue'));
};

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  timer = window.setTimeout(() => {
    if (ended) return;
    cue();
    timer = window.setInterval(cue, TOUR_STEP);
  }, TOUR_START);
  zones.forEach((zone) => zone.addEventListener('pointerenter', endTour, { once: true }));
}
