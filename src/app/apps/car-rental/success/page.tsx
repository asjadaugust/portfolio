'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import styles from '../components/CarRental.module.scss';

export default function BookingSuccess() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f8fafc'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '48px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{ 
          width: '80px', height: '80px', 
          background: '#dcfce7', 
          borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px auto',
          color: '#166534'
        }}>
          <CheckCircle size={48} />
        </div>
        
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}>
          Booking Confirmed!
        </h1>
        
        <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem' }}>
          Your vehicle has been reserved. A confirmation email has been sent to your inbox.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/apps/car-rental" style={{ 
            padding: '12px 24px', 
            background: '#00a1de', 
            color: 'white', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: 600 
          }}>
            Back to Fleet
          </Link>
        </div>
      </div>
    </div>
  );
}
