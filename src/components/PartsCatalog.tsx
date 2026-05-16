"use client";

import React, { useMemo } from 'react';
import { FilterChips } from '@/components/FilterChips';
import { PartCard } from '@/components/PartCard';
import { PartModal } from '@/components/PartModal';
import { Toast } from '@/components/Toast';
import { useStore } from '@/store/useStore';
import { Part } from '@/types';
import { IconBoxOff } from '@tabler/icons-react';

interface PartsCatalogProps {
  parts: Part[];
}

export function PartsCatalog({ parts }: PartsCatalogProps) {
  const {
    searchQuery,
    vehicleTypeFilter,
    selectedMake,
    selectedModel,
    selectedYear,
    activeCategory,
    conditionFilter,
    sortBy,
  } = useStore();

  const filteredAndSortedParts = useMemo(() => {
    let results = [...parts];

    // 1. Text Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(part =>
        part.name.toLowerCase().includes(q) ||
        part.compat.toLowerCase().includes(q) ||
        part.shopName.toLowerCase().includes(q) ||
        (part.description && part.description.toLowerCase().includes(q)) ||
        (part.oemNumber && part.oemNumber.toLowerCase().includes(q))
      );
    }

    // 2. Vehicle Type Selection Dropdown Filter
    if (vehicleTypeFilter !== 'All Vehicles') {
      results = results.filter(part => part.vehicleType === vehicleTypeFilter);
    }

    // 3. Vehicle Finder Widget Filters
    if (selectedMake) {
      results = results.filter(part => part.make === selectedMake);
    }
    if (selectedModel) {
      results = results.filter(part => part.model === selectedModel);
    }
    // Year filtering: check if the selected year falls within the part's compatibility range
    if (selectedYear) {
      const yr = parseInt(selectedYear);
      results = results.filter(part => {
        const from = part.yearFrom || 1900;
        const to = part.yearTo || 2025;
        return yr >= from && yr <= to;
      });
    }

    // 4. Category Chips Filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'in_stock') {
        results = results.filter(part => part.stock !== 'out');
      } else {
        results = results.filter(part => part.category === activeCategory);
      }
    }

    // 5. Condition Filter (Brand New / Used / Remanufactured)
    if (conditionFilter !== 'all') {
      results = results.filter(part => (part.condition ?? 'NEW') === conditionFilter);
    }

    // 6. Sort Logic
    switch (sortBy) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.reverse();
        break;
      case 'relevance':
      default:
        results.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
        break;
    }

    return results;
  }, [
    parts,
    searchQuery,
    vehicleTypeFilter,
    selectedMake,
    selectedModel,
    selectedYear,
    activeCategory,
    conditionFilter,
    sortBy,
  ]);

  return (
    <>
      {/* Filter/Sorting Controller Bar */}
      <div className="mt-6">
        <FilterChips />
      </div>

      {/* Result Count Label */}
      <div className="mt-6 mb-5 flex items-center justify-between">
        <p className="text-[13px] text-brand-ink3 font-dmsans">
          Showing{' '}
          <span
            className="font-heading font-extrabold text-brand-ink"
            style={{ fontSize: '16px' }}
          >
            {filteredAndSortedParts.length}
          </span>{' '}
          <span className="font-medium text-brand-ink2">
            {filteredAndSortedParts.length === 1 ? 'part' : 'parts'} available
          </span>
        </p>
      </div>

      {/* Dynamic Parts Catalog Grid */}
      {filteredAndSortedParts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredAndSortedParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-brand-border border-dashed rounded-r text-center">
          <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-ink3 mb-4">
            <IconBoxOff className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h3 className="font-heading text-lg text-brand-ink mb-1">No Compatible Spares Found</h3>
          <p className="text-[13px] text-brand-ink3 max-w-sm mb-6 font-dmsans">
            We couldn&apos;t find matching parts. Try clearing or broadening your search and vehicle filters.
          </p>
        </div>
      )}

      {/* Dynamic Modal Overlays & Toasts — must live inside the client boundary */}
      <PartModal />
      <Toast />
    </>
  );
}
