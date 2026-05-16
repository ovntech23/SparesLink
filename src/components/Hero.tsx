"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IconEngine, IconDisc, IconBolt } from '@tabler/icons-react';

/* ─── Car background slides ─── */
const CAR_SLIDES = [
  { src: '/hero_car_1.png', alt: 'Toyota Hilux pickup truck',   label: 'Cars & SUVs'     },
  { src: '/hero_car_2.png', alt: 'BMW 3 Series sedan',          label: 'Sedans & Saloons' },
  { src: '/hero_car_3.png', alt: 'Heavy-duty Isuzu truck',      label: 'Trucks & HGVs'   },
  { src: '/hero_car_4.png', alt: 'Toyota Land Cruiser 200',     label: 'SUVs & 4x4s'     },
  { src: '/hero_car_5.png', alt: 'Nissan Navara on dirt road',  label: 'Pickups & Off-road' },
];

const SLIDE_INTERVAL = 4000; // ms between auto-advance

/* ─── Preview card data ─── */
const PREVIEW_CARDS = [
  { name: 'Hilux Oil Filter',  shop: 'AutoHub Lusaka', price: 480,  dotColor: '#E8500A', icon: <IconEngine className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />, delay: 0    },
  { name: 'Alternator 90A',   shop: 'KitweSpares',    price: 2100, dotColor: '#1B5FA8', icon: <IconBolt    className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />, delay: 0.12 },
  { name: 'Radiator Complete', shop: 'AutoHub Lusaka', price: 4500, dotColor: '#E8500A', icon: <IconDisc    className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.6)' }} />, delay: 0.24 },
];

export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % CAR_SLIDES.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + CAR_SLIDES.length) % CAR_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--ink)', minHeight: '580px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ════════════════════════════════════════════
          1 · ANIMATED CAR IMAGE BACKGROUND
      ════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={CAR_SLIDES[current].src}
              alt={CAR_SLIDES[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover object-center"
              style={{ filter: 'brightness(0.55) saturate(1.0)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays: left reads copy, right fades to edge */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right,  rgba(15,14,12,0.68) 0%, rgba(15,14,12,0.48) 42%, rgba(15,14,12,0.18) 70%, rgba(15,14,12,0.00) 100%),
              linear-gradient(to bottom, rgba(15,14,12,0.00) 0%, rgba(15,14,12,0.00) 55%, rgba(15,14,12,0.55) 100%)
            `,
          }}
        />

        {/* Ambient orange glow centre-right */}
        <div
          className="absolute right-[15%] top-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '480px', height: '480px',
            background: 'radial-gradient(circle, rgba(232,80,10,0.14) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════
          2 · SLIDE DOTS + VEHICLE LABEL (bottom left)
      ════════════════════════════════════════════ */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-20 flex items-center gap-3">
        {/* Animated vehicle type label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.35 }}
            style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px',
              color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', letterSpacing: '0.10em',
            }}
          >
            {CAR_SLIDES[current].label}
          </motion.span>
        </AnimatePresence>

        {/* Divider */}
        <div style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.18)' }} />

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {CAR_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width:  i === current ? '20px' : '6px',
                height: '6px',
                borderRadius: '99px',
                background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.30)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next arrow buttons */}
      {[{ dir: 'prev', fn: prev, pos: 'left-4 sm:left-6' }, { dir: 'next', fn: next, pos: 'right-4 sm:right-6' }].map(({ dir, fn, pos }) => (
        <button
          key={dir}
          onClick={fn}
          className={`absolute top-1/2 -translate-y-1/2 ${pos} z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200`}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: 'rgba(255,255,255,0.70)',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,80,10,0.80)'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.70)'; }}
          aria-label={dir}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {dir === 'prev'
              ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              : <path d="M6 3L11 8L6 13"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            }
          </svg>
        </button>
      ))}

      {/* ════════════════════════════════════════════
          3 · CONTENT LAYER
      ════════════════════════════════════════════ */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        style={{ paddingTop: 'clamp(72px, 9vw, 120px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}
      >

        {/* ── Left: Copy ── */}
        <div className="lg:col-span-7 flex flex-col items-start">

          {/* Region pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--orange)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Zambia &amp; Southern Africa
            </span>
          </motion.div>

          {/* Headline — Syne 800 */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: 'easeOut' }}
            className="font-heading text-white mb-7"
            style={{ fontSize: 'clamp(38px, 4.5vw, 58px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Find the right{' '}
            <span style={{ color: 'var(--orange)' }}>auto spare</span>,{' '}
            <br className="hidden sm:block" />
            right now.
          </motion.h1>

          {/* Sub — DM Sans 300 */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="max-w-lg mb-12"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.52)' }}
          >
            Connecting buyers with verified spares shops across Zambia and Southern Africa.
            Cars, trucks, motorcycles &amp; agricultural vehicles — all in one marketplace.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full flex flex-wrap gap-y-5 gap-x-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
          >
            {[
              { num: '420+', label: 'Verified Shops' },
              { num: '85K+', label: 'Parts Listed' },
              { num: '14',   label: 'Cities Covered' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <div className="w-px self-stretch hidden sm:block" style={{ backgroundColor: 'rgba(255,255,255,0.10)' }} />}
                <div className="flex items-center gap-2.5">
                  <span className="font-heading" style={{ color: 'var(--orange)', fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.02em' }}>
                    {stat.num}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.48)' }}>
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Glass preview cards ── */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col items-end justify-center">
          <div className="relative w-full max-w-[380px] flex flex-col gap-3.5">
            {PREVIEW_CARDS.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 110, delay: card.delay }}
                whileHover={{ scale: 1.025, x: -5, transition: { duration: 0.18 } }}
                className="w-full p-4 flex items-center justify-between gap-4 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 'var(--r)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
                }}
              >
                {/* Icon + text */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: card.dotColor }} />
                    <div className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ backgroundColor: `${card.dotColor}22`, border: `1px solid ${card.dotColor}45` }}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: 'white' }}>
                      {card.name}
                    </h4>
                    <p className="truncate mt-0.5" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.40)' }}>
                      {card.shop}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-full mb-1.5" style={{ background: 'var(--green-lt)', color: 'var(--green)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    In Stock
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '9px', color: 'rgba(255,255,255,0.40)', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: '2px' }}>ZMW</span>
                    <span className="font-heading" style={{ fontSize: '15px', fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
                      {card.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Live label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-1"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}
            >
              Live listings · Updated every 15 minutes
            </motion.p>
          </div>
        </div>

      </div>
    </section>
  );
};
