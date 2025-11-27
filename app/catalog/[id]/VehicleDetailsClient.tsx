"use client";

import { useState } from "react";
import { useStore, Vehicle } from "../../../store/useStore";
import VehicleCard from "../../../components/VehicleCard/VehicleCard";
import axios from "axios";

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetailsClient({ vehicle }: VehicleDetailsProps) {
  const { favorites, addFavorite, removeFavorite } = useStore((s) => ({
    favorites: s.favorites,
    addFavorite: s.addFavorite,
    removeFavorite: s.removeFavorite,
  }));

  const isFav = favorites.includes(vehicle.id);
  const [form, setForm] = useState({ name: "", phone: "", from: "", to: "" });
  const [loading, setLoading] = useState(false);

  const toggleFavorite = () => {
    if (isFav) removeFavorite(vehicle.id);
    else addFavorite(vehicle.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/bookings", { vehicleId: vehicle.id, ...form });
      alert("Бронь успешна!");
      setForm({ name: "", phone: "", from: "", to: "" });
    } catch (err) {
      alert("Ошибка бронирования");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={toggleFavorite}>
        {isFav ? "Убрать из избранного" : "Добавить в избранное"}
      </button>

      <VehicleCard v={vehicle} />

      <h3>Форма бронирования</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          placeholder="Имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <label>
          Дата начала:
          <input
            type="date"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            required
          />
        </label>
        <label>
          Дата окончания:
          <input
            type="date"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Бронирование..." : "Забронировать"}
        </button>
      </form>
    </div>
  );
}
