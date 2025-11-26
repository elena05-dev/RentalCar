import VehicleDetailsClient from "./VehicleDetailsClient";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Можно предварительно подгрузить данные через API, если нужно:
  // const vehicle = await fetchVehicleById(id);

  return <VehicleDetailsClient id={id} />;
}
