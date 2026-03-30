# Next.js Code Reviewer Pro

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your env file:
   ```bash
   cp .env.local.example .env.local
   ```
3. Add your Anthropic key in `.env.local`.
4. Start dev server:
   ```bash
   npm run dev
   ```

## Notes

- This project uses the Next.js App Router.
- Claude requests are sent through `app/api/review/route.ts`, so the API key stays on the server.
- Do **not** hardcode the key in client-side files.
