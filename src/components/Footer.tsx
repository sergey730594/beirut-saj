import { MapPin, Phone, Mail } from 'lucide-react';

interface Props { translations: any; }

export default function Footer({ translations }: Props) {
  return (
    <footer id="contact" className="bg-charcoal-950 text-cream-100 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gold-500 mb-4">Beirut Saj</h3>
          <p className="text-gray-400 leading-relaxed">{translations.about.description}</p>
        </div>
        <div id="location">
          <h4 className="text-xl font-bold text-white mb-4">{translations.location.title}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-gold-500 mt-1 flex-shrink-0" size={20} />
              <span>{translations.location.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-gold-500 flex-shrink-0" size={20} />
              <span>+971 50 444 6542</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-gold-500 flex-shrink-0" size={20} />
              <span>hello@beirutsaj.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">{translations.location.hours}</h4>
          <p className="text-gray-400 text-lg">{translations.location.hours}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Beirut Saj International Restaurant. {translations.footer.rights}.
      </div>
    </footer>
  );
}