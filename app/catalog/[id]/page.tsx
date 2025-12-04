import { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import VehicleDetailsClient from "./VehicleDetailsClient";
import { getVehicleById } from "../../../lib/api";
import { Vehicle } from "../../../types/vehicle";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle: Vehicle | null = await getVehicleById(id);

  if (!vehicle) return { title: "The car was not found" };

  return {
    title: `RentalCar: ${vehicle.brand} ${vehicle.model}`,
    description: vehicle.description.slice(0, 160),
    openGraph: {
      title: `RentalCar: ${vehicle.brand} ${vehicle.model}`,
      description: vehicle.description.slice(0, 160),
      url: `https://rental-car-dun-kappa.vercel.app/catalog/${id}`,
      images: [
        {
          url: vehicle.img,
          width: 1200,
          height: 630,
          alt: `${vehicle.brand} ${vehicle.model}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function VehiclePage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
  });

  const vehicle: Vehicle | null =
    queryClient.getQueryData(["vehicle", id]) || null;

  if (!vehicle) {
    notFound();
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehicleDetailsClient vehicle={vehicle} />
    </HydrationBoundary>
  );
}
