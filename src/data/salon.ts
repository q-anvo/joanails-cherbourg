const FRESHA_URL =
  'https://www.fresha.com/fr/a/joanails-cherbourg-cherbourg-en-cotentin-cherbourg-en-cotentin-73-rue-du-val-de-saire-wk17zc9v';
const ADDRESS_QUERY = '73+Rue+du+Val+de+Saire+50100+Cherbourg-en-Cotentin';

export const SALON = {
  name: 'Joanails',
  brand: 'Joa Nails',
  address: {
    street: '73 rue du Val de Saire',
    postalCode: '50100',
    city: 'Cherbourg-en-Cotentin',
    country: 'FR',
  },
  geo: { latitude: 49.6388775, longitude: -1.6148432 },
  phone: { display: '07 49 39 44 04', international: '+33749394404' },
  instagram: {
    handle: '@joanails.cherbourg',
    url: 'https://www.instagram.com/joanails.cherbourg/',
  },
  fresha: { url: FRESHA_URL, booking: `${FRESHA_URL}/booking` },
  maps: {
    place:
      'https://www.google.com/maps/place/JoaNails+Cherbourg/@49.6388775,-1.6148432,17z/data=!3m1!4b1!4m6!3m5!1s0x480c97e43a752fcb:0xd530cad5ab935050!8m2!3d49.6388775!4d-1.6148432!16s%2Fg%2F11xm5chjh2',
    search: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`,
    embed:
      'https://www.google.com/maps?q=JoaNails+Cherbourg,+73+Rue+du+Val+de+Saire,+50100+Cherbourg-en-Cotentin&z=16&output=embed',
  },
} as const;
