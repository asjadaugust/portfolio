'use client';

import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import styles from './components/Pos.module.scss';

export default function RestaurantPOS() {
  return (
    <main className={styles.posLayout}>
      <MenuGrid />
      <CartSidebar />
    </main>
  );
}
