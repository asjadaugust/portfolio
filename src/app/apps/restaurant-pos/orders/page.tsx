'use client';

import styles from '../components/Pos.module.scss';
import { Clock, CheckCircle, ChefHat } from 'lucide-react';

const MOCK_STATUS = [
  { id: '101', status: 'ready', time: '12:30' },
  { id: '102', status: 'preparing', time: '12:35' },
  { id: '103', status: 'preparing', time: '12:36' },
  { id: '104', status: 'pending', time: '12:38' },
];

export default function OrdersPage() {
  return (
    <div className={styles.ordersPage}>
      <header>
        <h1>Order Status</h1>
        <p>Watch for your number</p>
      </header>

      <div className={styles.statusGrid}>
        <div className={`${styles.column} ${styles.ready}`}>
          <div className={styles.header}>
            <CheckCircle size={32} />
            <h2>Ready</h2>
          </div>
          <div className={styles.numbers}>
            {MOCK_STATUS.filter(o => o.status === 'ready').map(o => (
              <div key={o.id} className={styles.number}>#{o.id}</div>
            ))}
          </div>
        </div>

        <div className={`${styles.column} ${styles.preparing}`}>
          <div className={styles.header}>
            <ChefHat size={32} />
            <h2>Preparing</h2>
          </div>
          <div className={styles.numbers}>
            {MOCK_STATUS.filter(o => o.status === 'preparing').map(o => (
              <div key={o.id} className={styles.number}>#{o.id}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
