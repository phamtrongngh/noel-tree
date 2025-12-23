import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const Wheel = ({ position }: { position: [number, number, number] }) => (
    <group position={position}>
        <Cylinder args={[0.2, 0.2, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </Cylinder>
        <Cylinder args={[0.1, 0.1, 0.12, 8]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
        </Cylinder>
    </group>
);

const Locomotive = () => (
    <group>
        {/* Main Body Chassis */}
        <Box args={[1.5, 0.2, 0.8]} position={[0.2, 0.3, 0]}>
            <meshStandardMaterial color="#2d3436" metalness={0.5} />
        </Box>

        {/* Cabin */}
        <Box args={[0.8, 1.2, 0.7]} position={[-0.2, 0.8, 0]}>
            <meshStandardMaterial color="#c0392b" />
        </Box>
        {/* Cabin Roof */}
        <Box args={[1.0, 0.1, 0.9]} position={[-0.2, 1.45, 0]}>
            <meshStandardMaterial color="#2c3e50" />
        </Box>

        {/* Boiler */}
        <Cylinder args={[0.35, 0.35, 1.1, 16]} rotation={[0, 0, Math.PI / 2]} position={[0.65, 0.75, 0]}>
            <meshStandardMaterial color="#2c3e50" metalness={0.4} />
        </Cylinder>
        {/* Gold Bands on Boiler */}
        <Cylinder args={[0.36, 0.36, 0.05, 16]} rotation={[0, 0, Math.PI / 2]} position={[0.4, 0.75, 0]}>
            <meshStandardMaterial color="#f1c40f" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.36, 0.36, 0.05, 16]} rotation={[0, 0, Math.PI / 2]} position={[0.9, 0.75, 0]}>
            <meshStandardMaterial color="#f1c40f" metalness={0.8} roughness={0.2} />
        </Cylinder>


        {/* Chimney */}
        <Cylinder args={[0.1, 0.15, 0.5]} position={[0.9, 1.15, 0]}>
            <meshStandardMaterial color="#111" />
        </Cylinder>
        <Cylinder args={[0.18, 0.18, 0.1]} position={[0.9, 1.4, 0]}>
            <meshStandardMaterial color="#000" />
        </Cylinder>

        {/* Cabin Windows (Glowing) */}
        <Box args={[0.5, 0.4, 0.72]} position={[-0.2, 1.0, 0]}>
            <meshStandardMaterial color="#ffcf48" emissive="#ffcf48" emissiveIntensity={3} toneMapped={false} />
        </Box>
        <pointLight position={[-0.2, 1.0, 0]} distance={4} intensity={4} color="#ffcf48" decay={2} />

        {/* Wheels */}
        <Wheel position={[-0.3, 0.25, 0.35]} />
        <Wheel position={[-0.3, 0.25, -0.35]} />
        <Wheel position={[0.2, 0.25, 0.35]} />
        <Wheel position={[0.2, 0.25, -0.35]} />
        <Wheel position={[0.7, 0.25, 0.35]} />
        <Wheel position={[0.7, 0.25, -0.35]} />

        {/* Cowcatcher */}
        <group position={[1.1, 0.3, 0]} rotation={[0, 0, -0.5]}>
            <Box args={[0.1, 0.5, 0.7]}>
                <meshStandardMaterial color="#555" />
            </Box>
            {/* Slats */}
            {[0, 0.15, -0.15].map((z, i) => (
                <Box key={i} args={[0.12, 0.45, 0.05]} position={[0.02, 0, z]}>
                    <meshStandardMaterial color="#333" />
                </Box>
            ))}
        </group>

        {/* Headlight */}
        <mesh position={[1.2, 0.9, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={8} toneMapped={false} />
            <pointLight distance={8} intensity={8} color="#fff" decay={2} />
        </mesh>
    </group>
);

const Carriage = ({ color }: { color: string }) => (
    <group>
        {/* Chassis */}
        <Box args={[1.3, 0.15, 0.7]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#2d3436" />
        </Box>
        {/* Body */}
        <Box args={[1.2, 0.8, 0.75]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color={color} />
        </Box>
        {/* Roof */}
        <Cylinder args={[0.4, 0.4, 1.25, 4, 1, false, Math.PI / 4]} rotation={[0, 0, Math.PI / 2]} position={[0, 1.2, 0]}>
            <meshStandardMaterial color="#ecf0f1" />
        </Cylinder>

        {/* Windows - Glowing Warm Light */}
        <Box args={[1.0, 0.35, 0.78]} position={[0, 0.85, 0]}>
            <meshStandardMaterial color="#ffcf48" emissive="#ffcf48" emissiveIntensity={3} toneMapped={false} />
        </Box>
        {/* Interior Light for casting glow on snow */}
        <pointLight position={[0, 0.8, 0]} distance={5} intensity={5} color="#ffcf48" decay={2} />

        <Wheel position={[-0.4, 0.25, 0.35]} />
        <Wheel position={[-0.4, 0.25, -0.35]} />
        <Wheel position={[0.4, 0.25, 0.35]} />
        <Wheel position={[0.4, 0.25, -0.35]} />

        {/* Connector */}
        <Box args={[0.2, 0.1, 0.1]} position={[0.7, 0.3, 0]}>
            <meshStandardMaterial color="#111" />
        </Box>
    </group>
);

interface ChristmasTrainProps {
    radius?: number;
}

const ChristmasTrain: React.FC<ChristmasTrainProps> = ({ radius = 6.5 }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y -= delta * 0.4;
        }
    });

    const carLength = 1.7;
    const angleStep = carLength / radius;
    // Center of track radius
    const trackRadius = radius;
    // Train centered on this track.
    // Wheels at +/- 0.35 z-local.
    // Rails should be at +/- 0.35 distance from center trackRadius.

    const outerRailR = trackRadius + 0.35;
    const innerRailR = trackRadius - 0.35;

    return (
        <group>
            {/* Rails */}
            <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                {/* Outer Rail */}
                <Torus args={[outerRailR, 0.05, 8, 128]}>
                    <meshStandardMaterial color="#555" metalness={0.8} />
                </Torus>
                {/* Inner Rail */}
                <Torus args={[innerRailR, 0.05, 8, 128]}>
                    <meshStandardMaterial color="#555" metalness={0.8} />
                </Torus>

                {/* Wooden Sleepers */}
                {Array.from({ length: 80 }).map((_, i) => {
                    const angle = (i / 80) * Math.PI * 2;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * trackRadius, Math.sin(angle) * trackRadius, -0.05]} rotation={[0, 0, angle]}>
                            <boxGeometry args={[1.2, 0.15, 0.05]} />
                            <meshStandardMaterial color="#3e2723" />
                        </mesh>
                    )
                })}
            </group>

            <group ref={groupRef}>
                {/* Locomotive */}
                <group rotation={[0, 0, 0]}>
                    <group position={[trackRadius, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <Locomotive />
                    </group>
                </group>

                {/* Car 1 */}
                <group rotation={[0, angleStep, 0]}>
                    <group position={[trackRadius, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <Carriage color="#27ae60" /> {/* Green */}
                    </group>
                </group>

                {/* Car 2 */}
                <group rotation={[0, angleStep * 2, 0]}>
                    <group position={[trackRadius, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <Carriage color="#c0392b" /> {/* Red */}
                    </group>
                </group>

                {/* Car 3 */}
                <group rotation={[0, angleStep * 3, 0]}>
                    <group position={[trackRadius, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <Carriage color="#f1c40f" /> {/* Gold */}
                    </group>
                </group>
            </group>
        </group>
    );
};

export default ChristmasTrain;
