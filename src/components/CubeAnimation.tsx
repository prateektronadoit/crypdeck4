import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const CubeAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create an array of cube sizes and positions
  const cubes = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 80 + 20; // Random size between 20 and 100
    return {
      id: i,
      size,
      x: Math.random() * 100, // Random x position in %
      y: Math.random() * 100, // Random y position in %
      rotateX: Math.random() * 360, // Random initial rotation
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
      duration: Math.random() * 20 + 20, // Random animation duration
      delay: Math.random() * 5, // Random delay for animation start
      opacity: Math.random() * 0.4 + 0.1, // Random opacity between 0.1 and 0.5
    };
  });

  return (
    <div ref={containerRef} className="absolute w-full h-full perspective overflow-hidden">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="transform-style-3d origin-center"
          style={{
            position: 'absolute',
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            opacity: cube.opacity,
          }}
          initial={{
            rotateX: cube.rotateX,
            rotateY: cube.rotateY,
            rotateZ: cube.rotateZ,
          }}
          animate={{
            rotateX: [cube.rotateX, cube.rotateX + 360],
            rotateY: [cube.rotateY, cube.rotateY + 360],
            rotateZ: [cube.rotateZ, cube.rotateZ + 360],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full relative transform-style-3d">
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `translateZ(${cube.size / 2}px)` }}></div>
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `rotateY(180deg) translateZ(${cube.size / 2}px)` }}></div>
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)` }}></div>
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `rotateY(90deg) translateZ(${cube.size / 2}px)` }}></div>
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `rotateX(90deg) translateZ(${cube.size / 2}px)` }}></div>
            <div className="absolute w-full h-full bg-purple-400/10 border border-purple-400/30 backface-visible" style={{ transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)` }}></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CubeAnimation;
