'use client';

import { useState } from 'react';
import { Order } from '../../types';
import styles from './Admin.module.scss';
import { Clock, CheckCircle } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  {
    id: '101',
    items: [
      { id: '1', name: 'Classic Burger', price: 12.99, quantity: 2, category: 'Burgers', description: '', image: '' },
      { id: '4', name: 'Fries', price: 4.99, quantity: 2, category: 'Sides', description: '', image: '' }
    ],
    total: 35.96,
    status: 'pending',
    timestamp: new Date(),
    tableNumber: 5
  },
  {
    id: '102',
    items: [
      { id: '3', name: 'Crispy Chicken', price: 13.99, quantity: 1, category: 'Burgers', description: '', image: '' },
      { id: '6', name: 'Cola', price: 2.99, quantity: 1, category: 'Drinks', description: '', image: '' }
    ],
    total: 16.98,
    status: 'preparing',
    timestamp: new Date(),
    tableNumber: 3
  }
];

export default function KitchenBoard() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const moveOrder = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const Columns = {
    pending: { title: 'Pending', color: '#fbbf24' },
    preparing: { title: 'Preparing', color: '#3b82f6' },
    ready: { title: 'Ready to Serve', color: '#22c55e' }
  };

  return (
    <div className={styles.kitchenBoard}>
      {Object.entries(Columns).map(([status, config]) => (
        <div key={status} className={styles.column}>
          <header style={{ borderTopColor: config.color }}>
            <h3>{config.title}</h3>
            <span className={styles.count}>
              {orders.filter(o => o.status === status).length}
            </span>
          </header>
          
          <div className={styles.orderList}>
            {orders.filter(o => o.status === status).map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.orderId}>#{order.id}</span>
                  <span className={styles.table}>Table {order.tableNumber}</span>
                </div>
                
                <div className={styles.items}>
                  {order.items.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <span>{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.actions}>
                  <div className={styles.time}>
                    <Clock size={14} /> 12:30
                  </div>
                  {status === 'pending' && (
                    <button onClick={() => moveOrder(order.id, 'preparing')}>Start</button>
                  )}
                  {status === 'preparing' && (
                    <button onClick={() => moveOrder(order.id, 'ready')}>Ready</button>
                  )}
                  {status === 'ready' && (
                    <button onClick={() => moveOrder(order.id, 'served')} className={styles.done}>
                      <CheckCircle size={14} /> Served
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
