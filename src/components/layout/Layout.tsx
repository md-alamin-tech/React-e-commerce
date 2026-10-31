/**
 * Layout
 * Master layout wrapper that provides persistent TopBanner, Navbar,
 * child page container, Footer, and Toast notification container.
 *
 * @param {React.ReactNode} children - page component to render
 *
 * Used in: AppRoutes / Page router
 */

import React from 'react';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer } from '../common/ToastContainer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#212420]">
      <TopBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
