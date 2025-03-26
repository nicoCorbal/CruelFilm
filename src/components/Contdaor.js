import { useState, useEffect } from "react";

const SuicideCounter = () => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const secondsSinceStart = Math.floor((Date.now() - startOfYear) / 1000);
  const suicideRatePerSecond = 0.00013;
  const initialCount = Math.floor(secondsSinceStart * suicideRatePerSecond);
  
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 7700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-3xl text-red-600 font-gothic">
      <p>Suicidios en España este año:</p>
      <span className="text-6xl font-bold">{count.toLocaleString()}</span>
    </div>
  );
};

export default SuicideCounter;
