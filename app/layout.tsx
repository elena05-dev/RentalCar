import "./globals.css";
import "izitoast/dist/css/iziToast.min.css";
import { Inter } from "next/font/google";
import TanStackProvider from "../components/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RentalCar",
  description: "Car rental online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
