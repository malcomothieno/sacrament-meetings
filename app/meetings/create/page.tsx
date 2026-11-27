'use client';

import { useActionState } from 'react';
import { createMeeting, State } from '@/lib/actions';
import Link from 'next/link';

export default function CreateMeetingPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <div className="mx-auto max-w-2xl py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Sacrament Meeting</h1>
        <Link href="/meetings" className="text-brand underline">
          &larr; Back to meetings
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
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="openingHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="openingHymnTitle"
                name="openingHymnTitle"
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
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="sacramentHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="sacramentHymnTitle"
                name="sacramentHymnTitle"
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
                className="w-full rounded border border-line p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="closingHymnTitle" className="block text-sm mb-1">Title</label>
              <input
                type="text"
                id="closingHymnTitle"
                name="closingHymnTitle"
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
            className="w-full rounded border border-line p-2"
          ></textarea>
        </div>

        <div>
          <label htmlFor="wardBusiness" className="block font-semibold mb-1">Ward Business (one per line)</label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            className="w-full rounded border border-line p-2"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/meetings"
            className="rounded border border-line px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Create Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
}
