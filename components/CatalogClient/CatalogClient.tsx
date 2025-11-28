"use client";

import { useState } from "react";
import axios from "axios";
import { Vehicle, useStore } from "../../store/useStore";
import VehicleCard from "../VehicleCard/VehicleCard";
import { useRouter } from "next/navigation";
import css from "./CatalogClient.module.css";

import Dropdown from "../Dropdown/Dropdown";

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

interface CatalogClientProps {
  initialVehicles: Vehicle[];
}

export default function CatalogClient({ initialVehicles }: CatalogClientProps) {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Фильтры
  const [brandFilter, setBrandFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [minMileage, setMinMileage] = useState<string>("");
  const [maxMileage, setMaxMileage] = useState<string>("");

  // Zustand store
  const favorites = useStore((s) => s.favorites);
  const addFavorite = useStore((s) => s.addFavorite);
  const removeFavorite = useStore((s) => s.removeFavorite);

  // Fetch с backend + фильтры
  const fetchVehicles = async (pageNum: number = 1) => {
    setLoading(true);
    try {
      const params: VehicleQueryParams = { page: pageNum, limit: 10 };

      if (brandFilter) params.brand = brandFilter;
      if (priceFilter) params.rentalPrice = priceFilter;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      const res = await axios.get<CarsResponse>(
        "https://car-rental-api.goit.global/cars",
        {
          params,
        }
      );

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

  // Применить фильтры
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVehicles(1);
  };

  // Сброс фильтров
  const handleReset = () => {
    setBrandFilter("");
    setPriceFilter("");
    setMinMileage("");
    setMaxMileage("");
    fetchVehicles(1);
  };

  const brands = ["BMW", "Audi", "Mercedes", "Toyota", "Honda"];

  // Load More
  const handleLoadMore = () => fetchVehicles(page + 1);

  return (
    <div className={css.container}>
      {/* Фильтры */}
      <form className={css.form} onSubmit={handleFilterSubmit}>
        <div className={css.formField}>
          <label className={css.text}>Car brand</label>
          <div className={css.item}>
            <Dropdown
              label="Choose a brand"
              options={brands}
              selected={brandFilter}
              onChange={setBrandFilter}
            />
          </div>
        </div>

        <div className={css.formField}>
          <label className={css.text}>Price/ 1 hour</label>
          <input
            className={css.item}
            type="text"
            placeholder="Choose a price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>
        <div className={css.formField}>
          <label className={css.text}>Car mileage / km</label>
          <div className={css.rangeInputs}>
            <input
              className={css.itemMileage}
              type="text"
              placeholder="From"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
            />
            <input
              type="text"
              placeholder="To"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {/* ======= КАТАЛОГ МАШИН ======= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {vehicles.map((v) => (
          <div key={v.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <VehicleCard vehicle={v} />
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
