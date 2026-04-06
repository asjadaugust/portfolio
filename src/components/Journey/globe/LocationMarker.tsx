'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LocationMarkerProps {
  lat: number;
  lon: number;
  color: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function LocationMarker({
  lat,
  lon,
  color,
  isActive,
  onClick,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);

  const position = useMemo<[number, number, number]>(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -2.02 * Math.sin(phi) * Math.cos(theta);
    const z = 2.02 * Math.sin(phi) * Math.sin(theta);
    const y = 2.02 * Math.cos(phi);
    return [x, y, z];
  }, [lat, lon]);

  const baseRadius = isActive ? 0.06 : 0.04;
  const glowRadius = baseRadius * 2.2;

  useFrame((state) => {
    if (!groupRef.current) return;
    if (isActive) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      groupRef.current.scale.setScalar(scale);
    } else {
      groupRef.current.scale.setScalar(1);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <mesh>
        <sphereGeometry args={[baseRadius, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[glowRadius, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
