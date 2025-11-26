// lib/vehiclesApi.ts
import axios from "axios";
import { Vehicle, VehicleApi, VehiclesApiResponse } from "../types/vehicle";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function fetchVehicles(params?: {
  page?: number;
  limit?: number;
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
}) {
  const { data } = await axios.get<VehiclesApiResponse>(`${API_BASE}/cars`, {
    params,
  });

  const cars: Vehicle[] = data.cars.map((c: VehicleApi) => ({
    id: c.id,
    brand: c.brand,
    model: c.model,
    year: c.year,
    type: c.type,
    images: [c.img],
    description: c.description,
    fuelConsumption: c.fuelConsumption,
    engineSize: c.engineSize,
    accessories: c.accessories,
    functionalities: c.functionalities,
    rentalPrice: Number(c.rentalPrice),
    rentalCompany: c.rentalCompany,
    address: c.address,
    rentalConditions: c.rentalConditions,
    mileage: c.mileage,
  }));

  return {
    cars,
    totalCars: data.totalCars,
    page: data.page,
    totalPages: data.totalPages,
  };
}

export async function fetchVehicleById(id: string) {
  const { data } = await axios.get<VehicleApi>(`${API_BASE}/cars/${id}`);

  const car: Vehicle = {
    id: data.id,
    brand: data.brand,
    model: data.model,
    year: data.year,
    type: data.type,
    images: [data.img],
    description: data.description,
    fuelConsumption: data.fuelConsumption,
    engineSize: data.engineSize,
    accessories: data.accessories,
    functionalities: data.functionalities,
    rentalPrice: Number(data.rentalPrice),
    rentalCompany: data.rentalCompany,
    address: data.address,
    rentalConditions: data.rentalConditions,
    mileage: data.mileage,
  };

  return car;
}
