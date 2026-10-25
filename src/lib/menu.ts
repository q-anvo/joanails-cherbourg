export interface Service {
  /** Fresha service variant id, booked as `sv:<id>`. */
  id: number;
  name: string;
  price: number;
  maxPrice?: number;
  /** The price is a starting price. */
  from?: boolean;
  minutes: number;
  /** Priced per unit (e.g. per nail); `quantity` units are counted in the ticket. */
  unit?: string;
  quantity?: number;
  /** An extra added on top of a service. */
  addOn?: boolean;
}

export interface ServiceGroup {
  name: string;
  lead: string;
  services: Service[];
}

export function validateMenu(groups: ServiceGroup[]): ServiceGroup[] {
  const seen = new Set<number>();
  for (const service of groups.flatMap((group) => group.services)) {
    const where = `menu: "${service.name}"`;
    if (!Number.isInteger(service.id) || service.id <= 0) throw new Error(`${where} has an invalid Fresha id`);
    if (seen.has(service.id)) throw new Error(`${where} reuses Fresha id ${service.id}`);
    if (!(service.price >= 0)) throw new Error(`${where} has a negative price`);
    if (service.maxPrice !== undefined && service.maxPrice < service.price)
      throw new Error(`${where} has a max price below its price`);
    if (!(service.minutes > 0)) throw new Error(`${where} needs a positive duration`);
    if (service.quantity !== undefined && !(Number.isInteger(service.quantity) && service.quantity > 0))
      throw new Error(`${where} has an invalid quantity`);
    seen.add(service.id);
  }
  return groups;
}
