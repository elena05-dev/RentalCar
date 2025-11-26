"use client";
import Link from "next/link";
import css from "../Header/Header.module.css";

export default function Header() {
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
          <Link href="/catalog" className={css.catalogLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
