// store/useStore.ts
import { create } from "zustand";
import { Vehicle, Filters } from "../types/vehicle";

export interface StoreState {
  vehicles: Vehicle[];
  favorites: string[];
  page: number;
  pageSize: number;
  filters: Filters;
  loading: boolean;

  // Методы для управления состоянием
  setVehicles: (vehicles: Vehicle[], reset?: boolean) => void;
  appendVehicles: (vehicles: Vehicle[]) => void;
  setPage: (page: number) => void;
  setFilters: (filters: Filters) => void;
  setLoading: (loading: boolean) => void;
  toggleFavorite: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  vehicles: [],
  favorites: [],
  page: 1,
  pageSize: 10,
  filters: {},
  loading: false,

  setVehicles: (vehicles, reset = false) =>
    set((state) => ({
      vehicles: reset ? vehicles : [...state.vehicles, ...vehicles],
    })),

  appendVehicles: (vehicles) =>
    set((state) => ({
      vehicles: [...state.vehicles, ...vehicles],
    })),

  setPage: (page) => set({ page }),

  setFilters: (filters) =>
    set({
      filters,
      page: 1,
      vehicles: [],
    }),

  setLoading: (loading) => set({ loading }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
}));
