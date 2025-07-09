import React from 'react';
import { Sparkles } from 'lucide-react';
import { Script } from '../../types';
import { useRecommendations } from '../../hooks/useRecommendations';
import ScriptCard from '../scripts/ScriptCard';

interface RecommendationsProps {
  currentScript?: Script;
}

const Recommendations: React.FC<RecommendationsProps> = ({ currentScript }) => {
  const recommendations = useRecommendations(currentScript);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="text-gold" size={24} />
          <h2 className="font-play text-2xl font-bold text-white">
            {currentScript ? 'You Might Also Like' : 'Recommended Scripts'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              layout="grid"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recommendations;