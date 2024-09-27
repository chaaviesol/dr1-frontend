import React, { useState, useEffect } from 'react';

const CountingEffect = ({ targetNumber = 1000, duration = 2000, prefix = "", suffix = "", style = {} }) => {
  const [count, setCount] = useState(0);
  const increment = Math.ceil(targetNumber / (duration / 16)); // Calculate increment based on 60fps

  useEffect(() => {
    const updateCount = () => {
      setCount((prevCount) => {
        const nextCount = prevCount + increment;
        return nextCount > targetNumber ? targetNumber : nextCount;
      });
    };

    const intervalId = setInterval(updateCount, 16); // Update every 16ms (approximately 60fps)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [targetNumber, duration, increment]);

  return (
    <h2 style={style}>{count}{prefix}{suffix}</h2>
  );
};

export default CountingEffect;
