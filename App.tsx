import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import ChristmasTree from './components/ChristmasTree';
import Snowfall from './components/Snowfall';
import WoodenHouse from './components/WoodenHouse';
import WishModal from './components/WishModal';
import AudioPlayer from './components/AudioPlayer';
import { ChristmasWish } from './types';
import { Undo, Redo } from 'lucide-react';
import ChristmasTrain from './components/ChristmasTrain';

const App: React.FC = () => {
  const [selectedWish, setSelectedWish] = useState<ChristmasWish | null>(null);
  const [readWishIds, setReadWishIds] = useState<Set<number>>(new Set());
  const [started, setStarted] = useState(false);

  const handleCardClick = (wish: ChristmasWish) => {
    setSelectedWish(wish);
    setReadWishIds(prev => new Set(prev).add(wish.id));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0b1026]">
      {/* Background Gradient - Winter Night */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e2a4a] via-[#0b1026] to-[#000000] z-0 pointer-events-none" />

      {/* Rotation Guides - Sides */}
      <div className="absolute inset-y-0 left-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <Undo className="w-8 h-8 text-blue-100/30" />
          <span className="text-[10px] text-blue-100/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">Xoay Trái</span>
        </div>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <Redo className="w-8 h-8 text-blue-100/30" />
          <span className="text-[10px] text-blue-100/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Xoay Phải</span>
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

            {/* Wooden House behind the tree */}
            <WoodenHouse position={[0, -4.0, -11]} />

            {/* Snowy Plane Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.0, 0]} receiveShadow>
              <circleGeometry args={[40, 32]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.9}
                metalness={0.1}
              />
            </mesh>

            {/* Christmas Train - Starts at Front (z=R) */}
            <group position={[0, -4.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <ChristmasTrain radius={7} />
            </group>

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

      {/* Start Overlay */}
      {!started && (
        <div
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1026]/80 backdrop-blur-md cursor-pointer transition-opacity duration-1000"
          onClick={() => setStarted(true)}
        >
          <div className="text-center animate-pulse">
            <h2 className="text-white text-3xl md:text-5xl font-christmas mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Chúc Nhi Giáng sinh vui vẻ
            </h2>
            <p className="text-blue-200/70 uppercase tracking-[0.3em] text-xs">
              Chạm để bắt đầu
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;