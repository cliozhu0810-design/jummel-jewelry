import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Sparkles, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductDetail({ t }) {
  const { id } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id: `product-${id}`,
      name: t.product.productName,
      price: 899,
      image: `/products/IMG_207${id || 3}.jpg`
    };
    addToCart(product);
  };

  return (
    <div className="product-detail-page">
      <section className="product-detail-section">
        <div className="product-detail-container">
          {/* Product Images */}
          <motion.div 
            className="product-images"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="main-image">
              <img src={`/products/IMG_207${id || 3}.jpg`} alt="Silver Ring" />
            </div>
            <div className="thumbnail-grid">
              <img src="/products/IMG_2073.jpg" alt="View 1" className="thumbnail" />
              <img src="/products/IMG_2074.jpg" alt="View 2" className="thumbnail" />
              <img src="/products/IMG_2075.jpg" alt="View 3" className="thumbnail" />
              <img src="/products/IMG_2076.jpg" alt="View 4" className="thumbnail" />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="product-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="product-name">{t.product.productName}</h1>
            <p className="product-code">{t.product.productCode}: JM-SR-{id || '001'}</p>
            
            <div className="product-price">
              <span className="current-price">¥ 899</span>
              <span className="original-price">¥ 1,299</span>
              <span className="discount-badge">限时优惠</span>
            </div>

            <div className="product-description">
              <h3>{t.product.description}</h3>
              <p>{t.product.descriptionText}</p>
              <ul>
                <li><Sparkles size={16} /> {t.product.features.material}</li>
                <li><Sparkles size={16} /> {t.product.features.design}</li>
                <li><Sparkles size={16} /> {t.product.features.craft}</li>
                <li><Sparkles size={16} /> {t.product.features.warranty}</li>
              </ul>
            </div>

            <div className="product-options">
              <div className="option-group">
                <label>{t.product.size}</label>
                <div className="size-options">
                  <button className="size-btn">6号</button>
                  <button className="size-btn active">7号</button>
                  <button className="size-btn">8号</button>
                  <button className="size-btn">9号</button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <motion.button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart size={20} />
                {t.product.addToCart}
              </motion.button>
              <motion.button 
                className="wishlist-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} />
              </motion.button>
              <motion.button 
                className="share-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <strong>{t.product.productFeatures.shipping.title}</strong>
                <span>{t.product.productFeatures.shipping.desc}</span>
              </div>
              <div className="feature-item">
                <strong>{t.product.productFeatures.returns.title}</strong>
                <span>{t.product.productFeatures.returns.desc}</span>
              </div>
              <div className="feature-item">
                <strong>{t.product.productFeatures.authentic.title}</strong>
                <span>{t.product.productFeatures.authentic.desc}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related-products-section">
        <h2 className="section-title">{t.product.relatedProducts}</h2>
        <div className="related-products-grid">
          {[2077, 2078, 2079, 2080].map((num, index) => (
            <motion.div 
              key={num}
              className="related-product-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <img src={`/products/IMG_${num}.jpg`} alt="Related Product" />
              <h4>JuMel 银戒指</h4>
              <p className="price">¥ 899</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
