/**
 * Register
 * Customer account creation page with instant validation and registration flow.
 *
 * Used in: /register route
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  useDocumentTitle('Create Account - Belké Market');
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register(name, email, password);
      setLoading(false);
      showToast(`Welcome to the Belké Market family, ${name}!`, 'success');
      navigate('/account');
    }, 600);
  };

  return (
    <div className="bg-[#0B0710] py-16 sm:py-24 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#140C1F] rounded-[10px] p-8 sm:p-10 border border-[#2E2045] shadow-xs text-left">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#F5ECD7]">
            Create an Account
          </h1>
          <p className="text-xs text-[#B0A99C] mt-1">
            Enjoy faster checkout, saved addresses, and exclusive member treats.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Elena Kastrati"
            leftIcon={<User size={16} />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elena@example.com"
            leftIcon={<Mail size={16} />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            leftIcon={<Lock size={16} />}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            leftIcon={<Lock size={16} />}
            required
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="dark"
              isLoading={loading}
              className="w-full py-3.5"
            >
              <span>Create My Account</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </form>

        <p className="text-center text-xs text-[#B0A99C] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#D4AF37] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
