import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import './ProductDice.css';

interface ProductItem {
  name: string;
  imageName: string;
}

interface ProductDiceProps {
  productItems: ProductItem[];
}

// Calculate position for each item in a hexagonal layout or grid layout (for mobile)
const calculatePosition = (index: number, total: number, radius: number, isMobile: boolean = false) => {
  if (isMobile) {
    // For mobile, create a grid layout instead of hexagon
    const itemsPerRow = total <= 4 ? 2 : 3;
    const row = Math.floor(index / itemsPerRow);
    const col = index % itemsPerRow;
    const x = (col - (itemsPerRow - 1) / 2) * (radius * 0.8);
    const y = (row - Math.floor((total - 1) / itemsPerRow) / 2) * (radius * 0.8);
    return { x, y };
  } else {
    // For desktop, create a hexagon layout
    const angle = ((Math.PI * 2) / total) * index;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  }
};

const ProductDice: React.FC<ProductDiceProps> = ({ productItems }) => {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'rolling' | 'bouncing' | 'revealed' | 'expanded'>('initial');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hasTriggeredAnimation, setHasTriggeredAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initialize and control the animation sequence based on scroll position
  const startAnimation = useCallback(() => {
    if (!hasTriggeredAnimation) {
      // Reset to initial state
      setAnimationPhase('initial');
      
      // Start the roll-up animation after a brief delay
      setTimeout(() => {
        setAnimationPhase('rolling');
        
        // After rolling, start bouncing animation
        setTimeout(() => {
          setAnimationPhase('bouncing');
          
          // Skip the single logo reveal and directly show all 6 logos
          setTimeout(() => {
            setAnimationPhase('expanded');
          }, 800); // Reduced time for bouncing animation to make logos appear faster
        }, 2500); // Time for rolling animation
      }, 500);
      
      setHasTriggeredAnimation(true);
    }
  }, [hasTriggeredAnimation]);

  // Trigger animation when the section comes into view
  useEffect(() => {
    if (isInView) {
      startAnimation();
    } else {
      // Reset when out of view for repeat animation on next scroll
      setHasTriggeredAnimation(false);
    }
  }, [isInView, startAnimation]);

  // Dice animation variants for the different phases
  const diceVariants: Variants = {
    initial: { 
      y: 300,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      opacity: 0,
      scale: 0.8
    },
    rolling: {
      y: -150, // Roll up
      rotateX: [0, 360, 720, 1080],
      rotateY: [0, 360, 720, 1080],
      rotateZ: [0, 180, 360, 720],
      opacity: 1,
      scale: 1.2,
      transition: {
        y: { duration: 2.5, ease: "easeOut" },
        rotateX: { duration: 2.5, ease: "linear" },
        rotateY: { duration: 2.5, ease: "linear" },
        rotateZ: { duration: 2.5, ease: "linear" },
        opacity: { duration: 0.5 },
        scale: { duration: 1 }
      }
    },
    bouncing: {
      y: [- 150, 50, 0], // Bounce down
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: [1.2, 1, 1.1, 1],
      transition: {
        y: {
          duration: 1.5,
          times: [0, 0.6, 1],
          ease: "easeInOut"
        },
        scale: {
          duration: 1.5,
          times: [0, 0.6, 0.8, 1],
          ease: "easeInOut"
        },
        rotateX: { duration: 0.5 },
        rotateY: { duration: 0.5 },
        rotateZ: { duration: 0.5 }
      }
    },
    revealed: {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    expanded: {
      opacity: 0,
      scale: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  
  // Animation variants for expanded items
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0,
      rotate: 0,
      x: 0,
      y: 0
    },
    visible: (i: number) => {
      // Different layouts for mobile and desktop
      const radius = isMobile ? 120 : 200;
      const { x, y } = calculatePosition(i, productItems.length, radius, isMobile);
      return {
        opacity: 1,
        scale: 1,
        rotate: 0,
        x,
        y,
        transition: {
          type: "spring",
          stiffness: 150, // Increased stiffness for faster movement
          damping: 15,    // Reduced damping for more bounce
          delay: 0.05 * i // Reduced delay between items appearing
        }
      };
    }
  };
  
  // Animation for connecting lines
  const connectingLinesVariants: Variants = {
    hidden: { 
      opacity: 0,
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 0.2, // Reduced delay to start connecting lines sooner
        duration: 0.8, // Reduced duration for faster line drawing
        ease: "easeInOut"
      }
    }
  };

  // Using CSS animations for glow effects instead of Framer Motion variants

  // Different faces of the dice
  const renderDiceFace = (face: number) => {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center text-[#16102E] font-bold text-4xl">
        {face}
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-[#0E0A1F] to-[#16102E] overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Ecosystem</h2>
        
        <div className="relative h-[600px] w-full flex items-center justify-center perspective">
          {/* The 3D Dice */}
          <div className="preserve-3d">
            <AnimatePresence>
              {animationPhase !== 'expanded' && (
                <motion.div
                  className="w-44 h-44 bg-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.6)] preserve-3d relative"
                  variants={diceVariants}
                  initial="initial"
                  animate={animationPhase}
                  style={{ 
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Dice faces */}
                  <div 
                    className="dice-face"
                    style={{ transform: 'translateZ(88px)' }}
                  >
                    {renderDiceFace(1)}
                  </div>
                  <div 
                    className="dice-face"
                    style={{ transform: 'rotateY(180deg) translateZ(88px)' }}
                  >
                    {renderDiceFace(6)}
                  </div>
                  <div 
                    className="dice-face"
                    style={{ transform: 'rotateY(90deg) translateZ(88px)' }}
                  >
                    {renderDiceFace(3)}
                  </div>
                  <div 
                    className="dice-face"
                    style={{ transform: 'rotateY(-90deg) translateZ(88px)' }}
                  >
                    {renderDiceFace(4)}
                  </div>
                  <div 
                    className="dice-face"
                    style={{ transform: 'rotateX(90deg) translateZ(88px)' }}
                  >
                    {renderDiceFace(2)}
                  </div>
                  <div 
                    className="dice-face"
                    style={{ transform: 'rotateX(-90deg) translateZ(88px)' }}
                  >
                    {renderDiceFace(5)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Removed the single logo transition */}
          </div>
          
          {/* The 6-logo expanded layout with connecting lines */}
          <AnimatePresence>
            {animationPhase === 'expanded' && (
              <>
                {/* SVG for connecting lines */}
                <motion.svg 
                  className="absolute inset-0 w-full h-full"
                  initial="hidden"
                  animate="visible"
                  variants={connectingLinesVariants}
                >
                  {/* Don't show all connecting lines on mobile, only adjacent ones */}
                  {productItems.map((_, i) => {
                    return productItems.map((_, j) => {
                      // On mobile, only connect adjacent items or make fewer connections
                      const shouldConnect = isMobile 
                        ? (Math.abs(i - j) === 1) || (i === 0 && j === productItems.length - 1)
                        : i < j; // On desktop, connect all pairs
                        
                      if (shouldConnect) {
                        const radius = isMobile ? 120 : 200;
                        const centerX = isMobile ? window.innerWidth / 2 : 400;
                        const centerY = isMobile ? 300 : 300;
                        const pos1 = calculatePosition(i, productItems.length, radius, isMobile);
                        const pos2 = calculatePosition(j, productItems.length, radius, isMobile);
                        
                        return (
                          <motion.path
                            key={`line-${i}-${j}`}
                            d={`M ${pos1.x + centerX} ${pos1.y + centerY} L ${pos2.x + centerX} ${pos2.y + centerY}`}
                            stroke="rgba(255, 255, 255, 0.7)"
                            strokeWidth={isMobile ? "1" : "2"}
                            strokeLinecap="round"
                            fill="none"
                            className="lightning-path"
                          />
                        );
                      }
                      return null;
                    }).filter(Boolean);
                  })}
                </motion.svg>
                
                {/* The 6 product cards in a hexagon layout */}
                {productItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className={`${isMobile ? 'w-28 h-36' : 'w-40 h-48'} bg-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.4)] p-4 flex flex-col items-center justify-center transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]`}>
                      <div className={`${isMobile ? 'w-14 h-14 mb-2' : 'w-20 h-20 mb-3'} flex items-center justify-center`}>
                        <img 
                          src={`/${item.imageName}`} 
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className={`text-center text-purple-900 font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Add CSS classes for 3D transforms */}
    </section>
  );
};

export default ProductDice;
