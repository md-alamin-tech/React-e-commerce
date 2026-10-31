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
    <div className="bg-[#FAF7F2] py-14 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DAC5] shadow-xs text-center">
        {/* Animated Check Emblem */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100">
          <CheckCircle2 size={42} />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#B88847] block mb-2">
          ORDER CONFIRMATION
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#263620] mb-3">
          Faleminderit! Thank You for Your Order.
        </h1>

        <p className="text-xs sm:text-sm text-[#5C5850] max-w-md mx-auto mb-8 leading-relaxed">
          We have received your order <strong>#{order.id}</strong> and our team is carefully packing your authentic Balkan specialties. A confirmation receipt has been sent to your email.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DAC5] text-left mb-8 space-y-4">
          <div className="flex flex-wrap justify-between items-center pb-4 border-b border-[#E8DAC5] gap-2 text-xs">
            <div>
              <span className="text-[#7C776E] block">Order Number</span>
              <strong className="text-[#263620] text-sm">#{order.id}</strong>
            </div>
            <div>
              <span className="text-[#7C776E] block">Date Placed</span>
              <strong className="text-[#263620]">{formatDate(order.date)}</strong>
            </div>
            <div>
              <span className="text-[#7C776E] block">Payment</span>
              <strong className="text-[#263620] uppercase">
                {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
              </strong>
            </div>
            <div>
              <span className="text-[#7C776E] block">Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                {order.status}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="text-xs text-[#5C5850]">
            <span className="text-[#7C776E] font-semibold flex items-center gap-1 mb-1">
              <MapPin size={13} className="text-[#B88847]" /> Delivery Address
            </span>
            <p className="font-medium text-[#263620]">
              {order.shippingAddress.name} — {order.shippingAddress.street}
              {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>

          {/* Items breakdown */}
          <div className="pt-3 border-t border-[#E8DAC5] divide-y divide-[#EBE5D8]">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-10 h-10 object-cover rounded-md bg-white"
                  />
                  <div>
                    <p className="font-semibold text-[#263620]">{item.productName}</p>
                    <p className="text-[#7C776E] text-[11px]">
                      Qty: {item.quantity} {item.variantName ? `(${item.variantName})` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[#263620]">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="pt-3 border-t border-[#E8DAC5] space-y-1.5 text-xs text-[#5C5850]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
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
            <div className="flex justify-between text-sm font-bold text-[#263620] pt-2 border-t border-[#DDD6C8]">
              <span>Total Paid:</span>
              <span className="font-serif text-base">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/account"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#263620] hover:bg-[#1C2916] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <PackageCheck size={16} />
            <span>View Order History</span>
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#263620] hover:bg-[#263620]/5 text-[#263620] text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
