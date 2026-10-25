import { validateMenu } from '~/lib/menu';

export const MENU = validateMenu([
  {
    name: 'Semi-permanent',
    lead: 'Vernis sur ongles naturels, mains ou pieds',
    services: [
      { id: 23970722, name: 'Semi-permanent couleur mains', price: 40, from: true, minutes: 60 },
      { id: 23970772, name: 'Semi-permanent couleur pieds', price: 40, from: true, minutes: 60 },
      { id: 23970801, name: 'Dépose + pose semi-permanent', price: 55, from: true, minutes: 75 },
      { id: 23970789, name: 'Dépose semi-permanent', price: 20, minutes: 30 },
      { id: 27058925, name: 'Renfort semi-permanent', price: 5, minutes: 15, addOn: true },
    ],
  },
  {
    name: 'Gel',
    lead: 'Gainage ou rallongement, tenue trois à quatre semaines',
    services: [
      { id: 23970830, name: 'Gainage (ongles naturels)', price: 55, minutes: 90 },
      { id: 23970846, name: 'Pose complète avec rallongement', price: 60, from: true, minutes: 120 },
      { id: 23970926, name: 'Remplissage gel', price: 50, from: true, minutes: 90 },
      { id: 23970939, name: 'Dépose complète gel', price: 30, minutes: 30 },
      { id: 26368479, name: 'Ongle cassé, hors prestation', price: 5, from: true, minutes: 30 },
      { id: 23970965, name: 'Longueur L ou XL', price: 8, minutes: 30, addOn: true },
      {
        id: 23970954,
        name: 'Ongle cassé, avec une pose',
        price: 3,
        from: true,
        minutes: 5,
        unit: 'ongle',
        addOn: true,
      },
    ],
  },
  {
    name: 'Nail art',
    lead: 'En supplément de votre pose',
    services: [
      { id: 23972076, name: 'French / Babyboomer / Chrome', price: 5, from: true, minutes: 15, addOn: true },
      { id: 23972097, name: 'Baby color', price: 10, minutes: 15, addOn: true },
      {
        id: 23972117,
        name: 'Paillettes / Stickers',
        price: 0.5,
        from: true,
        minutes: 10,
        unit: 'ongle',
        quantity: 10,
        addOn: true,
      },
      {
        id: 23972132,
        name: 'Nail art / Strass',
        price: 0.5,
        maxPrice: 3,
        minutes: 15,
        unit: 'ongle',
        quantity: 10,
        addOn: true,
      },
    ],
  },
  {
    name: 'Manucure',
    lead: 'Soin des mains, sans pose',
    services: [{ id: 24511933, name: 'Manucure simple', price: 25, minutes: 45 }],
  },
]);
