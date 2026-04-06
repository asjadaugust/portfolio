'use client';

import type { CSSProperties } from 'react';
import type { Chapter } from '../data/journey.types';
import styles from './ChapterCard.module.scss';

interface ChapterCardProps {
  chapter: Chapter;
  accentColor: string;
}

export default function ChapterCard({ chapter, accentColor }: ChapterCardProps) {
  const cardStyle = { '--accent': accentColor } as CSSProperties;

  return (
    <div className={styles.card} style={cardStyle}>
      <div className={styles.header}>
        <span className={styles.badge}>
          {chapter.type === 'education' ? 'EDUCATION' : 'WORK'}
        </span>
        <span className={styles.period}>{chapter.period}</span>
      </div>

      <h4 className={styles.role}>{chapter.role}</h4>
      <p className={styles.org}>{chapter.org}</p>

      {chapter.skills.length > 0 && (
        <div className={styles.skills}>
          {chapter.skills.map((skill) => (
            <span key={skill} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
