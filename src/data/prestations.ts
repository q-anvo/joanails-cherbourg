export interface PrestationItem {
  nom: string;
  prix: string;
  detail?: string;
}
export interface PrestationCategorie {
  categorie: string;
  items: PrestationItem[];
}

export const PRESTATIONS: PrestationCategorie[] = [
  {
    categorie: 'Gel',
    items: [
      { nom: 'Gainage (ongles naturels)', prix: '55€' },
      { nom: 'Pose complète avec rallongement', prix: '60€' },
      { nom: 'Remplissage (3-4 semaines max)', prix: '50€' },
      { nom: 'Dépose complète gel', prix: '30€' },
      { nom: 'Ongle cassé', prix: '5€/ongle' },
      { nom: 'Longueur L ou XL', prix: '+8€' },
    ],
  },
  {
    categorie: 'Semi Permanent',
    items: [
      { nom: 'Semi Permanent mains ou pieds', prix: '40€' },
      { nom: 'Renfort semi permanent mains', prix: '+5€' },
      { nom: 'Dépose Semi Permanent', prix: '20€' },
      { nom: 'Dépose + Pose semi permanent', prix: '55€' },
    ],
  },
  {
    categorie: 'Nail Art',
    items: [
      { nom: 'French / Babyboomer / Chrome', prix: '+5€' },
      { nom: 'Baby Color', prix: '+10€' },
      { nom: 'Paillettes / Stickers', prix: '+0,50€/ongle' },
      { nom: 'Nail art / Strass', prix: '+0,50€ à 3€/ongle' },
    ],
  },
];
