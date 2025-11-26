"use client";
import { useStore } from "../../store/useStore";

type FavoriteButtonProps = {
  id: string;
  isFavorite?: boolean;
};

export default function FavoriteButton({
  id,
  isFavorite,
}: FavoriteButtonProps) {
  const { toggleFavorite } = useStore((s) => ({
    toggleFavorite: s.toggleFavorite,
  }));

  return (
    <button
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
      onClick={() => toggleFavorite(id)}
    >
      ❤️
    </button>
  );
}
