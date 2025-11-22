'use client';

import styles from '../styles/Dashboard.module.scss';

const PROJECTS = [
  { id: 1, name: 'Highway A4 Expansion', x: 30, y: 40 },
  { id: 2, name: 'City Center Bridge', x: 60, y: 25 },
  { id: 3, name: 'Industrial Park Road', x: 75, y: 65 },
];

export default function ProjectMap() {
  return (
    <div className={styles.projectMap}>
      <div style={{ 
        width: '100%', height: '100%', 
        backgroundImage: 'url(/images/bitcorp/map.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8
      }} />
      
      {PROJECTS.map(project => (
        <div 
          key={project.id} 
          className={styles.marker}
          style={{ left: `${project.x}%`, top: `${project.y}%` }}
        >
          <div className={styles.dot} />
          <div className={styles.tooltip}>{project.name}</div>
        </div>
      ))}
    </div>
  );
}
