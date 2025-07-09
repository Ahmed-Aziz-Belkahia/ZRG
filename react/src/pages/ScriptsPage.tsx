import React, { useState, useEffect } from 'react';
import { LayoutGrid, List, Search, X } from 'lucide-react';
import ScriptCard from '../components/scripts/ScriptCard';
import { Script } from '../types';

const ScriptsPage: React.FC = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [activeVideo, setActiveVideo] = useState<Script | null>(null);
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await fetch('/api/scripts/');
        const data = await response.json();
        setScripts(data);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      }
    };

    fetchScripts();
  }, []);

  const categories = ['all', ...new Set(scripts.flatMap(script => script.category).filter(Boolean))];

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         script.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || script.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="font-play text-4xl font-bold text-white mb-2">
              All <span className="text-gold">Scripts</span>
            </h1>
            <p className="text-gray-400">
              Browse our collection of premium FiveM scripts
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded ${
                layout === 'grid' ? 'text-gold bg-gold/10' : 'text-gray-400'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded ${
                layout === 'list' ? 'text-gold bg-gold/10' : 'text-gray-400'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-dark-gray rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black pl-10 pr-4 py-2 rounded border border-gray-800 text-white focus:outline-none focus:border-gold"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-black text-white px-4 py-2 rounded border border-gray-800 focus:outline-none focus:border-gold"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black text-white px-4 py-2 rounded border border-gray-800 focus:outline-none focus:border-gold"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scripts Grid/List */}
        <div className={`grid gap-6 ${
          layout === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredScripts.map((script) => (
            <ScriptCard
              key={script.slug}
              script={script}
              layout={layout}
              onQuickView={setActiveVideo}
              link={`/script/${script.slug}`}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
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
                  onClick={() => setActiveVideo(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="relative aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={activeVideo.demoVideo?.replace('watch?v=', 'embed/')}
                  title={`${activeVideo.title} preview`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptsPage;