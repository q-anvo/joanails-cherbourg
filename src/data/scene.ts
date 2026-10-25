import { SALON } from './salon';

/** Coordinates of the drawing, in its own 896×1200 pixel frame unless stated otherwise. */
export const DRAWING = { width: 896, height: 1200 } as const;

/** Patches of plants that move in a draught: CSS inset() clips, in % of the drawing. */
export const DRAUGHT_CLIPS = ['46% 89% 21% 0', '72% 0 0 84%', '24% 3% 66% 84%', '23% 50% 67% 36%'];

/** Lamp light, in % of the drawing; `delay` staggers the lights coming on, in seconds. */
export const CONES = [
  { x: 27, y: 48, width: 30, height: 13, delay: 0.5 },
  { x: 41, y: 49, width: 22, height: 10, delay: 0.8 },
];

export const GLOWS = [
  { x: 26.5, y: 47, size: 26, delay: 0.5 },
  { x: 40, y: 47.5, size: 20, delay: 0.8 },
  { x: 50, y: 33, size: 16, delay: 1.05 },
  { x: 72.8, y: 31.7, size: 16, delay: 1.2 },
  { x: 11.5, y: 2.5, size: 11, delay: 1.35 },
  { x: 28.8, y: 12, size: 9, delay: 1.45 },
  { x: 92.4, y: 4.2, size: 11, delay: 1.55 },
];

export type ZoneShape = { kind: 'polygon'; points: string } | { kind: 'circle'; cx: number; cy: number; r: number };

export interface SceneZone {
  id: string;
  href: string;
  external: boolean;
  label: string;
  ariaLabel: string;
  /** What lights up, feathered. */
  shape: ZoneShape;
  /** The clickable outline, also drawn as a dotted trace. */
  hit: string;
  halo: { cx: number; cy: number; rx: number; ry: number };
  /** Centre of the label pill and its width before the font has loaded. */
  tag: { x: number; y: number; width: number };
  hasCalendar?: boolean;
}

const CHAIR =
  '700,470 805,462 812,480 775,560 765,600 748,662 735,662 735,610 660,612 628,655 617,650 640,600 615,575 628,545 680,535';
const TABLE = '92,700 128,662 300,652 470,688 468,740 330,752 100,716';
const outline = (points: string) => `M${points.split(' ').join(' L')} Z`;

export const ZONES: SceneZone[] = [
  {
    id: 'book',
    href: SALON.fresha.url,
    external: true,
    label: 'Réserver',
    ariaLabel: 'Réserver sur Fresha',
    shape: { kind: 'polygon', points: '120,203 247,253 247,430 120,412' },
    hit: 'M126,209 L241,254 L241,424 L126,406 Z',
    halo: { cx: 182, cy: 315, rx: 100, ry: 125 },
    tag: { x: 182, y: 192, width: 108 },
    hasCalendar: true,
  },
  {
    id: 'chair',
    href: '#salon',
    external: false,
    label: 'Le salon',
    ariaLabel: 'Le salon',
    shape: { kind: 'polygon', points: CHAIR },
    hit: outline(CHAIR),
    halo: { cx: 715, cy: 565, rx: 140, ry: 130 },
    tag: { x: 625, y: 510, width: 108 },
  },
  {
    id: 'table',
    href: '#tarifs',
    external: false,
    label: 'Prestations',
    ariaLabel: 'Prestations et tarifs',
    shape: { kind: 'polygon', points: TABLE },
    hit: outline(TABLE),
    halo: { cx: 285, cy: 705, rx: 210, ry: 90 },
    tag: { x: 282, y: 628, width: 134 },
  },
  {
    id: 'bird',
    href: SALON.instagram.url,
    external: true,
    label: 'Instagram',
    ariaLabel: 'Instagram',
    shape: { kind: 'circle', cx: 580, cy: 435, r: 55 },
    hit: 'M525,435 a55,55 0 1,0 110,0 a55,55 0 1,0 -110,0 Z',
    halo: { cx: 580, cy: 435, rx: 95, ry: 95 },
    tag: { x: 580, y: 362, width: 128 },
  },
];

/** The wall calendar is drawn in a 100×160 frame, then mapped onto the left wall of the drawing. */
export const WALL_CALENDAR = {
  width: 100,
  height: 160,
  wall: [
    [130, 215],
    [235, 258],
    [235, 418],
    [130, 400],
  ],
} as const;
