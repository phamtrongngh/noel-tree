
import React, { useMemo } from 'react';
import { Float, Sparkles, Instances, Instance, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { ChristmasWish } from '../types';
import { COLORS, WISHES } from '../constants';
import TreeCard from './TreeCard';

interface ChristmasTreeProps {
  onCardClick: (wish: ChristmasWish) => void;
}

const ChristmasTree: React.FC<ChristmasTreeProps> = ({ onCardClick }) => {
  // --- Procedural Branch Generation ---
  const branchesData = useMemo(() => {
    const data = [];
    const layers = 15; // Reduced from 18 to clean up base

    for (let i = 0; i < layers; i++) {
      const t = i / layers;
      const y = 3.2 - (i * 0.45); // Adjusted scale to stop higher up (approx -3.5 bottom)
      const radius = 0.2 + (t * 2.5);
      const branchCount = 6 + Math.floor(t * 14);
      const angleStep = (Math.PI * 2) / branchCount;

      for (let j = 0; j < branchCount; j++) {
        const angle = j * angleStep + (i % 2) * (angleStep / 2);
        const rOffset = (Math.random() - 0.5) * 0.2;

        const x = Math.cos(angle) * (radius + rOffset);
        const z = Math.sin(angle) * (radius + rOffset);

        const rotX = 0.5 + t * 0.6;
        const rotY = -angle + Math.PI / 2;

        const scale = 0.6 + t * 0.8;

        data.push({ position: [x, y, z], rotation: [rotX, rotY, 0], scale });
      }
    }
    return data;
  }, []);

  // --- Ornaments (Baubles) - Anchored to tree surface ---
  const ornaments = useMemo(() => {
    const list = [];
    const count = 70; // Slightly more for better coverage
    for (let i = 0; i < count; i++) {
      const height = (Math.random() * 5.2) - 2.2;
      const t = (3.2 - height) / 6.5;
      const treeR = 0.2 + (t * 2.5);

      const angle = Math.random() * Math.PI * 2;
      // Bring them further out to the surface (1.05 to 1.2 of radius)
      const r = treeR * (1.05 + Math.random() * 0.15);

      list.push({
        position: [Math.cos(angle) * r, height, Math.sin(angle) * r] as [number, number, number],
        color: COLORS.lights[Math.floor(Math.random() * COLORS.lights.length)],
        scale: 0.11 + Math.random() * 0.07,
        angle // Store angle to orient the string
      });
    }
    return list;
  }, []);

  // --- Cards Placement - On the surface ---
  const cardPlacements = useMemo(() => {
    return WISHES.map((wish, i) => {
      const t = i / WISHES.length;
      const angle = t * Math.PI * 2 * 2.5;
      const height = 1.9 - (t * 3.8);

      const t_height = (3.2 - height) / 6.5;
      const treeR = 0.2 + (t_height * 2.5);
      // Bring cards further out (1.4 of radius)
      const radius = treeR * 1.4;

      return {
        wish,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [0, -angle + Math.PI / 2, 0] as [number, number, number]
      };
    });
  }, []);

  // --- Gifts Logic ---
  const gifts = useMemo(() => {
    const giftCount = 45; // More gifts
    const colors = [
      '#e74c3c', '#c0392b', // Reds
      '#2ecc71', '#27ae60', // Greens
      '#3498db', '#2980b9', // Blues
      '#f1c40f', '#f39c12', // Golds/Yellows
      '#9b59b6', '#8e44ad', // Purples
      '#ecf0f1', '#bdc3c7', // Silvers/Whites
      '#e67e22', '#d35400', // Oranges
      '#1abc9c', '#16a085'  // Teals
    ];
    const data = [];
    for (let i = 0; i < giftCount; i++) {
      const angle = (i / giftCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      // Foliage radius at bottom is ~2.5. We spread them from tucked under (1.8) to outside (4.5)
      const radius = 1.8 + Math.random() * 2.7;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // Larger size range
      const size = 0.4 + Math.random() * 0.55;

      // Position y: The floor corresponds to -3.0 relative to this group.
      const y = -3.0 + size / 2;

      data.push({
        position: [x, y, z] as [number, number, number],
        rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        ribbonColor: Math.random() > 0.4 ? '#ffffff' : '#f1c40f', // White or Gold
        emissiveIntensity: 0.1 + Math.random() * 0.2
      });
    }
    return data;
  }, []);

  return (
    <group position={[0, -1, 0]}>
      {/* --- The Tree Trunk --- */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.5, 6, 10]} />
        <meshStandardMaterial color={COLORS.trunk} roughness={0.9} />
      </mesh>

      {/* --- The Foliage --- */}
      <Instances range={1000}>
        <coneGeometry args={[0.3, 1.2, 7]} />
        <meshStandardMaterial
          color={COLORS.tree}
          roughness={0.6}
          metalness={0.1}
          flatShading
        />
        {branchesData.map((data, i) => (
          <Instance
            key={i}
            position={data.position as any}
            rotation={data.rotation as any}
            scale={data.scale as any}
          />
        ))}
      </Instances>

      {/* --- The Pot --- */}
      <group position={[0, -3.5, 0]}>
        <Cylinder args={[0.65, 0.55, 1, 32]} castShadow receiveShadow>
          <meshStandardMaterial color="#2c3e50" roughness={0.3} metalness={0.4} />
        </Cylinder>
        <Cylinder args={[0.75, 0.75, 0.1, 32]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.6} />
        </Cylinder>
      </group>

      {/* --- Gift Boxes --- */}
      {gifts.map((gift, i) => (
        <group key={`gift-${i}`} position={gift.position} rotation={gift.rotation}>
          {/* Main Box */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[gift.size, gift.size, gift.size]} />
            <meshStandardMaterial
              color={gift.color}
              roughness={0.2}
              metalness={0.1}
              emissive={gift.color}
              emissiveIntensity={gift.emissiveIntensity}
            />
          </mesh>

          {/* Ribbons */}
          {/* Vertical Loop 1 */}
          <mesh>
            <boxGeometry args={[gift.size * 1.02, gift.size + 0.01, gift.size * 0.18]} />
            <meshStandardMaterial
              color={gift.ribbonColor}
              emissive={gift.ribbonColor}
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Vertical Loop 2 */}
          <mesh>
            <boxGeometry args={[gift.size * 0.18, gift.size + 0.01, gift.size * 1.02]} />
            <meshStandardMaterial
              color={gift.ribbonColor}
              emissive={gift.ribbonColor}
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Bow on top */}
          <group position={[0, gift.size / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[gift.size * 0.4, 0.05, gift.size * 0.4]} />
              <meshStandardMaterial
                color={gift.ribbonColor}
                emissive={gift.ribbonColor}
                emissiveIntensity={0.2}
              />
            </mesh>
            <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[gift.size * 0.15, gift.size * 0.15, gift.size * 0.15]} />
              <meshStandardMaterial
                color={gift.ribbonColor}
                emissive={gift.ribbonColor}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* --- Glowing Ornaments --- */}
      {ornaments.map((orn, i) => (
        <group key={`orn-${i}`} position={orn.position}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[orn.scale, 32, 32]} />
            <meshStandardMaterial
              color={orn.color}
              metalness={0.5}
              roughness={0.2}
              emissive={orn.color}
              emissiveIntensity={2.0}
              toneMapped={false}
            />
            {/* Add a tiny point light to some ornaments for realistic lighting */}
            {i % 4 === 0 && (
              <pointLight distance={1.2} intensity={4} color={orn.color} decay={2} />
            )}
          </mesh>
        </group>
      ))}

      {/* --- The Magical Star --- */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group position={[0, 3.8, 0]}>
          <mesh>
            <octahedronGeometry args={[0.45, 0]} />
            {/* High emissive intensity triggers the Bloom effect */}
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={10}
              toneMapped={false}
            />
          </mesh>
          <pointLight intensity={15} distance={8} color="#ffd700" decay={2} />

          {/* Halo Rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.65, 32]} />
            <meshBasicMaterial color="#ffecb3" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>

          <Sparkles count={40} scale={2} size={8} speed={0.8} opacity={1} color="#ffffaa" />
        </group>
      </Float>

      {/* --- Cards --- */}
      {cardPlacements.map((card, i) => (
        <TreeCard
          key={`card-${i}`}
          wish={card.wish}
          position={card.position}
          rotation={card.rotation}
          onClick={onCardClick}
        />
      ))}

      {/* --- Fairy Lights (Sparkles) --- */}
      <Sparkles
        count={300}
        scale={[6, 8, 6]}
        size={5}
        speed={0.4}
        opacity={0.8}
        color="#ffeaa7" // Warm white glow
      />
    </group>
  );
};

export default ChristmasTree;
