export type BookingPayload = {
  customerName: string;
  customerEmail: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  // можно добавить другие поля по API
};
