"use client";
import { useStore } from "../../../store/useStore";
import VehicleCard from "../../../components/VehicleCard/VehicleCard";

export default function VehicleDetailsClient({ id }: { id: string }) {
  const vehicle = useStore((s) => s.vehicles.find((v) => v.id === id));

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <VehicleCard v={vehicle} />
    </div>
  );
}
