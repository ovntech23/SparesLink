import { create } from 'zustand';
import { Part, PartCategory, VehicleType } from '@/types';

export type SortOption      = 'relevance' | 'price_asc' | 'price_desc' | 'newest';
export type ConditionFilter = 'all' | 'NEW' | 'USED' | 'REMANUFACTURED';

interface StoreState {
  // ── Filters ──────────────────────────────────────────────
  searchQuery:       string;
  vehicleTypeFilter: VehicleType | 'All Vehicles';
  selectedMake:      string;
  selectedModel:     string;
  selectedYear:      string;
  activeCategory:    PartCategory | 'all' | 'in_stock';
  conditionFilter:   ConditionFilter;
  sortBy:            SortOption;

  // ── UI state ─────────────────────────────────────────────
  selectedPart: Part | null;
  toast: { message: string; visible: boolean } | null;

  // ── Actions ──────────────────────────────────────────────
  setSearchQuery:       (query: string) => void;
  setVehicleTypeFilter: (type: VehicleType | 'All Vehicles') => void;
  setSelectedMake:      (make: string) => void;
  setSelectedModel:     (model: string) => void;
  setSelectedYear:      (year: string) => void;
  setActiveCategory:    (category: PartCategory | 'all' | 'in_stock') => void;
  setConditionFilter:   (condition: ConditionFilter) => void;
  setSortBy:            (option: SortOption) => void;

  setSelectedPart: (part: Part | null) => void;
  showToast:       (message: string) => void;
  hideToast:       () => void;
  resetVehicleFilter: () => void;
}

export const useStore = create<StoreState>((set) => ({
  searchQuery:       '',
  vehicleTypeFilter: 'All Vehicles',
  selectedMake:      '',
  selectedModel:     '',
  selectedYear:      '',
  activeCategory:    'all',
  conditionFilter:   'all',
  sortBy:            'relevance',

  selectedPart: null,
  toast:        null,

  setSearchQuery:       (query)    => set({ searchQuery: query }),
  setVehicleTypeFilter: (type)     => set({ vehicleTypeFilter: type }),
  setSelectedMake:      (make)     => set({ selectedMake: make, selectedModel: '' }),
  setSelectedModel:     (model)    => set({ selectedModel: model }),
  setSelectedYear:      (year)     => set({ selectedYear: year }),
  setActiveCategory:    (category) => set({ activeCategory: category }),
  setConditionFilter:   (condition)=> set({ conditionFilter: condition }),
  setSortBy:            (option)   => set({ sortBy: option }),

  setSelectedPart: (part) => set({ selectedPart: part }),

  showToast: (message) => set({ toast: { message, visible: true } }),
  hideToast: () => set((state) => ({
    toast: state.toast ? { ...state.toast, visible: false } : null,
  })),

  resetVehicleFilter: () => set({ selectedMake: '', selectedModel: '', selectedYear: '' }),
}));
