"use client";
import Link from "next/link";
import css from "../Header/Header.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleCatalogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/catalog") {
      router.refresh();
    } else {
      router.push("/catalog");
    }
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/">
          <h1 className={css.headerLogo}>
            <span className={css.logoPart1}>Rental</span>
            <span className={css.logoPart2}>Car</span>
          </h1>
        </Link>
        <nav className={css.navlink}>
          <Link href="/" className={css.homeLink}>
            Home
          </Link>
          <Link
            href="/catalog"
            className={css.catalogLink}
            onClick={handleCatalogClick}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
