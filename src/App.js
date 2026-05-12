import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import './App.css';
import { translations } from './translations';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminInventory from './pages/AdminInventory';
import CartModal from './components/CartModal';

function AppContent() {
  const [language, setLanguage] = useState('zh');
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language];

  // Tiffany-style scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App" lang={language}>
        {/* Navigation with Tiffany-style scroll effect */}
        <motion.nav 
          className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="nav-container">
            <Link to="/" className="brand-logo-link">
              <img src="/jumel-logo-transparent.png" alt="JuMel Accessory" className="brand-logo-img" />
            </Link>
            <div className="nav-links">
              <a href="#collection">{t.nav.collection}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#contact">{t.nav.contact}</a>

              <div className="language-selector">
                <Globe size={18} strokeWidth={2} />
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-dropdown"
                >
                  <option value="zh">中文</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Cart Modal */}
        <CartModal t={t} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/product/:id" element={<ProductDetail t={t} />} />
          <Route path="/cart" element={<Cart t={t} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
        </Routes>

        {/* Footer */}
        <footer className="footer" id="contact">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>JuMel</h3>
              <p>{t.footer.tagline}</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>{t.footer.products.title}</h4>
                <Link to="/product/3">{t.footer.products.rings}</Link>
                <a href="#new">{t.footer.products.new}</a>
                <a href="#custom">{t.footer.products.custom}</a>
              </div>
              <div className="footer-column">
                <h4>{t.footer.about.title}</h4>
                <a href="#about">{t.footer.about.story}</a>
                <a href="#craft">{t.footer.about.craft}</a>
                <a href="#contact">{t.footer.about.contact}</a>
              </div>
              <div className="footer-column">
                <h4>{t.footer.service.title}</h4>
                <a href="#shipping">{t.footer.service.shipping}</a>
                <a href="#returns">{t.footer.service.returns}</a>
                <a href="#care">{t.footer.service.care}</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.footer.copyright}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
