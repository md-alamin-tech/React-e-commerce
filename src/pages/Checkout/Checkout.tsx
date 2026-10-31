/**
 * Checkout
 * Checkout page with validated shipping form, saved address selector,
 * payment method selection (Credit Card / Cash on Delivery), and order submission.
 *
 * Used in: /checkout route
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth, Address } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatCurrency } from '../../utils/constants';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  ChevronRight,
  Lock,
} from 'lucide-react';

export default function Checkout() {
  useDocumentTitle('Checkout - Belké Market');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, createOrder } = useAuth();
  const { items, subtotal, discount, shipping, tax, total, couponCode, clearCart } =
    useCart();

  // If cart is empty, redirect
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  // Form State
  const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [formData, setFormData] = useState({
    name: defaultAddress?.name || user?.name || '',
    email: user?.email || '',
    phone: defaultAddress?.phone || user?.phone || '',
    street: defaultAddress?.street || '',
    apartment: defaultAddress?.apartment || '',
    city: defaultAddress?.city || 'Southington',
    state: defaultAddress?.state || 'CT',
    zipCode: defaultAddress?.zipCode || '06489',
    country: 'United States',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardData, setCardData] = useState({
    number: '4111 •••• •••• 4242',
    name: user?.name || 'Elena Kastrati',
    expiry: '12/28',
    cvc: '382',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the highlighted fields in your shipping address', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const shippingAddress: Address = {
        id: 'addr-' + Date.now(),
        ...formData,
      };

      const orderItems = items.map((i) => ({
        id: i.id,
        productId: i.productId,
        productName: i.name,
        variantName: i.variantName,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      }));

      const newOrder = createOrder({
        items: orderItems,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        status: 'Processing',
        shippingAddress,
        paymentMethod,
        couponCode,
      });

      clearCart();
      setIsSubmitting(false);
      showToast('Order placed successfully! Thank you.', 'success');
      navigate('/order-success', { state: { order: newOrder } });
    }, 900);
  };

  return (
    <div className="bg-[#0B0710] py-10 sm:py-14">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#B0A99C] mb-8">
          <Link to="/cart" className="hover:text-[#D4AF37]">
            Cart
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#F5ECD7] font-semibold">Checkout</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#F5ECD7] mb-8 text-left">
          Checkout & Delivery
        </h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Shipping Address Card */}
              <div className="bg-[#140C1F] p-6 sm:p-8 rounded-3xl border border-[#2E2045] shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#2E2045] mb-6">
                  <h2 className="font-serif text-xl font-bold text-[#F5ECD7]">
                    1. Shipping Address
                  </h2>
                  <span className="text-xs text-[#B0A99C]">Standard Delivery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input
                      label="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      error={errors.phone}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      error={errors.street}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Input
                      label="Apartment, suite, unit (optional)"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    />
                  </div>

                  <div>
                    <Input
                      label="City"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      error={errors.city}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="State"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      error={errors.state}
                    />
                    <Input
                      label="ZIP Code"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      error={errors.zipCode}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-[#140C1F] p-6 sm:p-8 rounded-3xl border border-[#2E2045] shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#2E2045] mb-6">
                  <h2 className="font-serif text-xl font-bold text-[#F5ECD7]">
                    2. Payment Method
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-emerald-300 font-semibold">
                    <Lock size={12} />
                    <span>256-bit Encrypted</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Credit Card Option */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#D4AF37] bg-[#170F25]'
                        : 'border-[#34254D] hover:border-[#D4AF37]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#D4AF37] mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F5ECD7] flex items-center gap-2">
                          <CreditCard size={17} className="text-[#D4AF37]" />
                          Credit / Debit Card
                        </span>
                        <span className="text-[11px] text-[#B0A99C]">Visa, MC, Amex</span>
                      </div>
                      <p className="text-xs text-[#B0A99C] mt-1">
                        Pay securely with your credit or debit card.
                      </p>

                      {/* Card Details Inputs (mock interactive) */}
                      {paymentMethod === 'card' && (
                        <div className="mt-4 pt-4 border-t border-[#2E2045] space-y-3">
                          <Input
                            label="Card Number"
                            value={cardData.number}
                            onChange={(e) =>
                              setCardData({ ...cardData, number: e.target.value })
                            }
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              label="Expires (MM/YY)"
                              value={cardData.expiry}
                              onChange={(e) =>
                                setCardData({ ...cardData, expiry: e.target.value })
                              }
                            />
                            <Input
                              label="CVC / Security Code"
                              value={cardData.cvc}
                              onChange={(e) =>
                                setCardData({ ...cardData, cvc: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cash On Delivery Option */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#D4AF37] bg-[#170F25]'
                        : 'border-[#34254D] hover:border-[#D4AF37]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#D4AF37] mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F5ECD7] flex items-center gap-2">
                          <Banknote size={17} className="text-[#D4AF37]" />
                          Cash on Delivery / In-Store Pickup
                        </span>
                      </div>
                      <p className="text-xs text-[#B0A99C] mt-1">
                        Pay when your package arrives or when you pick up at our Southington location.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#140C1F] p-6 sm:p-7 rounded-3xl border border-[#2E2045] shadow-xs sticky top-28 text-left">
                <h3 className="font-serif text-lg font-bold text-[#F5ECD7] pb-3 border-b border-[#2E2045] mb-4">
                  Order Review ({items.length} items)
                </h3>

                {/* Items preview list */}
                <div className="max-h-60 overflow-y-auto divide-y divide-[#241838] mb-5 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-[#0B0710] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#F5ECD7] truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#B0A99C]">
                          Qty: {item.quantity} {item.variantName ? `• ${item.variantName}` : ''}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#F5ECD7]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Summary */}
                <div className="space-y-2.5 text-xs text-[#D0C9BA] py-4 border-y border-[#2E2045] mb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#F5ECD7]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-300 font-semibold">
                      <span>Discount ({couponCode})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-300 font-semibold">FREE</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (CT)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-serif text-base font-bold text-[#F5ECD7]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#F5ECD7]">
                    {formatCurrency(total)}
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  <span>Place Your Order</span>
                  <ArrowRight size={16} />
                </Button>

                <p className="text-center text-[11px] text-[#B0A99C] mt-3">
                  By clicking Place Order, you agree to Belké Market's Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
