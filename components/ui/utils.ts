import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function for conditionally joining class names together.
 * @param inputs - A list of class names to join.
 * @returns A single string of joined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates the initials from a full name.
 * @param name - The full name (e.g., "John Doe").
 * @returns The capitalized initials (e.g., "JD").
 */
export const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.split(' ');
  const initials = parts.map(part => part.charAt(0)).join('').toUpperCase();
  return initials.substring(0, 2);
};
