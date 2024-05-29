"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { motion } from "framer-motion-3d";
import { TextureLoader } from "three";

export default function Earth() {
  const scene = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "end start"],
  });

  const smoothRotation = useSpring(scrollYProgress, {
    damping: 20,
  });

  const [color, normal, aoMap] = useLoader(TextureLoader, [
    "/images/color.jpg",
    "/images/normal.png",
    "/images/occlusion.jpg",
  ]);

  return (
    <Canvas ref={scene}>
      <ambientLight intensity={0.75} />
      <directionalLight intensity={7.5} position={[6, 0, -0.5]} />
      <motion.mesh scale={1.5} rotation-y={smoothRotation} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>
    </Canvas>
  );
}
