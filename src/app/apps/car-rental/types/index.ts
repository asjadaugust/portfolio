export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  type: 'SUV' | 'Sedan' | 'Luxury' | 'Sports' | 'Electric';
  pricePerDay: number;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  image: string;
  available: boolean;
  location: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface SearchParams {
  location: string;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  type?: string;
}
