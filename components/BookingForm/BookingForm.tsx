"use client";

import { useState, useEffect, useMemo } from "react";
import type { IziToast } from "izitoast";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [iziToast, setIziToast] = useState<IziToast | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date());

    let mounted = true;
    const loadIzi = async () => {
      const mod = (await import("izitoast")).default;
      if (mounted) setIziToast(mod);
    };
    loadIzi();

    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formattedRange = useMemo(() => {
    if (!startDate || !endDate) return "";
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }, [startDate, endDate]);

  const handleSelectDate = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date >= startDate) setEndDate(date);
      else {
        setEndDate(startDate);
        setStartDate(date);
      }
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      startDate: startDate?.toISOString().split("T")[0] || "",
      endDate: endDate?.toISOString().split("T")[0] || "",
      comment: (form.elements.namedItem("comment") as HTMLTextAreaElement)
        .value,
    };

    iziToast?.success({
      title: "Success!",
      message: `Car booked for ${data.startDate} — ${data.endDate}.`,
      position: "topRight",
    });

    form.reset();
    setStartDate(null);
    setEndDate(null);
  };

  const getCalendarDays = (month: Date) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(month.getFullYear(), month.getMonth(), i));
    }
    return days;
  };

  if (!currentMonth) return null;

  const calendarDays = getCalendarDays(currentMonth);
  const isInRange = (d: Date) =>
    startDate && endDate && d >= startDate && d <= endDate;

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

      <div className={css.dateFieldWrapper}>
        <div className={css.dateField} onClick={() => setIsOpen(!isOpen)}>
          {formattedRange || (
            <span className={css.placeholder}>Booking date</span>
          )}
        </div>

        {isOpen && (
          <div className={css.calendarDropdown}>
            <div className={css.calendarHeader}>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                &#10094;
              </button>
              <span className={css.data}>
                {currentMonth.toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                &#10095;
              </button>
            </div>

            <div className={css.weekDays}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className={css.weekDay}>
                  {d}
                </div>
              ))}
            </div>

            <hr className={css.calendarDivider} />

            <div className={css.daysGrid}>
              {calendarDays.map((d, idx) =>
                d ? (
                  <div
                    key={idx}
                    className={`${css.day} ${
                      d.toDateString() === startDate?.toDateString()
                        ? css.startDay
                        : ""
                    } ${
                      d.toDateString() === endDate?.toDateString()
                        ? css.endDay
                        : ""
                    } ${isInRange(d) ? css.inRange : ""}`}
                    onClick={() => handleSelectDate(d)}
                  >
                    {d.getDate()}
                  </div>
                ) : (
                  <div key={idx} className={css.emptyDay}></div>
                )
              )}
            </div>

            <div
              className={css.closeDropdown}
              onClick={() => setIsOpen(false)}
            ></div>
          </div>
        )}

        <input
          type="hidden"
          name="startDate"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
        />
      </div>

      <textarea name="comment" placeholder="Comment" className={css.textarea} />
      <button type="submit" className={css.button}>
        Send
      </button>
    </form>
  );
}
