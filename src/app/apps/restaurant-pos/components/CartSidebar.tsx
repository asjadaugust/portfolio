'use client';

import { usePosStore } from '../store/usePosStore';
import styles from './Pos.module.scss';
import { Minus, Plus, Trash2 } from 'lucide-react';
import MetaLabel from '@/components/MetaLabel/MetaLabel';

export default function CartSidebar() {
  const { cart, total, updateQuantity, removeFromCart } = usePosStore();

  return (
    <aside className={styles.cartSidebar} style={{ position: 'relative' }}>
      <MetaLabel title="Zustand Store" description="Global state management for cart items and total calculation." />
      <header>
        <h2>Current Order</h2>
      </header>

      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#a0a0a0', marginTop: '2rem' }}>
            Cart is empty
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} />
              <div className={styles.details}>
                <h4>{item.name}</h4>
                <div className={styles.price}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <div className={styles.quantity}>
                <button onClick={() => updateQuantity(item.id, 1)}>
                  <Plus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, -1)}>
                  {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button disabled={cart.length === 0}>
          Checkout
        </button>
      </div>
    </aside>
  );
}
