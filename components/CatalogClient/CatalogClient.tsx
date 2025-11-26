"use client";

import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import VehicleCard from "../VehicleCard/VehicleCard";
import Filters from "../Filters/Filters";
import { fetchVehicles } from "../../lib/vehiclesApi";
import css from "./CatalogClient.module.css";

export default function CatalogClient() {
  const {
    vehicles,
    favorites,
    page,
    pageSize,
    filters,
    loading,
    setVehicles,
    setPage,
    setLoading,
  } = useStore();

  useEffect(() => {
    let cancelled = false;

    async function loadVehicles() {
      setLoading(true);

      try {
        // fetchVehicles возвращает { cars: Vehicle[], totalCars, page, totalPages }
        const data = await fetchVehicles({
          page,
          limit: pageSize,
          brand: filters.brand,
          rentalPrice: filters.rentalPrice,
          minMileage: filters.minMileage,
          maxMileage: filters.maxMileage,
        });

        if (cancelled) return;

        // данные уже Vehicle[], преобразования не нужны
        if (page === 1) setVehicles(data.cars, true);
        // сброс старых данных на первой странице
        else setVehicles(data.cars); // добавление новых данных при пагинации
      } catch (err) {
        console.error("Error loading vehicles:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVehicles();

    return () => {
      cancelled = true;
    };
  }, [page, pageSize, filters, setVehicles, setLoading]);

  const handleLoadMore = () => setPage(page + 1);

  return (
    <main className={css.main}>
      <h1 className={css.title}>Catalog</h1>
      <Filters />

      <section className={css.grid}>
        {vehicles.map((v) => (
          <VehicleCard key={v.id} v={v} isFavorite={favorites.includes(v.id)} />
        ))}
      </section>

      {!loading && vehicles.length > 0 && (
        <button className={css.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {loading && <p className={css.loading}>Loading...</p>}
    </main>
  );
}
