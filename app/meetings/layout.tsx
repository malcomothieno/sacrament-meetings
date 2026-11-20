import NavLinks, { type NavLinkItem } from "@/components/NavLinks";

const sectionLinks: NavLinkItem[] = [
  { href: "/meetings", label: "All Meetings", exact: true },
  { href: "/meetings/current", label: "Current Sunday", exact: true },
];

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 border-b border-line pb-3 print:hidden">
        <NavLinks links={sectionLinks} ariaLabel="Meetings section" variant="section" />
      </div>
      {children}
    </div>
  );
}
