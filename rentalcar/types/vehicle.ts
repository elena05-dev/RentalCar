// types/vehicle.ts

// Что приходит с бекенда
export interface VehicleApi {
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
  rentalPrice: string; // приходит как string, будем конвертировать в number
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

// То, что используем на фронтенде
export interface Vehicle {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  images: string[]; // массив для фронтенда
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: number; // конвертируем из string в number
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

// Типы для фильтров
export interface Filters {
  brand?: string;
  rentalPrice?: number; // вместо price
  minMileage?: number; // вместо mileageFrom
  maxMileage?: number; // вместо mileageTo
}
