'use client';

import { motion } from 'framer-motion';
import styles from './Projects.module.scss';
import Link from 'next/link';
import { Folder, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Car Rental Application',
      description: 'A comprehensive car rental platform with Admin and User modules. Features real-time availability, booking management, and fleet administration.',
      tech: ['Next.js', 'TypeScript', 'SCSS', 'Server Actions'],
      link: '/apps/car-rental',
    },
    {
      title: 'Restaurant POS',
      description: 'End-to-end Point of Sale solution for restaurants. Includes digital menu, order management, and kitchen display system integration.',
      tech: ['Next.js', 'React', 'State Management', 'Real-time'],
      link: '/apps/restaurant-pos',
    },
    {
      title: 'Road Construction ERP',
      description: 'Enterprise Resource Planning system for civil engineering projects. Manages heavy equipment, operators, and project sites.',
      tech: ['Angular', 'Node.js', 'TypeScript', 'Docker'],
      link: '/projects/bitcorp-erp',
    },
  ];

  return (
    <section id="work" className={styles.projects}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        Some Things I've Built
      </motion.h2>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={project.link} className={styles.card}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <Folder className={styles.folderIcon} />
                  <ExternalLink size={20} color="#a0a0a0" />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={styles.techList}>
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
