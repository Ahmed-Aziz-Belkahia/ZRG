import React, { useState, useEffect } from 'react';
import { ShoppingBag, UserCheck, Award } from 'lucide-react';

interface Notification {
  id: number;
  type: 'purchase' | 'join' | 'review';
  content: string;
  time: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: 'purchase',
    content: 'John D. just purchased Advanced Roleplay Framework',
    time: '2 minutes ago'
  },
  {
    id: 2,
    type: 'join',
    content: 'Sarah W. just joined our community',
    time: '5 minutes ago'
  },
  {
    id: 3,
    type: 'review',
    content: 'Michael T. gave Economy Plus a 5-star review',
    time: '10 minutes ago'
  },
  {
    id: 4,
    type: 'purchase',
    content: 'Emma R. just purchased Criminal Enterprise',
    time: '15 minutes ago'
  },
  {
    id: 5,
    type: 'join',
    content: 'Alex J. just joined our community',
    time: '20 minutes ago'
  },
  {
    id: 6,
    type: 'review',
    content: 'David K. gave Vehicle Showroom a 5-star review',
    time: '25 minutes ago'
  }
];

const SocialProof: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Initialize with a random notification
    const randomIndex = Math.floor(Math.random() * NOTIFICATIONS.length);
    setActiveNotification(NOTIFICATIONS[randomIndex]);
    
    // Show the first notification after a short delay
    setTimeout(() => {
      setIsVisible(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 3000);
    
    // Set up interval to rotate notifications
    const interval = setInterval(() => {
      setIsVisible(false);
      
      // After hiding, change the notification and show again
      setTimeout(() => {
        const nextIndex = Math.floor(Math.random() * NOTIFICATIONS.length);
        setActiveNotification(NOTIFICATIONS[nextIndex]);
        setIsVisible(true);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }, 500);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!activeNotification) return null;
  
  const getIcon = () => {
    switch (activeNotification.type) {
      case 'purchase':
        return <ShoppingBag className="text-green-400" size={18} />;
      case 'join':
        return <UserCheck className="text-blue-400" size={18} />;
      case 'review':
        return <Award className="text-gold" size={18} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed bottom-6 left-6 z-40 max-w-xs bg-dark-gray border border-gray-800 rounded-lg shadow-lg transform transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <div className="p-4 flex items-start">
        <div className="mr-3 mt-1">{getIcon()}</div>
        <div>
          <p className="text-white text-sm">{activeNotification.content}</p>
          <p className="text-gray-400 text-xs mt-1">{activeNotification.time}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 text-gray-400 hover:text-white"
          aria-label="Close notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SocialProof;