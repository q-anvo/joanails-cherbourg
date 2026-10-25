import { startDust } from './dust';
import { watchSceneCover } from './scene-sleep';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scene = document.getElementById('scene');
const camera = document.getElementById('scene-camera');
const art = document.getElementById('scene-art');
const dust = document.getElementById('scene-dust');

/* look around the room, and carry a little warm light with the pointer */
if (!reduced && scene && camera && art && matchMedia('(pointer: fine)').matches) {
  scene.addEventListener('pointermove', (event) => {
    camera.style.setProperty('--px', `${((0.5 - event.clientX / innerWidth) * 16).toFixed(1)}px`);
    camera.style.setProperty('--py', `${((0.5 - event.clientY / innerHeight) * 10).toFixed(1)}px`);
    const box = art.getBoundingClientRect();
    art.style.setProperty('--wx', `${(((event.clientX - box.left) / box.width) * 100).toFixed(1)}%`);
    art.style.setProperty('--wy', `${(((event.clientY - box.top) / box.height) * 100).toFixed(1)}%`);
  });
}

const drifting = !reduced && dust instanceof HTMLCanvasElement ? startDust(dust) : undefined;

/* asleep under the sheet: nothing left to composite over it */
const opening = document.querySelector('main > .window');
const draught = document.getElementById('scene-draught');
if (scene && opening) {
  watchSceneCover(opening, (asleep) => {
    scene.toggleAttribute('data-asleep', asleep);
    drifting?.setAwake(!asleep);
    if (!(draught instanceof SVGSVGElement)) return;
    if (asleep) draught.pauseAnimations();
    else draught.unpauseAnimations();
  });
}
