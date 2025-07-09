import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Play } from 'lucide-react';
import { Script } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ScriptCardProps {
  script: Script;
  layout: 'grid' | 'list';
  onQuickView?: (script: Script) => void;
  link?: string; // Add optional link property
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, layout, onQuickView, link }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(script.slug)) {
      removeFromWishlist(script.slug);
    } else {
      addToWishlist(script);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(script);
  };

  const scriptSlug = script.slug;
  const imageSrc = script.image || 'default-image-path';
  const rating = script.rating || 0;

  if (layout === 'list') {
    return (
      <Link
        to={link || `/script/${scriptSlug}`}
        className="group flex gap-6 bg-dark-gray rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10"
      >
        <div className="relative w-64 h-48">
          <img
            src={imageSrc}
            alt={script.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {script.demoVideo && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView?.(script);
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Play className="text-white" size={48} />
            </button>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {script.new && (
              <span className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-2 rounded">
                New
              </span>
            )}
            {script.bestseller && (
              <span className="bg-gold text-black text-xs font-bold uppercase py-1 px-2 rounded">
                Bestseller
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-play text-xl font-bold text-white group-hover:text-gold transition-colors duration-300">
              {script.title}
            </h3>
            <button
              onClick={handleWishlistToggle}
              className="p-2 text-white hover:text-gold transition-colors duration-200"
            >
              <Heart
                size={20}
                className={isInWishlist(script.slug) ? 'fill-gold text-gold' : ''}
              />
            </button>
          </div>

          <p className="text-gray-400 mb-4 line-clamp-2">{script.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(script.category) && script.category.map((cat) => (
              <span
                key={cat}
                className="bg-black/30 text-gray-300 text-xs px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(rating)
                      ? 'text-gold fill-gold'
                      : i < rating
                      ? 'text-gold fill-gold opacity-50'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">({script.reviews_count})</span>
          </div>

          <div className="mt-auto flex items-center justify-between">
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
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded transition-all duration-300 hover:bg-gold hover:text-black"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={link || `/scripts/${scriptSlug}`}
      className="group bg-dark-gray rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
    >
      <div className="relative h-48">
        <img
          src={imageSrc}
          alt={script.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {script.demoVideo && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(script);
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Play className="text-white" size={48} />
          </button>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {script.new && (
            <span className="bg-blue-500 text-white text-xs font-bold uppercase py-1 px-2 rounded">
              New
            </span>
          )}
          {script.bestseller && (
            <span className="bg-gold text-black text-xs font-bold uppercase py-1 px-2 rounded">
              Bestseller
            </span>
          )}
        </div>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-black/30 rounded-full text-white hover:text-gold transition-colors duration-200"
        >
          <Heart
            size={20}
            className={isInWishlist(script.slug) ? 'fill-gold text-gold' : ''}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-play text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-2">
          {script.title}
        </h3>

        <p className="text-gray-400 mb-4 line-clamp-2">{script.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(script.category) && script.category.map((cat) => (
            <span
              key={cat}
              className="bg-black/30 text-gray-300 text-xs px-2 py-1 rounded"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(rating)
                    ? 'text-gold fill-gold'
                    : i < rating
                    ? 'text-gold fill-gold opacity-50'
                    : 'text-gray-400'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400">({script.reviews_count})</span>
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
            onClick={handleAddToCart}
            className="bg-gold/20 text-gold p-2 rounded transition-all duration-300 hover:bg-gold hover:text-black"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ScriptCard;