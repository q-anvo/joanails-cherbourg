import { clock } from './format';
import type { ParisClock } from './paris-time';

export type Slot = readonly [opens: number, closes: number];

export interface DayHours {
  /** 0 is Sunday, as Date#getDay. */
  weekday: number;
  name: string;
  slots: readonly Slot[];
}

export type WeekHours = readonly DayHours[];

export interface OpeningStatus {
  open: boolean;
  text: string;
}

function dayOf(hours: WeekHours, weekday: number): DayHours {
  const day = hours.find((entry) => entry.weekday === weekday);
  if (!day) throw new Error(`hours: no entry for weekday ${weekday}`);
  return day;
}

function when(offset: number, day: DayHours): string {
  if (offset === 0) return 'aujourd’hui';
  if (offset === 1) return 'demain';
  return day.name.toLowerCase();
}

export function openingStatus(hours: WeekHours, now: ParisClock): OpeningStatus {
  const current = dayOf(hours, now.weekday).slots.find(
    ([opens, closes]) => now.minutes >= opens && now.minutes < closes
  );
  if (current) return { open: true, text: `Ouvert · ferme à ${clock(current[1])}` };

  for (let offset = 0; offset <= 7; offset++) {
    const day = dayOf(hours, (now.weekday + offset) % 7);
    const next = day.slots.find(([opens]) => offset > 0 || opens > now.minutes);
    if (next) return { open: false, text: `Fermé · ouvre ${when(offset, day)} à ${clock(next[0])}` };
  }
  return { open: false, text: 'Fermé' };
}
