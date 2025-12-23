import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import ChristmasTree from './components/ChristmasTree';
import Snowfall from './components/Snowfall';
import WishModal from './components/WishModal';
import AudioPlayer from './components/AudioPlayer';
import { ChristmasWish } from './types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedWish, setSelectedWish] = useState<ChristmasWish | null>(null);
  const [readWishIds, setReadWishIds] = useState<Set<number>>(new Set());

  const handleCardClick = (wish: ChristmasWish) => {
    setSelectedWish(wish);
    setReadWishIds(prev => new Set(prev).add(wish.id));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0b1026]">
      {/* Background Gradient - Winter Night */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e2a4a] via-[#0b1026] to-[#000000] z-0 pointer-events-none" />

      {/* UI Overlay - Top */}
      <div className="absolute top-8 left-0 right-0 md:left-8 md:text-left text-center z-40 pointer-events-none select-none px-4">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200 text-4xl md:text-7xl font-christmas drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]">
          Merry Christmas
        </h1>
      </div>

      {/* Rotation Guides - Sides */}
      <div className="absolute inset-y-0 left-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronLeft className="w-8 h-8 text-blue-100/30" />
          <span className="text-[10px] text-blue-100/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">Rotate</span>
        </div>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-8 h-8 text-blue-100/30" />
          <span className="text-[10px] text-blue-100/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Rotate</span>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, toneMappingExposure: 1.1 }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1, 20]} fov={45} />

          {/* --- Magical Lighting Setup (Snowy Night) --- */}

          {/* 1. Base Cool Moonlight */}
          <ambientLight intensity={0.8} color="#b9d5ff" />

          {/* 2. Main Moonlight from Top-Left */}
          <spotLight
            position={[-10, 15, 5]}
            angle={0.6}
            penumbra={1}
            intensity={200}
            color="#e0f2fe"
            castShadow
            shadow-bias={-0.0001}
          />

          {/* 3. Soft Fill from Right */}
          <spotLight
            position={[10, 5, 5]}
            intensity={100}
            color="#818cf8"
          />

          {/* 4. Magical Core Glow (Light inside the tree) */}
          <pointLight
            position={[0, 0.5, 0]}
            intensity={40}
            color="#fbbf24"
            distance={10}
            decay={2}
          />

          {/* Environment */}
          <Stars
            radius={100}
            depth={50}
            count={8000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Environment preset="night" blur={0.6} background={false} />

          {/* Fog for depth - Deep Blue */}
          <fog attach="fog" args={['#0b1026', 8, 35]} />

          <group position={[0, 0.5, 0]}>
            <ChristmasTree onCardClick={handleCardClick} readWishIds={readWishIds} />

            {/* Snowy Plane Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.0, 0]} receiveShadow>
              <circleGeometry args={[40, 32]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.9}
                metalness={0.1}
              />
            </mesh>

            <Snowfall />
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={8}
            maxDistance={28}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate={!selectedWish}
            autoRotateSpeed={0.6}
            target={[0, 0.5, 0]}
          />

          {/* --- Post Processing for "Lung Linh" effect --- */}
          <EffectComposer>
            {/* Bloom makes bright things glow */}
            <Bloom
              luminanceThreshold={1} // Only very bright things glow
              mipmapBlur
              intensity={1.5} // Strength of the glow
              radius={0.7}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
          </EffectComposer>

        </Suspense>
      </Canvas>

      <WishModal
        wish={selectedWish}
        onClose={() => setSelectedWish(null)}
      />
      <AudioPlayer />
    </div>
  );
};

export default App;