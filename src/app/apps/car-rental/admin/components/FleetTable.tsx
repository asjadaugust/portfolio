'use client';

import { useState } from 'react';
import { MOCK_CARS } from '../../data/cars';
import styles from './Admin.module.scss';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function FleetTable() {
  const [cars, setCars] = useState(MOCK_CARS);

  return (
    <div className={styles.fleetTable}>
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Fleet Management</h3>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', 
          padding: '8px 16px', background: '#00a1de', color: 'white', 
          border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' 
        }}>
          <Plus size={16} /> Add Vehicle
        </button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Location</th>
            <th>Price/Day</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={car.image} 
                    alt={car.model} 
                    style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} 
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{car.make} {car.model}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{car.year}</div>
                  </div>
                </div>
              </td>
              <td>{car.type}</td>
              <td>{car.location}</td>
              <td>${car.pricePerDay}</td>
              <td>
                <span className={`${styles.status} ${car.available ? styles.available : styles.rented}`}>
                  {car.available ? 'Available' : 'Rented'}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6b7280' }}>
                    <Edit size={16} />
                  </button>
                  <button style={{ padding: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
