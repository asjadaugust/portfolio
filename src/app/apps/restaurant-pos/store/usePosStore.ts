import { create } from 'zustand';
import { CartItem, MenuItem } from '../types';

interface PosState {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
}

export const usePosStore = create<PosState>((set, get) => ({
  cart: [],
  total: 0,
  addToCart: (item) => {
    const { cart } = get();
    const existing = cart.find((i) => i.id === item.id);
    
    if (existing) {
      set({
        cart: cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
    
    set((state) => ({
      total: state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }));
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== itemId),
    }));
    set((state) => ({
      total: state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }));
  },
  updateQuantity: (itemId, delta) => {
    const { cart } = get();
    const item = cart.find((i) => i.id === itemId);
    
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        get().removeFromCart(itemId);
      } else {
        set({
          cart: cart.map((i) =>
            i.id === itemId ? { ...i, quantity: newQuantity } : i
          ),
        });
        set((state) => ({
          total: state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }));
      }
    }
  },
  clearCart: () => set({ cart: [], total: 0 }),
}));
