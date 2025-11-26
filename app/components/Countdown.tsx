/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState, useRef } from 'react';

export default function Countdown() {
  const targetRef = useRef(new Date('2026-01-01T00:00:00Z').getTime());
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = setInterval(() => {
      const diff = targetRef.current - Date.now();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      setTime({ d, h, m, s });
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {[
        { value: time.d, label: 'dienos' },
        { value: time.h, label: 'val' },
        { value: time.m, label: 'min' },
        { value: time.s, label: 'sec' },
      ].map((t, i) => (
        <div
          key={i}
          className="flex flex-col p-2 bg-black/70 rounded-box text-neutral-content"
        >
          <span className="countdown font-mono text-5xl">
            <span style={{ '--value': t.value } as any}>{t.value}</span>
          </span>
          {t.label}
        </div>
      ))}
    </div>
  );
}
