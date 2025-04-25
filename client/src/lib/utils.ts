import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "₹"): string {
  return `${currency}${amount.toLocaleString("en-IN")}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)}, ${formatTime(date)}`;
}

export function getStatusColor(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case "completed":
      return { bg: "bg-green-100", text: "text-green-800" };
    case "on_trip":
    case "on trip":
      return { bg: "bg-blue-100", text: "text-blue-800" };
    case "scheduled":
      return { bg: "bg-yellow-100", text: "text-yellow-800" };
    case "cancelled":
      return { bg: "bg-red-100", text: "text-red-800" };
    case "pending":
      return { bg: "bg-gray-100", text: "text-gray-800" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800" };
  }
}

export function truncateText(text: string, length = 30): string {
  if (!text) return "";
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

export function calculateTimeAgo(date: Date | string): string {
  const now = new Date();
  const pastDate = new Date(date);
  const diffMs = now.getTime() - pastDate.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs} second${diffSecs !== 1 ? "s" : ""} ago`;
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else {
    return formatDate(pastDate);
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 300
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
