import { useState, useEffect } from 'react';
import { Language, CartItem, MenuItem } from './types';
import { en } from './locales/en';
import { ka } from './locales/ka';
import { ru } from './locales/ru';
import { ar } from './locales/ar';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const translations = { en, ka, ru, ar };

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.item.id !== id));
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-cream-50">
      <Header lang={lang} setLang={setLang} translations={t} onCartClick={() => setIsCartOpen(true)} cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} />
      <Hero translations={t} />
      <MenuSection lang={lang} translations={t} onAddToCart={addToCart} />
      <section id="about" className="py-20 bg-olive-700 text-white px-4">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.about.title}</h2>
    <p className="text-lg md:text-xl text-cream-200 leading-relaxed mb-10">
      {t.about.description}
    </p>
    
    {/* Логотип после текста */}
    <div className="flex justify-center">
      <div className="bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer">
        <img 
          src="/logo.png" 
          alt="Beirut Saj Logo" 
          className="w-48 md:w-64 lg:w-72 h-auto object-contain"
        />
      </div>
    </div>
  </div>
</section>
      <Footer translations={t} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeFromCart} 
        translations={t} 
        lang={lang}
        onCheckout={() => { setIsCartOpen(false); setIsOrderModalOpen(true); }}
      />
      
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        lang={lang}
        translations={t}
      />
      
      <FloatingWhatsApp />
    </div>
  );
}