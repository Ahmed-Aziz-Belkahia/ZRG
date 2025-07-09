import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          xmlns="http://www.w3.org/2000/svg"
          fill={hoverRating >= star || rating >= star ? "#FFD700" : "#D3D3D3"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.26a1 1 0 00.95.69h6.573c.969 0 1.371 1.24.588 1.81l-5.32 3.872a1 1 0 00-.364 1.118l2.036 6.26c.3.921-.755 1.688-1.54 1.118l-5.32-3.872a1 1 0 00-1.176 0l-5.32 3.872c-.784.57-1.84-.197-1.54-1.118l2.036-6.26a1 1 0 00-.364-1.118L2.49 11.687c-.783-.57-.381-1.81.588-1.81h6.573a1 1 0 00.95-.69l2.036-6.26z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;