import { describe, expect, it } from 'vitest';

import { MENU } from '~/data/menu';

import { validateMenu, type Service } from './menu';

const menuWith = (service: Partial<Service>) => [
  { name: 'Gel', lead: '', services: [{ id: 1, name: 'Gel', price: 10, minutes: 30, ...service }] },
];

describe('validateMenu', () => {
  it('accepts the salon catalogue', () => expect(MENU.flatMap((group) => group.services)).toHaveLength(17));

  it('rejects a non-integer id', () => expect(() => validateMenu(menuWith({ id: 1.5 }))).toThrow(/Fresha id/));
  it('rejects a negative price', () => expect(() => validateMenu(menuWith({ price: -1 }))).toThrow(/price/));
  it('rejects an empty duration', () => expect(() => validateMenu(menuWith({ minutes: 0 }))).toThrow(/duration/));

  it('rejects a duplicated id', () => {
    const twice = [
      ...menuWith({}),
      { name: 'Bis', lead: '', services: [{ id: 1, name: 'Bis', price: 1, minutes: 5 }] },
    ];
    expect(() => validateMenu(twice)).toThrow(/reuses/);
  });
});
