import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/971504446542" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 animate-pulse-slow flex items-center justify-center rtl:right-auto rtl:left-6">
      <MessageCircle size={32} fill="white" />
    </a>
  );
}