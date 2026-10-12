import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import menuData from '../data/menu.json';
import categoriesData from '../data/categories.json';
import { MenuItem, Language } from '../types';

interface Props { 
  lang: Language; 
  translations: any; 
  onAddToCart: (item: MenuItem) => void; 
}

export default function MenuSection({ lang, translations, onAddToCart }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuData.filter((item: MenuItem & { popular?: boolean }) => {
    const matchesSearch = 
      item.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description[lang].toLowerCase().includes(searchQuery.toLowerCase());

    // Если выбрана категория "popular" — показываем только популярные
    if (activeCategory === 'popular') {
      return item.popular === true && matchesSearch;
    }

    // Если "all" — показываем всё
    if (activeCategory === 'all') {
      return matchesSearch;
    }

    // Иначе фильтруем по категории
    return item.category === activeCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-900">
        {translations.menu.title}
      </h2>
      
      {/* Поиск */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" size={20} />
          <input 
            type="text" 
            placeholder={translations.menu.search} 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 rtl:pl-4 rtl:pr-10 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Категории */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {/* Кнопка "Все" */}
        <button 
          onClick={() => setActiveCategory('all')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
            activeCategory === 'all' 
              ? 'bg-gold-500 text-white shadow-md scale-105' 
              : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'
          }`}
        >
          {translations.menu.categories.all}
        </button>

        {/* Кнопка "New and popular" с иконкой звезды */}
        <button 
          onClick={() => setActiveCategory('popular')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeCategory === 'popular' 
              ? 'bg-gold-500 text-white shadow-md scale-105' 
              : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'
          }`}
        >
          <Star size={14} fill={activeCategory === 'popular' ? 'white' : '#d4a012'} />
          {categoriesData.find(c => c.id === 'popular')?.name[lang]}
        </button>

        {/* Остальные категории из categories.json */}
        {categoriesData
          .filter(c => c.id !== 'popular')
          .map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)} 
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === cat.id 
                  ? 'bg-gold-500 text-white shadow-md scale-105' 
                  : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'
              }`}
            >
              {cat.name[lang]}
            </button>
          ))}
      </div>

      {/* Сетка блюд */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {filteredItems.map((item: MenuItem & { popular?: boolean }) => (
          <motion.div 
            key={item.id} 
            layout
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 flex flex-col group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name[lang]} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
              />
              {item.popular && (
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star size={12} fill="white" />
                  {categoriesData.find(c => c.id === 'popular')?.name[lang]}
                </div>
              )}
            </div>
            <div className="p-3 md:p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm md:text-lg font-bold text-charcoal-900 leading-tight flex-1">
                  {item.name[lang]}
                </h3>
                <span className="text-gold-600 font-bold text-lg ml-3 whitespace-nowrap">
                  {item.price} ₾
                </span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 flex-grow leading-relaxed line-clamp-2">
                {item.description[lang]}
              </p>
              <button 
  onClick={() => onAddToCart(item)} 
  className="w-full bg-charcoal-900 hover:bg-gold-600 text-white font-semibold py-2 md:py-3 rounded-lg md:rounded-xl transition-colors flex items-center justify-center gap-2 text-xs md:text-base"
>
                {translations.menu.addToCart}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Ничего не найдено</p>
        </div>
      )}
    </section>
  );
}