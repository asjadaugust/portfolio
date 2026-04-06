'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlightArcProps {
  startLat: number;
  startLon: number;
  endLat: number;
  endLon: number;
  color: string;
}

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function FlightArc({
  startLat,
  startLon,
  endLat,
  endLon,
  color,
}: FlightArcProps) {
  const dotRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const start = latLonToVector3(startLat, startLon, 2);
    const end = latLonToVector3(endLat, endLon, 2);
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.8);
    return new THREE.CatmullRomCurve3([start, mid, end]);
  }, [startLat, startLon, endLat, endLon]);

  useFrame((state) => {
    if (!dotRef.current) return;
    const t = (state.clock.elapsedTime * 0.15) % 1;
    const pos = curve.getPoint(t);
    dotRef.current.position.copy(pos);
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.015, 8, false]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
