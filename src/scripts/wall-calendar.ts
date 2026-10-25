import { HOURS } from '~/data/hours';
import { WALL_CALENDAR } from '~/data/scene';
import { parisDate } from '~/lib/paris-time';
import { columnWeekday, monthCells, projector } from '~/lib/wall-calendar';

const SVG = 'http://www.w3.org/2000/svg';
const INK = '#5b4b40';
const ROSE = '#d37681';
const { width: W, height: H } = WALL_CALENDAR;
const COLUMN = 88 / 7;

const onWall = projector(WALL_CALENDAR.wall, W, H);
const fixed = (n: number) => n.toFixed(1);
const points = (list: [number, number][]) => list.map(([x, y]) => onWall(x, y).map(fixed).join(',')).join(' ');
const quad = (x: number, y: number, w: number, h: number) =>
  points([
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ]);
const oval = (cx: number, cy: number, rx: number, ry: number, steps = 24) =>
  points(
    Array.from({ length: steps + 1 }, (_, i): [number, number] => {
      const angle = (i / steps) * 2 * Math.PI;
      return [cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)];
    })
  );

/** The local frame at (x, y) as an SVG matrix, so text leans with the wall. */
const frameAt = (x: number, y: number) => {
  const [ox, oy] = onWall(x, y);
  const [ux, uy] = onWall(x + 1, y);
  const [vx, vy] = onWall(x, y + 1);
  return `matrix(${[ux - ox, uy - oy, vx - ox, vy - oy, ox, oy].map((n) => n.toFixed(3)).join(' ')})`;
};

const node = (tag: string, attributes: Record<string, string | number>, text?: string | number) => {
  const element = document.createElementNS(SVG, tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
  if (text !== undefined) element.textContent = String(text);
  return element;
};

const inscribe = (text: string | number, x: number, y: number, size: number, attributes = {}) =>
  node(
    'text',
    {
      transform: frameAt(x, y),
      'font-size': size,
      'font-family': 'Belleza, serif',
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      ...attributes,
    },
    text
  );

function draw(calendar: Element, now: Date) {
  const { year, month, day } = parisDate(now);
  const monthName = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', month: 'long' }).format(now);
  const closed = (column: number) => !HOURS.find((d) => d.weekday === columnWeekday(column))?.slots.length;

  calendar.append(
    node('polygon', { points: quad(3, 4, W, H), fill: 'rgb(30 14 8 / 0.35)' }),
    node('polygon', { points: quad(0, 0, W, H), fill: '#f8e2cf', stroke: 'rgb(91 75 64 / 0.4)', 'stroke-width': 1 }),
    node('polygon', { points: quad(0, 0, W, 30), fill: ROSE }),
    inscribe(monthName.toUpperCase(), 50, 17, 12, { fill: '#fff4ea', 'letter-spacing': 1.2 })
  );
  for (let ring = 0; ring < 9; ring++) {
    calendar.append(
      node('polyline', { points: oval(12 + ring * 9.5, 0, 2, 4.5), fill: 'none', stroke: INK, 'stroke-width': 1.1 })
    );
  }
  [...'LMMJVSD'].forEach((letter, column) =>
    calendar.append(inscribe(letter, 6 + COLUMN * (column + 0.5), 41, 7.5, { fill: closed(column) ? ROSE : INK }))
  );
  for (const cell of monthCells(year, month, day)) {
    const cx = 6 + COLUMN * (cell.column + 0.5);
    const cy = 55 + cell.row * 16;
    const off = closed(cell.column);
    calendar.append(inscribe(cell.day, cx, cy, 8, { fill: INK, opacity: off ? 0.45 : 1 }));
    if (off) {
      const strike = points([
        [cx - 4.5, cy + 3.5],
        [cx + 4.5, cy - 3.5],
      ]);
      calendar.append(node('polyline', { points: strike, stroke: INK, 'stroke-opacity': 0.55, 'stroke-width': 0.8 }));
    }
    if (cell.today) {
      calendar.append(
        node('polyline', { points: oval(cx, cy, 6.5, 6), fill: 'none', stroke: ROSE, 'stroke-width': 1.6 })
      );
    }
  }
}

const calendar = document.getElementById('wall-calendar');
if (calendar) draw(calendar, new Date());
