import { WARD_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-8 bg-gray-800 py-4 text-center text-sm text-white print:hidden">
      <p>{WARD_NAME} Sacrament Meeting Planner</p>
    </footer>
  );
}
