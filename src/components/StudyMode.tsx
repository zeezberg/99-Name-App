import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Puzzle } from 'lucide-react';
import { Flashcards } from './Flashcards';
import { Matching } from './Matching';

export const StudyMode: React.FC = () => {
  const [studyType, setStudyType] = useState<'flashcards' | 'matching'>('flashcards');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-20 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif italic mb-4">Режим изучения</h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          Используйте карточки для запоминания или закрепите знания в упражнении на сопоставление.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-stone-100 p-1 rounded-2xl shadow-inner">
          <button
            onClick={() => setStudyType('flashcards')}
            className={`px-8 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              studyType === 'flashcards' ? 'bg-white text-stone-900 shadow-md' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Layers size={18} />
            Карточки
          </button>
          <button
            onClick={() => setStudyType('matching')}
            className={`px-8 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              studyType === 'matching' ? 'bg-white text-stone-900 shadow-md' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Puzzle size={18} />
            Сопоставление
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={studyType}
          initial={{ opacity: 0, x: studyType === 'flashcards' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: studyType === 'flashcards' ? 20 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {studyType === 'flashcards' ? <Flashcards /> : <Matching />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
