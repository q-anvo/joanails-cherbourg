/**
 * Fresha fills its cart from `offerItems`: comma-separated service variant ids, `sv:<id>`.
 * Never use a `cartId` link: that cart lives on Fresha's server and is shared by everyone holding the link.
 */
export function bookingUrl(base: string, serviceIds: readonly number[]): string {
  if (!serviceIds.length) return base;
  return `${base}?offerItems=${serviceIds.map((id) => `sv:${id}`).join(',')}`;
}
