/**
 * ProductDetails
 * Comprehensive product profile page with image switcher, variant picker,
 * quantity selector, ingredients, verified reviews, and related products.
 *
 * Used in: /product/:slug route
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, Product, Review } from '../../data/products';
import { ImageGallery } from './components/ImageGallery';
import { ReviewSection } from './components/ReviewSection';
import { ProductCard } from '../../components/product/ProductCard';
import { Button } from '../../components/common/Button';
import { Rating } from '../../components/common/Rating';
import { Badge } from '../../components/common/Badge';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatCurrency } from '../../utils/constants';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Globe2,
  Package,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  useDocumentTitle(`${product.name} - European Groceries`, product.shortDescription);

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(product.reviews);

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const isWishlisted = isInWishlist(product.id);

  // Related products from same category or featured
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentVariant?.id);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="bg-cream py-8 sm:py-12">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-ink/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link to="/shop" className="hover:text-brand transition-colors">
            Our Products
          </Link>
          <ChevronRight size={13} />
          <Link
            to={`/shop?category=${product.category}`}
            className="hover:text-brand transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight size={13} />
          <span className="text-ink font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Back Button for mobile */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/75 hover:text-brand mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to catalog</span>
        </button>

        {/* Main Product Section: Gallery & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Right Column: Info & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs text-ink/75">
                <Globe2 size={14} className="text-brand" />
                <span>Origin: {product.origin}</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-black/10">
              <Rating value={product.rating} count={reviews.length} size="md" />
              <div className="h-4 w-[1px] bg-[#EFEBE2]" />
              <Badge variant="success">
                <span className="flex items-center gap-1">
                  <Check size={12} /> In Stock ({product.stockCount} left)
                </span>
              </Badge>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-ink">
                {formatCurrency(price)}
              </span>
              {product.originalPrice && product.originalPrice > price && (
                <span className="text-base text-ink/60 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-ink/60">/ {product.weight}</span>
            </div>

            <p className="text-sm text-ink/75 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Variants Selector */}
            {product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  Select Size / Packaging:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`text-xs px-4 py-2 rounded-2xl border transition-all cursor-pointer ${
                        selectedVariantId === v.id
                          ? 'border-brand bg-[#EFEBE2] text-ink font-bold shadow-xs'
                          : 'border-black/10 hover:border-brand bg-white text-ink/75'
                      }`}
                    >
                      {v.name} • {formatCurrency(v.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 mb-8">
              <div className="flex items-center border border-black/10 rounded-full bg-white px-3 py-1.5 self-start">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1.5 text-ink/75 hover:text-brand cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-bold text-sm text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="p-1.5 text-ink/75 hover:text-brand cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleAddToCart}
                className="flex-1 py-3.5"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart • {formatCurrency(price * quantity)}</span>
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
                  isWishlisted
                    ? 'border-brand/30 bg-brand/10 text-brand'
                    : 'border-black/10 bg-white text-ink hover:border-brand'
                }`}
                title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} className={isWishlisted ? 'fill-brand' : ''} />
              </button>
            </div>

            {/* Quality & Delivery Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-black/10 text-xs text-ink/75">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-brand" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand" />
                <span>100% Authentic Balkan Import</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Origin Section */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-black/10 mb-16 text-left">
            <h3 className="font-serif text-xl font-bold text-ink mb-4">
              Ingredients & Authenticity
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-cream border border-black/10 text-xs text-ink font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verified Reviews Section */}
        <div className="mb-16">
          <ReviewSection reviews={reviews} onAddReview={handleAddReview} />
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl font-bold text-ink mb-6 text-left">
              You May Also Enjoy
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
