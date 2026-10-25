const GAP = 16;

const track = document.querySelector<HTMLElement>('[data-gallery-track]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* each arrow scrolls the strip by one card */
document.querySelectorAll<HTMLButtonElement>('[data-gallery-step]').forEach((button) =>
  button.addEventListener('click', () => {
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;
    const step = Number(button.dataset.galleryStep);
    track.scrollBy({ left: step * (card.offsetWidth + GAP), behavior: reduced ? 'auto' : 'smooth' });
  })
);
