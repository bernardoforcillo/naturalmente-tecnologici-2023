import React from 'react';
import Layout from '../components/organisms/Layout';
import HeroProgram from '../components/organisms/HeroProgram';
import Seo from '../components/atoms/Seo';
import Program from '../components/molecules/Program';
import Guests from '../components/organisms/Guests';
import { graphql, HeadProps } from 'gatsby';

const Programma = () => {
  return (
    <Layout>
      <HeroProgram />
      <Guests />
      <Program />
    </Layout>
  );
};

export const Head = ({ data, pageContext }: HeadProps) => {
  const t = (key: string) => JSON.parse((data as any).locales.edges[1].node.data)[key] ?? key;

  return <Seo title={t('SEOTitle')} pathname="/programma/" description={t('SEODescription')} structuredData />;
};

export default Programma;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { ns: { in: ["common", "program"] }, language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
