/**
 * Rating
 * Star rating component supporting visual presentation and optional interactive rating selection.
 *
 * @param {number} value - current star rating (0 to 5)
 * @param {number} count - optional review count to display
 * @param {boolean} interactive - allow user to click and rate
 * @param {Function} onChange - called when user changes rating
 *
 * Used in: ProductCard, ProductDetails, ReviewSection
 */

import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (val: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'sm',
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const starSize = starSizes[size];
  const activeRating = hoverValue !== null ? hoverValue : value;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-[#B88847]">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= activeRating;
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(star)}
              onMouseEnter={() => interactive && setHoverValue(star)}
              onMouseLeave={() => interactive && setHoverValue(null)}
              className={`p-0.5 ${
                interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
              }`}
            >
              <Star
                size={starSize}
                className={
                  filled
                    ? 'fill-[#B88847] text-[#B88847]'
                    : 'text-[#DDD6C8] fill-transparent'
                }
              />
            </button>
          );
        })}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-[#7C776E] font-medium">({count})</span>
      )}
    </div>
  );
};
