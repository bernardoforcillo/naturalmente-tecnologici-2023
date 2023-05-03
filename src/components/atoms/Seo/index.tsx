import React from 'react';
import { SeoProps } from './index.types';
import useSiteMetadata from '../../../hooks/useSiteMetadata';
import { tickets } from '../../../hooks/useInfo';

const Index = ({
  lang = 'it',
  title,
  description,
  pathname,
  children,
  structuredData = false,
  keywords,
  noIndex,
  images = [],
}: SeoProps) => {
  const { metadata, featuredImage } = useSiteMetadata();

  const seo = {
    title: title && pathname != '/' ? title + ' | ' + metadata.title : metadata.title,
    description: description || metadata.description,
    url: `${metadata.siteUrl}${pathname || ``}`,
    image: featuredImage?.childImageSharp?.gatsbyImageData as unknown as ImageDataType,
    keywords: keywords || metadata.keywords,
  };

  const microData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        url: seo.url,
        name: seo.title,
        description: seo.description,
        image: [metadata.siteUrl + seo.image.images.fallback.src, ...images.map((image) => metadata.siteUrl + image)],
        inLanguage: 'IT',
      },
      {
        '@context': 'https://www.schema.org',
        '@type': 'Event',
        name: 'Naturalmente Tecnologici',
        url: 'https://nt.syskrack.org/',
        description: "(Ri)-prendiamoci il futuro. Ragionamenti complessi sull'accelerazione dei nostri tempi.",
        startDate: '2023-08-11T09:00:00.000Z',
        endDate: '2023-08-13T23:59:59.999Z',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: false,
        inLanguage: 'IT',
        logo: metadata.siteUrl + '/favicon.ico',
        location: {
          '@type': 'Place',
          name: 'Tenute Bronzino',
          url: 'https://www.tenutabronzino.it/',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Contrada, Via S. Donato',
            addressLocality: 'Grottole',
            addressRegion: 'MT',
            postalCode: '75010',
            addressCountry: 'Italy',
          },
          sameAs: ['http://www.tenutabronzino.it/', 'https://goo.gl/maps/rs5PWEJgcMtwMRBNA'],
        },
        organizer: {
          '@type': 'Organization',
          name: 'Syskrack Giuseppe Porsia',
          url: 'https://www.syskrack.org/',
          sameAs: ['https://www.wikidata.org/wiki/Q116907424', 'https://syskrack.org/'],
        },
        //TODO: Rimettere appena partiranno i biglietti

        // offers: {
        //   '@type': 'AggregateOffer',
        //   highPrice: Math.max(...tickets.map((ticket) => ticket.price)),
        //   lowPrice: Math.min(...tickets.map((ticket) => ticket.price)),
        //   offerCount: tickets.length,
        //   priceCurrency: 'EUR',
        //   offer: tickets.map((ticket) => ({
        //     '@type': 'Offer',
        //     url: ticket.url,
        //     name: ticket.name,
        //     availability: 'https://schema.org/PreOrder',
        //     validFrom: '2023-08-11T09:00:00.000Z',
        //     validThrough: '2023-08-13T23:59:59.999Z',
        //     description: ticket.name,
        //     price: ticket.price,
        //     priceCurrency: 'EUR',
        //   })),
        // },
        sameAs: [
          'https://www.wikidata.org/wiki/Q117883453', // INFO: (Link evento [2023] aggiunto su Wikidata)
          'https://www.wikidata.org/wiki/Q117881465', // INFO: (Link evento aggiunto su Wikidata)
        ],
      },
    ],
  };

  return (
    <>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={metadata.siteUrl + seo.image.images.fallback.src} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:locale" content={'it_IT'} />
      <meta property="og:image" content={metadata.siteUrl + seo.image.images.fallback.src} />
      <meta property="og:image:type" content={'image/jpg'} />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:image:secure_url" content={metadata.siteUrl + seo.image.images.fallback.src} />
      <meta property="og:image:width" content={`${seo.image.width ?? '1200'}`} />
      <meta property="og:image:height" content={`${seo.image.height ?? '630'}`} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={'website'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={metadata.siteUrl + seo.image.images.fallback.src} />

      {/* TODO: LEVARE QUESTO TAG QUANDO SI CAMBIA DOMINIO */}
      <meta name="google-site-verification" content="6CEt2yawsIZqWfyMh9IkmQa2U75Qu41kO92hyIV0R0M" />

      {structuredData ? <script type="application/ld+json">{JSON.stringify(microData)}</script> : <></>}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <></>}

      {/* <meta name="twitter:creator" content={seo.twitterUsername} /> */}
      {children}
    </>
  );
};

export default Index;
