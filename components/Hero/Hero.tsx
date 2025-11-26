import Link from "next/link";
import css from "../Hero/Hero.module.css";

export default function Home() {
  return (
    <div className={css.container}>
      <section className={css.banner}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog">
          <button className={css.button}>View Catalog</button>
        </Link>
      </section>
    </div>
  );
}
