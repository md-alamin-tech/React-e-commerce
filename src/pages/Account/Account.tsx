/**
 * Account
 * User dashboard managing customer personal profile, order history,
 * delivery addresses, and session management.
 *
 * Used in: /account route
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, Address } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { formatCurrency, formatDate } from '../../utils/constants';
import {
  User as UserIcon,
  Package,
  MapPin,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function Account() {
  useDocumentTitle('My Account - Belké Market');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    user,
    isAuthenticated,
    logout,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  // Add Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: user?.name || '',
    street: '',
    apartment: '',
    city: 'Southington',
    state: 'CT',
    zipCode: '06489',
    country: 'United States',
    phone: user?.phone || '',
    isDefault: false,
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-[#0B0710] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-[#140C1F] p-8 rounded-3xl border border-[#2E2045]">
          <ShieldAlert size={36} className="text-[#D4AF37] mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-[#F5ECD7] mb-2">
            Please Sign In
          </h2>
          <p className="text-xs text-[#B0A99C] mb-6">
            You need to be logged in to view your account details and order history.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-[#D4AF37] text-[#0B0710] font-semibold tracking-wider uppercase h-12 px-8 rounded-full text-xs"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
    showToast('Your profile information has been updated.', 'success');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.zipCode) {
      showToast('Please fill all required address fields', 'warning');
      return;
    }
    addAddress(newAddr);
    setIsAddressModalOpen(false);
    showToast('Delivery address added!', 'success');
    setNewAddr({
      name: user.name,
      street: '',
      apartment: '',
      city: 'Southington',
      state: 'CT',
      zipCode: '06489',
      country: 'United States',
      phone: user.phone || '',
      isDefault: false,
    });
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out safely.', 'info');
    navigate('/');
  };

  return (
    <div className="bg-[#0B0710] py-10 sm:py-14">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#F5ECD7]">
              My Account
            </h1>
            <p className="text-xs text-[#B0A99C] mt-0.5">
              Welcome back, <strong>{user.name}</strong> ({user.email})
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#34254D] hover:bg-[#1E1430] text-xs font-semibold text-[#F87171] self-start sm:self-auto cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between h-12 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#D4AF37] text-[#0B0710] shadow-xs'
                  : 'bg-[#140C1F] hover:bg-[#1E1430] text-[#D0C9BA] border border-[#2E2045]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={16} />
                <span>Order History</span>
              </div>
              <span className="text-[11px] opacity-80">({user.orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between h-12 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#D4AF37] text-[#0B0710] shadow-xs'
                  : 'bg-[#140C1F] hover:bg-[#1E1430] text-[#D0C9BA] border border-[#2E2045]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={16} />
                <span>Saved Addresses</span>
              </div>
              <span className="text-[11px] opacity-80">({user.addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between h-12 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#D4AF37] text-[#0B0710] shadow-xs'
                  : 'bg-[#140C1F] hover:bg-[#1E1430] text-[#D0C9BA] border border-[#2E2045]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserIcon size={16} />
                <span>Profile Settings</span>
              </div>
            </button>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-9 text-left">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-[#140C1F] p-6 sm:p-8 rounded-3xl border border-[#2E2045] shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#F5ECD7] mb-6 pb-3 border-b border-[#2E2045]">
                  Your Orders ({user.orders.length})
                </h2>

                {user.orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={36} className="text-[#D4AF37] mx-auto mb-2" />
                    <p className="text-xs text-[#B0A99C] mb-4">You have not placed any orders yet.</p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#0B0710] font-semibold tracking-wider uppercase h-12 px-8 rounded-full text-xs justify-center"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-[#2A1D3F] bg-[#0B0710] space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#2E2045] gap-3 text-xs">
                          <div>
                            <span className="text-[#B0A99C] block text-[11px]">Order #</span>
                            <strong className="text-[#F5ECD7] text-sm">{ord.id}</strong>
                          </div>
                          <div>
                            <span className="text-[#B0A99C] block text-[11px]">Date</span>
                            <span className="text-[#F5ECD7] font-medium">{formatDate(ord.date)}</span>
                          </div>
                          <div>
                            <span className="text-[#B0A99C] block text-[11px]">Total</span>
                            <strong className="text-[#F5ECD7] font-serif text-sm">
                              {formatCurrency(ord.total)}
                            </strong>
                          </div>
                          <div>
                            <span className="text-[#B0A99C] block text-[11px]">Status</span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-300">
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        {/* Items in this order */}
                        <div className="divide-y divide-[#2A1D3F]">
                          {ord.items.map((item, i) => (
                            <div key={i} className="py-2 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="w-10 h-10 object-cover rounded-md bg-[#140C1F] shrink-0"
                                />
                                <div>
                                  <p className="font-semibold text-[#F5ECD7]">{item.productName}</p>
                                  <p className="text-[#B0A99C] text-[11px]">
                                    Qty: {item.quantity} {item.variantName ? `(${item.variantName})` : ''}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-[#F5ECD7]">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="text-[11px] text-[#B0A99C] pt-2 border-t border-[#2E2045] flex justify-between">
                          <span>
                            Delivering to: {ord.shippingAddress.street}, {ord.shippingAddress.city}
                          </span>
                          <span className="uppercase font-semibold text-[#F5ECD7]">
                            {ord.paymentMethod === 'card' ? 'Credit Card' : 'Cash On Delivery'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-[#140C1F] p-6 sm:p-8 rounded-3xl border border-[#2E2045] shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2E2045]">
                  <h2 className="font-serif text-xl font-bold text-[#F5ECD7]">
                    Saved Delivery Addresses
                  </h2>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddressModalOpen(true)}
                  >
                    <Plus size={14} />
                    <span>Add New Address</span>
                  </Button>
                </div>

                {user.addresses.length === 0 ? (
                  <p className="text-xs text-[#B0A99C] py-6 text-center">
                    No saved addresses. Add an address for rapid checkout.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all text-xs relative ${
                          addr.isDefault
                            ? 'border-[#D4AF37] bg-[#0B0710]'
                            : 'border-[#34254D] bg-[#140C1F]'
                        }`}
                      >
                        {addr.isDefault && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#1B1229] px-2 py-0.5 rounded-full mb-2">
                            <CheckCircle2 size={11} /> Default Address
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-[#F5ECD7] mb-1">{addr.name}</h4>
                        <p className="text-[#D0C9BA]">
                          {addr.street} {addr.apartment ? `, ${addr.apartment}` : ''}
                        </p>
                        <p className="text-[#D0C9BA]">
                          {addr.city}, {addr.state} {addr.zipCode}
                        </p>
                        <p className="text-[#B0A99C] mt-1">{addr.phone}</p>

                        <div className="flex items-center gap-3 pt-4 mt-3 border-t border-[#2E2045]">
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-[11px] font-semibold text-[#D4AF37] hover:underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-[#140C1F] p-6 sm:p-8 rounded-3xl border border-[#2E2045] shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#F5ECD7] mb-6 pb-3 border-b border-[#2E2045]">
                  Personal Profile
                </h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="md">
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add New Delivery Address"
      >
        <form onSubmit={handleCreateAddress} className="space-y-4 text-left">
          <Input
            label="Recipient Name"
            value={newAddr.name}
            onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
            required
          />
          <Input
            label="Street Address"
            value={newAddr.street}
            onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
            required
          />
          <Input
            label="Apartment, suite, unit (optional)"
            value={newAddr.apartment}
            onChange={(e) => setNewAddr({ ...newAddr, apartment: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              value={newAddr.city}
              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
              required
            />
            <Input
              label="State"
              value={newAddr.state}
              onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="ZIP Code"
              value={newAddr.zipCode}
              onChange={(e) => setNewAddr({ ...newAddr, zipCode: e.target.value })}
              required
            />
            <Input
              label="Phone Number"
              value={newAddr.phone}
              onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
              required
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-[#D0C9BA] cursor-pointer">
            <input
              type="checkbox"
              checked={newAddr.isDefault}
              onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
              className="accent-[#D4AF37] cursor-pointer"
            />
            <span>Set as default shipping address</span>
          </label>
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsAddressModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
