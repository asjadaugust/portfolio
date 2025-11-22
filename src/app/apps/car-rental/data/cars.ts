import { Car } from '../types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2024,
    type: 'Electric',
    pricePerDay: 85,
    transmission: 'Automatic',
    seats: 5,
    image: '/images/cars/tesla-model-3.png',
    available: true,
    location: 'AMS'
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X5',
    year: 2023,
    type: 'SUV',
    pricePerDay: 120,
    transmission: 'Automatic',
    seats: 5,
    image: '/images/cars/bmw-x5.png',
    available: true,
    location: 'AMS'
  },
  {
    id: '3',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    type: 'Luxury',
    pricePerDay: 110,
    transmission: 'Automatic',
    seats: 5,
    image: '/images/cars/mercedes-c-class.png',
    available: true,
    location: 'RTM'
  },
  {
    id: '4',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    type: 'Sedan',
    pricePerDay: 55,
    transmission: 'Manual',
    seats: 5,
    image: '/images/cars/tesla-model-3.png', // Fallback for now
    available: true,
    location: 'EIN'
  },
  {
    id: '5',
    make: 'Porsche',
    model: '911',
    year: 2023,
    type: 'Sports',
    pricePerDay: 250,
    transmission: 'Automatic',
    seats: 2,
    image: '/images/cars/tesla-model-3.png', // Fallback for now
    available: true,
    location: 'AMS'
  },
  {
    id: '6',
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    type: 'SUV',
    pricePerDay: 115,
    transmission: 'Automatic',
    seats: 7,
    image: '/images/cars/bmw-x5.png', // Fallback for now
    available: true,
    location: 'EIN'
  }
];
