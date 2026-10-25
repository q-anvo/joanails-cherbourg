import type { Service } from './menu';

/** 40 → "40€", 0.5 → "0,50€". */
export function euro(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(2).replace('.', ',')}€`;
}

/** "dès +0,50€ à 3€/ongle" */
export function priceLabel(service: Service): string {
  const from = service.from ? 'dès ' : '';
  const plus = service.addOn ? '+' : '';
  const max = service.maxPrice !== undefined ? ` à ${euro(service.maxPrice)}` : '';
  const unit = service.unit ? `/${service.unit}` : '';
  return `${from}${plus}${euro(service.price)}${max}${unit}`;
}

/** Minutes from midnight to a French clock time: 540 → "9h", 1110 → "18h30". */
export function clock(minutes: number): string {
  const rest = minutes % 60;
  return `${Math.floor(minutes / 60)}h${rest ? String(rest).padStart(2, '0') : ''}`;
}

/** 45 → "45 min", 60 → "1 h", 90 → "1 h 30". */
export function duration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const rest = minutes % 60;
  return `${Math.floor(minutes / 60)} h${rest ? ` ${String(rest).padStart(2, '0')}` : ''}`;
}
