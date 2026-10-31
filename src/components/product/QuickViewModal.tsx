/**
 * QuickViewModal
 * Modal for quickly inspecting product images, origin, ingredients,
 * selecting package size/variant, and adding directly to cart.
 *
 * @param {Product | null} product - active product to inspect
 * @param {Function} onClose - modal dismiss callback
 *
 * Used in: Shop page, Featured Products
 */

import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Rating } from '../common/Rating';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/constants';
import { Check, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;

  const handleAdd = () => {
    addToCart(product, quantity, currentVariant?.id);
    onClose();
  };

  return (
    <Modal isOpen={!!product} onClose={onClose} maxWidth="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden bg-[#1B1229] aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col text-left">

          <h2 className="font-serif text-xl font-bold text-[#F5ECD7] mb-2 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mb-3">
            <Rating value={product.rating} count={product.reviewCount} />
            <span className="text-xs text-[#6EE7A0] font-medium flex items-center gap-1">
              <Check size={13} /> In Stock ({product.stockCount} available)
            </span>
          </div>

          <p className="font-bold text-xl text-[#F5ECD7] mb-3">
            {formatCurrency(price)}
          </p>

          <p className="text-xs text-[#D0C9BA] leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#F5ECD7] uppercase tracking-wider mb-1.5">
                Size / Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedVariantId === v.id
                        ? 'border-[#D4AF37] bg-[#170F25] text-[#F5ECD7] font-semibold'
                        : 'border-[#34254D] hover:border-[#D4AF37] text-[#D0C9BA]'
                    }`}
                  >
                    {v.name} - {formatCurrency(v.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold text-[#F5ECD7] uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-[#34254D] rounded-lg bg-[#140C1F]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-[#D0C9BA] hover:text-[#D4AF37] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 text-sm font-semibold text-[#F5ECD7]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                className="p-2 text-[#D0C9BA] hover:text-[#D4AF37] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-auto">
            <Button variant="primary" onClick={handleAdd} className="w-full">
              Add to Cart • {formatCurrency(price * quantity)}
            </Button>
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="text-center text-xs text-[#D0C9BA] hover:text-[#D4AF37] underline mt-1 flex items-center justify-center gap-1"
            >
              <span>View full product details & reviews</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
