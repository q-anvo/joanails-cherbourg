import { wireTabs } from './tabs';

const GAP = 16;

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tabs = document.querySelector('[data-tabs="gallery"]');
if (tabs) wireTabs(tabs);

/* each arrow scrolls the strip on show by one card */
document.querySelectorAll<HTMLButtonElement>('[data-gallery-step]').forEach((button) =>
  button.addEventListener('click', () => {
    const track = document.querySelector<HTMLElement>('#galerie .track.on');
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;
    const step = Number(button.dataset.galleryStep);
    track.scrollBy({ left: step * (card.offsetWidth + GAP), behavior: reduced ? 'auto' : 'smooth' });
  })
);
