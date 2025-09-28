import { randomUUID } from "crypto";

export function generateToken(): string {
  return randomUUID();
}

export function expiresInDays(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}
