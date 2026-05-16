export type VehicleType = 'Cars & SUVs' | 'Motorcycles' | 'Trucks & HGVs' | 'Agricultural/Mining';

export type PartCategory = 'engine' | 'brakes' | 'electrical' | 'suspension' | 'body' | 'tyres';

export type StockStatus = 'in' | 'low' | 'out';

export interface Shop {
  id: string;
  name: string;
  initials: string;
  color: string;
  location: string;
  address?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isPro: boolean;
  isVerified: boolean;
}

export interface Part {
  id: string;
  name: string;
  compat: string;
  category: PartCategory;
  shopId: string;
  shopName: string; // Denormalized for static data simplicity
  shopColor: string;
  location: string;
  price: number;
  stock: StockStatus;
  verified: boolean;
  vehicleType?: VehicleType;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  condition?: 'NEW' | 'USED' | 'REMANUFACTURED';
  warrantyMonths?: number;
  oemNumber?: string;
  description?: string;
}
