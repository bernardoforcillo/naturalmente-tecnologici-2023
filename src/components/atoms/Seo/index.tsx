import React from 'react';
import { SeoProps } from './index.types';
import useSiteMetadata from '../../../hooks/useSiteMetadata';
import { tickets } from '../../../hooks/useInfo';
import { links } from '../../../hooks/navigation';

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
        '@context': 'https://www.schema.org',
        '@type': 'WebSite',
        url: seo.url,
        name: seo.title,
        description: seo.description,
        image: [metadata.siteUrl + seo.image.images.fallback.src, ...images.map((image) => metadata.siteUrl + image)],
        inLanguage: 'IT',
      },
      {
        '@context': 'https://www.schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: links.map((link) => ({
          '@type': 'ListItem',
          position: link.position,
          name: link.name,
          item: metadata.siteUrl + link.to,
        })),
      },
      {
        '@context': 'https://www.schema.org',
        '@type': 'Event',
        name: 'Naturalmente Tecnologici',
        url: 'https://nt.syskrack.org/',
        description: "(Ri)-prendiamoci il futuro. Ragionamenti complessi sull'accelerazione dei nostri tempi.",
        image: [metadata.siteUrl + seo.image.images.fallback.src, ...images.map((image) => metadata.siteUrl + image)],
        startDate: '2023-08-11T09:00:00.000Z',
        endDate: '2023-08-13T23:59:59.999Z',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: false,
        inLanguage: 'IT',
        logo: metadata.siteUrl + '/favicon.ico',
        location: {
          '@type': 'Place',
          name: 'Tenuta Bronzino',
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

      {structuredData ? <script type="application/ld+json">{JSON.stringify(microData)}</script> : <></>}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <></>}

      <script
        id="saro"
        dangerouslySetInnerHTML={{
          __html: `(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
      var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
      f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
      var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
      _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');
      
      var ml_account = ml('accounts', '3548897', 'g2t5m4i7e2', 'load');
      var ml_webform_5919036 = ml_account('webforms', '5919036', 'd0q6a0', 'load');
      `,
        }}
      ></script>

      {/* <meta name="twitter:creator" content={seo.twitterUsername} /> */}
      {children}
    </>
  );
};

export default Index;
