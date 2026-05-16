"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCircleCheck, IconMapPin, IconPhone, IconMessage } from '@tabler/icons-react';
import { useStore } from '@/store/useStore';
import { getCategoryIcon } from './PartCard';

const bodyFont    = 'var(--font-body)';
const displayFont = 'var(--font-display)';

const STOCK: Record<string, { bg: string; color: string; label: string }> = {
  in:  { bg: '#E8F5EE', color: '#1A7A4A', label: 'In Stock'     },
  low: { bg: '#FEF3E2', color: '#B86A00', label: 'Low Stock'    },
  out: { bg: '#FEF0F0', color: '#C0392B', label: 'Out of Stock' },
};

const CAT_BADGE: Record<string, { bg: string; color: string }> = {
  engine:     { bg: '#FEF3E2', color: '#B86A00' },
  brakes:     { bg: '#EBF2FB', color: '#1B5FA8' },
  body:       { bg: '#E8F5EE', color: '#1A7A4A' },
  electrical: { bg: '#F0EEFF', color: '#5A3FB5' },
  suspension: { bg: '#FFF0F6', color: '#A03070' },
};

export const PartModal: React.FC = () => {
  const { selectedPart, setSelectedPart, showToast } = useStore();

  const handleClose  = () => setSelectedPart(null);
  const handleAction = (type: string) => {
    if (!selectedPart) return;
    showToast(type === 'quote'
      ? `Quote request sent to ${selectedPart.shopName}!`
      : `Connecting to ${selectedPart.shopName} sales team...`
    );
    handleClose();
  };

  if (!selectedPart) return null;

  const stk      = STOCK[selectedPart.stock] ?? STOCK.out;
  const catStyle = CAT_BADGE[selectedPart.category] ?? { bg: '#F4F4F4', color: '#555' };
  const isOut    = selectedPart.stock === 'out';
  const shopInit = selectedPart.shopName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 backdrop-blur-[3px]"
          style={{ backgroundColor: 'rgba(15,14,12,0.65)' }}
        />

        {/* Modal surface */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.98 }}
          transition={{ type: 'spring', damping: 26, stiffness: 360 }}
          className="relative bg-white w-full flex flex-col z-10 overflow-hidden"
          style={{ maxWidth: '560px', borderRadius: '14px', boxShadow: '0 32px 80px rgba(15,14,12,0.28)' }}
        >
          {/* Close — DM Sans weight via system */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm"
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid var(--border)', color: 'var(--ink)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.85)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'; }}
          >
            <IconX className="w-4 h-4" />
          </button>

          {/* Icon header area */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: '180px', background: 'var(--cream)', borderBottom: '1px solid rgba(228,225,218,0.45)' }}
          >
            <div className="absolute w-32 h-32 rounded-full" style={{ background: 'rgba(232,80,10,0.06)', filter: 'blur(24px)' }} />
            <div className="relative z-10" style={{ color: 'rgba(206,201,191,0.8)' }}>
              {getCategoryIcon(selectedPart.category, 'w-20 h-20 stroke-[1.2]')}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            {/* Category badge — DM Sans 700 */}
            <div className="mb-4">
              <span
                className="inline-flex items-center uppercase mb-3"
                style={{
                  fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', letterSpacing: '0.08em',
                  padding: '3px 10px', borderRadius: '99px', border: '1px solid rgba(0,0,0,0.04)',
                  background: catStyle.bg, color: catStyle.color,
                }}
              >
                {selectedPart.category}
              </span>

              {/* Part name — Syne 800 per spec */}
              <h2
                className="font-heading mb-2"
                style={{ fontSize: 'clamp(20px, 3vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1.15 }}
              >
                {selectedPart.name}
              </h2>

              {/* Compat — DM Sans 400/500 */}
              <p style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '14px', color: 'var(--ink3)' }}>
                Compatibility:{' '}
                <span style={{ fontWeight: 500, color: 'var(--ink2)' }}>{selectedPart.compat}</span>
              </p>
            </div>

            {/* Specs grid — labels DM Sans 700, values DM Sans 500 */}
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6"
              style={{ background: 'rgba(250,248,244,0.7)', border: '1px solid rgba(228,225,218,0.65)', borderRadius: 'var(--r)', padding: '18px 20px' }}
            >
              {[
                { label: 'Vehicle Type', value: selectedPart.vehicleType || 'Cars & SUVs' },
                { label: 'Condition',    value: selectedPart.condition || 'NEW' },
                { label: 'Warranty',     value: selectedPart.warrantyMonths ? `${selectedPart.warrantyMonths} Months` : 'None' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: bodyFont, fontWeight: 500, fontSize: '13px', color: 'var(--ink)' }}>
                    {value}
                  </span>
                </div>
              ))}

              {/* Availability — inline stock badge */}
              <div>
                <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '5px' }}>
                  Availability
                </span>
                <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', background: stk.bg, color: stk.color, padding: '3px 9px', borderRadius: 'var(--rs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stk.label}
                </span>
              </div>

              {selectedPart.oemNumber && (
                <div className="col-span-2 flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(228,225,218,0.5)' }}>
                  <span style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    OEM Reference
                  </span>
                  <code style={{ fontFamily: 'monospace', fontWeight: 500, fontSize: '12px', color: 'var(--ink2)', background: 'white', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 'var(--rs)' }}>
                    {selectedPart.oemNumber}
                  </code>
                </div>
              )}
            </div>

            {/* Shop row */}
            <div
              className="flex items-center gap-3.5 py-4 mb-6"
              style={{ borderTop: '1px solid rgba(228,225,218,0.6)', borderBottom: '1px solid rgba(228,225,218,0.6)' }}
            >
              {/* Shop avatar — Syne 800 initials */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-heading"
                style={{ backgroundColor: selectedPart.shopColor, fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}
              >
                {shopInit}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  {/* Shop name — DM Sans 600 */}
                  <span style={{ fontFamily: bodyFont, fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>
                    {selectedPart.shopName}
                  </span>
                  {selectedPart.verified && (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE', color: '#1A7A4A' }} title="Verified">
                      <IconCircleCheck className="w-3 h-3" />
                    </div>
                  )}
                </div>
                {/* Location — DM Sans 400 */}
                <div className="flex items-center gap-0.5 mt-1" style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '12px', color: 'var(--ink3)' }}>
                  <IconMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{selectedPart.location}, Zambia</span>
                </div>
              </div>
            </div>

            {/* Price + Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

              {/* Price — Syne 800 per spec */}
              <div>
                <span style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                  Final Price
                </span>
                <div style={{ fontFamily: displayFont, fontWeight: 800, fontSize: '28px', color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {/* Currency label — DM Sans 400 */}
                  <span style={{ fontFamily: bodyFont, fontWeight: 400, fontSize: '14px', color: 'var(--ink3)', marginRight: '4px', letterSpacing: '0.02em' }}>
                    ZMW
                  </span>
                  {selectedPart.price.toLocaleString()}
                </div>
              </div>

              {/* Buttons — DM Sans 600 */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleAction('call')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97]"
                  style={{
                    fontFamily: bodyFont, fontWeight: 600, fontSize: '13px',
                    height: '48px', padding: '0 20px', borderRadius: 'var(--r)',
                    background: 'var(--cream)', border: '1px solid var(--border)', color: 'var(--ink)',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'var(--border)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'var(--cream)')}
                >
                  <IconPhone className="w-4 h-4" />
                  Call Shop
                </button>

                <button
                  onClick={() => handleAction('quote')}
                  disabled={isOut}
                  className="flex-[2] sm:flex-none flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] shadow-sm"
                  style={{
                    fontFamily: bodyFont, fontWeight: 600, fontSize: '13px',
                    height: '48px', padding: '0 24px', borderRadius: 'var(--r)',
                    ...(isOut
                      ? { background: 'var(--border)', color: 'var(--ink3)', cursor: 'not-allowed' }
                      : { background: 'var(--orange)', color: 'white' }),
                  }}
                  onMouseEnter={(e) => { if (!isOut) (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange-dk)'; }}
                  onMouseLeave={(e) => { if (!isOut) (e.currentTarget as HTMLButtonElement).style.background = 'var(--orange)'; }}
                >
                  <IconMessage className="w-4 h-4" />
                  Request Quote
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
