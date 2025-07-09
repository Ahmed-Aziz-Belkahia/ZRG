import React from 'react';

const CheckoutPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="font-play text-4xl font-bold text-white mb-8">
          Checkout <span className="text-gold">Page</span>
        </h1>
        <p className="text-gray-400 mb-12">
          This page would contain the checkout process, including cart review, payment methods, and order confirmation.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;