"use client";

import Image from "next/image";
import css from "./VehicleDetailsClient.module.css";
import { Vehicle } from "../../../types/vehicle";
import BookingForm from "../../../components/BookingForm/BookingForm";

interface VehicleDetailsClientProps {
  vehicle: Vehicle;
}

export default function VehicleDetailsClient({
  vehicle,
}: VehicleDetailsClientProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.topSection}>
        <div className={css.imgForm}>
          <div className={css.imageWrapper}>
            <Image
              src={vehicle.img}
              alt={`${vehicle.brand} ${vehicle.model}`}
              width={600}
              height={400}
              className={css.mainImage}
              loading="eager"
            />
          </div>
          <BookingForm />
        </div>

        <div className={css.titleBox}>
          <div className={css.mainInfo}>
            <div className={css.titleInfo}>
              <h1 className={css.title}>
                {vehicle.brand} {vehicle.model}, {vehicle.year}
              </h1>
              <p className={css.id}>ID:{vehicle.id.slice(0, 4)}</p>
            </div>
            <div className={css.location}>
              <svg className={css.locationIcon}>
                <use href="/icons.svg#icon-location" />
              </svg>
              <span>{vehicle.address.split(", ").slice(-2).join(", ")}</span>
              <p className={css.infoLine}>
                <span className={css.label}>Mileage:</span>{" "}
                {vehicle.mileage.toLocaleString("en-US")} km
              </p>
            </div>
            <p className={css.price}>${vehicle.rentalPrice}</p>
            <p className={css.description}>{vehicle.description}</p>
          </div>

          {/* Rental Conditions */}
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Rental Conditions:</h2>

            <div className={css.conditionsList}>
              {vehicle.rentalConditions.map((cond, index) => (
                <div key={index} className={css.listItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-execute" />
                  </svg>
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Car Specifications */}
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Car Specifications:</h2>

            <div className={css.specsList}>
              <div className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-calendar" />
                </svg>
                <span>Year: {vehicle.year}</span>
              </div>

              <div className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-avto" />
                </svg>
                <span>Type: {vehicle.type}</span>
              </div>

              <div className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/fuel-pump.svg" />
                </svg>
                <span>Fuel Consumption: {vehicle.fuelConsumption}</span>
              </div>

              <div className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-setting" />
                </svg>
                <span>Engine Size: {vehicle.engineSize}</span>
              </div>
            </div>
          </div>

          {/* Accessories and functionalities:*/}
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Accessories & Functionalities:</h2>
            <div className={css.specsList}>
              {vehicle.accessories
                .concat(vehicle.functionalities)
                .map((item, index) => (
                  <div key={index} className={css.listItem}>
                    <svg className={css.icon}>
                      <use href="/icons.svg#icon-execute" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
