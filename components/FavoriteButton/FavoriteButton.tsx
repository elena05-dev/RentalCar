import { useStore } from "../../store/useStore";
import css from "./FavoriteButton.module.css";
import Image from "next/image";

interface FavoriteButtonProps {
  vehicleId: string;
  className?: string;
}

export default function FavoriteButton({
  vehicleId,
  className,
}: FavoriteButtonProps) {
  const isFavorite = useStore((s) => s.favorites.includes(vehicleId));
  const addFavorite = useStore((s) => s.addFavorite);
  const removeFavorite = useStore((s) => s.removeFavorite);

  const handleClick = () => {
    if (isFavorite) removeFavorite(vehicleId);
    else addFavorite(vehicleId);
  };

  return (
    <button
      className={`${css.favoriteBtn} ${isFavorite ? css.active : ""} ${
        className || ""
      }`}
      onClick={handleClick}
      aria-label="Add to favorites"
    >
      <Image
        src={isFavorite ? "/VectorActive.svg" : "/Vector.svg"}
        alt="favorite"
        width={16}
        height={15}
      />
    </button>
  );
}
