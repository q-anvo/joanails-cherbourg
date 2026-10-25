import { describe, expect, it } from 'vitest';

import type { Service } from './menu';
import { lineAmount, summarize } from './ticket';

const gel: Service = { id: 1, name: 'Gainage', price: 55, minutes: 90 };
const fill: Service = { id: 2, name: 'Remplissage', price: 50, from: true, minutes: 90 };
const glitter: Service = { id: 3, name: 'Paillettes', price: 0.5, minutes: 10, unit: 'ongle', quantity: 10 };
const strass: Service = { id: 4, name: 'Strass', price: 0.5, maxPrice: 3, minutes: 15, unit: 'ongle', quantity: 10 };

describe('lineAmount', () => {
  it('multiplies by the quantity', () => expect(lineAmount(glitter)).toBe(5));
  it('defaults to one unit', () => expect(lineAmount(gel)).toBe(55));
});

describe('summarize', () => {
  it('is empty with nothing picked', () =>
    expect(summarize([])).toEqual({ count: 0, total: 0, minutes: 0, startingPrice: false }));

  it('sums prices with quantities, and durations', () =>
    expect(summarize([gel, glitter])).toEqual({ count: 2, total: 60, minutes: 100, startingPrice: false }));

  it('marks the total as a floor when a price starts at', () =>
    expect(summarize([gel, fill]).startingPrice).toBe(true));

  it('marks the total as a floor when a price is a range', () => expect(summarize([strass]).startingPrice).toBe(true));
});
