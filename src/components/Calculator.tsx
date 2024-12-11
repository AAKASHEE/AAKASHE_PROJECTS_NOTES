import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-semibold rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <div className="text-gray-500 dark:text-gray-400 text-sm h-6">{equation}</div>
          <div className="text-2xl font-mono dark:text-white text-right">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button onClick={handleClear} className="bg-red-500 text-white hover:bg-red-600">C</Button>
          <Button onClick={() => handleOperator('/')} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">/</Button>
          <Button onClick={() => handleOperator('*')} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">×</Button>
          <Button onClick={() => handleOperator('-')} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">-</Button>
          
          {[7, 8, 9].map(num => (
            <Button key={num} onClick={() => handleNumber(String(num))} className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleOperator('+')} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">+</Button>
          
          {[4, 5, 6].map(num => (
            <Button key={num} onClick={() => handleNumber(String(num))} className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500">
              {num}
            </Button>
          ))}
          <Button onClick={() => handleNumber('.')} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">.</Button>
          
          {[1, 2, 3, 0].map(num => (
            <Button key={num} onClick={() => handleNumber(String(num))} className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500">
              {num}
            </Button>
          ))}
          
          <Button onClick={handleEqual} className="bg-blue-500 text-white hover:bg-blue-600 col-span-2">=</Button>
        </div>
      </div>
    </div>
  );
};