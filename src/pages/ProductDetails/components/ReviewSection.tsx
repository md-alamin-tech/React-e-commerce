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
    <div className="pt-10 border-t border-black/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink">
            Customer Reviews ({reviews.length})
          </h3>
          <p className="text-xs text-ink/60 mt-0.5">
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
          className="bg-white p-6 rounded-2xl border border-black/10 mb-8 shadow-xs"
        >
          <h4 className="font-serif text-base font-bold text-ink mb-4">
            Share Your Experience
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/75 mb-1.5">
                Rating
              </label>
              <Rating value={rating} interactive onChange={(val) => setRating(val)} size="md" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/75 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Besnik M."
                required
                className="w-full bg-cream border border-black/10 rounded-2xl px-3.5 py-2 text-sm text-ink focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink/75 mb-1.5">
                Review Comments
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="What did you think of the flavor, texture, and authenticity?"
                required
                className="w-full bg-cream border border-black/10 rounded-2xl px-3.5 py-2 text-sm text-ink focus:outline-none focus:border-brand"
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
        <p className="text-xs text-ink/60 py-4 ">
          No reviews yet. Be the first to taste and share your review!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-2xl border border-black/10 text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-ink">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-leaf font-semibold bg-leaf/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} /> Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-ink/60">
                  {formatDate(rev.date)}
                </span>
              </div>
              <Rating value={rev.rating} size="sm" className="mb-2" />
              <p className="text-xs text-ink/75 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
