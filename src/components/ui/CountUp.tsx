import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Counts from 0 up to `end` when scrolled into view. No external dependency —
 * uses requestAnimationFrame with an ease-out curve.
 */
interface CountUpProps {
  end: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1600,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) => {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default CountUp;
