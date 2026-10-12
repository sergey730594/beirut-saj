import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import menuData from '../data/menu.json';
import { Language } from '../types';

const CATEGORIES = [
  { id: 'popular', name: { en: 'New and popular', ka: 'ახალი და პოპულარული', ru: 'Новинки и популярное', ar: 'جديد وشائع' } },
  { id: 'breakfast', name: { en: 'Breakfast', ka: 'საუზმე', ru: 'Завтрак', ar: 'الفطور' } },
  { id: 'manakish', name: { en: 'Manakish Saj', ka: 'მანაქიში', ru: 'Манакиш Садж', ar: 'مناقيش صاج' } },
  { id: 'appetizers', name: { en: 'Appetizers', ka: 'აპეტაიზერები', ru: 'Закуски', ar: 'مقبلات' } },
  { id: 'main', name: { en: 'Main Course', ka: 'მთავარი კერძი', ru: 'Основные блюда', ar: 'الطبق الرئيسي' } },
  { id: 'sandwiches', name: { en: 'Sandwiches', ka: 'სენდვიჩები', ru: 'Сэндвичи', ar: 'سندويشات' } },
  { id: 'pasta', name: { en: 'Pasta', ka: 'პასტა', ru: 'Паста', ar: 'باستا' } },
  { id: 'salad', name: { en: 'Salad', ka: 'სალათი', ru: 'Салаты', ar: 'سلطة' } },
  { id: 'beverages', name: { en: 'Beverages', ka: 'სასმელები', ru: 'Напитки', ar: 'مشروبات' } },
];

interface MenuItem {
  id: string;
  name: { en: string; ka: string; ru: string; ar: string };
  description: { en: string; ka: string; ru: string; ar: string };
  price: number;
  category: string;
  popular?: boolean;
  image: string;
}

interface Props { 
  lang: Language; 
  translations: any; 
  onAddToCart: (item: MenuItem) => void; 
}

function isPopular(item: MenuItem): boolean {
  return item.popular === true;
}

export default function MenuSection({ lang, translations, onAddToCart }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuData.filter((item: MenuItem) => {
    const name = item.name[lang] || '';
    const desc = item.description[lang] || '';
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeCategory === 'popular') {
      return isPopular(item) && matchesSearch;
    }
    if (activeCategory === 'all') {
      return matchesSearch;
    }
    return item.category === activeCategory && matchesSearch;
  });

  function getCategoryName(id: string): string {
    const cat = CATEGORIES.find(c => c.id === id);
    return cat?.name[lang] || id;
  }

  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-900">
        {translations.menu.title}
      </h2>
      
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

      <div className="flex flex-wrap gap-2 justify-center mb-12">
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

        <button 
          onClick={() => setActiveCategory('popular')} 
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 ${
            activeCategory === 'popular' 
              ? 'bg-gold-500 text-white shadow-md scale-105' 
              : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'
          }`}
        >
          <Star size={14} fill={activeCategory === 'popular' ? 'white' : '#d4a012'} />
          {getCategoryName('popular')}
        </button>

        {CATEGORIES.filter(c => c.id !== 'popular').map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
              activeCategory === cat.id 
                ? 'bg-gold-500 text-white shadow-md scale-105' 
                : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'
            }`}
          >
            {getCategoryName(cat.id)}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {filteredItems.map((item: MenuItem) => (
          <motion.div 
            key={item.id} 
            layout
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 flex flex-col group"
          >
            <div className="h-28 md:h-48 overflow-hidden relative bg-cream-100">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.name[lang]} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              {isPopular(item) && (
                <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 bg-gold-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Star size={10} fill="white" />
                  <span className="hidden md:inline">{getCategoryName('popular')}</span>
                </div>
              )}
            </div>
            <div className="p-3 md:p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm md:text-lg font-bold text-charcoal-900 leading-tight flex-1">
                  {item.name[lang]}
                </h3>
                <span className="text-gold-600 font-bold text-sm md:text-lg ml-2 whitespace-nowrap">
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
          <p className="text-lg">
            {activeCategory === 'popular' 
              ? 'No popular items found' 
              : 'Nothing found'}
          </p>
        </div>
      )}
    </section>
  );
}