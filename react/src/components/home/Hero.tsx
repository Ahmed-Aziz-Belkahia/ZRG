import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../shared/AnimatedCounter';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // State to store stats data
  const [stats, setStats] = useState({ active_users: 0, premium_scripts: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch stats data from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats'); // Fetch data from the endpoint
        if (response.ok) {
          const data = await response.json();
          setStats(data); // Update state with fetched data
        } else {
          console.error('Failed to fetch stats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          height: '120%',
          top: '-10%',
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black z-10"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-play text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block">Premium </span>
            <span className="text-gold inline-block animate-pulse">FiveM Scripts</span>
            <span className="inline-block"> for</span>
            <br />
            <span className="inline-block">Extraordinary</span>
            <span className="text-gold inline-block"> Gaming Experience</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elevate your GTA V server with our high-performance, professionally crafted FiveM scripts. From economy systems to roleplay essentials.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/scripts"
              className="bg-gold hover:bg-gold/90 text-black font-play font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Browse Scripts <ArrowRight size={18} />
            </Link>
            <Link
              to="/pricing"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/20 font-play font-bold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-white/10 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <Users className="text-gold mb-4" size={32} />
              <div className="font-play text-3xl font-bold text-white mb-2">
                <AnimatedCounter value={stats.active_users} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-400">Active Users</p>
            </div>

            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-white/10 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <Award className="text-gold mb-4" size={32} />
              <div className="font-play text-3xl font-bold text-white mb-2">
                <AnimatedCounter value={stats.premium_scripts} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-400">Premium Scripts</p>
            </div>

            <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg border border-white/10 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <ShieldCheck className="text-gold mb-4" size={32} />
              <div className="font-play text-3xl font-bold text-white mb-2">
                <AnimatedCounter value={100} duration={2000} suffix="%" />
              </div>
              <p className="text-gray-400">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default Hero;