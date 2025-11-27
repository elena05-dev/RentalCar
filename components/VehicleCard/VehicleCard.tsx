import Image from "next/image";
import { Vehicle } from "../../store/useStore";

interface VehicleCardProps {
  v: Vehicle;
}

export default function VehicleCard({ v }: VehicleCardProps) {
  const formatMileage = (mileage: number) =>
    mileage.toLocaleString("ru-RU") + " km";

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}
    >
      <Image
        src={v.img}
        alt={`${v.brand} ${v.model}`}
        width={400} // можно подбирать под макет
        height={250} // пропорционально
        style={{ borderRadius: "8px" }}
        priority={true} // если важно для LCP
      />
      <h3>
        {v.brand} {v.model} ({v.year})
      </h3>
      <p>{v.description}</p>
      <p>Цена: ${v.rentalPrice}/день</p>
      <p>Пробег: {formatMileage(v.mileage)}</p>
    </div>
  );
}
