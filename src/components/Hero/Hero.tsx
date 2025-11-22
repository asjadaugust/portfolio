'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.scss';
import Link from 'next/link';
import HeroBackground from './HeroBackground';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBackground />
      
      <div className={styles.content}>
        <motion.span 
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Hi, my name is
        </motion.span>

        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Mohammad Asjad.
        </motion.h1>

        <motion.h2 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          I build things for the web.
        </motion.h2>

        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          I'm a Senior Full-stack Engineer specializing in building exceptional digital experiences. 
          Currently, I'm focused on building accessible, human-centered products at KLM Royal Dutch Airlines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/#work" className={styles.cta}>
            Check out my work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
