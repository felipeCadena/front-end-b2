'use client';

import { useEffect, useState } from 'react';
import MyTypography from "../atoms/my-typography";

type MyCountdownProps = {
  dueDate: string;
  hasExpired: boolean;
};


type CountdownNumeroProps = {
  time: string;
  label: string;
};

type Timers = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownNumero = ({ time, label }: CountdownNumeroProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <MyTypography
        variant='heading6'
        weight='bold'
        className='text-primary-900'
      >
        {time}
      </MyTypography>
      <MyTypography lightness={700}>{label}</MyTypography>
    </div>
  );
};

const MyCountdown = ({ dueDate, hasExpired }: MyCountdownProps) => {
  const [timers, setTimers] = useState<Timers>();

  useEffect(() => {

    const interval = setInterval(() => {
      const countDownDate = new Date(dueDate).getTime();
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimers({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDate, hasExpired]);

  if (!dueDate || !timers) return null;
  return (
    <div className='flex flex-col items-start justify-center md:flex-row md:items-center md:gap-6 print:hidden'>
      {!hasExpired ? <> <MyTypography
        variant='body-big'
        weight='medium'
        lightness={900}
      >
        Sua proposta expira em:
      </MyTypography>
        <div className='flex items-center justify-center gap-3 md:gap-6'>
          <CountdownNumero
            time={timers.days.toString().padStart(2, '0')}
            label='Dias'
          />
          <CountdownNumero
            time={timers.hours.toString().padStart(2, '0')}
            label='Horas'
          />
          <CountdownNumero
            time={timers.minutes.toString().padStart(2, '0')}
            label='Min'
          />
          <CountdownNumero
            time={timers.seconds.toString().padStart(2, '0')}
            label='Seg'
          />
        </div></>
        : <MyTypography
          variant='subtitle2'
          weight='medium'
          lightness={900}
        >
          Expirado
        </MyTypography>
      }
    </div>
  );
};

export default MyCountdown;
