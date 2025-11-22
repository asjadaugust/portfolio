'use client';

import styles from './styles/Dashboard.module.scss';
import ProjectMap from './components/ProjectMap';
import GanttChart from './components/GanttChart';
import ResourceTable from './components/ResourceTable';
import { Bell, Search } from 'lucide-react';

export default function BitcorpDashboard() {
  return (
    <div className={styles.dashboardLayout}>
      <header>
        <div className={styles.brand}>
          <div style={{ width: 32, height: 32, background: '#0f172a', borderRadius: 4 }} />
          <h1>Bitcorp ERP</h1>
        </div>
        
        <div className={styles.user}>
          <Search size={20} style={{ marginRight: 16, color: '#64748b' }} />
          <Bell size={20} style={{ marginRight: 16, color: '#64748b' }} />
          <span>Project Manager</span>
          <div className={styles.avatar}>PM</div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <div className={styles.card}>
            <h2>Active Projects Map</h2>
            <ProjectMap />
          </div>

          <div className={styles.card}>
            <h2>Project Timeline (Q4 2024)</h2>
            <GanttChart />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <h2>Resource Allocation</h2>
            <ResourceTable />
          </div>

          <div className={styles.card}>
            <h2>System Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Server Uptime</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>99.9%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Active Users</span>
                <span style={{ fontWeight: 600 }}>42</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Pending Alerts</span>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>3</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
