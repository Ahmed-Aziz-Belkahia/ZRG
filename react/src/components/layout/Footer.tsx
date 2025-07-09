import React from 'react';
import { Link } from 'react-router-dom';
import { TowerControl as GameController, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Disc as Discord } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-gray pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <GameController 
                size={32} 
                className="text-gold transition-transform duration-300 group-hover:rotate-12" 
              />
              <span className="font-play text-2xl font-bold text-white tracking-wider">
                <span className="text-gold">Z</span>RG
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium GTA V FiveM scripts for the most immersive gaming experience. Elevate your server with our professional, high-performance solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-200"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-200"
                aria-label="Discord"
              >
                <Discord size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-play text-xl text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold after:-mb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/scripts" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> All Scripts
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Pricing Plans
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-play text-xl text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold after:-mb-2">
              Categories
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/scripts/category/roleplay" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Roleplay
                </Link>
              </li>
              <li>
                <Link 
                  to="/scripts/category/economy" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Economy
                </Link>
              </li>
              <li>
                <Link 
                  to="/scripts/category/jobs" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/scripts/category/vehicles" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Vehicles
                </Link>
              </li>
              <li>
                <Link 
                  to="/scripts/category/utilities" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200 flex items-center"
                >
                  <span className="text-gold mr-2">›</span> Utilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-play text-xl text-white mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-gold after:-mb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-gold mt-1 mr-3" />
                <span className="text-gray-400">
                  1234 Gaming Avenue, Suite 567<br />
                  Los Santos, CA 90123
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gold mr-3" />
                <a 
                  href="tel:+1234567890" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gold mr-3" />
                <a 
                  href="mailto:support@zrg.com" 
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  support@zrg.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            <img 
              src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Visa" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
            <img 
              src="https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Mastercard" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
            <img 
              src="https://images.pexels.com/photos/4386367/pexels-photo-4386367.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="PayPal" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
            <img 
              src="https://images.pexels.com/photos/4386432/pexels-photo-4386432.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="American Express" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
            <img 
              src="https://images.pexels.com/photos/4386434/pexels-photo-4386434.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Discover" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
            <img 
              src="https://images.pexels.com/photos/4386368/pexels-photo-4386368.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Apple Pay" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity duration-200 object-cover rounded"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ZRG Gaming. All rights reserved. 
            <span className="mx-2">|</span>
            <Link 
              to="/privacy-policy" 
              className="hover:text-gold transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link 
              to="/terms" 
              className="hover:text-gold transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Powered by <a href="https://tebex.io/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Tebex</a>
          </p>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center bg-black/40 px-3 py-1 rounded-md">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-500 text-xs font-medium">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;