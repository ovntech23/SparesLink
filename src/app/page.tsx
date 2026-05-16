import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { VehicleFinder } from '@/components/VehicleFinder';
import { FeaturedShops } from '@/components/FeaturedShops';
import { PartsCatalog } from '@/components/PartsCatalog';
import prisma from '@/lib/prisma';
import { Part, Shop } from '@/types';

// This is a React Server Component — no "use client" directive.
// Static sections (Navbar, Hero, FeaturedShops, Footer) are rendered on the
// server with zero client-side JS hydration overhead.
// The interactive catalog is delegated to <PartsCatalog> (Client Component).
export default async function Home() {
  // Fetch real data from the database
  const [parts, shops] = await Promise.all([
    prisma.part.findMany({
      orderBy: { createdAt: 'desc' },
    }),
    prisma.shop.findMany({
      where: { isVerified: true }, // Only show verified shops in featured
      take: 3,
    }),
  ]);

  return (
    <main className="min-h-screen bg-brand-cream flex flex-col relative">

      {/* App Header — RSC */}
      <Navbar />

      {/* Hero Section — RSC */}
      <Hero />

      {/* Sticky Search Container — Client Component (useStore) */}
      <SearchBar />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar: Vehicle Finder Widget — Client Component (useStore) */}
          <aside className="lg:col-span-3 sticky top-[160px] hidden lg:block">
            <VehicleFinder />
          </aside>

          {/* Mobile Vehicle Finder — Client Component (useStore) */}
          <div className="col-span-1 lg:hidden mb-4">
            <VehicleFinder />
          </div>

          {/* Right Main Panel: Featured section + interactive catalog */}
          <section className="lg:col-span-9 flex flex-col">

            {/* Featured Shops Row — RSC */}
            <FeaturedShops shops={shops as unknown as Shop[]} />

            {/* Client boundary: filtering, sorting, part grid, modals, toasts */}
            <PartsCatalog parts={parts as unknown as Part[]} />

          </section>

        </div>
      </div>

      {/* Footer — RSC */}
      <footer className="mt-auto" style={{ backgroundColor: '#0F0E0C', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Main footer grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ backgroundColor: '#E8500A' }}
              >
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
              <span
                className="font-heading text-white text-xl"
                style={{ letterSpacing: '-0.5px' }}
              >
                Spares<span style={{ color: '#E8500A' }}>Link</span>
              </span>
            </div>
            <p
              className="text-[14px] leading-relaxed max-w-xs mb-6"
              style={{ color: 'rgba(255,255,255,0.42)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300 }}
            >
              Zambia&apos;s premium auto spares marketplace — connecting buyers
              with verified shops for cars, trucks, motorcycles &amp; agricultural vehicles.
            </p>
            <div className="flex items-center gap-3">
              {['FB', 'TW', 'IG', 'WA'].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-150 hover:border-brand-orange hover:text-brand-orange"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links: Marketplace */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>Marketplace</p>
            <ul className="space-y-3">
              {['Find Parts', 'Browse Shops', 'Vehicle Deals', 'Price Alerts'].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[13px] font-medium transition-colors duration-150 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: For Shops */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>For Shops</p>
            <ul className="space-y-3">
              {['List Your Shop', 'Shop Dashboard', 'Pricing Plans', 'Help Center', 'Terms & Privacy'].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[13px] font-medium transition-colors duration-150 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-[12px]"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans", sans-serif' }}
          >
            © 2026 SparesLink Zambia Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#1A7A4A' }}
            />
            <span
              className="text-[11px]"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: '"DM Sans", sans-serif' }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
