'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './components/Admin.module.scss';
import KitchenBoard from './components/KitchenBoard';
import { ChefHat, List, LogOut } from 'lucide-react';

export default function PosAdmin() {
  const [view, setView] = useState<'kds' | 'menu'>('kds');

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2>Kitchen Admin</h2>
        <nav>
          <button 
            className={view === 'kds' ? styles.active : ''} 
            onClick={() => setView('kds')}
          >
            <ChefHat size={20} /> Kitchen Display
          </button>
          <button 
            className={view === 'menu' ? styles.active : ''} 
            onClick={() => setView('menu')}
          >
            <List size={20} /> Menu Manager
          </button>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <Link href="/apps/restaurant-pos" style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '12px', color: '#ef4444', textDecoration: 'none', fontWeight: 500 
          }}>
            <LogOut size={20} /> Exit to POS
          </Link>
        </div>
      </aside>

      <main className={styles.content}>
        {view === 'kds' ? (
          <KitchenBoard />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#6b7280' }}>
            <h2>Menu Manager</h2>
            <p>Coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
