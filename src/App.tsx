import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Search, Heart, Layers } from 'lucide-react';
import { allahNames } from './data/names';
import { NameCard } from './components/NameCard';
import { Quiz } from './components/Quiz';
import { StudyMode } from './components/StudyMode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'list' | 'quiz' | 'study'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const filteredNames = allahNames.filter(name => 
    name.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.arabic.includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-warm-cream/80 backdrop-blur-md border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-white shadow-lg shadow-gold/20">
              <Heart size={20} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-stone-900 leading-none">99 Имен</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold mt-1">Прекрасных Имен Аллаха</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center bg-stone-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <BookOpen size={16} />
              Список имен
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'study' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Layers size={16} />
              Изучение
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'quiz' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <GraduationCap size={16} />
              Тест
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder="Поиск имени..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-100 border-transparent focus:bg-white focus:border-gold/30 rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white rounded-full p-2 flex items-center shadow-2xl">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            activeTab === 'list' ? 'bg-white/10' : 'opacity-50'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-sm font-medium">Список</span>
        </button>
        <button
          onClick={() => setActiveTab('study')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            activeTab === 'study' ? 'bg-white/10' : 'opacity-50'
          }`}
        >
          <Layers size={20} />
          <span className="text-sm font-medium">Изучение</span>
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
            activeTab === 'quiz' ? 'bg-white/10' : 'opacity-50'
          }`}
        >
          <GraduationCap size={20} />
          <span className="text-sm font-medium">Тест</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-4 py-12"
            >
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-serif italic mb-6">Асма аль-Хусна</h2>
                <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
                  «У Аллаха — самые прекрасные имена. Посему взывайте к Нему посредством их...» (Коран, 7:180)
                </p>
              </div>

              {/* Search for mobile */}
              <div className="lg:hidden mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    type="text"
                    placeholder="Поиск имени..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-lg outline-none focus:border-gold/50 transition-all"
                  />
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNames.map((name, index) => (
                  <NameCard key={name.id} name={name} index={index} />
                ))}
              </div>

              {filteredNames.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-stone-400 font-serif italic text-xl">Имя не найдено</p>
                </div>
              )}
            </motion.div>
          ) : activeTab === 'study' ? (
            <motion.div
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StudyMode />
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-stone-400 text-sm">
            © {new Date().getFullYear()} 99 Прекрасных Имен Аллаха. Да пребудет с вами мир.
          </p>
        </div>
      </footer>
    </div>
  );
}
