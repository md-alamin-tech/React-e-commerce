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
  useDocumentTitle('Shopping Cart - Belké Market');
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
      <div className="bg-[#0B0710] py-20 px-4">
        <div className="max-w-md mx-auto text-center bg-[#140C1F] p-10 rounded-3xl border border-[#2E2045] shadow-xs">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0B0710] flex items-center justify-center text-[#D4AF37]">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#F5ECD7] mb-2">
            Your Basket is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#B0A99C] mb-6">
            Looks like you haven't added any Balkan or European delicacies yet. Explore our pantry staples, bakery, and cheeses!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors h-12 px-8 rounded-full text-xs"
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
    <div className="bg-[#0B0710] py-10 sm:py-14">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#F5ECD7]">
              Your Shopping Cart
            </h1>
            <p className="text-xs text-[#B0A99C] mt-1">
              Review items in your basket ({totalItems} item{totalItems === 1 ? '' : 's'})
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#B0A99C] hover:text-[#F87171] underline cursor-pointer"
          >
            Clear Cart
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#140C1F] rounded-2xl p-4 sm:p-5 border border-[#2E2045] mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-[#F5ECD7] mb-2">
            <span className="flex items-center gap-1.5">
              <Truck size={15} className="text-[#D4AF37]" />
              {isFreeShipping ? (
                <span className="text-emerald-300 font-bold">
                  Congratulations! You have unlocked FREE shipping.
                </span>
              ) : (
                <span>
                  Add {formatCurrency(freeShippingRemaining)} more to get FREE standard delivery!
                </span>
              )}
            </span>
            <span className="text-[#B0A99C]">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#1E1430] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#D4AF37] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#140C1F] rounded-3xl border border-[#2E2045] divide-y divide-[#241838] overflow-hidden">
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
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-[#0B0710] shrink-0"
                    />
                    <div className="text-left min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-serif text-sm sm:text-base font-semibold text-[#F5ECD7] hover:text-[#D4AF37] transition-colors block line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <p className="text-xs text-[#B0A99C] mt-0.5">
                          Size: {item.variantName}
                        </p>
                      )}
                      <p className="text-xs font-bold text-[#F5ECD7] mt-1 sm:hidden">
                        {formatCurrency(item.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Unit Price (Desktop) */}
                    <span className="hidden sm:inline text-xs font-bold text-[#F5ECD7]">
                      {formatCurrency(item.price)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#34254D] rounded-full bg-[#0B0710] px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#D0C9BA] hover:text-[#D4AF37] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#F5ECD7]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#D0C9BA] hover:text-[#D4AF37] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="font-bold text-sm text-[#F5ECD7] w-18 text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </span>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#8A847A] hover:text-[#F87171] transition-colors cursor-pointer"
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D0C9BA] hover:text-[#D4AF37]"
              >
                <ArrowLeft size={14} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary & Coupon */}
          <div className="lg:col-span-4">
            <div className="bg-[#140C1F] rounded-3xl p-6 sm:p-7 border border-[#2E2045] shadow-xs sticky top-28 text-left">
              <h3 className="font-serif text-lg font-bold text-[#F5ECD7] pb-3 border-b border-[#2E2045] mb-5">
                Order Summary
              </h3>

              {/* Coupon Form */}
              <div className="mb-6">
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800">
                    <div className="flex items-center gap-2 text-xs text-emerald-300">
                      <Tag size={14} className="text-[#D4AF37]" />
                      <span>
                        Coupon <strong>{couponCode}</strong> ({discountPercent}% off)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-rose-400 hover:underline cursor-pointer font-medium"
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
                      className="flex-1 bg-[#0B0710] border border-[#34254D] rounded-xl px-3 py-2 text-xs text-[#F5ECD7] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <Button type="submit" variant="dark" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
              </div>

              {/* Cost Lines */}
              <div className="space-y-3 text-xs text-[#D0C9BA] pb-5 border-b border-[#2E2045]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#F5ECD7]">{formatCurrency(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-300 font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-300 font-semibold uppercase">Free</span>
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
                <span className="font-serif text-base font-bold text-[#F5ECD7]">Total</span>
                <span className="font-serif text-2xl font-bold text-[#F5ECD7]">
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

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#B0A99C]">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>Secure SSL checkout • 100% satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
