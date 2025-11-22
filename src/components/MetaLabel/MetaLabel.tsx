'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import styles from './MetaLabel.module.scss';

interface MetaLabelProps {
  title: string;
  description: string;
}

export default function MetaLabel({ title, description }: MetaLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={styles.metaLabel}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className={styles.trigger}>
        <Info size={14} />
      </div>
      
      <div className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
