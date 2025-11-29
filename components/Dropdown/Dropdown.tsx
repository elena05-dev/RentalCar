"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import css from "./Dropdown.module.css";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  size?: "small" | "large";
}

export default function Dropdown({
  label,
  options,
  selected,
  onChange,
  size,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClass = size ? css[size] ?? "" : "";

  return (
    <div className={`${css.dropdown} ${sizeClass}`} ref={dropdownRef}>
      <label className={css.label}>{label}</label>
      <div className={css.selected} onClick={() => setIsOpen(!isOpen)}>
        <Image src="/chevron-down.svg" alt="arrow" width={16} height={16} />
      </div>
      {isOpen && (
        <ul className={css.list}>
          {options.map((option) => (
            <li
              key={option}
              className={`${css.item} ${option === selected ? css.active : ""}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
