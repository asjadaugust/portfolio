'use client';

import { motion } from 'framer-motion';
import styles from './CarRental.module.scss';
import { Car } from '../types';
import { Users, Fuel, Gauge } from 'lucide-react';

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  return (
    <div className={styles.carGrid}>
      {cars.map((car, index) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={styles.carCard}
        >
          <div className={styles.imageContainer}>
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <div className={styles.badge}>{car.type}</div>
          </div>
          
          <div className={styles.details}>
            <h3>{car.make} {car.model}</h3>
            <p className={styles.type}>{car.year} • {car.transmission}</p>
            
            <div className={styles.specs}>
              <span><Users /> {car.seats}</span>
              <span><Fuel /> {car.type === 'Electric' ? 'EV' : 'Gas'}</span>
              <span><Gauge /> Unlimited</span>
            </div>

            <div className={styles.footer}>
              <div className={styles.price}>
                ${car.pricePerDay}
                <span>/day</span>
              </div>
              <a href={`/apps/car-rental/${car.id}`} style={{ textDecoration: 'none' }}>
                <button>Book Now</button>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
