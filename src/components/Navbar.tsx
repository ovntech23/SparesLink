"use client";

import React from 'react';
import { IconMenu2 } from '@tabler/icons-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center transition-premium group-hover:scale-105"
            style={{ backgroundColor: 'var(--orange)' }}
          >
            {/* Abstract link/chain icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="5" width="7" height="8" rx="2" stroke="white" strokeWidth="1.8"/>
              <rect x="10" y="5" width="7" height="8" rx="2" stroke="white" strokeWidth="1.8"/>
              <line x1="8" y1="9" x2="10" y2="9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Wordmark — Syne 800 via font-heading */}
          <span className="font-heading text-white text-xl sm:text-2xl" style={{ letterSpacing: '-0.5px' }}>
            Spares
            <span
              className="transition-colors duration-200 group-hover:opacity-80"
              style={{ color: 'var(--orange)' }}
            >
              Link
            </span>
          </span>
        </div>

        {/* ── Nav links — DM Sans 500 ── */}
        <nav className="hidden md:flex items-center gap-8">
          {['Find Parts', 'Shops', 'Vehicles', 'Deals'].map((item) => (
            <a
              key={item}
              href="#"
              className="relative py-2 transition-colors duration-150 group"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '14px',
                color: 'rgba(255,255,255,0.70)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
            >
              {item}
              {/* Orange underline slide-in */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: 'var(--orange)' }}
              />
            </a>
          ))}
        </nav>

        {/* ── CTAs ── */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sign In — DM Sans 500 ghost */}
          <button
            className="hidden sm:inline-flex px-3 py-2 transition-colors duration-150"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            Sign In
          </button>

          {/* List Your Shop — orange filled, DM Sans 600 */}
          <button
            className="transition-premium active:scale-95 rounded-r shadow-sm"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
              backgroundColor: 'var(--orange)',
              padding: '8px 20px',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange-dk)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange)')}
          >
            List Your Shop
          </button>

          {/* Mobile hamburger */}
          <button className="text-white md:hidden p-1">
            <IconMenu2 className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
