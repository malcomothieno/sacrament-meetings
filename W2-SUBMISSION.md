# W02 Canvas submission (edit the bracketed parts, then paste)

GitHub repository: https://github.com/malcomothieno/sacrament-meetings
Pull Request: https://github.com/malcomothieno/sacrament-meetings/pull/1   
Vercel preview (peer-code-review branch): [paste the URL tagged peer-code-review from Vercel > Deployments]

## Reflection (architectural decision)
I made the meetings pages fetch their data from my own API routes (/api/meetings and /api/meetings/[id]) instead of importing the functions from lib/meetings-db.ts directly. Calling the database module straight from the server components would have been shorter and faster, because it skips an extra HTTP request. I chose the API approach because the assignment requires it, and because it separates the UI from the data layer: when the in-memory data is replaced with a real database in later weeks, only the route handlers and lib code need to change, and the pages and typed components stay the same. The trade-off is that a server component needs an absolute URL to call its own API, so I built the base URL from the request headers in one helper (lib/api.ts) and used cache: "no-store" so results are never stale. I kept the /meetings/current page on the direct lib call, since it only needs to redirect and a fetch would add nothing.

## Challenge summary
[Write 2-3 sentences about what actually gave you trouble. Possible topics if they were true for you: server components needing an absolute URL to fetch their own API, computing "the most recent Sunday" without a UTC date shift, keeping the header date from going stale on a statically built page, or turning off Vercel Authentication for the preview URL.]

## AI summary
I used Claude (Anthropic) to help generate the initial project structure, and to explain how Next.js App Router features such as server components, route handlers, and next/font work. I then read through the code, ran npm run lint and npm run build, tested every required route in the browser (including /api/meetings/abc returning 400), and adjusted the code where needed. I can explain each file in the project.
