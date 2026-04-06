'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { Location } from '../data/journey.types';
import ChapterCard from './ChapterCard';
import styles from './JourneyPanel.module.scss';

interface JourneyPanelProps {
  location: Location;
}

export default function JourneyPanel({ location }: JourneyPanelProps) {
  const panelStyle = { '--accent': location.color } as CSSProperties;

  return (
    <div className={styles.panel} style={panelStyle}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.id}
          className={styles.inner}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p className={styles.header}>
            {location.flag} {location.city}, {location.country}
          </p>
          <h3 className={styles.tagline}>{location.tagline}</h3>

          <div className={styles.chapters}>
            {location.chapters.map((chapter, idx) => (
              <ChapterCard
                key={`${location.id}-${idx}`}
                chapter={chapter}
                accentColor={location.color}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
