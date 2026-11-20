"use client";

export default function MeetingsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4">
      <h1 className="mb-2 text-2xl font-bold">Something went wrong</h1>
      <p className="mb-4 text-red-900">We couldn&apos;t load the meetings. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark"
      >
        Try again
      </button>
    </div>
  );
}
