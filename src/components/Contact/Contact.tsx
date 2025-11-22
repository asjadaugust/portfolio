'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <motion.p 
        className={styles.overline}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        04. What's Next?
      </motion.p>
      
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Get In Touch
      </motion.h2>
      
      <motion.p 
        className={styles.description}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        I'm currently looking for new opportunities, and my inbox is always open. 
        Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </motion.p>

      <motion.div 
        className={styles.links}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <a 
          href="https://nl.linkedin.com/in/asjad-august" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          <Linkedin />
          LinkedIn
        </a>
        <a 
          href="https://github.com/asjadaugust" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          <Github />
          GitHub
        </a>
      </motion.div>
    </section>
  );
}
