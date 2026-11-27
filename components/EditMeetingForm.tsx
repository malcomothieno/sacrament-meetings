'use client';

import { useActionState } from 'react';
import { updateMeeting, State } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';

export default function EditMeetingForm({ meeting }: { meeting: SacramentMeeting }) {
  const updateMeetingWithId = updateMeeting.bind(null, meeting.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(updateMeetingWithId, initialState);

  const announcementsText = meeting.announcements ? meeting.announcements.join('\n') : '';
  const wardBusinessText = meeting.wardBusiness ? meeting.wardBusiness.map(b => b.description).join('\n') : '';

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Sacrament Meeting</h1>
        <Link href={`/meetings/${meeting.id}`} className="text-brand underline">
          &larr; Back to meeting
        </Link>
      </div>

      <form action={formAction} className="space-y-6 rounded-lg border border-line bg-surface p-6 shadow-sm">
        {state.message && (
          <div className="rounded bg-red-100 p-3 text-sm text-red-700" aria-live="polite">
            {state.message}
          </div>
        )}

        <div>
          <label htmlFor="date" className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={meeting.date}
            aria-describedby="date-error"
            className="w-full rounded border border-line p-2"
          />
          <div id="date-error" aria-live="polite" className="text-sm text-red-600 mt-1">
            {state.errors?.date?.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block font-semibold mb-1">Meeting Type</label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            aria-describedby="meetingType-error"
            className="w-full rounded border border-line p-2"
          >
            <option value="sacrament">Sacrament Meeting</option>
            <option value="testimony">Fast and Testimony Meeting</option>
            <option value="stake_conference">Stake Conference</option>
            <option value="ward_conference">Ward Conference</option>
            <option value="bishopric_program">Bishopric Training / Program</option>
          </select>
          <div id="meetingType-error" aria-live="polite" className="text-sm text-red-600 mt-1">
            {state.errors?.meetingType?.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="presiding" className="block font-semibold mb-1">Presiding</label>
            <input
              type="text"
              id="presiding"
              name="presiding"
              defaultValue={meeting.presiding}
              aria-describedby="presiding-error"
              className="w-full rounded border border-line p-2"
            />
            <div id="presiding-error" aria-live="polite" className="text-sm text-red-600 mt-1">
              {state.errors?.presiding?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="conducting" className="block font-semibold mb-1">Conducting</label>
            <input
              type="text"
              id="conducting"
              name="conducting"
              defaultValue={meeting.conducting}
              aria-describedby="conducting-error"
              className="w-full rounded border border-line p-2"
            />
            <div id="conducting-error" aria-live="polite" className="text-sm text-red-600 mt-1">
              {state.errors?.conducting?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="openingPrayer" className="block font-semibold mb-1">Opening Prayer</label>
            <input
              type="text"
              id="openingPrayer"
              name="openingPrayer"
              defaultValue={meeting.openingPrayer}
              aria-describedby="openingPrayer-error"
              className="w-full rounded border border-line p-2"
            />
            <div id="openingPrayer-error" aria-live="polite" className="text-sm text-red-600 mt-1">
              {state.errors?.openingPrayer?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="closingPrayer" className="block font-semibold mb-1">Closing Prayer</label>
            <input
              type="text"
              id="closingPrayer"
              name="closingPrayer"
              defaultValue={meeting.closingPrayer}
              aria-describedby="closingPrayer-error"
              className="w-full rounded border border-line p-2"
            />
            <div id="closingPrayer-error" aria-live="polite" className="text-sm text-red-600 mt-1">
              {state.errors?.closingPrayer?.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        <fieldset className="border border-line p-4 rounded">
          <legend className="font-semibold px-2">Opening Hymn</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2">
            <div className="sm:col-span-1">
              <label htmlFor="openingHymnNumber" className="block text-sm mb-1">Number</label>
              <input
                type="number"
                id="openingHymnNumber"
                name="openingHymnNumber"
                defaultValue={meeting.openingHymn?.number}
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="openingHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="openingHymnTitle"
                name="openingHymnTitle"
                defaultValue={meeting.openingHymn?.title}
                className="w-full rounded border border-line p-2"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-line p-4 rounded">
          <legend className="font-semibold px-2">Sacrament Hymn</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2">
            <div className="sm:col-span-1">
              <label htmlFor="sacramentHymnNumber" className="block text-sm mb-1">Number</label>
              <input
                type="number"
                id="sacramentHymnNumber"
                name="sacramentHymnNumber"
                defaultValue={meeting.sacramentHymn?.number}
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="sacramentHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="sacramentHymnTitle"
                name="sacramentHymnTitle"
                defaultValue={meeting.sacramentHymn?.title}
                className="w-full rounded border border-line p-2"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-line p-4 rounded">
          <legend className="font-semibold px-2">Closing Hymn</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-2">
            <div className="sm:col-span-1">
              <label htmlFor="closingHymnNumber" className="block text-sm mb-1">Number</label>
              <input
                type="number"
                id="closingHymnNumber"
                name="closingHymnNumber"
                defaultValue={meeting.closingHymn?.number}
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="closingHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="closingHymnTitle"
                name="closingHymnTitle"
                defaultValue={meeting.closingHymn?.title}
                className="w-full rounded border border-line p-2"
              />
            </div>
          </div>
        </fieldset>

        <div>
          <label htmlFor="announcements" className="block font-semibold mb-1">Announcements (one per line)</label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            defaultValue={announcementsText}
            className="w-full rounded border border-line p-2"
          ></textarea>
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block font-semibold mb-1">Ward Business (one per line)</label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            defaultValue={wardBusinessText}
            className="w-full rounded border border-line p-2"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href={`/meetings/${meeting.id}`}
            className="rounded border border-line px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Update Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
}
