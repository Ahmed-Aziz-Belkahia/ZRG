import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User, TowerControl as GameController } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CartPanel from '../cart/CartPanel';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleProfileClick = () => {
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/profile');
    }
  };

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection && location.pathname === '/') {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#pricing';
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <GameController 
              size={32} 
              className="text-gold transition-transform duration-300 group-hover:rotate-12" 
            />
            <span className="font-play text-2xl font-bold text-white tracking-wider">
              <span className="text-gold">Z</span>RG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/scripts" 
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              Scripts
            </Link>
            {/* <a 
              href="/#pricing" 
              onClick={scrollToPricing}
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              Pricing
            </a> */}
            <Link 
              to="/blog" 
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className="font-play text-white hover:text-gold transition-colors duration-200"
            >
              FAQ
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              to="/wishlist" 
              className="p-2 text-white hover:text-gold transition-colors duration-200 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-gold transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button 
              onClick={handleProfileClick}
              className="hidden md:block p-2 text-white hover:text-gold transition-colors duration-200"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-gold transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black/95 z-40 transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden pt-24`}
        >
          <nav className="container mx-auto px-4 flex flex-col gap-6">
            <Link 
              to="/" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              Home
            </Link>
            <Link 
              to="/scripts" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              Scripts
            </Link>
            <a 
              href="/#pricing" 
              onClick={scrollToPricing}
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              Pricing
            </a>
            <Link 
              to="/blog" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              FAQ
            </Link>
            <Link 
              to="/search" 
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4"
            >
              Search
            </Link>
            <button
              onClick={handleProfileClick}
              className="font-play text-2xl text-white hover:text-gold transition-colors duration-200 border-b border-gray-800 pb-4 text-left"
            >
              Account
            </button>
          </nav>
        </div>
      </header>
      
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;