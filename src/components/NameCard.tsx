import React from 'react';

interface NameCardProps {
  name: {
    number: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    description: string;
  };
}

const NameCard: React.FC<NameCardProps> = ({ name }) => {
  // Функция для озвучки арабского текста
  const playArabicVoice = () => {
    // Останавливаем старую озвучку, если она еще звучит
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(name.arabic);
    utterance.lang = 'ar-SA'; // Устанавливаем арабский язык (Саудовская Аравия)
    utterance.rate = 0.8;      // Немного замедляем для четкости
    utterance.pitch = 1;       // Обычный тон
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50 flex flex-col items-center text-center space-y-4">
      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-medium">
        {name.number}
      </div>
      
      <div className="space-y-2 w-full">
        <div className="text-4xl font-arabic text-emerald-900 leading-relaxed">
          {name.arabic}
        </div>
        
        {/* КНОПКА ОЗВУЧКИ */}
        <button 
          onClick={playArabicVoice}
          className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-full transition-colors group"
          title="Прослушать произношение"
        >
          <span className="text-xl">🔊</span>
        </button>

        <div className="text-xl font-bold text-emerald-700">
          {name.transliteration}
        </div>
      </div>
      
      <div className="h-px w-16 bg-emerald-100" />
      
      <div className="space-y-1">
        <div className="text-lg font-bold text-slate-900">
          «{name.meaning}»
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {name.description}
        </p>
      </div>
    </div>
  );
};

export default NameCard;
