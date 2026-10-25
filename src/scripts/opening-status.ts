import { HOURS } from '~/data/hours';
import { openingStatus } from '~/lib/hours-status';
import { parisClock } from '~/lib/paris-time';

/* computed in the browser: at build time the status would be frozen */
const now = parisClock(new Date());
const status = openingStatus(HOURS, now);

document.querySelectorAll<HTMLElement>('[data-status]').forEach((element) => {
  element.dataset.open = String(status.open);
  const text = element.querySelector('[data-status-text]');
  if (text) text.textContent = status.text;
});

document.querySelectorAll('[data-door-word]').forEach((word) => (word.textContent = status.open ? 'Ouvert' : 'Fermé'));
document.querySelector(`[data-weekday="${now.weekday}"]`)?.classList.add('today');
