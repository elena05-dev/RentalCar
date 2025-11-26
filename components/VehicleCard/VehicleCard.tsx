"use client";

import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "../../types/vehicle";
import { formatMileage } from "../../lib/format";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

type VehicleCardProps = {
  v: Vehicle;
  isFavorite?: boolean;
};

export default function VehicleCard({ v, isFavorite }: VehicleCardProps) {
  return (
    <article className="card">
      <div className="image-container">
        <Image
          src={v.images?.[0] ?? "/placeholder.png"}
          alt={`${v.brand} ${v.model}`}
          width={400}
          height={300}
          className="object-cover w-full h-full"
          priority={false}
        />
      </div>
      <div className="body">
        <h3>
          {v.brand} {v.model} {v.year ? `(${v.year})` : ""}
        </h3>
        <p>Mileage: {formatMileage(v.mileage)}</p>
        <p>Price: {v.rentalPrice} $/day</p>
        <div className="actions">
          <Link href={`/catalog/${v.id}`}>
            <button>Read more</button>
          </Link>
          <FavoriteButton id={v.id} isFavorite={isFavorite} />
        </div>
      </div>
    </article>
  );
}
