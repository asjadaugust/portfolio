'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 3000;
const SPHERE_RADIUS = 20;

export default function GlobeStarField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Uniformly distributed point on a sphere of radius SPHERE_RADIUS
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = SPHERE_RADIUS * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x -= delta / 40;
    pointsRef.current.rotation.y -= delta / 60;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}
