import React, { useState, useEffect } from 'react';

export const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-6xl font-mono dark:text-white text-gray-800">
        {time.toLocaleTimeString()}
      </h1>
    </div>
  );
};