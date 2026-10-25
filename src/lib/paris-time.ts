const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parts(date: Date, options: Intl.DateTimeFormatOptions): Record<string, string> {
  const format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', ...options });
  return Object.fromEntries(format.formatToParts(date).map(({ type, value }) => [type, value]));
}

export interface ParisClock {
  /** 0 is Sunday, as Date#getDay. */
  weekday: number;
  minutes: number;
}

export function parisClock(date: Date): ParisClock {
  const p = parts(date, { weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  return { weekday: WEEKDAYS.indexOf(p.weekday), minutes: Number(p.hour) * 60 + Number(p.minute) };
}

export interface ParisDate {
  year: number;
  /** 1 to 12. */
  month: number;
  day: number;
}

export function parisDate(date: Date): ParisDate {
  const p = parts(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
  return { year: Number(p.year), month: Number(p.month), day: Number(p.day) };
}
