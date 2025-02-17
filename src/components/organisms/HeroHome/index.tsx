import React from 'react';

import * as styles from './index.module.scss';
import { ReactComponent as Colli } from '../../../assets/colli.svg';
import { ReactComponent as Collina } from '../../../assets/collina.svg';
import WindShovel from '../../atoms/WindShovel';
import { useTranslation } from 'react-i18next';
import Flower from '../../atoms/Flower';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Index = () => {
  const { t } = useTranslation();
  const { language } = useI18next();

  return (
    <div className={styles.wrap}>
      {/* <BigBranch width="555" height="282" className={styles.bigBranch} /> */}
      <div className={styles.headWrap}>
        <h1 className={language === 'en' ? styles.headingEn : styles.heading}>
          {t('Title')} <br />
          {t('Subtitle')}
        </h1>
        <a className={styles.date} href="#quando-e-dove" title={t('WhenWhere')}>
          Bosco Coste, Grottole(MT)
          <br /> <span>{t('Date')}</span>
        </a>
        <div className={styles.windShovels}>
          <div className={styles.firstWind}>
            <WindShovel color="var(--nt-orange)" />
          </div>
          <div
          // className={styles.secondWind}
          >
            <WindShovel color="var(--nt-orange)" slower />
          </div>
        </div>
        <Colli width="1440" className={styles.colli} />
        <div className={styles.white}></div>
      </div>
      <div className={styles.wrapHill}>
        <div className={styles.greenFlowers}>
          <Flower color="var(--nt-green)" />
          <Flower color="var(--nt-green)" />
          <Flower color="var(--nt-green)" />
        </div>
        <Collina width="1440" height="64" className={styles.collina} />
        <div className={styles.green}></div>
      </div>
    </div>
  );
};

export default Index;
