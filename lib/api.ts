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

const BASE_URL = "https://car-rental-api.goit.global";

export async function fetchVehicles(): Promise<Vehicle[]> {
  try {
    const { data } = await axios.get<{ cars: Vehicle[] }>(`${BASE_URL}/cars`, {
      params: { page: 1, limit: 100 },
    });
    return data.cars;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    throw new Error("Failed to fetch vehicles");
  }
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const cars = await fetchVehicles();
    return cars.find((v) => v.id === id) || null;
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
    return null;
  }
}
