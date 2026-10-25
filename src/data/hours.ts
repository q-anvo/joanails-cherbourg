import type { WeekHours } from '~/lib/hours-status';

/** Opening slots in minutes from midnight, Paris time. Weekday follows Date#getDay: 0 is Sunday. */
export const HOURS: WeekHours = [
  { weekday: 1, name: 'Lundi', slots: [] },
  { weekday: 2, name: 'Mardi', slots: [[540, 1110]] },
  { weekday: 3, name: 'Mercredi', slots: [[1050, 1170]] },
  { weekday: 4, name: 'Jeudi', slots: [[1050, 1170]] },
  { weekday: 5, name: 'Vendredi', slots: [[540, 1110]] },
  { weekday: 6, name: 'Samedi', slots: [[540, 810]] },
  { weekday: 0, name: 'Dimanche', slots: [] },
];
