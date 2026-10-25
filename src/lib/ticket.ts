import type { Service } from './menu';

export interface TicketSummary {
  count: number;
  total: number;
  minutes: number;
  /** At least one price is a starting price, so the total is a floor. */
  startingPrice: boolean;
}

export function lineAmount(service: Service): number {
  return Math.round(service.price * (service.quantity ?? 1) * 100) / 100;
}

export function summarize(services: Service[]): TicketSummary {
  return {
    count: services.length,
    total: Math.round(services.reduce((sum, service) => sum + lineAmount(service) * 100, 0)) / 100,
    minutes: services.reduce((sum, service) => sum + service.minutes, 0),
    startingPrice: services.some((service) => service.from || service.maxPrice !== undefined),
  };
}
