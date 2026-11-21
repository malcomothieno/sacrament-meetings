"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="mb-6 flex gap-2">
      <label htmlFor="search-input" className="sr-only">Search meetings</label>
      <input
        id="search-input"
        placeholder="Search by speaker, presiding, conducting..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString() ?? ""}
        aria-label="Search meetings"
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-brand focus:outline-none"
      />
    </div>
  );
}
