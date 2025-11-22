'use client';

import styles from '../styles/Dashboard.module.scss';

const RESOURCES = [
  { id: 1, name: 'Excavator CAT-320', type: 'Heavy Machinery', status: 'active', location: 'Site A' },
  { id: 2, name: 'Bulldozer D6', type: 'Heavy Machinery', status: 'maintenance', location: 'Garage' },
  { id: 3, name: 'Dump Truck #44', type: 'Transport', status: 'active', location: 'Site B' },
  { id: 4, name: 'Crane X500', type: 'Lifting', status: 'idle', location: 'Yard' },
];

export default function ResourceTable() {
  return (
    <table className={styles.resourceTable}>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Type</th>
          <th>Status</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {RESOURCES.map(res => (
          <tr key={res.id}>
            <td style={{ fontWeight: 500 }}>{res.name}</td>
            <td style={{ color: '#64748b' }}>{res.type}</td>
            <td>
              <span className={`${styles.status} ${styles[res.status]}`}>
                {res.status}
              </span>
            </td>
            <td>{res.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
