import React from 'react';
import { ContattaciData } from '../../utilities/contattaciData';
import * as styles from './index.module.scss';
import Seo from '../../components/atoms/Seo';
import { HeadProps } from 'gatsby';
import Layout from '../../components/organisms/Layout';
import Heading from '../../components/atoms/Heading';
import ShowOnView from '../../components/atoms/ShowOnView';
import HeroContattaci from '../../components/organisms/HeroContattaci';

interface IndexProps {
  pageContext: ContattaciData;
}

const Index = ({ pageContext }: IndexProps) => {
  return (
    <Layout>
      <HeroContattaci heading={pageContext.name} />
      <ShowOnView className={styles.head}>
        <h4 dangerouslySetInnerHTML={{ __html: pageContext.description }}></h4>
      </ShowOnView>
      <Heading text="Contattaci" />
      <ShowOnView className={styles.formWrap}>
        <iframe
          data-tally-src={`https://tally.so/embed/n9XpoK?type=${pageContext.name}&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          loading="lazy"
          width="100%"
          height="420"
          title="CONTATTACI"
          className={styles.form}
        ></iframe>
      </ShowOnView>
    </Layout>
  );
};

export default Index;

export const Head = ({ location, pageContext }: HeadProps) => {
  const context = pageContext as ContattaciData;

  return (
    <Seo
      title={context.name + ' - Contattaci'}
      pathname={location.pathname}
      description={context.description}
      structuredData
    />
  );
};
