'use client';

import { motion } from 'framer-motion';
import styles from './About.module.scss';

export default function About() {
  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'FastAPI',
    'PostgreSQL',
    'Docker',
    'AWS/GCP',
  ];

  return (
    <section id="about" className={styles.about}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className={styles.container}>
        <motion.div 
          className={styles.bio}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p>
            Hello! My name is Mohammad Asjad. I'm a passionate developer who enjoys creating things that live on the internet. 
            My journey started back in 2012 editing custom Tumblr themes, and I've been hooked on web development ever since.
          </p>
          <p>
            Currently, I'm working at <strong>KLM Royal Dutch Airlines</strong>, where I focus on building accessible, inclusive products and digital experiences. 
            I recently had the opportunity to speak at <strong>Frontmania</strong>, sharing insights on our shift from gut feeling to <strong>data-driven decision making</strong>. 
            I've also been deeply involved in refactoring legacy tools from Angular to React, ensuring our tech stack stays modern and efficient.
          </p>
          <p>
            I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.
          </p>
        </motion.div>

        <motion.div 
          className={styles.skills}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3>Here are a few technologies I've been working with recently:</h3>
          <ul className={styles.skillList}>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
