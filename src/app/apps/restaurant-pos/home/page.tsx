'use client';

import Link from 'next/link';
import styles from '../components/Pos.module.scss';
import { Utensils, ShoppingBag } from 'lucide-react';

export default function PosHome() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.content}>
        <h1>Welcome to Burger Joint</h1>
        <p>Please select your dining preference</p>
        
        <div className={styles.options}>
          <Link href="/apps/restaurant-pos" className={styles.optionCard}>
            <div className={styles.icon}><Utensils size={48} /></div>
            <h2>Dine In</h2>
            <p>Eat at the restaurant</p>
          </Link>

          <Link href="/apps/restaurant-pos" className={styles.optionCard}>
            <div className={styles.icon}><ShoppingBag size={48} /></div>
            <h2>Takeout</h2>
            <p>Grab and go</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
