import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { allahNames, AllahName } from '../data/names';

export const Flashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentName = allahNames[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allahNames.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allahNames.length) % allahNames.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full max-w-md perspective-1000 h-[400px] relative cursor-pointer" onClick={handleFlip}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex + (isFlipped ? '-back' : '-front')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl"
          >
            {!isFlipped ? (
              <>
                <span className="text-stone-400 text-sm font-serif mb-4">#{currentName.id}</span>
                <h2 className="arabic-text text-8xl text-deep-green mb-6">{currentName.arabic}</h2>
                <p className="text-stone-400 italic font-serif tracking-widest">{currentName.transliteration}</p>
                <p className="mt-8 text-xs text-stone-300 uppercase tracking-widest">Нажмите, чтобы перевернуть</p>
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-stone-800 mb-4">{currentName.translation}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{currentName.description}</p>
                <div className="w-12 h-1 gold-gradient rounded-full mb-6" />
                <p className="arabic-text text-3xl text-deep-green/50">{currentName.arabic}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-8 mt-12">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="text-stone-400 font-medium">
          {currentIndex + 1} / {allahNames.length}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors shadow-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <button
        onClick={() => { setCurrentIndex(Math.floor(Math.random() * allahNames.length)); setIsFlipped(false); }}
        className="mt-8 flex items-center gap-2 text-gold font-medium hover:text-gold/80 transition-colors"
      >
        <RotateCcw size={18} />
        Случайное имя
      </button>
    </div>
  );
};
