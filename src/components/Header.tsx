import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

interface Props {
  lang: Language;
  setLang: (l: Language) => void;
  translations: any;
  onCartClick: () => void;
  cartCount: number;
}

export default function Header({ lang, setLang, translations, onCartClick, cartCount }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages: { code: Language; label: string; dir: 'ltr' | 'rtl' }[] = [
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ka', label: 'ქართული', dir: 'ltr' },
    { code: 'ru', label: 'Русский', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
  ];

  const handleLangChange = (l: Language) => {
    setLang(l);
    const selected = languages.find(x => x.code === l);
    document.documentElement.dir = selected?.dir || 'ltr';
    document.documentElement.lang = l;
    setLangDropdownOpen(false);
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { key: 'menu', href: '#menu' },
    { key: 'about', href: '#about' },
    { key: 'location', href: '#location' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={scrollToHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="Beirut Saj Logo" 
              className="h-12 w-12 object-contain rounded-full"
            />
            <span className="text-xl md:text-2xl font-bold text-gradient tracking-tight">
              Beirut Saj
            </span>
          </button>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a 
                key={link.key} 
                href={link.href} 
                className="text-charcoal-800 hover:text-gold-600 font-medium transition-colors"
              >
                {translations.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3" ref={mobileMenuRef}>
            <div className="relative hidden sm:block" ref={langDropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)} 
                className="flex items-center gap-2 text-charcoal-800 hover:text-gold-600 px-3 py-2 rounded-lg hover:bg-cream-100 transition-colors"
              >
                <span className="uppercase font-semibold text-sm">{lang}</span>
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {languages.map((l) => (
                      <button 
                        key={l.code} 
                        onClick={() => handleLangChange(l.code)} 
                        className={`w-full text-left px-4 py-2 hover:bg-cream-100 rtl:text-right transition-colors ${
                          lang === l.code ? 'bg-cream-100 font-semibold text-gold-600' : 'text-charcoal-800'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={onCartClick} 
              className="relative p-2 text-charcoal-800 hover:text-gold-600 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-charcoal-800 hover:text-gold-600 hover:bg-cream-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={scrollToHome}
                className="flex items-center gap-2 w-full text-left text-gold-600 font-semibold py-2 hover:text-gold-700"
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              {navLinks.map((link) => (
                <a 
                  key={link.key} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="block text-charcoal-800 font-medium py-2 hover:text-gold-600"
                >
                  {translations.nav[link.key]}
                </a>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Language</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <button 
                      key={l.code} 
                      onClick={() => handleLangChange(l.code)} 
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        lang === l.code 
                          ? 'bg-gold-500 text-white' 
                          : 'bg-cream-100 text-charcoal-800 hover:bg-cream-200'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}