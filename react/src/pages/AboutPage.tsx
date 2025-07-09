import React, { useEffect, useState } from 'react';
import { Shield, Users, Code, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  short_description: string;
}

const AboutPage: React.FC = () => {
  const [stats, setStats] = useState({ premiumScripts: 0, happyCustomers: 0 });
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch stats
    fetch('/api/stats/')
      .then((response) => response.json())
      .then((data) => {
        setStats({
          premiumScripts: data.active_users || 0,
          happyCustomers: data.premium_scripts || 0,
        });
      })
      .catch((error) => console.error('Failed to fetch stats:', error));

    // Fetch team members
    fetch('/api/team-members/')
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error('Failed to fetch team members:', error));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-gray-400 hover:text-gold">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gold">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-play text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gold">ZRG Gaming</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're passionate about creating high-quality FiveM scripts that enhance your gaming experience.
            Our team of dedicated developers works tirelessly to bring you the best solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="bg-dark-gray rounded-lg p-6 text-center">
            <Shield className="text-gold mx-auto mb-4" size={32} />
            <div className="font-play text-3xl font-bold text-white mb-2">{stats.premiumScripts}+</div>
            <p className="text-gray-400">Premium Scripts</p>
          </div>
          <div className="bg-dark-gray rounded-lg p-6 text-center">
            <Users className="text-gold mx-auto mb-4" size={32} />
            <div className="font-play text-3xl font-bold text-white mb-2">{stats.happyCustomers}+</div>
            <p className="text-gray-400">Happy Customers</p>
          </div>
          <div className="bg-dark-gray rounded-lg p-6 text-center">
            <Code className="text-gold mx-auto mb-4" size={32} />
            <div className="font-play text-3xl font-bold text-white mb-2">100%</div>
            <p className="text-gray-400">Server Compatibility</p>
          </div>
          <div className="bg-dark-gray rounded-lg p-6 text-center">
            <Award className="text-gold mx-auto mb-4" size={32} />
            <div className="font-play text-3xl font-bold text-white mb-2">24/7</div>
            <p className="text-gray-400">Customer Support</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-dark-gray rounded-lg p-8">
            <h2 className="font-play text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400">
              To provide the highest quality FiveM scripts that enhance roleplay experiences and server functionality.
              We strive to create innovative solutions that help server owners build thriving communities.
            </p>
          </div>
          <div className="bg-dark-gray rounded-lg p-8">
            <h2 className="font-play text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-400">
              To become the leading provider of FiveM scripts worldwide, setting industry standards for quality,
              innovation, and customer support in the gaming community.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="font-play text-3xl font-bold text-white text-center mb-8">
            Meet Our <span className="text-gold">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-dark-gray rounded-lg overflow-hidden">
                <img
                  src={member.image || 'https://via.placeholder.com/150'}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-play text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-gold mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.short_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-play text-2xl font-bold text-white mb-4">
            Ready to enhance your server?
          </h2>
          <Link
            to="/scripts"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-bold px-8 py-3 rounded transition-colors duration-200"
          >
            Browse Our Scripts <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;