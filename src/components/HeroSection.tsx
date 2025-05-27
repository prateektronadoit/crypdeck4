import React, { useRef, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Autoplay video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);
  return (
    <div className="relative min-h-[100vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/home.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-12 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
        
        {/* Left side content */}
        <div className="w-full lg:w-1/2 text-white mt-8 lg:mt-0 lg:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Build on <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6137B2] to-pink-400">decentralized</span> <br/>
            crypto protocol
          </h1>
          <p className="text-lg mb-8 text-gray-300 max-w-lg">
            Empowering the future through blockchain innovation and strategic investments. 
            Pushing the boundaries of blockchain technology to unlock a brand new design space.
          </p>
          <button className="bg-gradient-to-r from-[#211146] to-[#6137B2] text-white px-8 py-3 rounded-lg hover:opacity-90 transition duration-300 text-lg font-medium shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
