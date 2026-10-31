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
        <div className="rounded-xl overflow-hidden bg-[#F4EFE6] aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B88847] mb-1">
            {product.categoryName} • {product.origin}
          </span>

          <h2 className="font-serif text-xl font-bold text-[#263620] mb-2 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mb-3">
            <Rating value={product.rating} count={product.reviewCount} />
            <span className="text-xs text-[#137333] font-medium flex items-center gap-1">
              <Check size={13} /> In Stock ({product.stockCount} available)
            </span>
          </div>

          <p className="font-bold text-xl text-[#263620] mb-3">
            {formatCurrency(price)}
          </p>

          <p className="text-xs text-[#5C5850] leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Variants Selector */}
          {product.variants.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#263620] uppercase tracking-wider mb-1.5">
                Size / Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedVariantId === v.id
                        ? 'border-[#B88847] bg-[#F8F3EA] text-[#263620] font-semibold'
                        : 'border-[#DDD6C8] hover:border-[#B88847] text-[#5C5850]'
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
            <span className="text-xs font-semibold text-[#263620] uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-[#DDD6C8] rounded-lg bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-[#5C5850] hover:text-[#263620] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 text-sm font-semibold text-[#263620]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                className="p-2 text-[#5C5850] hover:text-[#263620] cursor-pointer"
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
              className="text-center text-xs text-[#5C5850] hover:text-[#263620] underline mt-1 flex items-center justify-center gap-1"
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
