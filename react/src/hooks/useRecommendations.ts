import { useState, useEffect } from 'react';
import { Script } from '../types';

export const useRecommendations = (currentScript?: Script) => {
  const [recommendations, setRecommendations] = useState<Script[]>([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await fetch('/api/scripts/');
        const scripts: Script[] = await response.json();

        if (currentScript && currentScript.categories) {
          // Get recommendations based on current script's categories
          const similar = scripts.filter((script: Script) => 
            script.id !== currentScript.id && 
            script.categories?.some((cat: string) => 
              currentScript.categories.includes(cat)
            )
          );

          // Sort by rating and limit to 3 items
          const sorted = similar
            .sort((a: Script, b: Script) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);
          setRecommendations(sorted);
        } else {
          // Get top rated scripts if no current script
          const topRated = [...scripts]
            .sort((a: Script, b: Script) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);
          setRecommendations(topRated);
        }
      } catch (error) {
        console.error('Error fetching scripts:', error);
        setRecommendations([]);
      }
    };

    fetchScripts();
  }, [currentScript]);

  return recommendations;
};