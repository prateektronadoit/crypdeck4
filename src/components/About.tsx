import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const About: React.FC = () => {
  // References for scroll detection
  const sectionRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Use Framer Motion's useInView for scroll detection
  const isEcosystemInView = useInView(ecosystemRef, { once: false, amount: 0.3 });
  const isTextInView1 = useInView(textRef1, { once: false, amount: 0.5 });
  const isTextInView2 = useInView(textRef2, { once: false, amount: 0.5 });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  
  const [revealed, setRevealed] = useState(false);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const [textLine1, setTextLine1] = useState<string[]>([]);
  const [textLine2, setTextLine2] = useState<string[]>([]);
  const [currentLine1, setCurrentLine1] = useState(0);
  const [currentLine2, setCurrentLine2] = useState(0);
  
  // Split text into lines for line-by-line reveal
  useEffect(() => {
    const text1 = "Over the past 4.5 years, Crypque has cultivated a robust global community under the leadership of " +
               "founders who bring a collective experience of 25+ years in the blockchain, finance, and technology " +
               "sectors. Recognized with multiple national awards, our team is committed to building a sustainable, " +
               "revenue-generating ecosystem that empowers users and transforms industries through innovation.";
               
    const text2 = "Crypque's vision goes beyond traditional boundaries — we aim to redefine how users interact with technology, " +
               "investments, and education through real-world blockchain applications.";
               
    // Split text into approximately 10-word chunks
    const splitText = (text: string) => {
      const words = text.split(' ');
      const lines = [];
      for (let i = 0; i < words.length; i += 10) {
        lines.push(words.slice(i, i + 10).join(' '));
      }
      return lines;
    };
    
    setTextLine1(splitText(text1));
    setTextLine2(splitText(text2));
  }, []);
  
  // Effect for scrolling line reveal
  useEffect(() => {
    if (isTextInView1 && currentLine1 < textLine1.length) {
      const timer = setTimeout(() => {
        setCurrentLine1(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isTextInView1, currentLine1, textLine1.length]);
  
  useEffect(() => {
    if (isTextInView2 && currentLine2 < textLine2.length) {
      const timer = setTimeout(() => {
        setCurrentLine2(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isTextInView2, currentLine2, textLine2.length]);
  
  // Effect for ecosystem card reveal
  useEffect(() => {
    setRevealed(isEcosystemInView);
  }, [isEcosystemInView]);
  
  // Data for ecosystem cards
  const ecosystemCards = [
    {
      title: "Crypque Education",
      description: "A comprehensive learning platform focused on blockchain, crypto investments, and Web3 technologies — designed to educate and empower the next generation of innovators and investors.",
      position: "top-left"
    },
    {
      title: "Crypque Investment",
      description: "A trusted gateway for users and institutions to explore strategic investment opportunities in vetted blockchain projects, tokens, and decentralized technologies.",
      position: "top-right"
    },
    {
      title: "Real-World Tokenization",
      description: "Bringing tangible assets on-chain — from real estate to intellectual property — through secure and transparent tokenization solutions, enhancing liquidity and accessibility.",
      position: "bottom-left"
    },
    {
      title: "Blockchain & Tech Innovation",
      description: "Developing scalable, user-centric platforms and infrastructure to solve real-world challenges through blockchain technology and decentralized applications.",
      position: "bottom-right"
    }
  ];
  
  return (
    <section ref={sectionRef} id="about" className="py-16 relative z-20 overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.gif')" }}></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4 text-shadow-glow">ABOUT US</h2>
          <div className="h-1 w-24 bg-purple-400 mx-auto rounded-full shadow-glow-line animate-pulse"></div>
        </motion.div>
        
        <div className="text-white max-w-4xl mx-auto text-lg mb-4">
          {/* Line-by-line reveal for first paragraph */}
          <div ref={textRef1} className="mb-6 relative">
            {textLine1.map((line, index) => (
              <motion.div 
                key={`line1-${index}`}
                className="relative overflow-hidden mb-1"
                initial={{ height: 0, opacity: 0 }}
                animate={currentLine1 > index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
              >
                <p className="transform translate-y-0 opacity-100 transition-all duration-500 ease-in-out">{line}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Line-by-line reveal for second paragraph */}
          <div ref={textRef2} className="mb-10 relative">
            {textLine2.map((line, index) => (
              <motion.div 
                key={`line2-${index}`}
                className="relative overflow-hidden mb-1"
                initial={{ height: 0, opacity: 0 }}
                animate={currentLine2 > index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
              >
                <p className="transform translate-y-0 opacity-100 transition-all duration-500 ease-in-out">{line}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.h3 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-6 relative inline-block mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="relative z-10">Our Ecosystem <span className="text-gradient">Includes</span></span>
            {/* Animated glow effect behind the text */}
            <motion.span 
              className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-purple-600/30 rounded-lg blur-xl"
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
            />
          </motion.h3>
          
          {/* Ecosystem Cards Container */}
          <div ref={ecosystemRef} className="relative mx-auto max-w-[1200px] mt-8 flex flex-wrap justify-center gap-6 md:gap-8 px-4">
            {ecosystemCards.map((card, index) => {
              // We don't need positions anymore as we're using flexbox layout
              
              return (
                <motion.div 
                  key={index}
                  className="w-[240px] bg-gradient-to-br from-[#3A1264] to-[#16102E] rounded-xl p-5 backdrop-blur-md border border-purple-500/30 shadow-card-glow hover:shadow-purple-500/50 transition-all duration-300 m-2 sm:m-3 md:m-4"
                  style={{
                    position: 'relative'
                  }}
                  initial={{ 
                    opacity: 0,
                    scale: 0.8,
                    rotate: index % 2 === 0 ? -5 : 5
                  }}
                  animate={revealed ? { 
                    opacity: 1,
                    scale: 1,
                    rotate: index % 2 === 0 ? -2 : 2
                  } : { 
                    opacity: 0,
                    scale: 0.8
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.2
                  }}
                  onMouseEnter={() => setHoverCard(index)}
                  onMouseLeave={() => setHoverCard(null)}
                  whileHover={{ 
                    y: -15,
                    scale: 1.05,
                    zIndex: 30,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Glitch effect line */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-glitch-gradient animate-glitch-line opacity-0" style={{ animationDelay: `${index * 0.7}s` }}></div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-glitch-gradient animate-glitch-line opacity-0" style={{ animationDelay: `${index * 0.7 + 0.2}s` }}></div>
                  </div>
                  
                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-3 rounded-full bg-purple-600/30 flex items-center justify-center">
                      <span className="text-xl font-bold text-purple-300">{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-shadow-glow-sm">{card.title}</h4>
                    <p className="text-gray-200 leading-relaxed text-sm overflow-hidden transition-all duration-300" 
                       style={{ 
                         maxHeight: hoverCard === index ? '200px' : '55px',
                         maskImage: hoverCard === index ? 'none' : 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0))'
                       }}>
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Background glow effect when hovered */}
                  {hoverCard === index && (
                    <motion.div 
                      className="absolute inset-0 -z-10 opacity-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl"
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default About;
