"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkItem {
  href: string;
  label: string;
  /** Only highlight when the path matches exactly (e.g. "/" or "/meetings"). */
  exact?: boolean;
}

interface NavLinksProps {
  links: NavLinkItem[];
  ariaLabel: string;
  variant?: "header" | "section";
}

export default function NavLinks({ links, ariaLabel, variant = "header" }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (link: NavLinkItem): boolean =>
    link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);

  const base = "rounded px-3 py-1.5 text-sm font-semibold";
  const styles =
    variant === "header"
      ? { active: "bg-white text-brand", idle: "text-white hover:bg-white/20" }
      : { active: "bg-brand text-white", idle: "text-brand hover:bg-brand-light" };

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const active = isActive(link);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${base} ${active ? styles.active : styles.idle}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
