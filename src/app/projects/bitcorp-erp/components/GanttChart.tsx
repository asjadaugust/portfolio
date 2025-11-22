'use client';

import styles from '../styles/Dashboard.module.scss';
import MetaLabel from '@/components/MetaLabel/MetaLabel';

export default function GanttChart() {
  return (
    <div className={styles.ganttChart} style={{ position: 'relative' }}>
      <MetaLabel title="CSS Grid Layout" description="Complex timeline layout implemented using pure CSS Grid." />
      <div className={styles.header}>Task</div>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className={styles.header}>W{i + 1}</div>
      ))}

      <div className={styles.row}>
        <div className={styles.label}>Site Prep</div>
        <div className={styles.cell} style={{ gridColumn: '2 / span 3' }}>
          <div className={`${styles.bar} ${styles.planning}`} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Foundation</div>
        <div className={styles.cell} style={{ gridColumn: '4 / span 4' }}>
          <div className={`${styles.bar} ${styles.construction}`} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Paving</div>
        <div className={styles.cell} style={{ gridColumn: '7 / span 5' }}>
          <div className={`${styles.bar} ${styles.construction}`} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>Inspection</div>
        <div className={styles.cell} style={{ gridColumn: '11 / span 2' }}>
          <div className={`${styles.bar} ${styles.review}`} />
        </div>
      </div>
    </div>
  );
}
