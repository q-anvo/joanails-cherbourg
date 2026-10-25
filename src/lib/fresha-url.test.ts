import { describe, expect, it } from 'vitest';

import { bookingUrl } from './fresha-url';

const BASE = 'https://www.fresha.com/fr/a/joanails/booking';

describe('bookingUrl', () => {
  it('links the plain booking page for an empty cart', () => expect(bookingUrl(BASE, [])).toBe(BASE));

  it('passes every variant id in offerItems', () =>
    expect(bookingUrl(BASE, [23970830, 23972117])).toBe(`${BASE}?offerItems=sv:23970830,sv:23972117`));

  it('never builds a shared cart link', () => expect(bookingUrl(BASE, [1, 2])).not.toContain('cartId'));
});
