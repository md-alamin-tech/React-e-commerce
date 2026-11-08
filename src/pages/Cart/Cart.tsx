/**
 * Cart
 * Shopping cart page managing item quantities, coupon redemption,
 * free delivery progress, and cost breakdowns.
 *
 * Used in: /cart route
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatCurrency, APP_CONFIG } from '../../utils/constants';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';

export default function Cart() {
  useDocumentTitle('Shopping Cart - EMBER');
  const navigate = useNavigate();

  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    discount,
    discountPercent,
    couponCode,
    applyCoupon,
    removeCoupon,
    shipping,
    isFreeShipping,
    freeShippingRemaining,
    tax,
    total,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream py-20 px-4">
        <div className="max-w-md mx-auto text-center bg-white p-10 rounded-2xl border border-black/10 shadow-xs">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream flex items-center justify-center text-brand">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink mb-2">
            Your Basket is Empty
          </h2>
          <p className="text-xs sm:text-sm text-ink/60 mb-6">
            Looks like you haven't added any Balkan or European delicacies yet. Explore our pantry staples, bakery, and cheeses!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            <span>Explore Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingProgress = Math.min(
    100,
    (subtotal / APP_CONFIG.shipping.freeShippingThreshold) * 100
  );

  return (
    <div className="bg-cream py-10 sm:py-14">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-ink/60 mt-1">
              Review items in your basket ({totalItems} item{totalItems === 1 ? '' : 's'})
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-ink/60 hover:text-brand underline cursor-pointer"
          >
            Clear Cart
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/10 mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
            <span className="flex items-center gap-1.5">
              <Truck size={15} className="text-brand" />
              {isFreeShipping ? (
                <span className="text-leaf font-bold">
                  Congratulations! You have unlocked FREE shipping.
                </span>
              ) : (
                <span>
                  Add {formatCurrency(freeShippingRemaining)} more to get FREE standard delivery!
                </span>
              )}
            </span>
            <span className="text-ink/60">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#EFEBE2] h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-black/10 divide-y divide-black/10 overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl bg-cream shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-serif text-sm sm:text-base font-semibold text-ink hover:text-brand transition-colors block line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <p className="text-xs text-ink/60 mt-0.5">
                          Size: {item.variantName}
                        </p>
                      )}
                      <p className="text-xs font-bold text-ink mt-1 sm:hidden">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Unit Price (Desktop) */}
                    <span className="hidden sm:inline text-xs font-bold text-ink">
                      {formatCurrency(item.price)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-black/10 rounded-full bg-cream px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-ink/75 hover:text-brand cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-ink/75 hover:text-brand cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="font-bold text-sm text-ink w-18 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </span>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-ink/60 hover:text-brand transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/75 hover:text-brand"
              >
                <ArrowLeft size={14} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary & Coupon */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs sticky top-28 text-left">
              <h3 className="font-serif text-lg font-bold text-ink pb-3 border-b border-black/10 mb-5">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div className="mb-6">
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-leaf/10 border border-leaf/30">
                    <div className="flex items-center gap-2 text-xs text-leaf">
                      <Tag size={14} className="text-brand" />
                      <span>
                        Coupon <strong>{couponCode}</strong> ({discountPercent}% off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-brand hover:underline cursor-pointer font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon code (e.g. WELCOME10)"
                      className="flex-1 bg-cream border border-black/10 rounded-2xl px-3 py-2 text-xs text-ink focus:outline-none focus:border-brand"
                    />
                    <Button type="submit" variant="dark" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
              </div>

              {/* Cost Lines */}
              <div className="space-y-3 text-xs text-ink/75 pb-5 border-b border-black/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-leaf font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-leaf font-semibold uppercase">Free</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (CT 6.35%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="font-serif text-base font-bold text-ink">Total</span>
                <span className="font-serif text-2xl font-bold text-ink">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Checkout Action */}
              <Button
                variant="primary"
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </Button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-ink/60">
                <ShieldCheck size={14} className="text-brand" />
                <span>Secure SSL checkout • 100% satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
