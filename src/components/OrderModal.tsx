import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, ShoppingCart } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  lang: string;
  translations: any;
}

export default function OrderModal({ isOpen, onClose, cart, lang, translations }: Props) {
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const total = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  const generateOrderText = () => {
    let text = `🍽️ *Новый заказ - Beirut Saj*\n\n`;
    cart.forEach(item => {
      const name = item.item.name[lang as keyof typeof item.item.name];
      text += `• ${name} x${item.quantity} — ${item.item.price * item.quantity} ₾\n`;
    });
    text += `\n *Итого: ${total} ₾*\n\n`;
    text += `👤 *Данные клиента:*\n`;
    text += `Имя: ${details.name}\n`;
    text += `Телефон: ${details.phone}\n`;
    text += `Адрес: ${details.address}\n`;
    if (details.notes) text += `Комментарий: ${details.notes}`;
    return encodeURIComponent(text);
  };

  const handleWhatsApp = () => {
    if (!details.name || !details.phone || !details.address) return;
    window.open(`https://wa.me/971504446542?text=${generateOrderText()}`, '_blank');
    onClose();
  };

  const handleEmail = () => {
    if (!details.name || !details.phone || !details.address) return;
    const subject = encodeURIComponent('Новый заказ - Beirut Saj Restaurant');
    const body = generateOrderText().replace(/%0A/g, '%0D%0A');
    window.location.href = `mailto:orders@beirutsaj.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const isFormValid = details.name.trim() && details.phone.trim() && details.address.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 100 }}
          />

          {/* Контейнер для центрирования через flexbox */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: 101 }}
          >
            {/* Сама модалка */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Заголовок */}
              <div className="flex-shrink-0 border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gold-500 p-2 rounded-lg">
                      <ShoppingCart className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-charcoal-900">
                      {translations?.order?.title || 'Оформление заказа'}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Закрыть"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Прокручиваемый контент */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {translations?.order?.name || 'Ваше имя'} *
                    </label>
                    <input
                      type="text"
                      placeholder="Введите имя"
                      value={details.name}
                      onChange={e => setDetails({ ...details, name: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {translations?.order?.phone || 'Телефон'} *
                    </label>
                    <input
                      type="tel"
                      placeholder="+995 5XX XXX XXX"
                      value={details.phone}
                      onChange={e => setDetails({ ...details, phone: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {translations?.order?.address || 'Адрес доставки'} *
                    </label>
                    <input
                      type="text"
                      placeholder="Улица, дом, квартира"
                      value={details.address}
                      onChange={e => setDetails({ ...details, address: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {translations?.order?.notes || 'Комментарий'}
                    </label>
                    <textarea
                      placeholder="Особые пожелания..."
                      value={details.notes}
                      onChange={e => setDetails({ ...details, notes: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:outline-none transition-all resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Сводка заказа */}
                <div className="bg-cream-50 rounded-xl p-5 mt-6 border border-cream-200">
                  <h3 className="font-semibold text-charcoal-900 mb-3 flex items-center gap-2">
                    <ShoppingCart size={18} className="text-gold-500" />
                    {translations?.cart?.title || 'Ваш заказ'}
                  </h3>
                  <div className="space-y-2 text-sm">
                    {cart.map(item => (
                      <div key={item.item.id} className="flex justify-between items-center py-1">
                        <span className="text-gray-700 flex-1">
                          {item.item.name[lang as keyof typeof item.item.name]}
                          <span className="text-gray-400 ml-2">×{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-charcoal-900 ml-4">
                          {item.item.price * item.quantity} 
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-cream-200 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-charcoal-900">
                      {translations?.cart?.total || 'Итого'}
                    </span>
                    <span className="font-bold text-2xl text-gold-600">{total} ₾</span>
                  </div>
                </div>

                {/* Кнопки отправки */}
                <div className="space-y-3 pt-6">
                  <button
                    onClick={handleWhatsApp}
                    disabled={!isFormValid}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 disabled:shadow-none"
                  >
                    <MessageCircle size={20} fill="white" />
                    {translations?.order?.sendWhatsApp || 'Отправить через WhatsApp'}
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-sm">
                      {translations?.order?.or || 'или'}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  <button
                    onClick={handleEmail}
                    disabled={!isFormValid}
                    className="w-full bg-charcoal-800 hover:bg-charcoal-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Mail size={20} />
                    {translations?.order?.sendEmail || 'Отправить по Email'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}