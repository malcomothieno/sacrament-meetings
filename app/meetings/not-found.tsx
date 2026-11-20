import Link from "next/link";

export default function MeetingNotFound() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Meeting not found</h1>
      <p className="mb-4 text-muted">We couldn&apos;t find a meeting with that ID.</p>
      <Link href="/meetings" className="font-semibold text-brand underline">
        Back to all meetings
      </Link>
    </div>
  );
}
