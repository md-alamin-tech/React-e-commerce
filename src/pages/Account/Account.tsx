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
      <div className="bg-cream py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-black/10">
          <ShieldAlert size={36} className="text-brand mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-ink mb-2">
            Please Sign In
          </h2>
          <p className="text-xs text-ink/60 mb-6">
            You need to be logged in to view your account details and order history.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-brand text-white font-medium tracking-wide uppercase h-12 px-8 rounded-full font-serif text-sm"
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
    <div className="bg-cream py-10 sm:py-14">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">
              My Account
            </h1>
            <p className="text-xs text-ink/60 mt-0.5">
              Welcome back, <strong>{user.name}</strong> ({user.email})
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/10 hover:bg-[#EFEBE2] text-xs font-semibold text-brand self-start sm:self-auto cursor-pointer"
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
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-white hover:bg-[#EFEBE2] text-ink/75 border border-black/10'
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
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-white hover:bg-[#EFEBE2] text-ink/75 border border-black/10'
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
                  ? 'bg-brand text-white shadow-xs'
                  : 'bg-white hover:bg-[#EFEBE2] text-ink/75 border border-black/10'
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
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-ink mb-6 pb-3 border-b border-black/10">
                  Your Orders ({user.orders.length})
                </h2>

                {user.orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={36} className="text-brand mx-auto mb-2" />
                    <p className="text-xs text-ink/60 mb-4">You have not placed any orders yet.</p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-1.5 bg-brand text-white font-medium tracking-wide uppercase h-12 px-8 rounded-full font-serif text-sm justify-center"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-2xl border border-black/10 bg-cream space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-black/10 gap-3 text-xs">
                          <div>
                            <span className="text-ink/60 block text-[11px]">Order #</span>
                            <strong className="text-ink text-sm">{ord.id}</strong>
                          </div>
                          <div>
                            <span className="text-ink/60 block text-[11px]">Date</span>
                            <span className="text-ink font-medium">{formatDate(ord.date)}</span>
                          </div>
                          <div>
                            <span className="text-ink/60 block text-[11px]">Total</span>
                            <strong className="text-ink font-serif text-sm">
                              {formatCurrency(ord.total)}
                            </strong>
                          </div>
                          <div>
                            <span className="text-ink/60 block text-[11px]">Status</span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-leaf/10 text-leaf">
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        {/* Items in this order */}
                        <div className="divide-y divide-black/10">
                          {ord.items.map((item, i) => (
                            <div key={i} className="py-2 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="w-10 h-10 object-cover rounded-2xl bg-white shrink-0"
                                />
                                <div>
                                  <p className="font-semibold text-ink">{item.productName}</p>
                                  <p className="text-ink/60 text-[11px]">
                                    Qty: {item.quantity} {item.variantName ? `(${item.variantName})` : ''}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-ink">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="text-[11px] text-ink/60 pt-2 border-t border-black/10 flex justify-between">
                          <span>
                            Delivering to: {ord.shippingAddress.street}, {ord.shippingAddress.city}
                          </span>
                          <span className="uppercase font-semibold text-ink">
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
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10">
                  <h2 className="font-serif text-xl font-bold text-ink">
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
                  <p className="text-xs text-ink/60 py-6 text-center">
                    No saved addresses. Add an address for rapid checkout.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-5 rounded-2xl border transition-all text-xs relative ${
                          addr.isDefault
                            ? 'border-brand bg-cream'
                            : 'border-black/10 bg-white'
                        }`}
                      >
                        {addr.isDefault && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand bg-[#EFEBE2] px-2 py-0.5 rounded-full mb-2">
                            <CheckCircle2 size={11} /> Default Address
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-ink mb-1">{addr.name}</h4>
                        <p className="text-ink/75">
                          {addr.street} {addr.apartment ? `, ${addr.apartment}` : ''}
                        </p>
                        <p className="text-ink/75">
                          {addr.city}, {addr.state} {addr.zipCode}
                        </p>
                        <p className="text-ink/60 mt-1">{addr.phone}</p>

                        <div className="flex items-center gap-3 pt-4 mt-3 border-t border-black/10">
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-[11px] font-semibold text-brand hover:underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-[11px] text-brand hover:underline flex items-center gap-1 ml-auto cursor-pointer"
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
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10 shadow-xs">
                <h2 className="font-serif text-xl font-bold text-ink mb-6 pb-3 border-b border-black/10">
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
          <label className="flex items-center gap-2 text-xs text-ink/75 cursor-pointer">
            <input
              type="checkbox"
              checked={newAddr.isDefault}
              onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
              className="accent-brand cursor-pointer"
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
