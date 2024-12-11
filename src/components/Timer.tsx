import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { TimerState } from '../types';
import { TimerInputDialog } from './TimerInputDialog';

interface TimerProps {
  onClose: () => void;
}

export const Timer: React.FC<TimerProps> = ({ onClose }) => {
  const [state, setState] = useState<TimerState>({
    minutes: 25,
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
    setState({ minutes: 25, seconds: 0, isRunning: false });
  };

  const handleSetMinutes = (minutes: number) => {
    setState({ minutes, seconds: 0, isRunning: false });
    setShowInputDialog(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-96 text-center">
          <h2 className="text-gray-800 dark:text-white text-6xl font-mono mb-8">
            {String(state.minutes).padStart(2, '0')}:
            {String(state.seconds).padStart(2, '0')}
          </h2>
          
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={toggleTimer}
              className="bg-green-500 hover:bg-green-600 p-3 rounded-full text-white"
            >
              {state.isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="bg-red-500 hover:bg-red-600 p-3 rounded-full text-white"
            >
              <RotateCcw size={24} />
            </button>
          </div>

          <button
            onClick={() => setShowInputDialog(true)}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
                     text-gray-800 dark:text-white px-6 py-2 rounded-full mb-4 transition-colors"
          >
            Set Mins
          </button>

          <button
            onClick={onClose}
            className="block w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
                     dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 
                     rounded-md transition-colors"
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