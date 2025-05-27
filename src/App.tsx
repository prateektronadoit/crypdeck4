import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductDice from './components/ProductDice';
import Products from './components/Products';
import About from './components/About';

// Product items data for the dice cube animation
const productItems = [
  { 
    name: 'Business Centres', 
    imageName: 'circle/co-working.png',
  },
  { 
    name: 'CRYP App', 
    imageName: 'circle/crypapp.png',
  },
  { 
    name: 'TRODO TOKEN', 
    imageName: 'circle/token.png',
  },
  { 
    name: 'Real Estate Tokenisation', 
    imageName: 'circle/dreamrealirty.png',
  },
  { 
    name: 'GAMING CONTENT', 
    imageName: 'circle/gaming.png',
  },
  { 
    name: 'TRDO-Powered Digital Lottery', 
    imageName: 'circle/lottery.png',
  }
];

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 w-full h-full" 
           style={{ 
             background: 'linear-gradient(135deg, #0E0A1F 0%, #16102E 100%)',
           }}>
      </div>
      
      <div className="relative z-10">
        <Header />
      
        

        {/* Hero Section Component */}
        <HeroSection />
        
        {/* Product Dice Animation Component */}
        <ProductDice productItems={productItems} />
        
        {/* Products Component */}
        <Products />
        
        {/* About Component */}
        <About />
        
        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
