import { euro } from '~/lib/format';
import type { Service } from '~/lib/menu';
import { lineAmount } from '~/lib/ticket';

const STRIKE_MS = 380;
const ROLL_MS = 450;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Ticket lines: added in menu order, struck out one by one. */
export function createTicketLines(list: Element | null, empty: HTMLElement | null) {
  const lines = new Map<number, HTMLLIElement>();

  const lineFor = (service: Service) => {
    const line = document.createElement('li');
    const row = document.createElement('div');
    const name = document.createElement('span');
    const price = document.createElement('span');
    name.textContent = service.name;
    price.textContent = `${euro(lineAmount(service))}${service.maxPrice !== undefined ? '+' : ''}`;
    row.append(name, price);
    line.append(row);
    return line;
  };

  return {
    sync(picked: Service[]) {
      if (!list) return;
      const wanted = new Set(picked.map((service) => service.id));
      for (const [id, line] of lines) {
        if (wanted.has(id)) continue;
        lines.delete(id);
        line.classList.add('out');
        setTimeout(() => line.remove(), STRIKE_MS);
      }
      picked.forEach((service, index) => {
        if (lines.has(service.id)) return;
        const line = lineFor(service);
        const next = picked
          .slice(index + 1)
          .map((later) => lines.get(later.id))
          .find(Boolean);
        list.insertBefore(line, next ?? null);
        lines.set(service.id, line);
      });
      if (empty) empty.hidden = lines.size > 0;
    },
  };
}

let shown = 0;
let frame = 0;

/** The total rolls once to its new value. */
export function rollTotal(output: HTMLOutputElement, target: number, startingPrice: boolean) {
  const write = (value: number, exact: boolean) => {
    output.replaceChildren();
    if (startingPrice) {
      const from = document.createElement('small');
      from.textContent = 'dès';
      output.append(from);
    }
    output.append(exact ? euro(value) : `${Math.round(value)}€`);
  };

  cancelAnimationFrame(frame);
  if (reduced) {
    shown = target;
    write(target, true);
    return;
  }
  const start = shown;
  const startedAt = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / ROLL_MS);
    shown = start + (target - start) * (1 - Math.pow(1 - progress, 3));
    write(progress < 1 ? shown : target, progress === 1);
    if (progress < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}
