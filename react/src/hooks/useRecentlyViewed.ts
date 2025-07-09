import { useState, useEffect } from 'react';
import { Script } from '../types';

const MAX_RECENT_ITEMS = 10;
const STORAGE_KEY = 'recently-viewed-scripts';

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Script[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all items have an ID
        const validItems = parsed.filter((item: Script) => item && item.id);
        setRecentlyViewed(validItems);
      }
    } catch (error) {
      console.error('Error loading recently viewed items:', error);
      // Clear invalid data
      localStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    }
  }, []);

  const addToRecentlyViewed = (script: Script) => {
    if (!script || !script.id) {
      console.warn('Attempted to add invalid script to recently viewed');
      return;
    }

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== script.id);
      const updated = [script, ...filtered].slice(0, MAX_RECENT_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving recently viewed items:', error);
      }
      return updated;
    });
  };

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing recently viewed items:', error);
    }
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed
  };
};