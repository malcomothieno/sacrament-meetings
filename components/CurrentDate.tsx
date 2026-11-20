"use client";

import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => {};

const getSnapshot = (): string =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Render nothing on the server so the date is always the visitor's today.
const getServerSnapshot = (): string => "";

export default function CurrentDate() {
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <p className="min-h-6 text-sm text-blue-100">{today}</p>;
}
