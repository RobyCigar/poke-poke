import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = (callback, wait=300) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

export const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
