import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ScriptCard from '../components/scripts/ScriptCard';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (scriptId: string) => {
    const script = wishlist.find(item => item.id === scriptId);
    if (script) {
      addToCart(script);
      removeFromWishlist(scriptId);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-play text-4xl font-bold text-white mb-2">
              Your <span className="text-gold">Wishlist</span>
            </h1>
            <p className="text-gray-400">
              {wishlist.length} {wishlist.length === 1 ? 'script' : 'scripts'} saved for later
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={() => {
                wishlist.forEach(script => addToCart(script));
                wishlist.forEach(script => removeFromWishlist(script.id));
              }}
              className="flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              Add All to Cart
            </button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {wishlist.map((script) => (
              <div
                key={script.id}
                className="bg-dark-gray rounded-lg overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image */}
                <Link
                  to={`/script/${script.id}`}
                  className="md:w-48 h-48 md:h-auto relative group"
                >
                  <img
                    src={script.image}
                    alt={script.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {script.demoVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-gold/20 p-4 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-8 h-8 text-gold"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      to={`/script/${script.id}`}
                      className="font-play text-xl font-bold text-white hover:text-gold transition-colors duration-200"
                    >
                      {script.title}
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(script.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <p className="text-gray-400 mb-4">{script.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {script.category.map((cat) => (
                      <span
                        key={cat}
                        className="bg-black/30 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {script.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="font-play text-2xl font-bold text-gold">
                            ${script.discountPrice}
                          </span>
                          <span className="text-gray-400 line-through">
                            ${script.price}
                          </span>
                        </div>
                      ) : (
                        <span className="font-play text-2xl font-bold text-gold">
                          ${script.price}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(script.id)}
                      className="flex items-center gap-2 bg-gold/20 text-gold hover:bg-gold hover:text-black px-4 py-2 rounded transition-all duration-300"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <Heart className="w-16 h-16 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 mb-8">
              Browse our collection and add your favorite scripts to the wishlist
            </p>
            <Link
              to="/scripts"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded transition-colors duration-200"
            >
              Browse Scripts
            </Link>
          </div>
        )}

        {/* Recently Added Scripts */}
        {wishlist.length > 0 && (
          <div className="mt-16">
            <h2 className="font-play text-2xl font-bold text-white mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Show some recommended scripts here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;