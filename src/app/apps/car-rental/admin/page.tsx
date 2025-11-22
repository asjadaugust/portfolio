'use client';

import Link from 'next/link';
import styles from './components/Admin.module.scss';
import DashboardStats from './components/DashboardStats';
import FleetTable from './components/FleetTable';
import { LayoutDashboard, Car, Calendar, Settings, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2>CarRental Admin</h2>
        <nav>
          <a href="#" className={styles.active}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#">
            <Car size={20} /> Fleet
          </a>
          <a href="#">
            <Calendar size={20} /> Bookings
          </a>
          <a href="#">
            <Settings size={20} /> Settings
          </a>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <Link href="/apps/car-rental" style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '12px', color: '#ef4444', textDecoration: 'none', fontWeight: 500 
          }}>
            <LogOut size={20} /> Exit to App
          </Link>
        </div>
      </aside>

      <main className={styles.content}>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>Dashboard Overview</h1>
          <p style={{ color: '#6b7280' }}>Welcome back, Admin. Here's what's happening today.</p>
        </header>

        <DashboardStats />
        <FleetTable />
      </main>
    </div>
  );
}

