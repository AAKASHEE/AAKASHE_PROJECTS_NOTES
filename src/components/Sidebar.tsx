import React from 'react';
import { Home, PlusCircle, Clock, Sun, Moon, Calculator } from 'lucide-react';

interface SidebarProps {
  onAddNote: () => void;
  onTimerClick: () => void;
  onCalculatorClick: () => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onAddNote, 
  onTimerClick,
  onCalculatorClick,
  onThemeToggle,
  theme 
}) => {
  return (
    <div className={`fixed left-0 top-0 h-full w-16 flex flex-col items-center py-4 space-y-6
                    ${theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-md'}`}>
      <button className={`${
        theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
      } transition-colors`}>
        <Home size={24} />
      </button>
      <button 
        onClick={onAddNote}
        className={`${
          theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <PlusCircle size={24} />
      </button>
      <button 
        onClick={onTimerClick}
        className={`${
          theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <Clock size={24} />
      </button>
      <button 
        onClick={onCalculatorClick}
        className={`${
          theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <Calculator size={24} />
      </button>
      <button 
        onClick={onThemeToggle}
        className={`${
          theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>
    </div>
  );
};