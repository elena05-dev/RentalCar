import CatalogClient from "../../components/CatalogClient/CatalogClient";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog — RentalCar",
  description: "Browse all available camper vans for your trip.",
  openGraph: {
    title: "Catalog — RentalCar",
    description: "Browse all available camper vans for your trip.",
    url: "https://rental-car-dun-kappa.vercel.app//catalog",
    images: [
      {
        url: "/og-catalog.jpg",
        width: 1200,
        height: 630,
        alt: "RentalCar Catalog",
      },
    ],
    type: "website",
  },
};

export default async function CatalogPage() {
  const res = await axios
    .get("https://car-rental-api.goit.global/cars", {
      params: { page: 1, limit: 12 },
    })
    .catch(() => null);

  const initialVehicles = res?.data?.cars ?? [];
  const totalPages = res?.data?.totalPages ?? 1;

  return (
    <CatalogClient
      initialVehicles={initialVehicles}
      initialTotalPages={totalPages}
    />
  );
}
