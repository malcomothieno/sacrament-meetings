'use client';

import { deleteMeeting } from '@/lib/actions';

export default function DeleteMeetingButton({ id }: { id: number }) {
  return (
    <form action={deleteMeeting}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
        onClick={(e) => {
          if (!confirm('Are you sure you want to delete this meeting?')) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
