import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Mes prestations',
      href: '#prestations',
    },
    {
      text: 'Prendre RDV',
      href: '#reservations',
    },
    {
      text: 'Mon salon',
      href: '#salon',
    },
    {
      text: 'Mes réalisations',
      href: '#realisations',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Parcourir le site',
      links: [
        { text: 'Mes prestations', href: '#prestations' },
        { text: 'Prendre RDV', href: '#reservations' },
        { text: 'Mon salon', href: '#salon' },
        { text: 'Mes réalisations', href: '#realisations' },
        { text: 'FAQs', href: '#faqs' },
      ],
    },
  ],
  secondaryLinks: [
    {
      title: '🕒 Horaires d’ouverture',
      links: [
        { text: 'Dimanche : Fermé' },
        { text: 'Lundi : 14h00 – 18h30' },
        { text: 'Mardi au Vendredi : 09h00 – 18h30' },
        { text: 'Samedi : 09h00 – 13h30' },

      ],
    },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/joanails.cherbourg/' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/share/16sUG1eW37' },
    { ariaLabel: 'Fresha', icon: 'tabler:app-window', href: 'https://www.fresha.com/fr/a/joanails-cherbourg-cherbourg-en-cotentin-cherbourg-en-cotentin-73-rue-du-val-de-saire-wk17zc9v' },
  ],
  footNote: `
    <a class="underline dark:text-muted" href="/mentions"> Mentions Légales </a> - 
    Made with love by <a class="underline dark:text-muted" href="https://q-anvo.github.io"> Q.A</a> -
    Tout droits réservés.
  `,
};
