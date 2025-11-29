import CatalogClient from "../../components/CatalogClient/CatalogClient";
import axios from "axios";

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
