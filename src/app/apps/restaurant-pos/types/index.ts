export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Burgers' | 'Drinks' | 'Sides' | 'Desserts';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  modifiers?: string[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: Date;
  tableNumber?: number;
}
