/**
 * OrderSuccess
 * Order completion confirmation screen with full breakdown and receipt details.
 *
 * Used in: /order-success route
 */

import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Order } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatCurrency, formatDate } from '../../utils/constants';
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';

export default function OrderSuccess() {
  useDocumentTitle('Order Confirmed - Belké Market');
  const location = useLocation();
  const order: Order | undefined = location.state?.order;

  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <div className="bg-cream py-14 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-black/10 shadow-xs text-center">
        {/* Animated Check Emblem */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-leaf/10 text-leaf flex items-center justify-center border-4 border-leaf/30">
          <CheckCircle2 size={42} />
        </div>


        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3">
          Faleminderit! Thank You for Your Order.
        </h1>

        <p className="text-xs sm:text-sm text-ink/75 max-w-md mx-auto mb-8 leading-relaxed">
          We have received your order <strong>#{order.id}</strong> and our team is carefully packing your authentic Balkan specialties. A confirmation receipt has been sent to your email.
        </p>

        {/* Order Details Card */}
        <div className="bg-cream rounded-2xl p-6 border border-black/10 text-left mb-8 space-y-4">
          <div className="flex flex-wrap justify-between items-center pb-4 border-b border-black/10 gap-2 text-xs">
            <div>
              <span className="text-ink/60 block">Order Number</span>
              <strong className="text-ink text-sm">#{order.id}</strong>
            </div>
            <div>
              <span className="text-ink/60 block">Date Placed</span>
              <strong className="text-ink">{formatDate(order.date)}</strong>
            </div>
            <div>
              <span className="text-ink/60 block">Payment</span>
              <strong className="text-ink uppercase">
                {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
              </strong>
            </div>
            <div>
              <span className="text-ink/60 block">Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-ink">
                {order.status}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="text-xs text-ink/75">
            <span className="text-ink/60 font-semibold flex items-center gap-1 mb-1">
              <MapPin size={13} className="text-brand" /> Delivery Address
            </span>
            <p className="font-medium text-ink">
              {order.shippingAddress.name} — {order.shippingAddress.street}
              {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>

          {/* Items breakdown */}
          <div className="pt-3 border-t border-black/10 divide-y divide-black/10">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-10 h-10 object-cover rounded-2xl bg-white"
                  />
                  <div>
                    <p className="font-semibold text-ink">{item.productName}</p>
                    <p className="text-ink/60 text-[11px]">
                      Qty: {item.quantity} {item.variantName ? `(${item.variantName})` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-ink">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="pt-3 border-t border-black/10 space-y-1.5 text-xs text-ink/75">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-leaf font-semibold">
                <span>Discount ({order.couponCode}):</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax:</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-ink pt-2 border-t border-black/10">
              <span>Total Paid:</span>
              <span className="font-serif text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/account"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            <PackageCheck size={16} />
            <span>View Order History</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-brand hover:bg-brand/5 text-brand font-medium tracking-wide uppercase transition-colors h-12 px-8 rounded-full font-serif text-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
