// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global", // базовий URL — див. API docs. :contentReference[oaicite:1]{index=1}
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});
