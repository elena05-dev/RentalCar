import axios from "axios";
import { Vehicle } from "../store/useStore";

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
  } catch {
    throw new Error("Failed to fetch vehicles");
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const { data } = await axios.get<Vehicle>(`${BASE_URL}/cars/${id}`);
    return data;
  } catch {
    return null;
  }
}
