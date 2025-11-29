// lib/api.ts
import axios from "axios";

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  rentalPrice: number;
  mileage: number;
  description: string;
  img: string;
}

interface VehicleFilters {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

const BASE_URL = "https://car-rental-api.goit.global";

export async function fetchVehicles(
  page: number = 1,
  limit: number = 12,
  filters?: VehicleFilters
): Promise<{ cars: Vehicle[]; page: number; totalPages: number }> {
  try {
    const params: VehicleFilters & { page: number; limit: number } = {
      page,
      limit,
      ...filters,
    };
    const { data } = await axios.get<{
      cars: Vehicle[];
      page: number;
      totalPages: number;
    }>(`${BASE_URL}/cars`, { params });
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Failed to fetch vehicles");
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetchVehicles();
    const cars = res.cars;
    return cars.find((v) => v.id === id) || null;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    return null;
  }
}
