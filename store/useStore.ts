// store/useStore.ts
"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Vehicle = {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
};

type Filters = {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

type State = {
  vehicles: Vehicle[];
  favorites: string[]; // массив id
  filters: Filters;
  setVehicles: (v: Vehicle[]) => void;
  clearVehicles: () => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setFilters: (f: Partial<Filters>) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      vehicles: [],
      favorites: [],
      filters: {},
      setVehicles: (v) => set({ vehicles: v }),
      clearVehicles: () => set({ vehicles: [] }),
      addFavorite: (id) =>
        set((state) => ({
          favorites: Array.from(new Set([...state.favorites, id])),
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        })),
      setFilters: (f) =>
        set((state) => ({ filters: { ...state.filters, ...f } })),
    }),
    {
      name: "rentalcar-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
