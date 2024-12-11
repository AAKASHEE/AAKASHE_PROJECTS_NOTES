import React from 'react';
import { Trash2 } from 'lucide-react';

interface NoteProps {
  id: string;
  title: string;
  content: string;
  color: string;
  onDelete: (id: string) => void;
}

export const Note: React.FC<NoteProps> = ({ id, title, content, color, onDelete }) => {
  return (
    <div className={`${color} rounded-lg p-4 h-[300px] flex flex-col`}>
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent text-gray-800 text-lg font-semibold mb-2 outline-none w-full"
        defaultValue={title}
      />
      <textarea
        placeholder="Write your note here..."
        className="bg-transparent text-gray-700 flex-grow resize-none outline-none w-full"
        defaultValue={content}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={() => onDelete(id)}
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}