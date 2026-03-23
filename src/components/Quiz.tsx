import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, RefreshCcw, Trophy } from 'lucide-react';
import { allahNames, AllahName } from '../data/names';

export const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<AllahName | null>(null);
  const [options, setOptions] = useState<AllahName[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const generateQuestion = () => {
    const randomName = allahNames[Math.floor(Math.random() * allahNames.length)];
    const otherOptions = allahNames
      .filter(n => n.id !== randomName.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    const allOptions = [randomName, ...otherOptions].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion(randomName);
    setOptions(allOptions);
    setSelectedId(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (currentQuestion && cardRef.current) {
      cardRef.current.focus();
    }
  }, [currentQuestion]);

  const handleSelect = (id: number) => {
    if (selectedId !== null) return;
    
    setSelectedId(id);
    const correct = id === currentQuestion?.id;
    setIsCorrect(correct);
    setTotalQuestions(prev => prev + 1);
    if (correct) setScore(prev => prev + 1);
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto py-12 pt-20 px-4 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif italic mb-2">Проверьте свои знания</h2>
        <p className="text-stone-500">Выберите правильное значение имени</p>
      </div>

      <div 
        ref={cardRef}
        tabIndex={0}
        className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-gold/20"
      >
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-50" />
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-stone-400 text-sm font-medium uppercase tracking-widest">
            <Trophy size={16} className="text-gold" />
            <span>Счет: {score} / {totalQuestions}</span>
          </div>
          <button 
            onClick={generateQuestion}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-600"
          >
            <RefreshCcw size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center mb-12"
          >
            <div className="arabic-text text-7xl text-deep-green mb-6">
              {currentQuestion.arabic}
            </div>
            <div className="text-stone-400 font-serif italic tracking-widest">
              {currentQuestion.transliteration}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isCorrectOption = option.id === currentQuestion.id;
            
            let buttonClass = "p-6 rounded-2xl border-2 transition-all text-left flex justify-between items-center group ";
            
            if (selectedId === null) {
              buttonClass += "border-stone-100 hover:border-gold/50 hover:bg-gold/5";
            } else if (isCorrectOption) {
              buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
            } else if (isSelected && !isCorrectOption) {
              buttonClass += "border-rose-500 bg-rose-50 text-rose-900";
            } else {
              buttonClass += "border-stone-100 opacity-50";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={selectedId !== null}
                className={buttonClass}
              >
                <span className="font-medium">{option.translation}</span>
                {selectedId !== null && isCorrectOption && <CheckCircle2 size={20} className="text-emerald-500" />}
                {selectedId !== null && isSelected && !isCorrectOption && <XCircle size={20} className="text-rose-500" />}
              </button>
            );
          })}
        </div>

        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <p className="text-stone-500 mb-6 max-w-md mx-auto italic">
              {currentQuestion.description}
            </p>
            <button
              onClick={generateQuestion}
              className="px-8 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors font-medium"
            >
              Следующий вопрос
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
