import React, { useState } from 'react';
import { X } from 'lucide-react';
import { validateTimeInput } from '../../utils/time';

interface TimerInputDialogProps {
  onConfirm: (minutes: number) => void;
  onClose: () => void;
}

export const TimerInputDialog: React.FC<TimerInputDialogProps> = ({ onConfirm, onClose }) => {
  const [minutes, setMinutes] = useState('25');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateTimeInput(minutes)) {
      onConfirm(parseInt(minutes, 10));
      setError('');
    } else {
      setError('Please enter a valid duration between 1 and 1440 minutes');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Set Timer Duration</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-200"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="minutes" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Minutes (1-1440)
            </label>
            <input
              type="number"
              id="minutes"
              min="1"
              max="1440"
              value={minutes}
              onChange={(e) => {
                setMinutes(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md dark:bg-gray-700 dark:text-white focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 
                       rounded-md transition-colors focus:outline-none focus:ring-2 
                       focus:ring-blue-400"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 
                       dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 
                       py-2 rounded-md transition-colors focus:outline-none 
                       focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};