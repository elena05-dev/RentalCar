"use client";

import { useState } from "react";
import { useStore, Vehicle } from "../../store/useStore";

export default function Filters() {
  const setFilters = useStore((s) => s.setFilters);

  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [minMileage, setMinMileage] = useState<string>("");
  const [maxMileage, setMaxMileage] = useState<string>("");

  const applyFilters = () => {
    setFilters({
      brand: brand || undefined,
      rentalPrice: price || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    });
  };

  const handleReset = () => {
    setFilters({});
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
  };

  return (
    <div className="filters" style={{ marginBottom: "20px" }}>
      <input
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <input
        placeholder="Max price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Mileage from"
        type="number"
        value={minMileage}
        onChange={(e) => setMinMileage(e.target.value)}
      />
      <input
        placeholder="Mileage to"
        type="number"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}
      />
      <button onClick={applyFilters}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
