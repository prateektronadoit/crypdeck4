import React from 'react';
import { motion } from 'framer-motion';
import SimpleCard from './SimpleCard';
import './Products.css';

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

const Products: React.FC = () => {
  // Product data
  const products: Product[] = [
    {
      title: 'CRYP APPLICATION',
      image: '/products/Crypapp.png',
      categories: [{ name: 'WEB' }, { name: 'DESIGN' }, { name: 'DEVELOPMENT' }],
      description: 'A one-of-its-kind platform bridging crypto and fiat for users across 180+ countries, with seamless global accessibility. In partnership with a global bank, users can add, convert, and remit funds in multiple currencies, and even load them onto Mastercard (virtual & physical). It enables a user to add funds to a non-custodial wallet (external wallet). The platform offers global utility services, cross-border payments, and aims to evolve into a comprehensive Web2 + Web3 banking solution.'
    },
    {
      title: 'TRONADO TOKEN',
      image: '/products/TRDO-TOKEN.png',
      categories: [{ name: 'BLOCKCHAIN' }, { name: 'FINANCE' }, { name: 'UTILITY' }],
      description: 'TRDO is a utility token on the Polygon blockchain with a total supply of 25 crore tokens. 21.5 crore are locked, with 25 lakh released every 3 months to manage demand and supply. Launched at 2 cents in 2021, it\'s now around 15 cents, with an upcoming international launch at 20+ cents. Tronado Token can be utilized in the CRYP application for various utility payments, as well as for multiple futuristic token-based applications.',
      priceInfo: {
        current: '$1',
        expected: '$3'
      }
    },
    {
      title: 'Real Estate Tokenisation',
      image: '/products/real-world-tokenisation.jpg',
      categories: [{ name: 'REAL ESTATE' }, { name: 'BLOCKCHAIN' }, { name: 'INVESTMENT' }],
      description: 'Under the Crypque Dream Reality Plan, investors can benefit from a guaranteed 2X Buy Back Plan designed to provide both security and exceptional returns. For example, with an investment of AED 1 Million in property under this plan, the investor receives a guaranteed buy back of AED 2 Million for the same property from Crypque Dream Reality after 30 months from the date of investment. This plan ensures a 100% return on investment, offering both asset-backed security and a clear exit strategy, making it a powerful option for investors seeking predictable and substantial gains in the real estate market.'
    },
    {
      title: 'Business Centres',
      image: '/products/Businesscenter.jpg',
      categories: [{ name: 'REAL ESTATE' }, { name: 'BUSINESS' }, { name: 'INVESTMENT' }],
      description: 'With UAE\'s startup growth outpacing the world and plans to 4x by 2030, demand for office spaces is surging. We\'re already operating a 12,000 sq. ft. business center in Dubai\'s prime Business Bay and see strong potential for revenue and brand expansion. We aim to raise liquidity to scale operations and offer investors a chance to grow with us across high-demand segments over the next 3–5 years.'
    },
    {
      title: 'GAMING CONTENT',
      image: '/products/game.jpg',
      categories: [{ name: 'GAMING' }, { name: 'BLOCKCHAIN' }, { name: 'UTILITY' }],
      description: 'The next generation of blockchain gaming is on the way. Our Play-to-Earn mini-games are currently in development, blending fun and functionality. Soon, players will be able to compete, earn, and unlock real rewards through engaging skill-based gameplay. Stay tuned as we build interactive experiences that make every moment in the $TRDO universe count.'
    },
    {
      title: 'TRDO-Powered Digital Lottery',
      image: '/products/lottery.jpg',
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

  return (
    <section id="products" className="py-16 relative overflow-hidden bg-gradient-to-b from-[#0E0A1F] to-[#16102E]">
      {/* Background blur effect for depth */}
      <div className="absolute inset-0 backdrop-blur-sm z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Our Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ z: 10 }}
            >
              <SimpleCard
                title={product.title}
                description={product.description}
                image={product.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
