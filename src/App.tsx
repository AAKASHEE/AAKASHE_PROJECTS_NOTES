import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Note } from './components/Note';
import { Timer } from './components/Timer';
import { Calculator } from './components/Calculator';
import { CurrentTime } from './components/CurrentTime';
import { ColorPicker } from './components/ColorPicker';
import { NoteType } from './types';
import { useTheme } from './hooks/useTheme';

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [showTimer, setShowTimer] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const addNote = (color: string) => {
    const newNote: NoteType = {
      id: Date.now().toString(),
      title: '',
      content: '',
      color,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleAddNoteClick = () => {
    setShowColorPicker(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar 
        onAddNote={handleAddNoteClick} 
        onTimerClick={() => setShowTimer(true)}
        onCalculatorClick={() => setShowCalculator(true)}
        onThemeToggle={toggleTheme}
        theme={theme}
      />
      
      <CurrentTime />

      <div className="pl-24 pr-8 py-8">
        <h1 className={`text-4xl font-bold mb-8 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>AAKASHEE's Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <Note
              key={note.id}
              {...note}
              onDelete={deleteNote}
            />
          ))}
        </div>
        {notes.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No notes yet</p>
            <p className="mt-2">Click the + button to create your first note</p>
          </div>
        )}
      </div>

      {showTimer && (
        <Timer onClose={() => setShowTimer(false)} />
      )}

      {showCalculator && (
        <Calculator onClose={() => setShowCalculator(false)} />
      )}

      {showColorPicker && (
        <ColorPicker
          onColorSelect={(color) => addNote(color)}
          onClose={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
}

export default App;