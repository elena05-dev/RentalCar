"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Vehicle } from "../../store/useStore";
import VehicleCard from "../VehicleCard/VehicleCard";
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

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages ?? 1);
  const [loading, setLoading] = useState<boolean>(false);

  const [brandFilter, setBrandFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [minMileage, setMinMileage] = useState<string>("");
  const [maxMileage, setMaxMileage] = useState<string>("");

  // === Brands from backend ===
  const [brands, setBrands] = useState<string[]>([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get<string[]>(
          "https://car-rental-api.goit.global/brands"
        );
        setBrands(res.data);
      } catch (err) {
        console.error("Error loading brands", err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    setVehicles(initialVehicles);
  }, [initialVehicles]);

  const [hasFetched, setHasFetched] = useState(false);

  // Fetch с backend

  const fetchVehicles = async (pageNum: number = 1) => {
    setLoading(true);
    setHasFetched(false);

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

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchVehicles(page + 1);
    }
  };

  const handleMinMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setMinMileage(raw);
  };

  const handleMaxMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) setMaxMileage(raw);
  };

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

  const price = ["30", "40", "50", "60", "70", "80", "90", "100", "110", "120"];

  return (
    <div className={css.container}>
      {/* =================== Filter =================== */}
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

        {/* =================== Mileage =================== */}
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
      {/* =================== Cards =================== */}
      <div className={css.cardsCatalog}>
        {vehicles.length === 0 && loading && (
          <div className={css.loader}>Loading...</div>
        )}

        {vehicles.length === 0 && !loading && hasFetched && (
          <div className={css.noResults}>No cars found for these filters.</div>
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
