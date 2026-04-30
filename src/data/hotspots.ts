export interface Hotspot {
  id: string;
  label: string;
  /** Mobile-first position (% of viewport, object-position: 25% top) */
  x: number;
  y: number;
  /** Desktop override (% of viewport, object-position: 50% 22%) */
  xLg?: number;
  yLg?: number;
  title: string;
}

export const HOTSPOTS: Hotspot[] = [
  // Calendar "April" — top-left wall
  { id: 'planity',     label: 'Réserver',     x: 14, y: 18,  xLg: 17, yLg: 11,  title: 'Prendre Rendez-vous' },
  // Instagram tablet — on the nail desk
  { id: 'instagram',   label: 'Instagram',    x: 48, y: 52,  xLg: 42, yLg: 85,  title: 'Instagram' },
  // Desk lamp & workspace
  { id: 'contact',     label: 'Contact',      x: 15, y: 45,  xLg: 18, yLg: 72,  title: 'Contact & Avis' },
  // Nail products on desk
  { id: 'prestations', label: 'Prestations',  x: 32, y: 63,  xLg: 28, yLg: 60,  title: 'Prestations & Tarifs' },
  // Floral wallpaper — right background
  { id: 'galerie',     label: 'Galerie',      x: 77, y: 35,  xLg: 65, yLg: 52,  title: 'Galerie Nail Art' },
  // Waiting platform & white chair
  { id: 'apropos',     label: 'Le Salon',     x: 84, y: 62,  xLg: 78, yLg: 68,  title: 'Le Salon' },
];
