
import React, { useState, useRef } from 'react';
import { CardProps } from '../types';
import { useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const TreeCard: React.FC<CardProps> = ({ wish, position, rotation, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.05;
    }
    if (materialRef.current) {
      // Pulsing effect when not hovered
      if (!hovered) {
        const pulse = (Math.sin(state.clock.elapsedTime * 3) + 1) / 2; // 0 to 1
        materialRef.current.emissiveIntensity = 0.1 + pulse * 0.4;
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
          {/* String - Tilted back to look attached */}
          <mesh position={[0, 0.55, -0.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.002, 0.002, 0.6]} />
            <meshStandardMaterial color="#ecf0f1" />
          </mesh>

          {/* Card Body */}
          <group scale={hovered ? 1.15 : 1}>
            <RoundedBox args={[0.5, 0.7, 0.04]} radius={0.02} smoothness={4}>
              <meshStandardMaterial
                ref={materialRef}
                color={hovered ? "#fff" : "#fdfbf7"}
                roughness={0.3}
                metalness={0.1}
                emissive="#ffffff"
                emissiveIntensity={0.1}
              />
            </RoundedBox>

            {/* Colored Border */}
            <mesh position={[0, 0, -0.001]}>
              <boxGeometry args={[0.52, 0.72, 0.035]} />
              <meshStandardMaterial
                color={wish.color}
                roughness={0.5}
                emissive={wish.color}
                emissiveIntensity={0.2}
              />
            </mesh>

            {/* Ribbon */}
            <mesh position={[0, 0.15, 0.025]}>
              <boxGeometry args={[0.51, 0.08, 0.01]} />
              <meshStandardMaterial color={wish.color} metalness={0.4} roughness={0.3} emissive={wish.color} emissiveIntensity={0.2} />
            </mesh>

            {/* Label Text */}
            <Text
              position={[0, -0.1, 0.03]}
              fontSize={0.07}
              color="#2d3436"
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.4}
              textAlign="center"
            >
              {wish.from.toUpperCase()}
            </Text>

            {/* Icon */}
            <mesh position={[0, 0.15, 0.03]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} emissive="#ffd700" emissiveIntensity={0.5} />
            </mesh>
          </group>

          {/* Stronger Glow effect on hover */}
          {hovered && (
            <pointLight distance={1.5} intensity={3} color={wish.color} />
          )}
        </group>
      </Float>
    </group>
  );
};

export default TreeCard;
