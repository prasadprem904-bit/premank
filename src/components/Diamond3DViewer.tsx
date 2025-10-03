import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

function Diamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Auto-rotate slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Diamond shape using octahedron geometry */}
      <octahedronGeometry args={[1.5, 0]} />
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0.05}
        transmission={0.95}
        thickness={0.5}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        ior={2.417} // Index of refraction for diamond
        reflectivity={1}
      />
    </mesh>
  );
}

interface Diamond3DViewerProps {
  diamondName: string;
}

export const Diamond3DViewer = ({ diamondName }: Diamond3DViewerProps) => {
  const controlsRef = useRef<any>(null);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(0.8);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(1.2);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-background to-background/50">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD700" />
        <pointLight position={[0, -5, 0]} intensity={0.5} color="#87CEEB" />
        
        {/* Diamond */}
        <Diamond />
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* Controls */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      {/* Control Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="bg-card/90 backdrop-blur-sm border border-accent/20 p-3 rounded-full shadow-luxury hover:bg-accent/20 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4 text-accent" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          className="bg-card/90 backdrop-blur-sm border border-accent/20 p-3 rounded-full shadow-luxury hover:bg-accent/20 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-accent" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          className="bg-card/90 backdrop-blur-sm border border-accent/20 p-3 rounded-full shadow-luxury hover:bg-accent/20 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-accent" />
        </motion.button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-accent/20 px-4 py-2 rounded-lg shadow-luxury">
        <p className="text-xs text-muted-foreground">
          🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>

      {/* Diamond Name */}
      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-accent/20 px-4 py-2 rounded-lg shadow-luxury">
        <p className="text-sm font-semibold text-accent">{diamondName}</p>
      </div>
    </div>
  );
};
