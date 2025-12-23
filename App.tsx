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

  const handleCardClick = (wish: ChristmasWish) => {
    setSelectedWish(wish);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Gradient - Darker deep blue for contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black z-0 pointer-events-none" />

      {/* UI Overlay - Top */}
      <div className="absolute top-8 left-8 z-40 pointer-events-none select-none">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-300 to-amber-500 text-5xl md:text-7xl font-christmas drop-shadow-[0_0_25px_rgba(252,211,77,0.6)]">
          Merry Christmas
        </h1>
      </div>

      {/* Rotation Guides - Sides */}
      <div className="absolute inset-y-0 left-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronLeft className="w-8 h-8 text-white/30" />
          <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">Rotate</span>
        </div>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-40 pointer-events-none">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-8 h-8 text-white/30" />
          <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Rotate</span>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: false, toneMappingExposure: 1.5 }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />

          {/* --- Magical Lighting Setup --- */}

          {/* 1. Base Moonlight (Cool Blue) */}
          <ambientLight intensity={0.5} color="#8fbcd4" />

          {/* 2. Main Warm Glow from Top-Right (Golden Hour feel) */}
          <spotLight
            position={[8, 10, 8]}
            angle={0.5}
            penumbra={1}
            intensity={200} // Increased for ToneMapping
            color="#ffecd2"
            castShadow
            shadow-bias={-0.0001}
          />

          {/* 3. Rim Light from Back-Left (Enhances 3D shape) */}
          <spotLight
            position={[-8, 5, -5]}
            intensity={150}
            color="#4a90e2"
          />

          {/* 4. Magical Core Glow (Light inside the tree) */}
          <pointLight
            position={[0, 1.5, 0]}
            intensity={50}
            color="#fbbf24"
            distance={8}
            decay={2}
          />

          {/* Environment */}
          <Stars
            radius={100}
            depth={50}
            count={7000}
            factor={6}
            saturation={0}
            fade
            speed={1.5}
          />
          <Environment preset="night" blur={0.5} background={false} />

          {/* Fog for depth */}
          <fog attach="fog" args={['#020617', 5, 30]} />

          <group position={[0, 0.5, 0]}>
            <ChristmasTree onCardClick={handleCardClick} />

            {/* Reflective Icy Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
              <circleGeometry args={[20]} />
              <MeshReflectorMaterial
                blur={[400, 200]}
                resolution={1024}
                mixBlur={1}
                mixStrength={50}
                roughness={0.5}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#0a1020"
                metalness={0.8}
                mirror={0.7}
              />
            </mesh>

            <Snowfall />
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={6}
            maxDistance={16}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate={!selectedWish}
            autoRotateSpeed={0.6}
            target={[0, -0.5, 0]}
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