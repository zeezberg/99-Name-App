import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { allahNames, AllahName } from '../data/names';
import { CheckCircle2, Trophy } from 'lucide-react';

interface MatchingItem {
  id: number;
  text: string;
  type: 'arabic' | 'translation';
}

export const Matching: React.FC = () => {
  const [items, setItems] = useState<MatchingItem[]>([]);
  const [selected, setSelected] = useState<MatchingItem | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const generateSet = () => {
    const count = 5;
    const shuffled = [...allahNames].sort(() => 0.5 - Math.random()).slice(0, count);
    
    const arabicItems: MatchingItem[] = shuffled.map(n => ({ id: n.id, text: n.arabic, type: 'arabic' }));
    const translationItems: MatchingItem[] = shuffled.map(n => ({ id: n.id, text: n.translation, type: 'translation' }));
    
    setItems([...arabicItems, ...translationItems].sort(() => 0.5 - Math.random()));
    setMatches([]);
    setSelected(null);
  };

  useEffect(() => {
    generateSet();
  }, []);

  const handleClick = (item: MatchingItem) => {
    if (matches.includes(item.id)) return;
    if (selected?.id === item.id && selected.type === item.type) {
      setSelected(null);
      return;
    }

    if (!selected) {
      setSelected(item);
    } else {
      if (selected.type !== item.type && selected.id === item.id) {
        // Correct match
        setMatches(prev => [...prev, item.id]);
        setSelected(null);
        if (matches.length + 1 === items.length / 2) {
          setScore(prev => prev + 1);
          setTimeout(generateSet, 1000);
        }
      } else {
        // Wrong match
        setWrongId(item.id);
        setTimeout(() => setWrongId(null), 500);
        setSelected(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8 px-4">
        <h3 className="text-xl font-serif italic text-stone-600 tracking-wide">Сопоставьте имя и значение</h3>
        <div className="flex items-center gap-2 text-gold font-bold">
          <Trophy size={20} />
          <span>Раундов: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-4">
        <AnimatePresence>
          {items.map((item, idx) => {
            const isMatched = matches.includes(item.id);
            const isSelected = selected?.id === item.id && selected.type === item.type;
            const isWrong = wrongId === item.id;

            return (
              <motion.button
                key={`${item.id}-${item.type}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: isMatched ? 0.5 : 1, 
                  scale: isMatched ? 0.95 : 1,
                  backgroundColor: isSelected ? '#F5E0A3' : isMatched ? '#ECFDF5' : '#FFFFFF'
                }}
                whileHover={{ scale: isMatched ? 0.95 : 1.02 }}
                onClick={() => handleClick(item)}
                className={`h-32 rounded-2xl border-2 flex items-center justify-center p-4 text-center transition-all shadow-sm
                  ${isMatched ? 'border-emerald-200 cursor-default' : 
                    isSelected ? 'border-gold shadow-md' : 
                    isWrong ? 'border-rose-400 animate-shake' : 'border-stone-100 hover:border-gold/30'}
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className={`${item.type === 'arabic' ? 'arabic-text text-3xl text-deep-green' : 'text-sm font-medium text-stone-700'}`}>
                    {item.text}
                  </span>
                  {isMatched && <CheckCircle2 size={16} className="text-emerald-500" />}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {matches.length === items.length / 2 && items.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <p className="text-emerald-600 font-bold text-xl mb-4">Отлично! Все верно.</p>
          <button 
            onClick={generateSet}
            className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg"
          >
            Следующий раунд
          </button>
        </motion.div>
      )}
    </div>
  );
};
