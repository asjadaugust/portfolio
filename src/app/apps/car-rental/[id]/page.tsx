'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import styles from '../components/CarRental.module.scss';
import { MOCK_CARS } from '../data/cars';
import MetaLabel from '@/components/MetaLabel/MetaLabel';
import { useForm } from 'react-hook-form';
import { differenceInDays } from 'date-fns';

export default function CarDetails() {
  const params = useParams();
  const car = MOCK_CARS.find(c => c.id === params.id);
  const router = useRouter();
  const { register, watch, handleSubmit } = useForm();
  
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const totalDays = useMemo(() => {
    if (startDate && endDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      return days > 0 ? days : 0;
    }
    return 0;
  }, [startDate, endDate]);

  const totalPrice = car ? totalDays * car.pricePerDay : 0;

  const onSubmit = () => {
    router.push('/apps/car-rental/success');
  };

  if (!car) return <div>Car not found</div>;

  return (
    <main className={styles.detailsPage}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.imageWrapper}>
            <img src={car.image} alt={`${car.make} ${car.model}`} />
          </div>
          
          <h1>{car.make} {car.model}</h1>
          <p className={styles.subtitle}>{car.year} • {car.type} • {car.location}</p>

          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span>Transmission</span>
              <span>{car.transmission}</span>
            </div>
            <div className={styles.specItem}>
              <span>Seats</span>
              <span>{car.seats} Passengers</span>
            </div>
            <div className={styles.specItem}>
              <span>Fuel Type</span>
              <span>{car.type === 'Electric' ? 'Electric' : 'Gasoline'}</span>
            </div>
            <div className={styles.specItem}>
              <span>Mileage</span>
              <span>Unlimited</span>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Vehicle Description</h3>
            <p>
              Experience the ultimate driving comfort with this {car.year} {car.make} {car.model}. 
              Perfect for both city driving and long road trips, featuring premium interior, 
              advanced safety features, and excellent fuel economy.
            </p>
          </div>
        </div>

        <aside className={styles.bookingSidebar} style={{ position: 'relative' }}>
          <MetaLabel title="React Hook Form" description="Form state management with validation and performance optimization." />
          <h2>${car.pricePerDay} <span>/day</span></h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.dates}>
              <div className={styles.field}>
                <label>Pick-up</label>
                <input type="date" {...register('startDate')} required />
              </div>
              <div className={styles.field}>
                <label>Drop-off</label>
                <input type="date" {...register('endDate')} required />
              </div>
            </div>

            {totalDays > 0 && (
              <div className={styles.total}>
                <span>Total ({totalDays} days)</span>
                <span>${totalPrice}</span>
              </div>
            )}

            <button type="submit">Reserve Now</button>
          </form>
        </aside>
      </div>
    </main>
  );
}
