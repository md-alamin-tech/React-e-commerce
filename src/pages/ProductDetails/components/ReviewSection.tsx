/**
 * ReviewSection
 * Displays verified customer reviews and an interactive rating submission form.
 *
 * @param {Review[]} reviews - list of product reviews
 * @param {Function} onAddReview - callback when a new review is submitted
 *
 * Used in: ProductDetails page
 */

import React, { useState } from 'react';
import { Review } from '../../../data/products';
import { Rating } from '../../../components/common/Rating';
import { Button } from '../../../components/common/Button';
import { formatDate } from '../../../utils/constants';
import { CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, onAddReview }) => {
  const { showToast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      showToast('Please provide your name and review comment', 'warning');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Date.now().toString(),
      author: author.trim(),
      rating,
      date: new Date().toISOString(),
      comment: comment.trim(),
      verified: true,
    };

    onAddReview(newRev);
    showToast('Thank you! Your review has been published.', 'success');
    setAuthor('');
    setComment('');
    setRating(5);
    setFormOpen(false);
  };

  return (
    <div className="pt-10 border-t border-[#2E2045]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#F5ECD7]">
            Customer Reviews ({reviews.length})
          </h3>
          <p className="text-xs text-[#B0A99C] mt-0.5">
            Real feedback from our patrons and home cooks.
          </p>
        </div>

        {!formOpen && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFormOpen(true)}
            className="self-start sm:self-auto"
          >
            <MessageSquarePlus size={15} />
            <span>Write a Review</span>
          </Button>
        )}
      </div>

      {/* Review Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#140C1F] p-6 rounded-[10px] border border-[#2E2045] mb-8 shadow-xs"
        >
          <h4 className="font-serif text-base font-bold text-[#F5ECD7] mb-4">
            Share Your Experience
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCD5C6] mb-1.5">
                Rating
              </label>
              <Rating value={rating} interactive onChange={(val) => setRating(val)} size="md" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCD5C6] mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Besnik M."
                required
                className="w-full bg-[#0B0710] border border-[#34254D] rounded-[10px] px-3.5 py-2 text-sm text-[#F5ECD7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCD5C6] mb-1.5">
                Review Comments
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="What did you think of the flavor, texture, and authenticity?"
                required
                className="w-full bg-[#0B0710] border border-[#34254D] rounded-[10px] px-3.5 py-2 text-sm text-[#F5ECD7] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" size="sm">
                Submit Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-xs text-[#B0A99C] py-4 ">
          No reviews yet. Be the first to taste and share your review!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#140C1F] p-5 rounded-[10px] border border-[#2A1D3F] text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#F5ECD7]">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-300 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} /> Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#B0A99C]">
                  {formatDate(rev.date)}
                </span>
              </div>
              <Rating value={rev.rating} size="sm" className="mb-2" />
              <p className="text-xs text-[#D0C9BA] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
