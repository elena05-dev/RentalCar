"use client";

import Image from "next/image";
import { Vehicle } from "../../../lib/api";

interface VehicleDetailsClientProps {
  vehicle: Vehicle;
}

export default function VehicleDetailsClient({
  vehicle,
}: VehicleDetailsClientProps) {
  return (
    <div>
      <h1>
        {vehicle.brand} {vehicle.model}
      </h1>

      <Image
        src={vehicle.img}
        alt={`${vehicle.brand} ${vehicle.model}`}
        width={600} // указываем ширину
        height={400} // указываем высоту
        style={{ objectFit: "cover" }} // можно подогнать под дизайн
      />

      <p>Цена: {vehicle.rentalPrice}</p>
      <p>Пробег: {vehicle.mileage}</p>
      <p>{vehicle.description}</p>
    </div>
  );
}
