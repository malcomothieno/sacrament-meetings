W03 Assignment: Sacrament Meeting Planner - Submission

Project Links
GitHub Repository URL: https://github.com/malcomothieno/sacrament-meetings
Pull Request URL: https://github.com/malcomothieno/sacrament-meetings/pull/1
Vercel Preview URL: https://sacrament-meetings-y3f2-git-peer-code-review-wdd-430-t2.vercel.app/

Reflection
Challenges Encountered
1. Database Integration & Type Safety: Migrating from in-memory mock data to a live Neon PostgreSQL database required carefully mapping the database rows to TypeScript interfaces, especially handling optional fields and dates properly.
2. URL-Based Search & Pagination: Implementing debounced search using `use-debounce` and ensuring that the pagination controls correctly preserve active search queries while resetting the page number to 1 on new searches required precise synchronization with Next.js `useSearchParams`, `usePathname`, and `useRouter`.

Use of AI
During development, AI was used to conceptualize database schema design, diagnose TypeScript build errors during migration, generate the debounced search component structure, and verify API route correctness.
