import React, { useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CSSTransition } from 'react-transition-group';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    const tebexBaseUrl = 'https://checkout.tebex.io/checkout';
    const packageIds = cart.map(item => `${item.tebexId}:${item.quantity}`).join(',');
    const checkoutUrl = `${tebexBaseUrl}/${packageIds}`;
    window.location.href = checkoutUrl;
  };

  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="cart-slide"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div className="fixed inset-0 z-50 overflow-hidden" ref={nodeRef}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div
          ref={panelRef}
          className="absolute top-0 right-0 h-full w-full md:w-96 bg-dark-gray shadow-xl"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="text-gold mr-2" size={24} />
                  <h2 className="font-play text-xl font-bold text-white">
                    Your Cart ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="text-gray-600 mb-4" size={48} />
                  <p className="text-gray-400 mb-4">Your cart is empty</p>
                  <button
                    onClick={onClose}
                    className="text-gold hover:text-gold/80 transition-colors duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex gap-4 bg-black/30 rounded-lg p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.slug)}
                            className="p-1 text-red-500 hover:text-red-400 transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-2 font-play font-bold text-gold">
                          ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-800 p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="block w-full bg-gold hover:bg-gold/90 text-black font-bold py-3 rounded text-center transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CartPanel;