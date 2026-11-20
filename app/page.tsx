import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/hero.png";
import { WARD_NAME } from "@/lib/config";

export default function Home() {
  return (
    <div>
      <div className="overflow-hidden rounded-lg">
        <Image
          src={heroImage}
          alt="Soft blue and gold morning light, a calm backdrop for the Sunday meeting planner"
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-48 w-full object-cover sm:h-64"
        />
      </div>

      <section className="py-8">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          Sacrament Meeting Planner
        </h1>
        <p className="mb-6 max-w-2xl text-lg text-muted">
          Welcome to the {WARD_NAME} planner. Bishopric members can review each
          Sunday&apos;s agenda, and members can view and print the current or a
          past program.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/meetings/current"
            className="rounded bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-dark"
          >
            This Sunday&apos;s Program
          </Link>
          <Link
            href="/meetings"
            className="rounded border border-brand px-5 py-2 font-semibold text-brand hover:bg-brand-light"
          >
            All Meetings
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="grid gap-4 sm:grid-cols-3">
        <h2 id="features-heading" className="sr-only">
          What you can do
        </h2>
        {[
          ["Plan the agenda", "Hymns, prayers, speakers, musical numbers, and ward business in one place."],
          ["Review past weeks", "Browse every meeting and open the full program for any Sunday."],
          ["Print the program", "Open any meeting and print a clean, one-page program."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-lg border border-line bg-surface p-4">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-muted">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
