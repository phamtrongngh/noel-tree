
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

  const [opening, setOpening] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      if (opening) {
        // 1. Position: Fly towards camera
        // Get camera's world position and convert to card's parent local space
        const cameraLocalPos = groupRef.current.parent!.worldToLocal(state.camera.position.clone());
        // Target is about 70% of the way to the camera
        const targetPos = cameraLocalPos.multiplyScalar(0.7);
        groupRef.current.position.lerp(targetPos, 0.08);

        // 2. Scale: Grow larger
        groupRef.current.scale.lerp(new THREE.Vector3(3.5, 3.5, 3.5), 0.08);

        // 3. Rotation: Orient to face camera
        const lookAtMatrix = new THREE.Matrix4();
        // We look from current position towards camera position
        lookAtMatrix.lookAt(groupRef.current.position, cameraLocalPos, new THREE.Vector3(0, 1, 0));
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
        groupRef.current.quaternion.slerp(targetQuat, 0.1);

      } else {
        // Reset when not opening
        groupRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);

        // Return to base rotation (swinging effect)
        const baseZ = Math.sin(state.clock.elapsedTime * 2 + position[1]) * 0.05;
        const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, baseZ));
        groupRef.current.quaternion.slerp(targetQuat, 0.1);
      }
    }
    if (materialRef.current) {
      if (!hovered && !opening) {
        // Faster and brighter blinking
        const pulse = (Math.sin(state.clock.elapsedTime * 5) + 1) / 2;
        materialRef.current.emissiveIntensity = 0.5 + pulse * 2.5;
      } else if (hovered && !opening) {
        materialRef.current.emissiveIntensity = 4.0;
      } else if (opening) {
        materialRef.current.emissiveIntensity = 10.0; // Glow intense when flying
      }
    }
  });

  const handleCardClick = (e: any) => {
    e.stopPropagation();
    if (opening) return;

    setOpening(true);
    // Longer delay to see the animation
    setTimeout(() => {
      onClick(wish);
      // Brief delay before allowing card to reset (after modal opens)
      setTimeout(() => setOpening(false), 200);
    }, 800);
  };

  return (
    <group position={position} rotation={rotation}>
      <Float speed={opening ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group
          ref={groupRef}
          onClick={handleCardClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          className="cursor-pointer"
        >
          {/* Card Body */}
          <group scale={hovered && !opening ? 1.2 : 1}>
            {/* Main Card */}
            <RoundedBox args={[0.5, 0.5, 0.04]} radius={0.03} smoothness={4}>
              <meshStandardMaterial
                ref={materialRef}
                color="#a81616"
                roughness={0.2}
                metalness={0.1}
                emissive="#ff0000"
                emissiveIntensity={0.5}
                toneMapped={false}
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
                emissiveIntensity={0.5}
                toneMapped={false}
              />
            </mesh>

            {/* Recipient Text */}
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
              {wish.to}
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
                emissiveIntensity={1.0}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* Light glow on hover */}
          {(hovered || opening) && (
            <pointLight distance={2} intensity={opening ? 20 : 10} color="#d4af37" />
          )}
        </group>
      </Float>
    </group>
  );
};

export default TreeCard;
