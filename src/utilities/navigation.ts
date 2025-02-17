import edizioniData from './edizioniData';

export const links = (lang = 'it') => [
  { name: lang === 'it' ? 'Home' : 'Home', to: '/', position: 1, hide: true },
  { name: lang === 'it' ? 'Chi siamo' : 'About', to: '/chi-siamo', position: 2 },
  { name: 'Programma', to: '/programma', position: 2 },
  { name: lang === 'it' ? 'Partner' : 'Partner', to: '/partner', position: 2 },
  { name: lang === 'it' ? 'Info' : 'Info', to: '/info', position: 2 },
  { name: lang === 'it' ? 'Contattaci' : 'Contact us', to: '/contattaci', position: 2 },
  {
    name: lang === 'it' ? 'Edizioni' : 'Editions',
    multiple: true,
    links: edizioniData
      .sort((a, b) => (a.year > b.year ? -1 : 1))
      .map((ed) => ({
        name: ed.year,
        to: `/edizioni/${ed.year}`,
        position: 3,
      })),
  },
  // {
  //   name: 'Esempio',
  //   multiple: true,
  //   links: [
  //     ...Array(4)
  //       .fill(0)
  //       .map((data) => ({ name: 'Mbare', to: `/contattaci/${data}`, position: 3 })),
  //   ],
  // },
];
