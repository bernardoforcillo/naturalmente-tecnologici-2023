import React from 'react';
import { SeoProps } from './index.types';
import useSiteMetadata from '../../../hooks/useSiteMetadata';

const Index = ({ lang = 'it', title, description, pathname, children, structuredData = false }: SeoProps) => {
  const { metadata, featuredImage } = useSiteMetadata();

  const seo = {
    title: title ? title + ' | ' + metadata.title : metadata.title,
    description: description || metadata.description,
    url: `${metadata.siteUrl}${pathname || ``}`,
    image: featuredImage?.childImageSharp?.gatsbyImageData as unknown as ImageDataType,
  };

  const microData = {
    '@context': 'https://www.schema.org',
    '@type': 'Event',
    name: metadata.title,
    url: seo.url,
    description: seo.description,
    startDate: '11/04/2023 09:00AM',
    endDate: '13/04/2023 23:59PM',
    image: seo.image,
    logo: metadata.siteUrl + '/favicon.ico',
    location: {
      '@type': 'Place',
      name: 'Grassano',
      sameAs: seo.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Confino',
        addressLocality: 'Grassano',
        addressRegion: 'MT',
        postalCode: '75014',
        addressCountry: 'ITA',
      },
    },
    offers: {
      '@type': 'Offer',
      description: '3 giorni di evento + Camping',
      url: seo.url,
      price: '€119.99',
    },
  };

  return (
    <>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
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

      {/* <meta name="twitter:creator" content={seo.twitterUsername} /> */}
      {children}
    </>
  );
};

export default Index;
