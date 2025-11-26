"use client";
import { useEffect, useState } from "react";
import { fetchVehicleById, createBooking } from "../../../lib/vehiclesApi";
import { formatMileage } from "../../../lib/format";
import BookingForm from "../../../components/BookingForm/BookingForm";
import { Vehicle } from "../../../types/vehicle";
import { BookingPayload } from "../../../types/booking";
import Image from "next/image";

export default function VehicleDetails({ params }: { params: { id: string } }) {
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const v = await fetchVehicleById(id);
        if (!cancelled) setVehicle(v);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function onBook(payload: BookingPayload) {
    try {
      await createBooking(id, payload);
      setMessage("Booking successful!");
    } catch (err) {
      console.error(err);
      setMessage("Booking failed.");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!vehicle) return <div>Not found</div>;

  return (
    <main>
      <h1>
        {vehicle.brand} {vehicle.model}
      </h1>
      <Image
        src={vehicle.images?.[0] ?? "/placeholder.png"}
        alt={`${vehicle.brand} ${vehicle.model}`}
        width={600} // укажи реальные размеры или пропсы layout="responsive"
        height={400}
        priority // если это главный экранный контент
      />
      <p>{formatMileage(vehicle.mileage)}</p>
      <p>{vehicle.description}</p>

      {message && <div className="notification">{message}</div>}
      <BookingForm onSubmit={onBook} />
    </main>
  );
}
