import React from 'react';
import { ShoppingCart, CreditCard, Shield, CheckCircle } from 'lucide-react';

const CheckoutProcess: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-black to-dark-gray">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
            Seamless <span className="text-gold">Checkout</span> Process
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've made purchasing scripts as easy as possible. Follow these simple steps to get your server running with premium ZRG scripts.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-gold" size={32} />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <h3 className="font-play text-xl font-bold text-white mb-3">
              Add to Cart
            </h3>
            <p className="text-gray-400">
              Select the scripts you want and add them to your cart. Mix and match to create the perfect package for your server.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center">
                <CreditCard className="text-gold" size={32} />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <h3 className="font-play text-xl font-bold text-white mb-3">
              Secure Payment
            </h3>
            <p className="text-gray-400">
              Choose from multiple payment methods. All transactions are secure and processed through Tebex's trusted platform.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center">
                <Shield className="text-gold" size={32} />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <h3 className="font-play text-xl font-bold text-white mb-3">
              Verification
            </h3>
            <p className="text-gray-400">
              Your order is verified instantly. An order confirmation will be sent to your email with all the details.
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center">
                <CheckCircle className="text-gold" size={32} />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                4
              </div>
            </div>
            <h3 className="font-play text-xl font-bold text-white mb-3">
              Instant Access
            </h3>
            <p className="text-gray-400">
              Get immediate access to your purchased scripts through your account dashboard. Ready to install and use.
            </p>
          </div>
        </div>
        
        {/* Security Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="flex items-center bg-dark-gray rounded-lg p-4 shadow-md">
            <img 
              src="/static/ssl.png" 
              alt="SSL Secured" 
              className="h-10 mr-3 object-cover rounded"
            />
            <div>
              <h4 className="text-white font-medium">SSL Secured</h4>
              <p className="text-gray-400 text-sm">Your data is protected</p>
            </div>
          </div>
          
          <div className="flex items-center bg-dark-gray rounded-lg p-4 shadow-md">
            <img 
              src="/static/money.png" 
              alt="Money Back Guarantee" 
              className="h-10 mr-3 object-cover rounded"
            />
            <div>
              <h4 className="text-white font-medium">Money Back Guarantee</h4>
              <p className="text-gray-400 text-sm">30-day satisfaction guarantee</p>
            </div>
          </div>
          
          <div className="flex items-center bg-dark-gray rounded-lg p-4 shadow-md">
            <img 
              src="/static/support.png" 
              alt="24/7 Support" 
              className="h-10 mr-3 object-cover rounded"
            />
            <div>
              <h4 className="text-white font-medium">24/7 Support</h4>
              <p className="text-gray-400 text-sm">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutProcess;