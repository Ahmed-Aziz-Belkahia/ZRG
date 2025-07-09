import React, { useState } from 'react';
import { CheckCircle, XCircle, Info, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PricingTier } from '../../types';

const PRICING_TIERS: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: 19.99,
    features: [
      "Access to 5 scripts",
      "1 month of updates",
      "Standard support",
      "Single server license",
      "Documentation access"
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    id: "premium",
    name: "Premium",
    price: 49.99,
    features: [
      "Access to 20 scripts",
      "6 months of updates",
      "Priority support",
      "Up to 3 server licenses",
      "Documentation access",
      "Discord community access",
      "Script customization guides"
    ],
    popular: true,
    buttonText: "Get Premium"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    features: [
      "Access to all scripts",
      "Lifetime updates",
      "24/7 priority support",
      "Unlimited server licenses",
      "Documentation access",
      "Discord community access",
      "Custom script development",
      "Dedicated support manager",
      "White-label option"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const COMPARISON_FEATURES = [
  {
    name: "Scripts Access",
    basic: "5 scripts",
    premium: "20 scripts",
    enterprise: "All scripts",
    tooltip: "Number of scripts you can download and use"
  },
  {
    name: "Updates Period",
    basic: "1 month",
    premium: "6 months",
    enterprise: "Lifetime",
    tooltip: "How long you'll receive updates for your scripts"
  },
  {
    name: "Support Level",
    basic: "Standard",
    premium: "Priority",
    enterprise: "24/7 Priority",
    tooltip: "Support response time and availability"
  },
  {
    name: "Server Licenses",
    basic: "1",
    premium: "3",
    enterprise: "Unlimited",
    tooltip: "Number of servers you can use the scripts on"
  },
  {
    name: "Documentation",
    basic: true,
    premium: true,
    enterprise: true,
    tooltip: "Access to script documentation"
  },
  {
    name: "Discord Community",
    basic: false,
    premium: true,
    enterprise: true,
    tooltip: "Access to our exclusive Discord community"
  },
  {
    name: "Customization Guides",
    basic: false,
    premium: true,
    enterprise: true,
    tooltip: "Guides on how to customize scripts"
  },
  {
    name: "Custom Development",
    basic: false,
    premium: false,
    enterprise: true,
    tooltip: "Custom script development services"
  },
  {
    name: "Dedicated Support",
    basic: false,
    premium: false,
    enterprise: true,
    tooltip: "A dedicated support manager for your account"
  },
  {
    name: "White-label Option",
    basic: false,
    premium: false,
    enterprise: true,
    tooltip: "Remove ZRG branding from scripts"
  }
];

const PricingTables: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-dark-gray" id="pricing">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-play text-3xl md:text-4xl font-bold text-white mb-3">
            Pricing <span className="text-gold">Plans</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your server's needs. All plans include high-quality scripts and professional support.
          </p>
          
          {/* View Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-dark-gray rounded-full p-1 inline-flex">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'cards' 
                    ? 'bg-gold text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Simple View
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'comparison' 
                    ? 'bg-gold text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Comparison Table
              </button>
            </div>
          </div>
        </div>
        
        {viewMode === 'cards' ? (
          /* Pricing Cards */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier) => (
              <div 
                key={tier.id}
                className={`relative rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
                  tier.popular 
                    ? 'bg-gradient-to-br from-dark-gray to-black border border-gold shadow-lg shadow-gold/10 transform scale-105 md:scale-110 z-10' 
                    : 'bg-dark-gray'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gold text-black text-xs font-bold uppercase py-1 px-3 rounded-bl">
                      Most Popular
                    </div>
                  </div>
                )}
                
                {/* Tier Header */}
                <div className="p-6 text-center border-b border-gray-800">
                  <h3 className="font-play text-2xl font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-3xl font-play font-bold text-gold">
                      ${tier.price}
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <Link 
                    to={`/pricing/${tier.id}`}
                    className={`block w-full py-3 rounded-md font-play font-bold transition-colors duration-200 ${
                      tier.popular
                        ? 'bg-gold hover:bg-gold/90 text-black' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {tier.buttonText}
                  </Link>
                </div>
                
                {/* Features */}
                <div className="p-6">
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="text-gold mt-0.5 mr-3 flex-shrink-0" size={18} />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Comparison Table */
          <div className="relative overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full text-left">
              <thead className="bg-dark-gray border-b border-gray-800">
                <tr>
                  <th className="p-4 font-play text-lg text-white">Features</th>
                  {PRICING_TIERS.map((tier) => (
                    <th 
                      key={tier.id} 
                      className={`p-4 text-center ${
                        tier.popular ? 'bg-gold/10 relative' : ''
                      }`}
                    >
                      {tier.popular && (
                        <div className="absolute top-0 left-0 right-0 -mt-4">
                          <div className="bg-gold text-black text-xs font-bold uppercase py-1 px-3 rounded-b inline-block mx-auto">
                            Most Popular
                          </div>
                        </div>
                      )}
                      <div className="font-play text-xl font-bold text-white mb-1">
                        {tier.name}
                      </div>
                      <div className="flex items-baseline justify-center gap-1 mb-4">
                        <span className="text-2xl font-play font-bold text-gold">
                          ${tier.price}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <Link 
                        to={`/pricing/${tier.id}`}
                        className={`inline-block px-6 py-2 rounded-md font-play font-bold text-sm transition-colors duration-200 ${
                          tier.popular
                            ? 'bg-gold hover:bg-gold/90 text-black' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {tier.buttonText}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-black/50' : 'bg-dark-gray'
                    } hover:bg-gold/5 transition-colors duration-200`}
                  >
                    <td className="p-4 border-b border-gray-800">
                      <div className="flex items-center">
                        <span className="text-gray-300">{feature.name}</span>
                        <button
                          className="ml-2 text-gray-400 hover:text-gold transition-colors duration-200"
                          onMouseEnter={() => setActiveTooltip(feature.name)}
                          onMouseLeave={() => setActiveTooltip(null)}
                          aria-label={`Information about ${feature.name}`}
                        >
                          <Info size={16} />
                        </button>
                        
                        {/* Tooltip */}
                        {activeTooltip === feature.name && (
                          <div className="absolute z-10 w-64 p-3 bg-black border border-gray-800 rounded-md shadow-lg ml-6 text-sm text-gray-300">
                            {feature.tooltip}
                          </div>
                        )}
                      </div>
                    </td>
                    {PRICING_TIERS.map((tier) => {
                      const value = feature[tier.id.toLowerCase() as keyof typeof feature];
                      
                      return (
                        <td 
                          key={`${feature.name}-${tier.id}`} 
                          className={`p-4 text-center border-b border-gray-800 ${
                            tier.popular ? 'bg-gold/5' : ''
                          }`}
                        >
                          {typeof value === 'boolean' ? (
                            value ? (
                              <CheckCircle className="text-gold mx-auto" size={20} />
                            ) : (
                              <XCircle className="text-gray-500 mx-auto" size={20} />
                            )
                          ) : (
                            <span className="text-gray-300">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <h3 className="font-play text-xl text-white mb-4">
            Have questions about our plans?
          </h3>
          <Link 
            to="/faq" 
            className="inline-flex items-center text-gold hover:underline"
          >
            Check out our FAQ <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTables;