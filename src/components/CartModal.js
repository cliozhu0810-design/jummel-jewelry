import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartModal({ t }) {
  const { showModal, setShowModal } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    setShowModal(false);
  };

  const handleViewCart = () => {
    setShowModal(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <motion.div
            className="cart-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button 
              className="cart-modal-close"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <div className="cart-modal-content">
              <motion.div
                className="cart-modal-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={60} strokeWidth={1.5} />
              </motion.div>

              <h2 className="cart-modal-title">{t.cart.successAdded}</h2>

              <div className="cart-modal-actions">
                <motion.button
                  className="cart-modal-btn cart-modal-btn-secondary"
                  onClick={handleContinueShopping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cart.continueShopping}
                </motion.button>

                <motion.button
                  className="cart-modal-btn cart-modal-btn-primary"
                  onClick={handleViewCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={18} />
                  {t.cart.viewCart}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartModal;
