/**
 * Login
 * User authentication login page with demo fast-fill button and redirection.
 *
 * Used in: /login route
 */

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  useDocumentTitle('Sign In - Belké Market');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/account';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'warning');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
      navigate(from, { replace: true });
    }, 500);
  };

  const handleQuickDemo = () => {
    login('elena.k@example.com', 'password123');
    showToast('Signed in with Elena Kastrati demo account!', 'success');
    navigate(from, { replace: true });
  };

  return (
    <div className="bg-[#0B0710] py-16 sm:py-24 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#140C1F] rounded-[10px] p-8 sm:p-10 border border-[#2E2045] shadow-xs text-left">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#F5ECD7]">
            Sign in to Belké Market
          </h1>
          <p className="text-xs text-[#B0A99C] mt-1">
            Access your order history, delivery addresses, and saved favorites.
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="bg-[#1B1229] border border-[#2E2045] rounded-[10px] p-4 mb-6 text-center">
          <p className="text-xs text-[#F5ECD7] font-semibold mb-2">
            Testing the app?
          </p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full bg-[#D4AF37] hover:bg-[#E8C547] text-[#0B0710] font-semibold tracking-wider uppercase transition-colors cursor-pointer inline-flex h-12 px-8 rounded-full text-xs items-center justify-center"
          >
            One-Click Demo Account Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elena.k@example.com"
            leftIcon={<Mail size={16} />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock size={16} />}
            required
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#D0C9BA] cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[#D4AF37]" />
              <span>Remember me</span>
            </label>
            <span className="text-[#D4AF37] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            variant="dark"
            isLoading={loading}
            className="w-full py-3.5 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight size={15} />
          </Button>
        </form>

        <p className="text-center text-xs text-[#B0A99C] mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-[#D4AF37] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
