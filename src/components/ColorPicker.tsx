import React from 'react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

const COLORS = [
  { name: 'Pink', class: 'bg-pink-200' },
  { name: 'Yellow', class: 'bg-yellow-200' },
  { name: 'Blue', class: 'bg-blue-200' },
  { name: 'Purple', class: 'bg-purple-200' },
  { name: 'Green', class: 'bg-green-200' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">Choose Note Color</h3>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {COLORS.map(({ name, class: colorClass }) => (
            <button
              key={name}
              className={`${colorClass} w-10 h-10 rounded-full hover:ring-2 ring-offset-2 ring-gray-400`}
              onClick={() => {
                onColorSelect(colorClass);
                onClose();
              }}
              title={name}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}