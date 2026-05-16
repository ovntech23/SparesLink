"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowsVertical, IconSparkles, IconClock, IconTool } from '@tabler/icons-react';
import { useStore, SortOption, ConditionFilter } from '@/store/useStore';
import { PartCategory } from '@/types';

/* ── Condition option config ── */
const CONDITIONS: {
  value: ConditionFilter;
  label: string;
  icon: React.ReactNode;
  activeBg: string;
  activeColor: string;
  activeBorder: string;
}[] = [
  {
    value: 'all',
    label: 'All Conditions',
    icon: null,
    activeBg: 'var(--ink)',
    activeColor: 'white',
    activeBorder: 'var(--ink)',
  },
  {
    value: 'NEW',
    label: 'Brand New',
    icon: <IconSparkles className="w-3.5 h-3.5" />,
    activeBg: '#E8F5EE',
    activeColor: '#1A7A4A',
    activeBorder: 'rgba(26,122,74,0.35)',
  },
  {
    value: 'USED',
    label: 'Used',
    icon: <IconClock className="w-3.5 h-3.5" />,
    activeBg: '#EBF2FB',
    activeColor: '#1B5FA8',
    activeBorder: 'rgba(27,95,168,0.35)',
  },
  {
    value: 'REMANUFACTURED',
    label: 'Remanufactured',
    icon: <IconTool className="w-3.5 h-3.5" />,
    activeBg: '#FEF3E2',
    activeColor: '#B86A00',
    activeBorder: 'rgba(184,106,0,0.35)',
  },
];

/* ── Category chips ── */
const CATEGORIES: { label: string; value: PartCategory | 'all' | 'in_stock' }[] = [
  { label: 'All',        value: 'all' },
  { label: 'Engine',     value: 'engine' },
  { label: 'Brakes',     value: 'brakes' },
  { label: 'Electrical', value: 'electrical' },
  { label: 'Suspension', value: 'suspension' },
  { label: 'Body',       value: 'body' },
  { label: 'In Stock',   value: 'in_stock' },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Relevance',          value: 'relevance'  },
  { label: 'Price: Low to High', value: 'price_asc'  },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest',             value: 'newest'     },
];

export const FilterChips: React.FC = () => {
  const {
    activeCategory, setActiveCategory,
    conditionFilter, setConditionFilter,
    sortBy, setSortBy,
  } = useStore();

  return (
    <div className="w-full flex flex-col gap-3 pb-5 border-b border-brand-border">

      {/* ── Row 1: Category chips + Sort ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

        {/* Category pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
          {CATEGORIES.map((cat, i) => {
            const isActive = activeCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                onClick={() => setActiveCategory(cat.value)}
                className="h-9 px-4 rounded-full text-[13px] font-medium transition-all duration-150 flex-shrink-0 whitespace-nowrap border active:scale-95"
                style={isActive
                  ? { background: 'var(--orange-lt)', borderColor: 'var(--orange)', color: 'var(--orange-dk)', fontWeight: 600 }
                  : { background: 'white', borderColor: 'var(--border)', color: 'var(--ink2)' }
                }
              >
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span
            className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap"
            style={{ color: 'var(--ink3)' }}
          >
            Sort By:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 pl-3.5 pr-8 bg-white border border-brand-border rounded-rs text-[13px] font-medium text-brand-ink outline-none cursor-pointer appearance-none focus:border-brand-orange/60 transition-premium"
              style={{ minWidth: '164px' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <IconArrowsVertical
              className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--ink3)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Row 2: Condition filter ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Label */}
        <span
          className="text-[11px] font-bold uppercase tracking-wider mr-1 flex-shrink-0"
          style={{ color: 'var(--ink3)' }}
        >
          Condition:
        </span>

        {CONDITIONS.map((opt, i) => {
          const isActive = conditionFilter === opt.value;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.22 }}
              onClick={() => setConditionFilter(opt.value)}
              className="flex items-center gap-1.5 h-8 px-3.5 rounded-full text-[12px] font-medium border transition-all duration-150 flex-shrink-0 whitespace-nowrap active:scale-95"
              style={isActive
                ? {
                    background: opt.activeBg,
                    color: opt.activeColor,
                    borderColor: opt.activeBorder,
                    fontWeight: 600,
                    boxShadow: `0 0 0 3px ${opt.activeBorder}`,
                  }
                : {
                    background: 'white',
                    color: 'var(--ink2)',
                    borderColor: 'var(--border)',
                  }
              }
            >
              {opt.icon}
              {opt.label}
            </motion.button>
          );
        })}
      </div>

    </div>
  );
};
