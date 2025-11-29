import Image from "next/image";
import { Vehicle } from "../../store/useStore";
import css from "./VehicleCard.module.css";
import { useRouter } from "next/navigation";
import { useStore } from "../../store/useStore";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useRouter();

  const formatMileage = (mileage: number) =>
    mileage.toLocaleString("ru-RU") + " km";

  const parts = vehicle.address.split(",").map((v) => v.trim());
  const city = parts[parts.length - 2];
  const country = parts[parts.length - 1];
  const info = [city, country, vehicle.rentalCompany].filter(Boolean);

  // Подписка на текущее состояние favorites для данной карточки
  const isFavorite = useStore((s) => s.favorites.includes(vehicle.id));

  // Методы изменения favorites
  const addFavorite = useStore((s) => s.addFavorite);
  const removeFavorite = useStore((s) => s.removeFavorite);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(vehicle.id);
    } else {
      addFavorite(vehicle.id);
    }
  };

  return (
    <div className={css.VehicleCard}>
      <div className={css.imageWrapper}>
        <Image
          src={vehicle.img}
          alt={`${vehicle.brand} ${vehicle.model}`}
          width={276}
          height={268}
          priority={true}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <button
          className={`${css.favoriteIcon} ${isFavorite ? css.active : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        >
          <Image
            src={isFavorite ? "/VectorActive.svg" : "/Vector.svg"}
            alt="favorite"
            width={16}
            height={15}
          />
        </button>
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
        <button
          className={`${css.favoriteBtn} ${isFavorite ? css.active : ""}`}
          onClick={handleFavoriteClick}
          aria-label="Add to favorites"
        />
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
