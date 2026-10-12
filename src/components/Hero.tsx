import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface Props { translations: any; }

export default function Hero({ translations }: Props) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=1200" alt="Lebanese food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/70 via-charcoal-950/50 to-cream-50" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {translations.hero.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-cream-200 mb-8 font-light">
          {translations.hero.subtitle}
        </motion.p>
        <motion.a href="#menu" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg">
          {translations.hero.cta}
          <ArrowDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}