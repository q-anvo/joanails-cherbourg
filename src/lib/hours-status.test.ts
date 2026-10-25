import { describe, expect, it } from 'vitest';

import { HOURS } from '~/data/hours';

import { openingStatus } from './hours-status';
import { parisClock } from './paris-time';

const SUNDAY = 0;
const TUESDAY = 2;
const WEDNESDAY = 3;

describe('openingStatus', () => {
  it('is open inside a slot', () =>
    expect(openingStatus(HOURS, { weekday: TUESDAY, minutes: 600 })).toEqual({
      open: true,
      text: 'Ouvert · ferme à 18h30',
    }));

  it('opens later today before the first slot', () =>
    expect(openingStatus(HOURS, { weekday: WEDNESDAY, minutes: 540 }).text).toBe('Fermé · ouvre aujourd’hui à 10h'));

  it('opens tomorrow after the last slot', () =>
    expect(openingStatus(HOURS, { weekday: TUESDAY, minutes: 1150 }).text).toBe('Fermé · ouvre demain à 10h'));

  it('skips closed days, from Sunday to Tuesday', () =>
    expect(openingStatus(HOURS, { weekday: SUNDAY, minutes: 600 }).text).toBe('Fermé · ouvre mardi à 9h'));

  it('is closed at the exact closing minute', () =>
    expect(openingStatus(HOURS, { weekday: TUESDAY, minutes: 1110 })).toEqual({
      open: false,
      text: 'Fermé · ouvre demain à 10h',
    }));

  it('says closed when the week has no slot', () => {
    const closedWeek = [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({ weekday, name: 'Jour', slots: [] }));
    expect(openingStatus(closedWeek, { weekday: 1, minutes: 0 })).toEqual({ open: false, text: 'Fermé' });
  });
});

describe('parisClock', () => {
  it('reads the time in Paris, summer time included', () =>
    expect(parisClock(new Date('2026-07-07T08:30:00Z'))).toEqual({ weekday: TUESDAY, minutes: 630 }));
});
