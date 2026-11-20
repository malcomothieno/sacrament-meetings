const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  return ISO_DATE.test(value);
}

/** Format a Date as 'YYYY-MM-DD' using its local calendar parts. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse 'YYYY-MM-DD' as a local date (avoids the UTC off-by-one bug). */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** The most recent Sunday on or before `today`, as 'YYYY-MM-DD'. */
export function getMostRecentSunday(today: Date = new Date()): string {
  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  sunday.setDate(sunday.getDate() - sunday.getDay());
  return toIsoDate(sunday);
}

/** Add whole weeks to an ISO date string. */
export function addWeeks(iso: string, weeks: number): string {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + weeks * 7);
  return toIsoDate(date);
}

export function formatMeetingDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
