"use client";

import React from 'react';
import { IconSearch, IconChevronDown } from '@tabler/icons-react';
import { useStore } from '@/store/useStore';
import { VEHICLE_TYPES } from '@/lib/data';
import { VehicleType } from '@/types';

/* Font shorthand helpers */
const bodyFont  = 'var(--font-body)';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, vehicleTypeFilter, setVehicleTypeFilter, showToast } = useStore();

  const quickTags = ['Oil Filter', 'Brake Pads', 'Alternator', 'Shock Absorber', 'Radiator', 'Clutch Kit'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Searching for "${searchQuery || 'all parts'}"...`);
  };

  return (
    <div className="sticky z-40 w-full py-4 shadow-sm"
      style={{ top: '64px', backgroundColor: 'white', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">

          {/* Input group */}
          <div
            className="flex-grow flex flex-col sm:flex-row overflow-hidden transition-premium"
            style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)' }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = 'var(--orange)')}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            {/* Vehicle type dropdown — DM Sans 500 */}
            <div className="relative flex-shrink-0" style={{ borderRight: '1px solid var(--border)', backgroundColor: 'var(--cream)' }}>
              <select
                value={vehicleTypeFilter}
                onChange={(e) => setVehicleTypeFilter(e.target.value as VehicleType | 'All Vehicles')}
                className="h-12 pl-4 pr-10 outline-none appearance-none cursor-pointer w-full sm:w-auto"
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: '13px',
                  color: 'var(--ink)',
                  background: 'transparent',
                  minWidth: '160px',
                }}
              >
                <option value="All Vehicles">All Vehicle Types</option>
                {VEHICLE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <IconChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink3)' }} />
            </div>

            {/* Text search — DM Sans 400 */}
            <div className="flex-grow relative flex items-center bg-white">
              <IconSearch className="w-5 h-5 absolute left-4 pointer-events-none" style={{ color: 'var(--ink3)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by part name, brand, or OEM number..."
                className="w-full h-12 pl-12 pr-4 outline-none bg-transparent"
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: '14px',
                  color: 'var(--ink)',
                }}
              />
            </div>
          </div>

          {/* Search button — DM Sans 600 */}
          <button
            type="submit"
            className="flex-shrink-0 flex items-center justify-center gap-2 h-12 px-8 transition-premium active:scale-95 shadow-sm"
            style={{
              fontFamily: bodyFont,
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
              backgroundColor: 'var(--orange)',
              borderRadius: 'var(--r)',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange-dk)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange)')}
          >
            <IconSearch className="w-4 h-4" />
            Search
          </button>
        </form>

        {/* Quick tags — DM Sans 500 */}
        <div className="flex items-center gap-2.5 mt-3.5 overflow-x-auto no-scrollbar pb-0.5">
          <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '11px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>
            Quick:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="transition-premium active:scale-95 flex-shrink-0 whitespace-nowrap"
              style={{
                fontFamily: bodyFont,
                fontWeight: 500,
                fontSize: '12px',
                color: 'var(--ink2)',
                background: 'var(--cream)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--rs)',
                padding: '4px 12px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange-lt)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--orange-dk)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,80,10,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--cream)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink2)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
