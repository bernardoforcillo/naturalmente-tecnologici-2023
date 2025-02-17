import React, { useEffect, useState } from 'react';
import * as styles from './index.module.scss';
import { ReactComponent as LogoNT } from '../../../assets/logo-nt.svg';
import { ReactComponent as Hamburger } from '../../../assets/hamburger.svg';
import { ReactComponent as X } from '../../../assets/x.svg';
import Navigation from '../../molecules/Navigation';
import { Link } from 'gatsby';
import { isBrowser } from '../../../utilities/browser';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Index = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const [shadow, setShadow] = useState<boolean>(false);
  const [on, setOn] = useState<boolean>(false);
  const { language } = useI18next();
  const removeLang = (text: string) => (language != 'it' ? text.substring(3) : text);

  let prev = 0;

  const handleScroll = () => {
    const current = window.scrollY;

    if (opened) {
      setShow(true);
      setShadow(true);
    }

    if (!opened) {
      if (current < 50) {
        setShow(true);
        setShadow(false);
      } else if (current < prev) {
        setShow(true);
        setShadow(true);
      } else if (current >= prev) {
        setShow(false);
        setShadow(true);
      }
    }

    prev = current;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return window.removeEventListener('scroll', () => {});
  }, []);

  useEffect(() => {
    if (isBrowser() && removeLang(window.location.pathname) === '/') setOn(true);
  }, []);

  return (
    <header
      className={`${styles.wrap} ${show || opened ? styles.show : styles.hide}`}
      style={shadow ? { boxShadow: '0 0 20px 0 rgb(0, 0, 0, 0.25)' } : {}}
    >
      <Link to="/" className={styles.logoNT} title="Vai alla home" onClick={() => setOpened(false)}>
        <LogoNT
          width="195"
          height="64.45"
          style={{
            fill: on ? 'var(--nt-orange)' : opened ? 'var(--nt-green)' : 'var(--nt-white)',
          }}
        />
      </Link>
      <Navigation opened={opened} onClick={() => setOpened(false)} />
      {opened ? (
        <span onClick={() => setOpened(false)} className={styles.menuIcon}>
          <X width="25" height="25" fill="var(--nt-green)" />
        </span>
      ) : (
        <span onClick={() => setOpened(true)} className={styles.menuIcon}>
          <Hamburger width="28" height="20" />
        </span>
      )}
    </header>
  );
};

export default Index;
