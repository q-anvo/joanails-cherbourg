import { describe, expect, it } from 'vitest';

import { columnWeekday, monthCells, projector } from './wall-calendar';

describe('monthCells', () => {
  it('starts on the right column, Monday first', () =>
    expect(monthCells(2026, 10)[0]).toMatchObject({ day: 1, column: 3, row: 0 }));

  it('fills a 28-day February that starts on a Monday', () => {
    const cells = monthCells(2027, 2);
    expect(cells).toHaveLength(28);
    expect(cells.at(-1)).toMatchObject({ day: 28, column: 6, row: 3 });
  });

  it('counts 29, 30 and 31 days', () => {
    expect(monthCells(2028, 2)).toHaveLength(29);
    expect(monthCells(2026, 11)).toHaveLength(30);
    expect(monthCells(2026, 12)).toHaveLength(31);
  });

  it('marks today only', () =>
    expect(
      monthCells(2026, 10, 25)
        .filter((cell) => cell.today)
        .map((cell) => cell.day)
    ).toEqual([25]));
});

describe('columnWeekday', () => {
  it('maps the Monday and Sunday columns to Date#getDay', () => {
    expect(columnWeekday(0)).toBe(1);
    expect(columnWeekday(6)).toBe(0);
  });
});

describe('projector', () => {
  const project = projector(
    [
      [0, 0],
      [10, 2],
      [10, 12],
      [0, 10],
    ],
    100,
    100
  );

  it('maps the corners onto the quad', () => {
    expect(project(0, 0)).toEqual([0, 0]);
    expect(project(100, 100)).toEqual([10, 12]);
  });

  it('interpolates the middle', () => expect(project(50, 50)).toEqual([5, 6]));
});
