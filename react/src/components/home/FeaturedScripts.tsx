import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingCart, Star, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Script } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ScriptCardProps {
  script: Script;
  onQuickView: (script: Script) => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ script, onQuickView }) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(script.id)) {
      removeFromWishlist(script.id);
    } else {
      addToWishlist(script);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(script);
  };

  return (
    <Link 
      to={`/script/${script.slug}`}
      className="group relative bg-dark-gray rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={script.image} 
          alt={script.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div 
          className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {script.demoVideo && (
            <button 
              onClick={handleQuickView}
              className="bg-gold text-black p-3 rounded-full transform transition-transform duration-300 hover:scale-110"
            >
              <Play size={24} />
            </button>
          )}
        </div>

        {/* Badges */}
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

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlistToggle}
            className="bg-white/20 backdrop-blur-md p-2 rounded-full transition-all duration-300 hover:bg-white/30 group"
            aria-label={isInWishlist(script.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${
                isInWishlist(script.id) ? 'text-red-500 fill-red-500' : 'text-white group-hover:text-gold'
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-play text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
            {script.title}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={`${
                  i < Math.floor(script.rating) 
                    ? 'text-gold fill-gold' 
                    : i < script.rating 
                      ? 'text-gold fill-gold opacity-50' 
                      : 'text-gray-400'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-400">
            ({script.reviews_count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <div>
            {script.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-play text-xl font-bold text-gold">
                  ${script.discountPrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${script.price}
                </span>
              </div>
            ) : (
              <span className="font-play text-xl font-bold text-gold">
                ${script.price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Script card button clicked for script:', script.slug);
              console.log('Is script in cart:', isInCart(script.slug));
              if (!isInCart(script.slug)) {
                addToCart(script);
              }
            }}
            className={`bg-gold/20 p-2 rounded-full transition-all duration-300 ${
              isInCart(script.slug) ? 'bg-gray-400 text-white' : 'hover:bg-gold hover:text-black'
            }`}
            aria-label={isInCart(script.slug) ? 'Added to cart' : 'Add to cart'}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Link>
  );
};

const FeaturedScripts: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [activeVideo, setActiveVideo] = useState<Script | null>(null);
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await fetch('/api/scripts/');
        const data = await response.json();
        if (Array.isArray(data)) {
          setScripts(data);
        } else {
          console.error('API response is not an array:', data);
          setScripts([]);
        }
      } catch (error) {
        console.error('Error fetching scripts:', error);
        setScripts([]);
      }
    };

    fetchScripts();
  }, []);

  const handleQuickView = (script: Script) => {
    setActiveVideo(script);
  };

  const closeQuickView = () => {
    setActiveVideo(null);
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
              Featured <span className="text-gold">Scripts</span>
            </h2>
            <p className="text-gray-400 max-w-xl">
              Discover our handpicked selection of premium FiveM scripts that will elevate your server to the next level.
            </p>
          </div>

          <Link 
            to="/scripts" 
            className="mt-6 md:mt-0 flex items-center font-play font-medium text-gold hover:text-white transition-colors duration-300"
          >
            View All Scripts <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        {/* Scripts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {scripts.map((script) => (
            <ScriptCard 
              key={script.id} 
              script={script} 
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeQuickView}
          >
            <div 
              className="bg-dark-gray rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 flex items-center justify-between border-b border-gray-800">
                <h3 className="font-play text-xl font-bold text-white">
                  {activeVideo.title} - Preview
                </h3>
                <button 
                  onClick={closeQuickView}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="relative aspect-video">
                {activeVideo.demoVideo && (
                  <div id="loading-indicator" className="absolute inset-0 flex items-center justify-center bg-black">
                    <span className="text-white">Loading...</span>
                  </div>
                )}
                <iframe
                  width="100%"
                  height="100%"
                  src={activeVideo.demoVideo?.replace('watch?v=', 'embed/')}
                  title={`${activeVideo.title} preview`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => {
                    const loadingIndicator = document.getElementById('loading-indicator');
                    if (loadingIndicator) {
                      loadingIndicator.style.display = 'none';
                    }
                  }}
                ></iframe>
              </div>
              <div className="p-4 flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {activeVideo.discountPrice ? (
                      <>
                        <span className="font-play text-2xl font-bold text-gold">
                          ${activeVideo.discountPrice}
                        </span>
                        <span className="text-gray-400 line-through">
                          ${activeVideo.price}
                        </span>
                      </>
                    ) : (
                      <span className="font-play text-2xl font-bold text-gold">
                        ${activeVideo.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${
                            i < Math.floor(activeVideo.rating || 0) 
                              ? 'text-gold fill-gold' 
                              : i < (activeVideo.rating || 0) 
                                ? 'text-gold fill-gold opacity-50' 
                                : 'text-gray-400'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400">
                      ({activeVideo.reviews_count || 0} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link 
                    to={`/script/${activeVideo.slug}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    View Details <ExternalLink size={16} />
                  </Link>
                  <button 
                    onClick={() => {
                      if (!isInCart(activeVideo.id)) {
                        addToCart(activeVideo);
                      }
                      closeQuickView();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 ${
                      isInCart(activeVideo.id) ? 'bg-gray-400 text-white' : 'bg-gold hover:bg-gold/90 text-black font-medium'
                    }`}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedScripts;