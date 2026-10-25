import { describe, expect, it } from 'vitest';

import { clock, duration, euro, priceLabel } from './format';

describe('euro', () => {
  it('keeps whole amounts bare', () => expect(euro(40)).toBe('40€'));
  it('writes cents with a comma', () => expect(euro(0.5)).toBe('0,50€'));
  it('rounds float noise away', () => expect(euro(0.1 + 0.2)).toBe('0,30€'));
});

describe('priceLabel', () => {
  it('flags starting prices', () =>
    expect(priceLabel({ id: 1, name: 'Gel', price: 60, from: true, minutes: 120 })).toBe('dès 60€'));

  it('writes add-ons with a range and a unit', () =>
    expect(
      priceLabel({ id: 2, name: 'Strass', price: 0.5, maxPrice: 3, minutes: 15, unit: 'ongle', addOn: true })
    ).toBe('+0,50€ à 3€/ongle'));
});

describe('clock', () => {
  it('drops zero minutes', () => expect(clock(540)).toBe('9h'));
  it('pads minutes', () => expect(clock(1085)).toBe('18h05'));
});

describe('duration', () => {
  it('counts minutes under an hour', () => expect(duration(45)).toBe('45 min'));
  it('writes whole hours', () => expect(duration(120)).toBe('2 h'));
  it('writes hours and minutes', () => expect(duration(75)).toBe('1 h 15'));
});
