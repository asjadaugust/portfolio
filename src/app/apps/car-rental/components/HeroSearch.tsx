'use client';

import { useForm } from 'react-hook-form';
import styles from './CarRental.module.scss';
import { SearchParams } from '../types';

interface HeroSearchProps {
  onSearch: (data: SearchParams) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const { register, handleSubmit } = useForm<SearchParams>();

  return (
    <div className={styles.heroSearch}>
      <form onSubmit={handleSubmit(onSearch)}>
        <div className={styles.field}>
          <label>Location</label>
          <select {...register('location')}>
            <option value="AMS">Amsterdam Airport (AMS)</option>
            <option value="RTM">Rotterdam The Hague (RTM)</option>
            <option value="EIN">Eindhoven Airport (EIN)</option>
            <option value="UTC">Utrecht Central Station</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Pick-up Date</label>
          <input type="date" {...register('pickupDate')} required />
        </div>

        <div className={styles.field}>
          <label>Drop-off Date</label>
          <input type="date" {...register('dropoffDate')} required />
        </div>

        <div className={styles.field}>
          <label>Car Type</label>
          <select {...register('type')}>
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <button type="submit">Find Cars</button>
      </form>
    </div>
  );
}
