export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="animate-pulse space-y-4">
      <span className="sr-only">Loading meetings…</span>
      <div className="h-8 w-1/3 rounded bg-gray-200" />
      <div className="h-24 rounded bg-gray-200" />
      <div className="h-24 rounded bg-gray-200" />
    </div>
  );
}
