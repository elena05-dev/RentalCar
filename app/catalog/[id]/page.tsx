import axios from "axios";
import VehicleDetailsClient from "./VehicleDetailsClient";
import { Vehicle } from "../../../store/useStore";

interface VehicleResponse {
  cars: Vehicle[];
}

export default async function VehiclePage({
  params,
}: {
  params: { id: string };
}) {
  // Сначала fetch и проверка ошибок
  const res = await axios.get<VehicleResponse>(
    "https://car-rental-api.goit.global/cars",
    {
      params: { page: 1, limit: 100 }, // можно fetch всех и найти по id
    }
  );

  const vehicle = res.data.cars.find((v) => v.id === params.id);

  if (!vehicle) {
    // Возвращаем JSX только после проверки данных
    return <p>Машина не найдена</p>;
  }

  return <VehicleDetailsClient vehicle={vehicle} />;
}
