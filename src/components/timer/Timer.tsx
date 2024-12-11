import React, { useState, useEffect, useCallback } from 'react';
import { TimerState } from '../../types';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { TimerInputDialog } from './TimerInputDialog';
import { DEFAULT_TIMER_MINUTES } from '../../utils/time';

interface TimerProps {
  onClose: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onClose }) => {
  const [state, setState] = useState<TimerState>({
    minutes: DEFAULT_TIMER_MINUTES,
    seconds: 0,
    isRunning: false,
  });
  const [showInputDialog, setShowInputDialog] = useState(false);

  const tick = useCallback(() => {
    setState(prev => {
      if (!prev.isRunning) return prev;
      
      if (prev.seconds === 0) {
        if (prev.minutes === 0) {
          return { ...prev, isRunning: false };
        }
        return { minutes: prev.minutes - 1, seconds: 59, isRunning: true };
      }
      return { ...prev, seconds: prev.seconds - 1 };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const toggleTimer = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setState({ minutes: DEFAULT_TIMER_MINUTES, seconds: 0, isRunning: false });
  };

  const handleSetMinutes = (minutes: number) => {
    setState({ minutes, seconds: 0, isRunning: false });
    setShowInputDialog(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-96 text-center">
          <TimerDisplay minutes={state.minutes} seconds={state.seconds} />
          <TimerControls
            isRunning={state.isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />

          <button
            onClick={() => setShowInputDialog(true)}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
                     dark:hover:bg-gray-600 text-gray-800 dark:text-white 
                     px-6 py-2 rounded-full mb-4 transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Set Minutes
          </button>

          <button
            onClick={onClose}
            className="block w-full bg-gray-200 dark:bg-gray-700 
                     hover:bg-gray-300 dark:hover:bg-gray-600 
                     text-gray-800 dark:text-white px-4 py-2 
                     rounded-md transition-colors focus:outline-none 
                     focus:ring-2 focus:ring-gray-400"
          >
            Close
          </button>
        </div>
      </div>

      {showInputDialog && (
        <TimerInputDialog
          onConfirm={handleSetMinutes}
          onClose={() => setShowInputDialog(false)}
        />
      )}
    </>
  );
};