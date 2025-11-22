'use client';

import { useState } from 'react';
import { MenuItem } from '../types';
import styles from './Pos.module.scss';
import { usePosStore } from '../store/usePosStore';

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Beef patty, cheddar, lettuce, tomato, house sauce',
    price: 12.99,
    category: 'Burgers',
    image: '/images/food/classic-burger.png'
  },
  {
    id: '2',
    name: 'Double Cheeseburger',
    description: 'Two beef patties, double cheddar, pickles, onions',
    price: 15.99,
    category: 'Burgers',
    image: '/images/food/classic-burger.png' // Reusing for now
  },
  {
    id: '3',
    name: 'Crispy Chicken',
    description: 'Fried chicken breast, coleslaw, spicy mayo',
    price: 13.99,
    category: 'Burgers',
    image: '/images/food/classic-burger.png' // Reusing for now
  },
  {
    id: '4',
    name: 'Fries',
    description: 'Crispy golden fries with sea salt',
    price: 4.99,
    category: 'Sides',
    image: '/images/food/fries.png'
  },
  {
    id: '5',
    name: 'Onion Rings',
    description: 'Beer battered onion rings',
    price: 5.99,
    category: 'Sides',
    image: '/images/food/fries.png' // Reusing for now
  },
  {
    id: '6',
    name: 'Cola',
    description: 'Ice cold cola',
    price: 2.99,
    category: 'Drinks',
    image: '/images/food/fries.png' // Reusing for now
  },
  {
    id: '7',
    name: 'Milkshake',
    description: 'Vanilla, Chocolate, or Strawberry',
    price: 5.99,
    category: 'Drinks',
    image: '/images/food/fries.png' // Reusing for now
  }
];

const CATEGORIES = ['All', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

export default function MenuGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const addToCart = usePosStore((state) => state.addToCart);

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className={styles.menuSection}>
      <header>
        <h1>Burger Joint POS</h1>
        <div className={styles.categories}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={activeCategory === cat ? styles.active : ''}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.menuGrid}>
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={styles.menuItem}
            onClick={() => addToCart(item)}
          >
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={styles.info}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className={styles.price}>${item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
