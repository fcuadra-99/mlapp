import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import ServicesHub from './pages/services/index';
import SalesForecasting from './pages/services/sales-forecasting/SalesForecasting';
import CustomerSegmentation from './pages/services/customer-segmentation/CustomerSegmentation';
import ProductRecommendation from './pages/services/product-recommendation/ProductRecommendation';
import FraudDetection from './pages/services/fraud-detection/FraudDetection';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/sales-forecasting" element={<SalesForecasting />} />
            <Route path="/services/customer-segmentation" element={<CustomerSegmentation />} />
            <Route path="/services/product-recommendation" element={<ProductRecommendation />} />
            <Route path="/services/fraud-detection" element={<FraudDetection />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
