"use client";

import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import { Filters as FiltersType } from "../../types/vehicle";

export default function Filters() {
  const setFilters = useStore((s) => s.setFilters);

  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [minMileage, setMinMileage] = useState<number | undefined>(undefined);
  const [maxMileage, setMaxMileage] = useState<number | undefined>(undefined);

  const applyFilters = () => {
    const newFilters: FiltersType = {
      brand: brand || undefined,
      rentalPrice: price,
      minMileage,
      maxMileage,
    };
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({}); // сбрасываем все фильтры, Zustand обнуляет vehicles и page
    setBrand("");
    setPrice(undefined);
    setMinMileage(undefined);
    setMaxMileage(undefined);
  };

  return (
    <div className="filters">
      <input
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        placeholder="Max price"
        type="number"
        value={price ?? ""}
        onChange={(e) =>
          setPrice(e.target.value ? Number(e.target.value) : undefined)
        }
      />
      <input
        placeholder="Mileage from"
        type="number"
        value={minMileage ?? ""}
        onChange={(e) =>
          setMinMileage(e.target.value ? Number(e.target.value) : undefined)
        }
      />
      <input
        placeholder="Mileage to"
        type="number"
        value={maxMileage ?? ""}
        onChange={(e) =>
          setMaxMileage(e.target.value ? Number(e.target.value) : undefined)
        }
      />
      <button onClick={applyFilters}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
