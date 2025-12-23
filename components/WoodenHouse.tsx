import React from 'react';
import { Sparkles } from '@react-three/drei';

const WoodenHouse: React.FC<any> = (props) => {
    return (
        <group {...props}>
            {/* --- Main Cabin Structure --- */}
            {/* Body */}
            <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[3.5, 2.5, 3]} />
                <meshStandardMaterial color="#6d4c41" roughness={0.8} />
            </mesh>

            {/* Logs detail (Corner pillars) */}
            <mesh position={[-1.75, 1.25, -1.5]} castShadow>
                <boxGeometry args={[0.4, 2.5, 0.4]} />
                <meshStandardMaterial color="#4e342e" roughness={0.8} />
            </mesh>
            <mesh position={[1.75, 1.25, -1.5]} castShadow>
                <boxGeometry args={[0.4, 2.5, 0.4]} />
                <meshStandardMaterial color="#4e342e" roughness={0.8} />
            </mesh>
            <mesh position={[-1.75, 1.25, 1.5]} castShadow>
                <boxGeometry args={[0.4, 2.5, 0.4]} />
                <meshStandardMaterial color="#4e342e" roughness={0.8} />
            </mesh>
            <mesh position={[1.75, 1.25, 1.5]} castShadow>
                <boxGeometry args={[0.4, 2.5, 0.4]} />
                <meshStandardMaterial color="#4e342e" roughness={0.8} />
            </mesh>

            {/* --- Roof --- */}
            {/* Pyramid Roof (Snow Covered) */}
            <mesh position={[0, 3.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0, 3.2, 2.5, 4]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Chimney */}
            <group position={[1.2, 3.2, 0.8]}>
                <mesh castShadow>
                    <boxGeometry args={[0.5, 1.2, 0.5]} />
                    <meshStandardMaterial color="#3e2723" roughness={0.9} />
                </mesh>
                {/* Smoke */}
                <Sparkles
                    position={[0, 1.0, 0]}
                    count={30}
                    scale={[0.8, 2.5, 0.8]}
                    size={4}
                    speed={0.6}
                    opacity={0.4}
                    color="#aaaaaa"
                />
            </group>

            {/* --- Front Detail (Facing +Z) --- */}

            {/* Door Frame */}
            <mesh position={[0, 0.9, 1.51]}>
                <planeGeometry args={[1.1, 1.9]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>
            {/* Door */}
            <mesh position={[0, 0.9, 1.52]}>
                <planeGeometry args={[0.9, 1.8]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            {/* Door Knob */}
            <mesh position={[0.3, 0.9, 1.55]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Wreath on Door */}
            <mesh position={[0, 1.3, 1.54]}>
                <torusGeometry args={[0.25, 0.08, 8, 16]} />
                <meshStandardMaterial color="#2e7d32" />
            </mesh>
            <mesh position={[0, 1.5, 1.56]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.1, 0.1, 0.05]} />
                <meshStandardMaterial color="#c62828" />
            </mesh>

            {/* Windows */}

            {/* Window Left */}
            <group position={[-1, 1.4, 1.51]}>
                <mesh>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshStandardMaterial color="#ffecb3" emissive="#ffecb3" emissiveIntensity={3} toneMapped={false} />
                </mesh>
                {/* Light projecting out from window */}
                <pointLight position={[0, 0, 0.5]} distance={5} intensity={5} color="#ffecb3" decay={2} />
                <mesh position={[0, 0, 0.01]}>
                    <boxGeometry args={[0.85, 0.05, 0.05]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
                <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.85, 0.05, 0.05]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
            </group>

            {/* Window Right */}
            <group position={[1, 1.4, 1.51]}>
                <mesh>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshStandardMaterial color="#ffecb3" emissive="#ffecb3" emissiveIntensity={3} toneMapped={false} />
                </mesh>
                {/* Light projecting out from window */}
                <pointLight position={[0, 0, 0.5]} distance={5} intensity={5} color="#ffecb3" decay={2} />
                <mesh position={[0, 0, 0.01]}>
                    <boxGeometry args={[0.85, 0.05, 0.05]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
                <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[0.85, 0.05, 0.05]} />
                    <meshStandardMaterial color="#3e2723" />
                </mesh>
            </group>

            {/* Porch Light */}
            <pointLight position={[0, 1.8, 2.0]} distance={4} intensity={1} color="#ffaa00" />

            {/* Steps */}
            <mesh position={[0, 0.15, 2.0]} receiveShadow>
                <boxGeometry args={[2, 0.3, 1]} />
                <meshStandardMaterial color="#8d6e63" />
            </mesh>

            {/* Some Snow piles around base */}
            <mesh position={[-2, 0.2, 0]}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshStandardMaterial color="#f8fafc" />
            </mesh>
            <mesh position={[2.2, 0.15, 1]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#f8fafc" />
            </mesh>

        </group>
    );
};

export default WoodenHouse;
