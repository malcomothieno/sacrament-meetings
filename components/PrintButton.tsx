"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark print:hidden"
    >
      Print program
    </button>
  );
}
