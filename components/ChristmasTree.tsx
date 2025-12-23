
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
    const layers = 18; 
    
    for (let i = 0; i < layers; i++) {
      const t = i / layers; 
      const y = 3.5 - (i * 0.5); 
      const radius = 0.2 + (t * 2.8); 
      const branchCount = 7 + Math.floor(t * 18); 
      const angleStep = (Math.PI * 2) / branchCount;

      for (let j = 0; j < branchCount; j++) {
        const angle = j * angleStep + (i % 2) * (angleStep / 2); 
        const rOffset = (Math.random() - 0.5) * 0.3;
        const yOffset = (Math.random() - 0.5) * 0.2;
        
        const x = Math.cos(angle) * (radius + rOffset);
        const z = Math.sin(angle) * (radius + rOffset);
        
        const rotX = 0.5 + t * 0.6; 
        const rotY = -angle + Math.PI / 2;
        
        const scale = 0.7 + t * 0.9;

        data.push({ position: [x, y + yOffset, z], rotation: [rotX, rotY, 0], scale });
      }
    }
    return data;
  }, []);

  // --- Ornaments (Baubles) - Now Glowing! ---
  const ornaments = useMemo(() => {
    const list = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      const height = (Math.random() * 5.5) - 2; 
      const maxR = (3.5 - height) * 0.65; 
      if (maxR < 0) continue;
      
      const angle = Math.random() * Math.PI * 2;
      const r = maxR * (0.7 + Math.random() * 0.3); 

      list.push({
        position: [Math.cos(angle) * r, height, Math.sin(angle) * r] as [number, number, number],
        color: COLORS.lights[Math.floor(Math.random() * COLORS.lights.length)],
        scale: 0.12 + Math.random() * 0.08
      });
    }
    return list;
  }, []);

  // --- Cards Placement ---
  const cardPlacements = useMemo(() => {
    return WISHES.map((wish, i) => {
      const t = i / WISHES.length;
      const angle = t * Math.PI * 2 * 2.5; 
      const height = 2.2 - (t * 4); 
      const radius = (3.9 - height) * 0.6; 

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

  return (
    <group position={[0, -1, 0]}>
      {/* --- The Tree Trunk --- */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.5, 7, 10]} />
        <meshStandardMaterial color={COLORS.trunk} roughness={0.9} />
      </mesh>

      {/* --- The Foliage --- */}
      <Instances range={1200}>
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

      {/* --- Glowing Ornaments --- */}
      {ornaments.map((orn, i) => (
        <mesh key={`orn-${i}`} position={orn.position}>
          <sphereGeometry args={[orn.scale, 32, 32]} />
          <meshStandardMaterial 
            color={orn.color} 
            metalness={0.5} 
            roughness={0.2} 
            emissive={orn.color}
            emissiveIntensity={2.5} // Makes them glow with Bloom
            toneMapped={false}
          />
          {/* Add a tiny point light to some ornaments for realistic lighting */}
          {i % 5 === 0 && (
             <pointLight distance={1.5} intensity={5} color={orn.color} decay={2} />
          )}
        </mesh>
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
