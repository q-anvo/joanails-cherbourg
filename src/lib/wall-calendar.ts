export interface CalendarCell {
  day: number;
  /** 0 is Monday. */
  column: number;
  row: number;
  today: boolean;
}

/** Days of a month laid out Monday first. `month` runs from 1 to 12. */
export function monthCells(year: number, month: number, today?: number): CalendarCell[] {
  const lead = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    column: (lead + index) % 7,
    row: Math.floor((lead + index) / 7),
    today: index + 1 === today,
  }));
}

/** Calendar column (0 is Monday) to Date#getDay weekday (0 is Sunday). */
export const columnWeekday = (column: number): number => (column + 1) % 7;

export type Point = readonly [number, number];
export type Quad = readonly [topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point];

/** Maps a point of a `width`×`height` frame bilinearly onto a quadrilateral. */
export function projector(quad: Quad, width: number, height: number) {
  const [tl, tr, br, bl] = quad;
  return (x: number, y: number): [number, number] => {
    const u = x / width;
    const v = y / height;
    const axis = (k: 0 | 1) => (1 - u) * (1 - v) * tl[k] + u * (1 - v) * tr[k] + u * v * br[k] + (1 - u) * v * bl[k];
    return [axis(0), axis(1)];
  };
}
