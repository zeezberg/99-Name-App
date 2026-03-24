import React from 'react';

export interface NameCardProps {
  name: any; // Используем any, чтобы не было конфликтов с именами полей
  index: number;
}

export const NameCard: React.FC<NameCardProps> = ({ name, index }) => {
  const playArabicVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Пытаемся найти перевод в разных полях
  const translation = name.translation || name.meaning || "";
  const number = name.number || name.id || (index + 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50 flex flex-col items-center text-center space-y-4">
      {/* Номер имени */}
      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold">
        {number}
      </div>
      
      <div className="space-y-2 w-full">
        {/* Арабский шрифт - УВЕЛИЧЕН до text-5xl */}
        <div className="text-5xl font-arabic text-emerald-900 leading-relaxed">
          {name.arabic}
        </div>
        
        {/* Кнопка озвучки - УМЕНЬШЕНА до p-1.5 и text-lg */}
        <button 
          onClick={playArabicVoice}
          className="p-1.5 bg-emerald-100 hover:bg-emerald-200 rounded-full transition-colors mx-auto block my-2 active:scale-95"
          title="Прослушать"
        >
          <span className="text-lg">🔊</span>
        </button>

        {/* ШРИФТ ТРАНСКРИПЦИИ - УМЕНЬШЕН до text-lg */}
        <div className="text-lg font-bold text-emerald-700">
          {name.transliteration}
        </div>
      </div>
      
      <div className="h-px w-16 bg-emerald-100" />
      
      <div className="space-y-1">
        {/* ПЕРЕВОД НА РУССКОМ - УВЕЛИЧЕН до text-xl */}
        {/* УБРАНЫ вручную добавленные ёлочки « » в коде */}
        <div className="text-xl font-bold text-slate-900">
          {translation}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {name.description}
        </p>
      </div>
    </div>
  );
};
