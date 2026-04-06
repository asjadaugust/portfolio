'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EarthMeshProps {
  rotationY?: number;
}

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;

  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    float intensity = dot(normalize(vNormal), normalize(sunDirection));

    vec3 dayColor = texture2D(dayMap, vUv).rgb;
    vec3 nightColor = texture2D(nightMap, vUv).rgb;

    float blend = smoothstep(-0.1, 0.1, intensity);
    vec3 color = mix(nightColor * 1.2, dayColor, blend);

    float glow = smoothstep(0.0, 0.1, intensity) * smoothstep(0.2, 0.0, intensity);
    color += vec3(1.0, 0.4, 0.1) * glow * 0.5;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function EarthMesh({ rotationY = 0 }: EarthMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [dayMap, nightMap] = useTexture([
    '/textures/earth-day.jpg',
    '/textures/earth-night.jpg',
  ]);

  const uniforms = useMemo(
    () => ({
      dayMap: { value: dayMap },
      nightMap: { value: nightMap },
      sunDirection: { value: new THREE.Vector3(1, 0, 0) },
    }),
    [dayMap, nightMap],
  );

  useFrame(() => {
    if (materialRef.current) {
      const now = new Date();
      const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
      const angle = (utcHours / 24) * Math.PI * 2 - Math.PI;
      materialRef.current.uniforms.sunDirection.value.set(
        Math.cos(angle),
        0,
        Math.sin(angle),
      );
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = rotationY;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
