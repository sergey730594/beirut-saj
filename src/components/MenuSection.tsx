import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import menuData from '../data/menu.json';
import { MenuItem, Language } from '../types';

interface Props { lang: Language; translations: any; onAddToCart: (item: MenuItem) => void; }

export default function MenuSection({ lang, translations, onAddToCart }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'coldMeze', 'hotMeze', 'sajBread', 'grills', 'desserts', 'beverages'];

  const filteredItems = menuData.filter((item: MenuItem) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-charcoal-900">{translations.menu.title}</h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-3" size={20} />
          <input type="text" placeholder={translations.menu.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 rtl:pl-4 rtl:pr-10" />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-gold-500 text-white shadow-md' : 'bg-white text-charcoal-800 hover:bg-cream-100 border border-gray-200'}`}>
              {translations.menu.categories[cat as keyof typeof translations.menu.categories]}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item: MenuItem) => (
          <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-charcoal-900">{item.name[lang]}</h3>
                <span className="text-gold-600 font-bold text-lg">{item.price} ₾</span>
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{item.description[lang]}</p>
              <button onClick={() => onAddToCart(item)} className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                {translations.menu.addToCart}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}