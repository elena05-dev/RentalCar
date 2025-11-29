"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Vehicle, useStore } from "../../store/useStore";
import VehicleCard from "../VehicleCard/VehicleCard";
import { useRouter } from "next/navigation";
import css from "./CatalogClient.module.css";
import Dropdown from "../Dropdown/Dropdown";

type VehicleQueryParams = {
  page: number;
  limit: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
};

interface CarsResponse {
  cars: Vehicle[];
  totalCars: number;
  page: number;
  totalPages: number;
}

interface CatalogClientProps {
  initialVehicles: Vehicle[];
  initialTotalPages?: number;
}

export default function CatalogClient({
  initialVehicles,
  initialTotalPages,
}: CatalogClientProps) {
  const VEHICLES_PER_PAGE = 12;

  // Состояние машин
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages ?? 1);
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

  const router = useRouter();

  // Подгружаем initialVehicles через useEffect, чтобы синхронизировать с Zustand
  useEffect(() => {
    setVehicles(initialVehicles);
  }, [initialVehicles]);

  const [hasFetched, setHasFetched] = useState(false);

  // Fetch с backend

  const fetchVehicles = async (pageNum: number = 1) => {
    // === старт загрузки ===
    setLoading(true);
    setHasFetched(false);

    // минимальное время показа спиннера (например 300ms)
    const minLoaderTime = 300;
    const startTime = Date.now();

    try {
      const params: VehicleQueryParams = {
        page: pageNum,
        limit: VEHICLES_PER_PAGE,
      };

      if (brandFilter) params.brand = brandFilter;
      if (priceFilter) params.rentalPrice = priceFilter;
      if (minMileage !== "") params.minMileage = minMileage.toString();
      if (maxMileage !== "") params.maxMileage = maxMileage.toString();

      const res = await axios.get<CarsResponse>(
        "https://car-rental-api.goit.global/cars",
        { params }
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
      alert("Error loading vehicles");
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = minLoaderTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => {
          setLoading(false);
          setHasFetched(true);
        }, remaining);
      } else {
        setLoading(false);
        setHasFetched(true);
      }
    }
  };

  // Load More
  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchVehicles(page + 1);
    }
  };

  // Handlers фильтров
  const handleMinMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setMinMileage(raw);
  };

  const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setMaxMileage(raw);
  };

  // функция для сброса фильтров и старых результатов
  const handleResetFilters = () => {
    setBrandFilter("");
    setPriceFilter("");
    setMinMileage("");
    setMaxMileage("");
    setVehicles([]);
    setPage(1);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleResetFilters();
    fetchVehicles(1);
    setVehicles([]);
  };

  const brands = [
    "BMW",
    "Audi",
    "Mercedes",
    "Toyota",
    "Honda",
    "Aston Martin",
    "Bentley",
    "Buick",
    "Chevrolet",
    "Chrysler",
    "GMC",
    "HUMMER",
    "Volvo",
    "Mitsubishi",
  ];

  const price = ["30", "40", "50", "60", "70", "80", "90", "100", "110", "120"];

  return (
    <div className={css.container}>
      {/* =================== Фильтры =================== */}
      <form className={css.form} onSubmit={handleFilterSubmit}>
        <div className={css.formField}>
          <label className={css.text}>Car brand</label>
          <div className={css.item}>
            <Dropdown
              size="large"
              label={brandFilter ? brandFilter : "Choose a brand"}
              options={brands}
              selected={brandFilter}
              onChange={setBrandFilter}
            />
          </div>
        </div>

        <div className={css.formField}>
          <label className={css.text}>Price/ 1 hour</label>
          <div className={css.item}>
            <Dropdown
              size="small"
              label={priceFilter ? `To $${priceFilter}` : "Choose a price"}
              options={price}
              selected={priceFilter}
              onChange={setPriceFilter}
            />
          </div>
        </div>

        {/* =================== Поля пробега =================== */}
        <div className={css.rangeInputs}>
          <label className={css.text}>Сar mileage / km</label>{" "}
          <div className={css.inputsRow}>
            <div className={css.inputWrapper}>
              <span className={css.prefix}>From</span>
              <input
                className={css.minMileage}
                type="text"
                value={
                  minMileage ? Number(minMileage).toLocaleString("en-US") : ""
                }
                onChange={handleMinMileageChange}
                placeholder=""
              />
            </div>
            <div className={css.inputWrapper}>
              <span className={css.prefix}>To</span>
              <input
                className={css.maxMileage}
                type="text"
                value={
                  maxMileage ? Number(maxMileage).toLocaleString("en-US") : ""
                }
                onChange={handleMaxMileageChange}
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className={css.btSeach}>
          <button className={css.buttonSeach} type="submit" disabled={loading}>
            Search
          </button>
        </div>
      </form>
      {/* =================== КАТАЛОГ МАШИН =================== */}
      <div className={css.cardsCatalog}>
        {vehicles.length === 0 && loading && (
          <div className={css.loader}>Loading...</div> // первичная загрузка
        )}

        {vehicles.length === 0 && !loading && hasFetched && (
          <div className={css.noResults}>No cars found for these filters.</div> // нет результатов
        )}

        {vehicles.length > 0 && (
          <>
            <div className={css.cardsBox}>
              {vehicles.map((v) => (
                <div key={v.id}>
                  <VehicleCard vehicle={v} />
                </div>
              ))}
            </div>

            {/* Load More */}
            {page < totalPages && (
              <button
                className={css.loadMoreBtn}
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
