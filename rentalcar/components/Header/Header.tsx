"use client";
import Link from "next/link";
import css from "../Header/Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/">
          <Image
            src="/RentalCar_logo.svg"
            alt="RentalCar Logo"
            width={102}
            height={16}
            className={css.headerLogo}
          />
        </Link>

        <nav className={css.navlink}>
          <Link href="/" className={css.homeLink}>
            Home
          </Link>
          <Link href="/catalog" className={css.catalogLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
