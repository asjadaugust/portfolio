'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Car, Calendar, TrendingUp } from 'lucide-react';
import styles from './Admin.module.scss';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export default function DashboardStats() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.icon}><DollarSign /></div>
          <div>
            <h3>Total Revenue</h3>
            <p>$54,230</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}><Car /></div>
          <div>
            <h3>Active Rentals</h3>
            <p>124</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}><Calendar /></div>
          <div>
            <h3>Pending Bookings</h3>
            <p>12</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}><TrendingUp /></div>
          <div>
            <h3>Growth</h3>
            <p>+12.5%</p>
          </div>
        </div>
      </div>

      <div className={styles.chart}>
        <h3>Weekly Revenue</h3>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00a1de" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
