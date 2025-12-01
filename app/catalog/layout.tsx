import Header from "../../components/Header/Header";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface CatalogLayoutProps {
  children: ReactNode;
}

export default function CatalogLayout({ children }: CatalogLayoutProps) {
  return (
    <div className={inter.className}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
