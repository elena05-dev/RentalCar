import Image from "next/image";
import { Vehicle } from "../../store/useStore";
import css from "./VehicleCard.module.css";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();

  const formatMileage = (mileage: number) =>
    mileage.toLocaleString("en-US") + " km";

  const parts = vehicle.address.split(",").map((v) => v.trim());
  const city = parts[parts.length - 2];
  const country = parts[parts.length - 1];
  const info = [city, country, vehicle.rentalCompany].filter(Boolean);

  return (
    <div className={css.VehicleCard}>
      <div className={css.imageWrapper}>
        <Image
          src={vehicle.img}
          alt={`${vehicle.brand} ${vehicle.model}`}
          width={276}
          height={268}
          priority
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
        <FavoriteButton vehicleId={vehicle.id} className={css.favoriteIcon} />
      </div>
      <h3 className={css.title}>
        <div className={css.titleLeft}>
          <span className={css.brand}>{vehicle.brand}</span>{" "}
          <span className={css.model}>{vehicle.model}</span>, {vehicle.year}
        </div>
        <div className={css.price}>${vehicle.rentalPrice}</div>
      </h3>

      <div className={css.location}>
        {info.map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
      <div className={css.specs}>
        <span>{vehicle.type}</span>
        <span>{formatMileage(vehicle.mileage)}</span>
      </div>
      <button
        className={css.button}
        onClick={() => router.push(`/catalog/${vehicle.id}`)}
      >
        Read More
      </button>
    </div>
  );
}
