import Hero from "../components/Hero/Hero";
import Header from "../components/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentalCar — Rent your camper van",
  description: "Find and book the best camper vans for your trips.",
  openGraph: {
    title: "RentalCar — Rent your camper van",
    description: "Find and book the best camper vans for your trips.",
    url: "https://rental-car-dun-kappa.vercel.app/",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "RentalCar Home",
      },
    ],
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
