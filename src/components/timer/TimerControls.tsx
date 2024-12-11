import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onToggle,
  onReset,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={onToggle}
        className="bg-green-500 hover:bg-green-600 p-3 rounded-full text-white 
                 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button
        onClick={onReset}
        className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white 
                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Reset timer"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};