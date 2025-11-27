// components/CatalogClient/CatalogClient.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { Vehicle, useStore } from "../../store/useStore";
import VehicleCard from "../VehicleCard/VehicleCard";
import { useRouter } from "next/navigation";

interface CatalogClientProps {
  initialVehicles: Vehicle[];
}

interface VehicleQueryParams {
  page: number;
  limit: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

interface CarsResponse {
  cars: Vehicle[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export default function CatalogClient({ initialVehicles }: CatalogClientProps) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const { favorites, addFavorite, removeFavorite } = useStore((s) => ({
    favorites: s.favorites,
    addFavorite: s.addFavorite,
    removeFavorite: s.removeFavorite,
  }));

  // Функция для fetch с backend с фильтрами и пагинацией
  const fetchVehicles = async (pageNum = 1) => {
    setLoading(true);
    try {
      const params: VehicleQueryParams = { page: pageNum, limit: 10 };
      if (brandFilter) params.brand = brandFilter;
      if (priceFilter) params.rentalPrice = priceFilter;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
        params,
      });

      if (pageNum === 1) {
        setVehicles(res.data.cars);
      } else {
        setVehicles((prev) => [...prev, ...res.data.cars]);
      }
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  // Применяем фильтры
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVehicles(1);
  };

  // Load More
  const handleLoadMore = () => {
    fetchVehicles(page + 1);
  };

  // Чистка фильтров
  const clearFilters = () => {
    setBrandFilter("");
    setPriceFilter("");
    setMinMileage("");
    setMaxMileage("");
    fetchVehicles(1);
  };

  return (
    <div>
      <h2>Каталог автомобилей</h2>

      {/* Фильтры */}
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Бренд"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Цена"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Мин. пробег"
          value={minMileage}
          onChange={(e) => setMinMileage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Макс. пробег"
          value={maxMileage}
          onChange={(e) => setMaxMileage(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Применить
        </button>
        <button type="button" onClick={clearFilters} disabled={loading}>
          Сбросить
        </button>
      </form>

      {/* Сетка автомобилей */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {vehicles.map((v) => (
          <div key={v.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <VehicleCard v={v} />
            <button onClick={() => router.push(`/catalog/${v.id}`)}>
              Read More
            </button>
            <button
              onClick={() =>
                favorites.includes(v.id)
                  ? removeFavorite(v.id)
                  : addFavorite(v.id)
              }
            >
              {favorites.includes(v.id)
                ? "Убрать из избранного"
                : "Добавить в избранное"}
            </button>
          </div>
        ))}
      </div>

      {/* Load More */}
      {page < totalPages && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "Загрузка..." : "Load More"}
        </button>
      )}
    </div>
  );
}
