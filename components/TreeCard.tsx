
import React, { useState, useRef } from 'react';
import { CardProps } from '../types';
import { useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const TreeCard: React.FC<CardProps> = ({ wish, position, rotation, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Load the texture for the decoration
  const texture = useTexture('/assets/christmas_assets.png');
  // We want to slice it. Since we can't easily slice a single texture onto a mesh without UV mapping, 
  // we'll just use the whole texture or a simple colored version if it's too complex.
  // actually, let's just use nice colors and a gold emblem.

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.05;
    }
    if (materialRef.current) {
      if (!hovered) {
        const pulse = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2;
        materialRef.current.emissiveIntensity = 0.1 + pulse * 0.3;
      } else {
        materialRef.current.emissiveIntensity = 0.6;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group
          ref={groupRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick(wish);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* String */}
          <mesh position={[0, 0.45, -0.02]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 0.5]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
          </mesh>

          {/* Card Body */}
          <group scale={hovered ? 1.2 : 1}>
            {/* Main Card */}
            <RoundedBox args={[0.5, 0.5, 0.04]} radius={0.03} smoothness={4}>
              <meshStandardMaterial
                ref={materialRef}
                color="#a81616"
                roughness={0.2}
                metalness={0.1}
                emissive="#a81616"
                emissiveIntensity={0.2}
              />
            </RoundedBox>

            {/* Gold Frame */}
            <mesh position={[0, 0, 0.001]}>
              <boxGeometry args={[0.52, 0.52, 0.035]} />
              <meshStandardMaterial
                color="#d4af37"
                metalness={0.8}
                roughness={0.2}
                emissive="#d4af37"
                emissiveIntensity={0.1}
              />
            </mesh>

            {/* From Text */}
            <Text
              position={[0, -0.12, 0.03]}
              fontSize={0.06}
              color="#f8e4a0"
              font="https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/greatvibes/GreatVibes-Regular.ttf"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.4}
              textAlign="center"
            >
              {wish.from}
            </Text>

            {/* Merry Xmas Text */}
            <Text
              position={[0, 0.1, 0.03]}
              fontSize={0.04}
              color="#d4af37"
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.4}
              textAlign="center"
              letterSpacing={0.1}
            >
              MERRY XMAS
            </Text>

            {/* Central Ornament (Golden Sphere) */}
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.05, 32, 32]} />
              <meshStandardMaterial
                color="#d4af37"
                metalness={1}
                roughness={0}
                emissive="#d4af37"
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>

          {/* Light glow on hover */}
          {hovered && (
            <pointLight distance={1.2} intensity={5} color="#d4af37" />
          )}
        </group>
      </Float>
    </group>
  );
};

export default TreeCard;
