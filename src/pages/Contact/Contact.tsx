/**
 * Contact
 * Contact and store location page strictly implementing Section 6 of the mockup:
 * Contact details, interactive message form, social handles, and location map preview.
 *
 * Used in: /contact route
 */

import React, { useState } from 'react';
import { PageBanner } from '../../components/layout/PageBanner';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useToast } from '../../context/ToastContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { APP_CONFIG } from '../../utils/constants';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Music2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function Contact() {
  useDocumentTitle('Contact Us - Belké Market Southington');
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all fields in the contact form', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! We will reply promptly.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-cream pb-12 sm:pb-16">
      <PageBanner
        title="Get in Touch"
        subtitle="We'd love to hear from you! Ask a question, share a suggestion, or just say hello."
        image="/assets/aistudio/F2D2C2FE-6DDF-4915-ACF2-5627FCCF53C8_fd4723d5.png"
        align="center"
      />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">

        {/* 2-Column Info & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 items-start">
          {/* Left Column: Store Details */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-black/10 shadow-xs text-left space-y-7">
            {/* Our Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream border border-black/10 flex items-center justify-center shrink-0 text-brand">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-ink">
                  Our Location
                </h4>
                <p className="text-xs text-ink/75 mt-0.5">
                  Southington, Connecticut
                </p>
                <p className="text-[11px] text-ink/60">
                  [Full storefront address will be revealed at grand opening]
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream border border-black/10 flex items-center justify-center shrink-0 text-brand">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-ink">
                  Phone
                </h4>
                <p className="text-xs text-ink/75 mt-0.5">
                  {APP_CONFIG.phone}
                </p>
                <p className="text-[11px] text-ink/60">
                  Direct line to store manager
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream border border-black/10 flex items-center justify-center shrink-0 text-brand">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-ink">
                  Email
                </h4>
                <a
                  href={`mailto:${APP_CONFIG.email}`}
                  className="text-xs text-brand hover:underline mt-0.5 block font-medium"
                >
                  {APP_CONFIG.email}
                </a>
                <p className="text-[11px] text-ink/60">
                  Expect a reply within 24 hours
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-4 border-t border-black/10">
              <h4 className="font-serif text-sm font-bold text-ink mb-1">
                Follow Us
              </h4>
              <p className="text-xs text-ink/60 mb-3">@belkemarket</p>
              <div className="flex items-center gap-3">
                <a
                  href={APP_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-brand hover:text-white border border-black/10 flex items-center justify-center transition-colors text-ink"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={APP_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-brand hover:text-white border border-black/10 flex items-center justify-center transition-colors text-ink"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={APP_CONFIG.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream hover:bg-brand hover:text-white border border-black/10 flex items-center justify-center transition-colors text-ink"
                  aria-label="TikTok"
                >
                  <Music2 size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-black/10 shadow-xs text-left">
            <h3 className="font-serif text-xl font-bold text-ink mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-ink/60 mb-6">
              Have a special product request or want to partner with Belké Market?
            </p>

            {submitted ? (
              <div className="p-8 bg-leaf/10 rounded-2xl border border-leaf/30 text-center">
                <CheckCircle2 size={36} className="text-brand mx-auto mb-2" />
                <h4 className="font-bold text-sm text-leaf mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-leaf mb-4">
                  Thank you for reaching out. A member of our market team will be in touch shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Note
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink/75 mb-1.5">
                    Message <span className="text-[#FB923C]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    required
                    className="w-full bg-white border border-black/10 rounded-2xl px-3.5 py-2.5 text-sm text-ink placeholder-ink/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium tracking-wide uppercase transition-colors shadow-2xs cursor-pointer h-12 px-8 rounded-full font-serif text-sm"
                  >
                    <span>SEND MESSAGE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Map Section (Matching mockup Section 6!) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-xs text-left">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-bold text-ink">
              Our Location
            </h3>
            <p className="text-xs text-ink/60">
              [Map preview will be pinned to our physical storefront in Southington, CT]
            </p>
          </div>

          {/* Styled Map Graphic Canvas */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#EFEBE2] border border-black/10 flex items-center justify-center">
            {/* Soft map grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#C8BDAB_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            {/* Stylized road vectors */}
            <svg className="absolute inset-0 w-full h-full text-[#C9C3B6]" fill="none" stroke="currentColor">
              <path d="M-20 180 Q200 160 500 240 T1200 200" strokeWidth="12" />
              <path d="M300 -20 Q320 200 450 400" strokeWidth="8" />
              <path d="M-50 80 L1200 120" strokeWidth="6" />
            </svg>

            {/* Pin Badge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg animate-bounce">
                <MapPin size={24} />
              </div>
              <div className="bg-brand text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md mt-2">
                Belké Market • Southington, CT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
