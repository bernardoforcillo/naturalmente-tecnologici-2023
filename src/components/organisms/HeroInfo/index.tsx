import React from 'react';

import * as styles from './index.module.scss';
import Colli from '../../../assets/colli.svg';
import Collina from '../../../assets/collina.svg';
import Flower from '../../atoms/Flower';
import Speaking from '../../../assets/speaking.svg';

const Index = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.headWrap}>
        <h1 className={styles.heading}>
          INFO E FAQ <br />
          TUTTO CIÒ CHE DEVI SAPERE SUL FESTIVAL
        </h1>
        <Speaking width={600} className={styles.speaking} fill="var(--nt-dark-green)" />
        <div className={styles.svgWrap}>
          <div className={styles.collinaWrap}>
            <Collina width="1440" className={styles.collina} fill="var(--nt-white)" />
            <div className={styles.white}></div>
          </div>

          <div className={styles.greenFlowers}>
            <Flower color="var(--nt-green)" />
            <Flower color="var(--nt-green)" />
            <Flower color="var(--nt-green)" />
            <Flower color="var(--nt-green)" />
          </div>
          <Colli width="1440" height="185" className={styles.colli} fill="var(--nt-green)" />
          <div className={styles.green}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
