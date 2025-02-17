import React, { useEffect, useState } from 'react';
import * as styles from './index.module.scss';
import { TimerProps } from './index.types';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Index = ({ shutOffTimer, date }: TimerProps) => {
  const { language } = useI18next();
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const countDownDate = date.getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
    }, 1000);

    const timeRemaining = setInterval(() => {
      const now = new Date().getTime();
      let distance = countDownDate - now;
      if (distance < 0) {
        clearInterval(timeRemaining);
        shutOffTimer();
      } else {
        distance = Math.abs(countDownDate - now);
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        days != d ? setDays(d) : null;
        hours != h ? setHours(h) : null;
        minutes != m ? setMinutes(m) : null;
        seconds != s ? setSeconds(s) : null;
      }
    }, 1000);

    return clearInterval(undefined);
  }, []);
  return (
    <div className={styles.timer}>
      <span>
        <div className={styles.timeWrap}>
          <p className={styles.time}>{days}</p>
          <p>{language == 'it' ? 'Giorni' : 'Days'}</p>
        </div>
        <div className={styles.timeWrap}>
          <p className={styles.time}>{hours}</p>
          <p>{language == 'it' ? 'Ore' : 'Hours'}</p>
        </div>
      </span>
      <span>
        <div className={styles.timeWrap}>
          <p className={styles.time}>{minutes}</p>
          <p>{language == 'it' ? 'Minuti' : 'Minutes'}</p>
        </div>
        <div className={styles.timeWrap}>
          <p className={styles.time}>{seconds}</p>
          <p>{language == 'it' ? 'Secondi' : 'Seconds'}</p>
        </div>
      </span>
    </div>
  );
};

export default Index;
