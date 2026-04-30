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
    categorie: 'Pose Gel',
    items: [
      { nom: 'Pose complète gel', prix: '55€' },
      { nom: 'Remplissage', prix: '40€' },
      { nom: 'Dépose gel', prix: '15€' },
    ],
  },
  {
    categorie: 'Vernis Semi-Permanent',
    items: [
      { nom: 'Pose semi-permanent', prix: '35€', detail: 'Dépose incluse' },
      { nom: 'Dépose seule', prix: '10€' },
    ],
  },
  {
    categorie: 'Nail Art',
    items: [
      { nom: 'Nail art simple', prix: '3€ / ongle' },
      { nom: 'Nail art complexe', prix: '5€ / ongle' },
      { nom: 'Strass & paillettes', prix: 'Sur devis' },
    ],
  },
  {
    categorie: 'Soins',
    items: [
      { nom: 'Soin cuticules', prix: '10€' },
      { nom: 'Bain de mains', prix: '8€' },
    ],
  },
];
