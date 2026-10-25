import type { ImageMetadata } from 'astro';

export interface PortfolioPhoto {
  src: ImageMetadata;
  alt: string;
}

const FILES = import.meta.glob<ImageMetadata>('../assets/images/portfolio/*.avif', { eager: true, import: 'default' });

const photo = (name: string): ImageMetadata => {
  const src = FILES[`../assets/images/portfolio/${name}.avif`];
  if (!src) throw new Error(`Missing portfolio photo: ${name}.avif`);
  return src;
};

/**
 * Joséphine's Fresha portfolio, in display order. The photo also posted on Instagram
 * (white French with a stone, DRCw9P1jOul) is left out: the Instagram tab already has it.
 */
export const PORTFOLIO: PortfolioPhoto[] = [
  ['baby-boomer-rhinestones', 'Baby boomer laiteux en amande, un ongle souligné de strass'],
  ['leopard-chocolate', 'Amandes nude et chocolat, motif léopard'],
  ['burnt-orange', 'Ongles courts orange brûlé'],
  ['gold-stars', 'Amandes nude, étoiles et filets dorés'],
  ['glossy-burgundy', 'Ongles courts bordeaux brillant'],
  ['tortoiseshell-french', 'French écaille de tortue sur amandes, un ongle bijou'],
  ['pink-baby-boomer', 'Baby boomer rose et blanc en amande'],
  ['autumn-flowers', 'Ongles nude, fleurs d’automne peintes à la main'],
  ['dark-chocolate', 'Ongles courts chocolat noir'],
  ['fine-french-gold', 'French fine blanche sur nude, filets dorés'],
  ['red-nail-art', 'Rouge vif et nail art rouge et blanc'],
  ['nude-chocolate-dots', 'French nude à petits points chocolat'],
  ['pearl-grey', 'Ongles laiteux gris perle'],
  ['burgundy-glitter', 'Ongles courts bordeaux pailletés'],
  ['chocolate-french', 'French chocolat sur nude'],
  ['baby-boomer-star', 'Baby boomer laiteux, une étoile dorée'],
  ['nude-caramel-gold', 'Ongles courts nude et caramel, un ongle doré'],
  ['silver-french-jewels', 'French argentée pailletée et petits bijoux'],
  ['deep-plum', 'Ongles courts prune profond'],
  ['classic-french', 'French blanche classique'],
].map(([name, alt]) => ({ src: photo(name), alt }));
