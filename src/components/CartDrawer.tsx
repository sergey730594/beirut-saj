import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem, Language } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  translations: any;
  lang: Language;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, translations, lang, onCheckout }: Props) {
  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col rtl:right-auto rtl:left-0 rtl:translate-x-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-charcoal-900">{translations.cart.title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10">{translations.cart.empty}</p>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex gap-4 bg-cream-50 p-4 rounded-xl">
                    <img src={cartItem.item.image} alt="" className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-charcoal-900">{cartItem.item.name[lang]}</h4>
                      <p className="text-gold-600 font-bold">{cartItem.item.price} ₾</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => onUpdateQuantity(cartItem.item.id, -1)} className="p-1 bg-white rounded shadow hover:bg-gray-50"><Minus size={16} /></button>
                        <span className="font-medium w-4 text-center">{cartItem.quantity}</span>
                        <button onClick={() => onUpdateQuantity(cartItem.item.id, 1)} className="p-1 bg-white rounded shadow hover:bg-gray-50"><Plus size={16} /></button>
                        <button onClick={() => onRemove(cartItem.item.id)} className="ml-auto text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span>{translations.cart.total}</span>
                  <span className="text-gold-600">{total} ₾</span>
                </div>
                <button onClick={onCheckout} className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-gold-500/30">
                  {translations.cart.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}