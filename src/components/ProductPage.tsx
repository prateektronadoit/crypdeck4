import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import './ProductPage.css';

interface PriceInfo {
  current: string;
  expected: string;
}

interface Category {
  name: string;
}

interface Product {
  title: string;
  image: string;
  categories: Category[];
  description: string;
  priceInfo?: PriceInfo;
  features?: string[];
}

const ProductPage: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Track mouse position for the glowing effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate background colors for cards with no images
  const getGradientStyle = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)',
      'linear-gradient(135deg, #f43f5e 0%, #c026d3 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    ];
    return gradients[index % gradients.length];
  };

  const products: Product[] = [
    {
      title: 'CRYP APPLICATION',
      image: '/circle/crypapp.png',
      categories: [{ name: 'WEB' }, { name: 'DESIGN' }, { name: 'DEVELOPMENT' }],
      description: 'A one-of-its-kind platform bridging crypto and fiat for users across 180+ countries, with seamless global accessibility. In partnership with a global bank, users can add, convert, and remit funds in multiple currencies, and even load them onto Mastercard (virtual & physical). It enables a user to add funds to a non-custodial wallet (external wallet). The platform offers global utility services, cross-border payments, and aims to evolve into a comprehensive Web2 + Web3 banking solution.'
    },
    {
      title: 'TRONADO TOKEN',
      image: '/circle/token.png',
      categories: [{ name: 'BLOCKCHAIN' }, { name: 'FINANCE' }, { name: 'UTILITY' }],
      description: 'TRDO is a utility token on the Polygon blockchain with a total supply of 25 crore tokens. 21.5 crore are locked, with 25 lakh released every 3 months to manage demand and supply. Launched at 2 cents in 2021, it\'s now around 15 cents, with an upcoming international launch at 20+ cents. Tronado Token can be utilized in the CRYP application for various utility payments, as well as for multiple futuristic token-based applications.',
      priceInfo: {
        current: '$1',
        expected: '$3'
      }
    },
    {
      title: 'Real Estate Tokenisation',
      image: '/circle/dreamrealirty.png',
      categories: [{ name: 'REAL ESTATE' }, { name: 'BLOCKCHAIN' }, { name: 'INVESTMENT' }],
      description: 'Under the Crypque Dream Reality Plan, investors can benefit from a guaranteed 2X Buy Back Plan designed to provide both security and exceptional returns. For example, with an investment of AED 1 Million in property under this plan, the investor receives a guaranteed buy back of AED 2 Million for the same property from Crypque Dream Reality after 30 months from the date of investment. This plan ensures a 100% return on investment, offering both asset-backed security and a clear exit strategy, making it a powerful option for investors seeking predictable and substantial gains in the real estate market.'
    },
    {
      title: 'Business Centres',
      image: '/circle/co-working.png',
      categories: [{ name: 'REAL ESTATE' }, { name: 'BUSINESS' }, { name: 'INVESTMENT' }],
      description: 'With UAE\'s startup growth outpacing the world and plans to 4x by 2030, demand for office spaces is surging. We\'re already operating a 12,000 sq. ft. business center in Dubai\'s prime Business Bay and see strong potential for revenue and brand expansion. We aim to raise liquidity to scale operations and offer investors a chance to grow with us across high-demand segments over the next 3–5 years.'
    },
    {
      title: 'GAMING CONTENT',
      image: '/circle/gaming.png',
      categories: [{ name: 'GAMING' }, { name: 'BLOCKCHAIN' }, { name: 'UTILITY' }],
      description: 'The next generation of blockchain gaming is on the way. Our Play-to-Earn mini-games are currently in development, blending fun and functionality. Soon, players will be able to compete, earn, and unlock real rewards through engaging skill-based gameplay. Stay tuned as we build interactive experiences that make every moment in the $TRDO universe count.'
    },
    {
      title: 'TRDO-Powered Digital Lottery',
      image: '/circle/lottery.png',
      categories: [{ name: 'LOTTERY' }, { name: 'BLOCKCHAIN' }, { name: 'UTILITY' }],
      description: 'A decentralized, transparent, and tamper-proof lottery system with instant settlements via TRDO token. Global participation with crypto wallets and smart contract-based draws and automated payouts.',
      features: [
        'Instant settlements via TRDO token',
        'Global participation with crypto wallets',
        'Smart contract-based draws',
        'Automated payouts'
      ]
    }
  ];

  const handleFlip = (index: number) => {
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  // Calculate the mouse glow effect position for each card
  const getMouseGlowStyle = (cardIndex: number) => {
    const cardElement = cardsRef.current[cardIndex];
    if (!cardElement) return {};

    const rect = cardElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to card center
    const distanceX = mousePosition.x - centerX;
    const distanceY = mousePosition.y - centerY;
    
    // Only show glow when mouse is near the card
    const maxDistance = 300;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance > maxDistance) return { opacity: 0 };
    
    // Calculate position of glow relative to card
    const glowX = (mousePosition.x - rect.left) / rect.width * 100;
    const glowY = (mousePosition.y - rect.top) / rect.height * 100;
    
    // Intensity based on distance
    const intensity = 1 - (distance / maxDistance);
    
    return {
      background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(157, 107, 241, ${intensity * 0.7}), transparent 100px)`,
      opacity: 1
    };
  };

  return (
    <section id="products" ref={sectionRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0E0A1F] to-[#16102E]">
      {/* Hide any overflow content from the flipped cards */}
      <div className="absolute inset-0 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Our Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          {products.map((product, index) => {
            // Card tilt animation based on scroll position
            const startScroll = 0.1 + index * 0.04; // stagger the start
            const endScroll = startScroll + 0.15;
            
            const tiltX = useTransform(
              scrollYProgress, 
              [startScroll, endScroll],
              [0, index % 2 === 0 ? -5 : 5] // alternate tilt direction
            );
            
            const tiltY = useTransform(
              scrollYProgress,
              [startScroll, endScroll],
              [0, index % 3 === 0 ? 3 : -3] // varied tilt
            );

            return (
              <motion.div 
                key={index} 
                className="project-card h-[500px] relative perspective-1200"
                ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformStyle: 'preserve-3d'
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`card-wrapper ${flippedCard === index ? 'flipped' : ''}`}>
                  {/* Card Front */}
                  <div className="card-front">
                    <div className="bg-gray-900 rounded-lg overflow-hidden h-full flex flex-col shadow-xl relative">
                      {/* Mouse glow effect overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 rounded-lg"
                        style={getMouseGlowStyle(index)}
                      ></div>

                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover object-center transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.style.background = getGradientStyle(index);
                            }
                          }}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {product.categories.map((category, catIndex) => (
                              <span 
                                key={catIndex} 
                                className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">{product.title}</h3>
                          <p className="text-gray-400 line-clamp-3 mb-6">
                            {product.description.substring(0, 120)}...
                          </p>
                        </div>
                        <button 
                          onClick={() => handleFlip(index)}
                          className="mt-auto flex items-center text-white hover:text-purple-300 transition-colors duration-300 group"
                          aria-label={`View details about ${product.title}`}
                        >
                          View Details
                          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div className="card-back custom-scrollbar">
                    <div className="p-8 h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-xl">
                      <h3 className="text-2xl font-bold text-white mb-6">{product.title}</h3>
                      <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                        <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
                        
                        <div className="mt-4 flex flex-wrap mb-6">
                          {product.categories.map((category, catIndex) => (
                            <span key={catIndex} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full mr-2 mb-2">
                              {category.name}
                            </span>
                          ))}
                        </div>
                        
                        {product.priceInfo && (
                          <div className="flex items-center justify-between bg-white/5 p-3 rounded-md mt-4">
                            <div>
                              <span className="text-xs text-gray-400">Current Price</span>
                              <p className="text-white font-bold">{product.priceInfo.current}</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400">Expected Price</span>
                              <p className="text-green-400 font-bold">{product.priceInfo.expected}</p>
                            </div>
                          </div>
                        )}
                        
                        {product.features && (
                          <div className="mt-4">
                            <h4 className="text-white font-medium mb-2">Key Features</h4>
                            <ul className="list-disc pl-5">
                              {product.features.map((feature, idx) => (
                                <li key={idx} className="text-gray-300 mb-1">{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => handleFlip(index)}
                        className="mt-auto flex items-center text-white hover:text-purple-300 transition-colors duration-300 group"
                        aria-label={`Back to ${product.title} card`}
                      >
                        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
