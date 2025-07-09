import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedScripts from '../components/home/FeaturedScripts';
import PricingTables from '../components/home/PricingTables';
import CustomerReviews from '../components/home/CustomerReviews';
import CheckoutProcess from '../components/home/CheckoutProcess';
import TrustedBy from '../components/home/TrustedBy';
import FAQ from '../components/home/FAQ';
import FeaturedBlogs from '../components/home/FeaturedBlogs';
import SocialProof from '../components/shared/SocialProof';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeaturedScripts />
      {/* <PricingTables /> */}
      <CustomerReviews />
      <CheckoutProcess />
      <FAQ />
      <FeaturedBlogs />
      <SocialProof />
    </>
  );
}

export default HomePage;