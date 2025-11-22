'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './PortfolioNav.module.scss';

export default function PortfolioNav() {
  return (
    <nav className={styles.portfolioNav}>
      <Link href="/">
        <ArrowLeft />
        <span>Back to Portfolio</span>
      </Link>
    </nav>
  );
}
