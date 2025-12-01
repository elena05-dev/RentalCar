"use client";

import { useState, useEffect } from "react";
import css from "./BookingForm.module.css";

type IziToastType = typeof import("izitoast");

export default function BookingForm() {
  const [iziToast, setIziToast] = useState<IziToastType | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadIzi = async () => {
      const mod = await import("izitoast");
      await import("izitoast/dist/css/izitoast.min.css");
      if (mounted) setIziToast(mod);
    };

    loadIzi();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      comment: (form.elements.namedItem("comment") as HTMLTextAreaElement)
        .value,
    };

    iziToast?.default?.success({
      title: "Success!",
      message: `Car has been successfully booked for ${data.date}.`,
      position: "topRight",
    });

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.formTitle}>Book your car now</h2>
      <p className={css.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className={css.input}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className={css.input}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Booking date"
        className={css.input}
        required
      />
      <textarea name="comment" placeholder="Comment" className={css.textarea} />

      <button type="submit" className={css.button}>
        Send
      </button>
    </form>
  );
}
