
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Snowfall: React.FC = () => {
  const count = 1500;
  const mesh = useRef<THREE.Points>(null);

  const [positions, params] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const p = []; // store velocity and randomization
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // x
      pos[i * 3 + 1] = Math.random() * 20;     // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25; // z
      
      p.push({
        velocity: 0.01 + Math.random() * 0.04,
        swing: 0.005 + Math.random() * 0.01,
        offset: Math.random() * 100
      });
    }
    return [pos, p];
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = mesh.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      const pm = params[i];
      
      y -= pm.velocity;
      
      // Reset to top
      if (y < -2) y = 18;
      
      posAttr.setY(i, y);

      // Add gentle swaying wind
      let x = posAttr.getX(i);
      // Original X + sin wave
      // We need to store original X to swing correctly, but for simple snow this drift is fine
      // Instead, we just add a small value based on time
      
      const swingX = Math.sin(time * 0.5 + pm.offset) * pm.swing;
      const swingZ = Math.cos(time * 0.3 + pm.offset) * pm.swing;

      posAttr.setX(i, x + swingX);
      posAttr.setZ(i, posAttr.getZ(i) + swingZ);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default Snowfall;
