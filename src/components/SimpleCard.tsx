import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface Category {
  name: string;
}

interface PriceInfo {
  current: string;
  expected: string;
}

interface CardProps {
  title: string;
  description: string;
  image?: string;
  categories?: Category[];
  priceInfo?: PriceInfo;
  features?: string[];
}

const SimpleCard: React.FC<CardProps> = ({ title, description, image, categories = [], priceInfo, features = [] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Generate background colors for cards with no images
  const getGradientStyle = () => {
    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)',
      'linear-gradient(135deg, #f43f5e 0%, #c026d3 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div className="w-full h-[500px] perspective-1200 mb-7 relative">
      <div className={`relative w-full h-full text-center transition-transform duration-800 ease-card-flip transform-style-3d shadow-card rounded-2xl ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-card bg-[#141428]/90 text-white z-10">
          <div className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ease-out bg-gray-900/90 backdrop-blur-sm">
            <div className="h-[200px] overflow-hidden relative">
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.background = getGradientStyle();
                    }
                  }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map((category, catIndex) => (
                  <span key={catIndex} className="text-xs py-1 px-3 rounded-full bg-white/10 text-gray-300">
                    {category.name}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
              <p className="text-gray-400 mb-6 line-clamp-3 text-left">{description.substring(0, 120)}...</p>
              <button 
                onClick={handleFlip} 
                className="mt-auto flex items-center justify-center py-2 px-4 rounded-lg bg-purple-700/60 hover:bg-purple-700/80 text-white transition-all duration-300 group"
                aria-label={`View details about ${title}`}
              >
                <span>View Details</span>
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-card bg-[#1e1e32]/90 text-white rotate-y-180">
          <div className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ease-out bg-gray-800/90 backdrop-blur-sm p-6">
            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <div className="py-4 text-gray-300 leading-relaxed flex-grow overflow-y-auto text-left scrollbar-thin max-h-[320px]">
              <p>{description}</p>
              
              <div className="flex flex-wrap gap-2 my-4">
                {categories.map((category, catIndex) => (
                  <span key={catIndex} className="text-xs py-1 px-3 rounded-full bg-white/10 text-gray-300 mr-2 mb-2">
                    {category.name}
                  </span>
                ))}
              </div>
              
              {priceInfo && (
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg my-4">
                  <div>
                    <span className="text-xs text-gray-400 block">Current Price</span>
                    <p className="font-bold text-white">{priceInfo.current}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Expected Price</span>
                    <p className="font-bold text-green-400">{priceInfo.expected}</p>
                  </div>
                </div>
              )}
              
              {features.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">Key Features</h4>
                  <ul className="list-disc pl-5">
                    {features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button 
              onClick={handleFlip} 
              className="mt-4 flex items-center justify-center py-2 px-4 rounded-lg bg-purple-700/60 hover:bg-purple-700/80 text-white transition-all duration-300 group"
              aria-label={`Back to ${title} card`}
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating particles for air effect */}
      <div className="absolute w-full h-full pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 rounded-full bg-white/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;
