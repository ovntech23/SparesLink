"use client";

import React from 'react';
import { IconMapPin, IconStarFilled, IconCircleCheck, IconArrowRight } from '@tabler/icons-react';
import { Shop } from '@/types';
import { useStore } from '@/store/useStore';

const bodyFont    = 'var(--font-body)';
const displayFont = 'var(--font-display)';

interface FeaturedShopsProps {
  shops: Shop[];
}

export const FeaturedShops: React.FC<FeaturedShopsProps> = ({ shops }) => {
  const { showToast } = useStore();

  return (
    <section className="w-full pt-2 pb-2">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          {/* Section title — Syne 800 */}
          <h2
            className="font-heading"
            style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.03em' }}
          >
            Featured Partner Shops
          </h2>
          {/* Subtitle — DM Sans 300 */}
          <p style={{ fontFamily: bodyFont, fontWeight: 300, fontSize: '12px', color: 'var(--ink3)', marginTop: '2px' }}>
            Verified, top-rated spares suppliers across Zambia
          </p>
        </div>
        <button
          className="hidden sm:flex items-center gap-1.5 transition-colors duration-150"
          style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '12px', color: 'var(--orange)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--orange-dk)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--orange)')}
        >
          View All Shops
          <IconArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {shops.map((shop, index) => {
          const isFeatured = index === 0;

          return (
            <div
              key={shop.id}
              onClick={() => showToast(`Opening storefront for ${shop.name}...`)}
              className={`
                group relative border rounded-r p-5 cursor-pointer card-hover flex flex-col h-full
                ${isFeatured
                  ? 'border-brand-orange/30 shadow-md'
                  : 'bg-white border-brand-border'
                }
              `}
              style={isFeatured ? { backgroundColor: '#FDF0EA' } : {}}
            >
              {/* TOP ROW: avatar + name block + badges (all in one flex row, no absolute positioning) */}
              <div className="flex items-start gap-3.5 mb-4">
                {/* Avatar */}
                <div
                  className="w-[52px] h-[52px] rounded-r flex items-center justify-center text-white font-heading text-[18px] flex-shrink-0 shadow-md group-hover:scale-105 transition-premium"
                  style={{ backgroundColor: shop.color }}
                >
                  {shop.initials}
                </div>

                {/* Name + location (takes remaining space) */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Shop name — Syne 800 per spec for featured card shop names */}
                    <h3
                      className="font-heading transition-colors duration-150 truncate"
                      style={{ fontSize: '16px', color: 'var(--ink)', letterSpacing: '-0.02em' }}
                      title={shop.name}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = 'var(--orange)')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLHeadingElement).style.color = 'var(--ink)')}
                    >
                      {shop.name}
                    </h3>
                    {/* Badges placed right after the name, inline */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {shop.isVerified && (
                        <div
                          className="w-[18px] h-[18px] rounded-full flex items-center justify-center"
                          style={{ background: '#E8F5EE', color: '#1A7A4A' }}
                          title="Verified Shop"
                        >
                          <IconCircleCheck className="w-3 h-3" />
                        </div>
                      )}
                      {shop.isPro && (
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-white font-bold tracking-widest uppercase leading-none"
                          style={{ backgroundColor: '#E8500A', fontSize: '8px' }}
                        >
                          PRO
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <IconMapPin className="w-3 h-3 text-brand-ink3 flex-shrink-0" />
                    <span className="text-[11px] text-brand-ink3 font-dmsans truncate">
                      {shop.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {shop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.65)',
                      borderColor: 'rgba(228,225,218,0.7)',
                      color: '#3D3B37',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer: rating + visit */}
              <div className="flex items-center justify-between border-t pt-4 mt-auto" style={{ borderColor: 'rgba(228,225,218,0.6)' }}>
                <div className="flex items-center gap-1.5">
                <IconStarFilled className="w-[14px] h-[14px]" style={{ color: 'var(--amber)' }} />
                {/* Rating number — Syne 700 */}
                <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: '14px', color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1 }}>
                  {shop.rating.toFixed(1)}
                </span>
                {/* Review count — DM Sans 400 */}
                <span style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '11px', color: 'var(--ink3)' }}>
                  ({shop.reviewCount} reviews)
                </span>
              </div>

                <span className="text-[12px] font-bold text-brand-ink3 group-hover:text-brand-orange transition-colors duration-150 flex items-center gap-1">
                  Visit Store
                  <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-150">
                    →
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
