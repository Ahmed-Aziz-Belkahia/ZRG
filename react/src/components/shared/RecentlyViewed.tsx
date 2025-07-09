import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, X } from 'lucide-react';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import ScriptCard from '../scripts/ScriptCard';
import { Script } from '../../types';

const RecentlyViewed: React.FC = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Return null if no recently viewed items
  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  // Filter out any invalid items
  const validScripts = recentlyViewed.filter((script): script is Script => 
    Boolean(script && script.id && script.title)
  );

  if (validScripts.length === 0) return null;

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="text-gold" size={24} />
            <h2 className="font-play text-2xl font-bold text-white">
              Recently Viewed
            </h2>
          </div>
          <button
            onClick={clearRecentlyViewed}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={18} />
            Clear History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {validScripts.slice(0, 4).map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              layout="grid"
            />
          ))}
        </div>

        {validScripts.length > 4 && (
          <div className="text-center mt-8">
            <Link
              to="/scripts"
              className="text-gold hover:underline"
            >
              View All Recently Viewed Scripts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyViewed;