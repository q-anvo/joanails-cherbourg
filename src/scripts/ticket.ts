import { MENU } from '~/data/menu';
import { SALON } from '~/data/salon';
import { duration, euro } from '~/lib/format';
import { bookingUrl } from '~/lib/fresha-url';
import type { Service } from '~/lib/menu';
import { summarize } from '~/lib/ticket';

import { createTicketLines, rollTotal } from './ticket-view';
import { selectTab, showTabCounts } from './category-tabs';

const services = MENU.flatMap((group, groupIndex) => group.services.map((service) => ({ service, groupIndex })));
const rows = new Map<number, HTMLButtonElement>();
document
  .querySelectorAll<HTMLButtonElement>('[data-service]')
  .forEach((row) => rows.set(Number(row.dataset.service), row));

const lines = createTicketLines(
  document.querySelector('[data-ticket-lines]'),
  document.querySelector('[data-ticket-empty]')
);
const total = document.querySelector<HTMLOutputElement>('[data-ticket-total]');
const length = document.querySelector('[data-ticket-length]');
const handoff = document.querySelector<HTMLElement>('[data-ticket-handoff]');
const summaries = document.querySelectorAll<HTMLElement>('[data-ticket-summary]');

const isPicked = (service: Service) => rows.get(service.id)?.getAttribute('aria-pressed') === 'true';

function render() {
  const picked = services.filter(({ service }) => isPicked(service));
  const pickedServices = picked.map(({ service }) => service);
  const summary = summarize(pickedServices);

  lines.sync(services.map(({ service }) => service).filter(isPicked));
  if (total) rollTotal(total, summary.total, summary.startingPrice);
  if (length) length.textContent = summary.minutes ? `≈ ${duration(summary.minutes)}` : '–';

  showTabCounts(MENU.map((_, index) => picked.filter((entry) => entry.groupIndex === index).length));

  const href = bookingUrl(
    SALON.fresha.booking,
    pickedServices.map((service) => service.id)
  );
  document.querySelectorAll<HTMLAnchorElement>('[data-compose]').forEach((link) => (link.href = href));

  if (handoff) {
    handoff.hidden = !summary.count;
    handoff.textContent =
      summary.count > 1
        ? `Vos ${summary.count} prestations arrivent déjà dans le panier Fresha.`
        : 'Votre prestation arrive déjà dans le panier Fresha.';
  }
  summaries.forEach((element) => {
    element.hidden = !summary.count;
    element.textContent = `${summary.count} presta${summary.count > 1 ? 's' : ''} · ${summary.startingPrice ? 'dès ' : ''}${euro(summary.total)}`;
  });
}

rows.forEach((row) =>
  row.addEventListener('click', () => {
    row.setAttribute('aria-pressed', String(row.getAttribute('aria-pressed') !== 'true'));
    render();
  })
);

document
  .querySelectorAll<HTMLButtonElement>('[data-tab]')
  .forEach((tab) => tab.addEventListener('click', () => selectTab(Number(tab.dataset.tab))));

document.querySelectorAll<HTMLButtonElement>('[data-copy-phone]').forEach((button) =>
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyPhone ?? '');
      button.textContent = 'Copié';
      setTimeout(() => (button.textContent = 'Copier'), 1600);
    } catch {
      const number = button.previousElementSibling;
      if (!number) return;
      const range = document.createRange();
      range.selectNodeContents(number);
      getSelection()?.removeAllRanges();
      getSelection()?.addRange(range);
    }
  })
);
