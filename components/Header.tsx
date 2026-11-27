import { WARD_NAME } from "@/lib/config";
import CurrentDate from "./CurrentDate";
import NavLinks, { type NavLinkItem } from "./NavLinks";

const links: NavLinkItem[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/meetings", label: "Meetings" },
  { href: "/meetings/create", label: "New Meeting" },
];

export default function Header() {
  return (
    <header className="bg-brand text-white print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold">{WARD_NAME}</p>
          <CurrentDate />
        </div>
        <NavLinks links={links} ariaLabel="Main navigation" />
      </div>
    </header>
  );
}
