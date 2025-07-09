import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 10);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(counter);
        setDisplayValue(value);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 10);

    return () => clearInterval(counter);
  }, [value, duration]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;