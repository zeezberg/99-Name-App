import React from 'react';
import { motion } from 'motion/react';
import { AllahName } from '../data/names';

interface NameCardProps {
  name: AllahName;
  index: number;
}

export const NameCard: React.FC<NameCardProps> = ({ name, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 10) * 0.05 }}
      className="glass-card rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow group cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-xs font-serif italic text-stone-400 mb-4 group-hover:bg-gold/20 group-hover:text-gold transition-colors">
        {name.id}
      </div>
      
      <h2 className="arabic-text text-4xl mb-4 text-deep-green group-hover:scale-110 transition-transform duration-300">
        {name.arabic}
      </h2>
      
      <div className="space-y-1 mb-4">
        <p className="font-serif italic text-gold text-sm tracking-wide">
          {name.transliteration}
        </p>
        <h3 className="text-xl font-semibold text-stone-800">
          {name.translation}
        </h3>
      </div>
      
      <p className="text-sm text-stone-500 leading-relaxed max-w-[240px]">
        {name.description}
      </p>
    </motion.div>
  );
};
