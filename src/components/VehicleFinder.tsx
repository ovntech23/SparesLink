"use client";

import React from 'react';
import { IconCar, IconChevronDown, IconRefresh } from '@tabler/icons-react';
import { useStore } from '@/store/useStore';
import { VEHICLE_DATA } from '@/lib/data';

const bodyFont = 'var(--font-body)';

export const VehicleFinder: React.FC = () => {
  const {
    selectedMake, selectedModel, selectedYear,
    setSelectedMake, setSelectedModel, setSelectedYear,
    resetVehicleFilter, showToast,
  } = useStore();

  const years  = Array.from({ length: 35 }, (_, i) => (2024 - i).toString());
  const makes  = Object.keys(VEHICLE_DATA);
  const models = selectedMake ? VEHICLE_DATA[selectedMake] : [];

  const handleFindParts = () => {
    if (!selectedMake) { showToast('Please select at least a Make to filter.'); return; }
    const desc = `${selectedYear ? selectedYear + ' ' : ''}${selectedMake}${selectedModel ? ' ' + selectedModel : ''}`;
    showToast(`Filtering by ${desc}`);
  };

  const hasFilter = selectedMake || selectedModel || selectedYear;

  const selectStyle: React.CSSProperties = {
    fontFamily: bodyFont,
    fontWeight: 500,
    fontSize: '13px',
    color: 'var(--ink)',
    background: 'var(--cream)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--rs)',
    height: '44px',
    width: '100%',
    paddingLeft: '14px',
    paddingRight: '36px',
    outline: 'none',
    appearance: 'none' as const,
    cursor: 'pointer',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: bodyFont,
    fontWeight: 700,
    fontSize: '10px',
    color: 'var(--ink3)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <div
      className="w-full"
      style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '20px 20px 24px' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between pb-4 mb-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--orange-lt)', color: 'var(--orange)' }}
          >
            <IconCar className="w-4 h-4" />
          </div>
          <div>
            {/* Widget title — Syne 800 */}
            <h3
              className="font-heading"
              style={{ fontSize: '14px', color: 'var(--ink)', letterSpacing: '-0.02em' }}
            >
              Vehicle Finder
            </h3>
            {/* Subtitle — DM Sans 300 */}
            <p style={{ fontFamily: bodyFont, fontWeight: 300, fontSize: '11px', color: 'var(--ink3)', marginTop: '1px' }}>
              Find compatible spares quickly
            </p>
          </div>
        </div>

        {hasFilter && (
          <button
            onClick={resetVehicleFilter}
            className="flex items-center gap-1 transition-colors duration-150"
            style={{ fontFamily: bodyFont, fontWeight: 700, fontSize: '10px', color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--orange)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--ink3)')}
          >
            <IconRefresh className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Make */}
        <div>
          <label style={labelStyle}>Vehicle Make</label>
          <div className="relative">
            <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)} style={selectStyle}>
              <option value="">Select Make</option>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <IconChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink3)' }} />
          </div>
        </div>

        {/* Model */}
        <div>
          <label style={labelStyle}>Vehicle Model</label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake}
              style={{ ...selectStyle, opacity: selectedMake ? 1 : 0.55, cursor: selectedMake ? 'pointer' : 'not-allowed' }}
            >
              <option value="">Select Model</option>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <IconChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink3)' }} />
          </div>
        </div>

        {/* Year */}
        <div>
          <label style={labelStyle}>Year</label>
          <div className="relative">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={selectStyle}>
              <option value="">Select Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <IconChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--ink3)' }} />
          </div>
        </div>

        {/* CTA — DM Sans 600 */}
        <button
          onClick={handleFindParts}
          className="transition-premium active:scale-[0.98]"
          style={{
            fontFamily: bodyFont,
            fontWeight: 600,
            fontSize: '14px',
            color: 'white',
            backgroundColor: 'var(--orange)',
            height: '44px',
            borderRadius: 'var(--rs)',
            marginTop: '4px',
            boxShadow: '0 2px 8px rgba(232,80,10,0.20)',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange-dk)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--orange)')}
        >
          Find Parts
        </button>
      </div>
    </div>
  );
};
