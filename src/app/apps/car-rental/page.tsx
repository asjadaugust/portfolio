'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import HeroSearch from './components/HeroSearch';
import CarGrid from './components/CarGrid';
import { Car, SearchParams } from './types';
import { MOCK_CARS } from './data/cars';

export default function CarRental() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(MOCK_CARS);

  const handleSearch = (params: SearchParams) => {
    const filtered = MOCK_CARS.filter(car => {
      const matchLocation = params.location ? car.location === params.location : true;
      const matchType = params.type ? car.type === params.type : true;
      return matchLocation && matchType;
    });
    setFilteredCars(filtered);
  };

  return (
    <main style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ 
        height: '60vh', 
        background: 'url(https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1920&q=80) center/cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' 
        }} />
        <h1 style={{ 
          color: 'white', zIndex: 1, fontSize: '3.5rem', fontWeight: 800 
        }}>
          Find Your Drive
        </h1>
      </div>

      <HeroSearch onSearch={handleSearch} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <CarGrid cars={filteredCars} />
      </div>
    </main>
  );
}
