import "./globals.css";
import "izitoast/dist/css/iziToast.min.css";
import { Inter } from "next/font/google";
import TanStackProvider from "../components/TanStackProvider";
import { Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "RentalCar",
  description: "Car rental online",
  icons: {
    icon: "/icons8-car-24.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className={inter.className}>
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
