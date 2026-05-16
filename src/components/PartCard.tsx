"use client";

import React from 'react';
import {
  IconEngine, IconDisc, IconBolt,
  IconArrowsVertical, IconCar, IconCircleDot,
  IconCircleCheck, IconMapPin, IconHelpCircle,
} from '@tabler/icons-react';
import { Part } from '@/types';
import { useStore } from '@/store/useStore';

const bodyFont    = 'var(--font-body)';
const displayFont = 'var(--font-display)';

/* ── Category icon helper (exported for PartModal) ── */
export const getCategoryIcon = (category: string, className?: string) => {
  switch (category) {
    case 'engine':     return <IconEngine          className={className} />;
    case 'brakes':     return <IconDisc            className={className} />;
    case 'electrical': return <IconBolt            className={className} />;
    case 'suspension': return <IconArrowsVertical  className={className} />;
    case 'body':       return <IconCar             className={className} />;
    case 'tyres':      return <IconCircleDot       className={className} />;
    default:           return <IconHelpCircle      className={className} />;
  }
};

/* ── Badge maps ── */
const CAT_BADGE: Record<string, { bg: string; color: string }> = {
  engine:     { bg: '#FEF3E2', color: '#B86A00' },
  brakes:     { bg: '#EBF2FB', color: '#1B5FA8' },
  body:       { bg: '#E8F5EE', color: '#1A7A4A' },
  electrical: { bg: '#F0EEFF', color: '#5A3FB5' },
  suspension: { bg: '#FFF0F6', color: '#A03070' },
  tyres:      { bg: '#F4F4F4', color: '#555555' },
};

const STOCK: Record<string, { bg: string; color: string; label: string }> = {
  in:  { bg: '#E8F5EE', color: '#1A7A4A', label: 'In Stock'     },
  low: { bg: '#FEF3E2', color: '#B86A00', label: 'Low Stock'    },
  out: { bg: '#FEF0F0', color: '#C0392B', label: 'Out of Stock' },
};

interface PartCardProps { part: Part; }

export const PartCard: React.FC<PartCardProps> = ({ part }) => {
  const { setSelectedPart, showToast } = useStore();

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Quote requested for ${part.name} from ${part.shopName}!`);
  };

  const catStyle   = CAT_BADGE[part.category] ?? { bg: '#F4F4F4', color: '#555' };
  const stk        = STOCK[part.stock] ?? STOCK.out;
  const isOutStock = part.stock === 'out';
  const shopInit   = part.shopName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div
      onClick={() => setSelectedPart(part)}
      className="group relative bg-white card-hover flex flex-col h-full cursor-pointer overflow-hidden"
      style={{ border: '1px solid var(--border)', borderRadius: 'var(--r)', boxShadow: '0 1px 3px rgba(15,14,12,0.04)' }}
    >
      {/* ── Image / Icon area ── */}
      <div
        className="relative flex items-center justify-center transition-all duration-200 group-hover:opacity-90"
        style={{
          height: '120px',
          background: 'var(--cream)',
          borderBottom: '1px solid rgba(228,225,218,0.5)',
          boxShadow: 'inset 0 -8px 16px rgba(15,14,12,0.03)',
        }}
      >
        {/* Category badge — DM Sans 700 */}
        <div
          className="absolute top-3 left-3 uppercase"
          style={{
            fontFamily: bodyFont, fontWeight: 700, fontSize: '10px',
            letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '99px',
            background: catStyle.bg, color: catStyle.color,
            border: '1px solid rgba(0,0,0,0.04)',
          }}
        >
          {part.category}
        </div>

        {/* Verified badge — DM Sans 700 */}
        {part.verified && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{
              background: '#E8F5EE', color: '#1A7A4A',
              fontFamily: bodyFont, fontWeight: 700, fontSize: '9px',
              letterSpacing: '0.05em', border: '1px solid rgba(26,122,74,0.12)',
            }}
          >
            <IconCircleCheck className="w-3.5 h-3.5" />
            VERIFIED
          </div>
        )}

        {/* Category icon — transitions colour on hover */}
        <div
          className="transition-all duration-200 group-hover:scale-110"
          style={{ color: 'var(--border-md)' }}
        >
          {getCategoryIcon(part.category, 'w-12 h-12 stroke-[1.4]')}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">

        {/* Part name — DM Sans 500 */}
        <h4
          className="truncate transition-colors duration-150 group-hover:text-brand-orange mb-0.5"
          style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: '14px', color: 'var(--ink)' }}
        >
          {part.name}
        </h4>
        {/* Compat string — DM Sans 400 */}
        <p
          className="truncate mb-3"
          style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '12px', color: 'var(--ink3)' }}
        >
          {part.compat}
        </p>

        {/* Shop row */}
        <div
          className="flex items-center gap-2.5 py-3 mb-3"
          style={{
            borderTop: '1px solid rgba(228,225,218,0.55)',
            borderBottom: '1px solid rgba(228,225,218,0.55)',
          }}
        >
          {/* Shop avatar — Syne 800 initials */}
          <div
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0 text-white font-heading"
            style={{ backgroundColor: part.shopColor, fontSize: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
          >
            {shopInit}
          </div>
          <div className="flex-grow min-w-0">
            {/* Shop name — DM Sans 600 */}
            <div className="truncate" style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: '12px', color: 'var(--ink)' }}>
              {part.shopName}
            </div>
            {/* Location — DM Sans 400 */}
            <div className="flex items-center gap-0.5 mt-1" style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '10px', color: 'var(--ink3)' }}>
              <IconMapPin className="w-3 h-3 flex-shrink-0" style={{ opacity: 0.65 }} />
              <span className="truncate">{part.location}</span>
            </div>
          </div>
        </div>

        {/* Price + stock row */}
        <div className="flex items-end justify-between mb-3.5 mt-auto">
          {/* Price — Syne 700 per spec */}
          <div>
            <span
              style={{
                fontFamily: displayFont, fontWeight: 700, fontSize: '20px',
                color: 'var(--ink)', letterSpacing: '-0.02em',
              }}
            >
              {/* Currency prefix — DM Sans 400 */}
              <span style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '12px', color: 'var(--ink3)', marginRight: '3px', letterSpacing: '0.02em' }}>
                ZMW
              </span>
              {part.price.toLocaleString()}
            </span>
          </div>

          {/* Stock badge — DM Sans 700 */}
          <div
            className="uppercase"
            style={{
              fontFamily: bodyFont, fontWeight: 700, fontSize: '10px',
              letterSpacing: '0.05em', padding: '3px 9px', borderRadius: 'var(--rs)',
              background: stk.bg, color: stk.color,
            }}
          >
            {stk.label}
          </div>
        </div>

        {/* Request Quote button — DM Sans 600 */}
        <button
          onClick={handleRequestQuote}
          disabled={isOutStock}
          className="w-full flex items-center justify-center active:scale-[0.97] transition-all duration-200"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: '13px',
            height: '40px',
            borderRadius: 'var(--rs)',
            ...(isOutStock
              ? { background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink3)', cursor: 'not-allowed' }
              : { background: 'var(--orange-lt)', border: '1px solid rgba(232,80,10,0.12)', color: 'var(--orange-dk)', cursor: 'pointer' }
            ),
          }}
          onMouseEnter={(e) => {
            if (!isOutStock) {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange)';
              (e.currentTarget as HTMLButtonElement).style.color = 'white';
            }
          }}
          onMouseLeave={(e) => {
            if (!isOutStock) {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange-lt)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--orange-dk)';
            }
          }}
        >
          Request Quote
        </button>

      </div>
    </div>
  );
};
