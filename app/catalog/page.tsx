import axios from "axios";
import CatalogClient from "../../components/CatalogClient/CatalogClient";

export default async function CatalogPage() {
  const res = await axios
    .get("https://car-rental-api.goit.global/cars", {
      params: { page: 1, limit: 10 },
    })
    .catch(() => null);

  const initialVehicles = res?.data?.cars ?? [];

  return <CatalogClient initialVehicles={initialVehicles} />;
}
