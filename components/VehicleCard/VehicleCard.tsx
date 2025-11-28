import Image from "next/image";
import { Vehicle } from "../../store/useStore";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatMileage = (mileage: number) =>
    mileage.toLocaleString("ru-RU") + " km";

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}
    >
      <Image
        src={vehicle.img}
        alt={`${vehicle.brand} ${vehicle.model}`}
        width={400}
        height={250}
        style={{ borderRadius: "8px" }}
        priority={true}
      />
      <h3>
        {vehicle.brand} {vehicle.model} ({vehicle.year})
      </h3>
      <p>{vehicle.description}</p>
      <p>Цена: ${vehicle.rentalPrice}/день</p>
      <p>Пробег: {formatMileage(vehicle.mileage)}</p>
    </div>
  );
}
