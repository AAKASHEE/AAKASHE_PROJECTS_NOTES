import React from 'react';
import { formatTime } from '../../utils/time';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => {
  return (
    <h2 className="text-gray-800 dark:text-white text-6xl font-mono mb-8">
      {formatTime(minutes, seconds)}
    </h2>
  );
};