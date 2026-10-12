import { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
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

  // Рефы для отслеживания кликов вне элементов
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Закрытие языкового dropdown при клике вне
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
          {/* Логотип + Название — ссылка на Home */}
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

          {/* Desktop Navigation */}
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

          {/* Правая часть: язык + корзина + мобильное меню */}
          <div className="flex items-center gap-3" ref={mobileMenuRef}>
            {/* Языковой переключатель */}
            <div className="relative hidden sm:block" ref={langDropdownRef}>
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)} 
                className="flex items-center gap-2 text-charcoal-800 hover:text-gold-600 px-3 py-2 rounded-lg hover:bg-cream-100 transition-colors"
              >
                <span className="uppercase font-semibold text-sm">{lang}</span>
              </button>
              <AnimatePresence>
                {langDropdownOpen