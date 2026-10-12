export type Language = 'en' | 'ka' | 'ru' | 'ar';

export interface MenuItem {
  id: string;
  name: { en: string; ka: string; ru: string; ar: string };
  description: { en: string; ka: string; ru: string; ar: string };
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}