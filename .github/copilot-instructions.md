## Quick orientation for AI coding agents

This repository is an online food ordering demo with a React + Vite frontend (`client/`) and an Express + Prisma backend (`server/`). Use this file to find the project's structure, recurring patterns, and developer workflows so edits and features are consistent.

Key files to inspect before making changes
- `server/index.js` — app entry: sets up Express, connects Prisma, mounts routes at `/api/food-items` and starts the server on port 3000.
- `server/routes/productRoutes.js` — router path patterns used by the frontend (e.g. `/`, `/get/:id`, `/create/`, `/update/:id`, `/delete/:id`).
- `server/components/productControllers.js` — HTTP controller layer: maps Express req/res to `productService` calls and returns JSON with simple 500 error handling.
- `server/services/productService.js` — business/data layer: uses `@prisma/client` (`prisma.food.*`) for DB access. Implements pagination, search, and basic CRUD.
- `server/prisma/schema.prisma` — canonical data models (Food, Order). Database URL is read from `DATABASE_URL` via dotenv.
- `client/package.json` and `client/src/` — Vite + React app. Use `npm run dev` from the `client` folder to start frontend.

Big-picture architecture & dataflow
- Frontend (Vite/React) calls backend REST endpoints under `/api/food-items`.
- Backend follows a simple controller -> service -> prisma client flow:
  - HTTP layer: `components/productControllers.js` handles request parsing, status codes, and error fallback.
  - Service layer: `services/productService.js` performs DB queries through `@prisma/client`.
  - DB: MySQL configured via `prisma/schema.prisma` and `DATABASE_URL`.

Project-specific patterns and conventions
- Server uses CommonJS (require/module.exports); client is ESM (`type: "module"` in `client/package.json`). Keep this when editing files in each side.
- Route naming is explicit and descriptive (e.g. `/get/:id`, `/create/`, `/update/:id`, `/delete/:id`) — follow the same patterns for new resources.
- Pagination/search: service `listFoodItems({ page, limit, category, search })` expects `page` and `limit` numbers and `search` applied to `name` using Prisma `contains` with `mode: "insensitive"`.
- ID handling: code converts route param IDs with `Number(id)` in service layer. Preserve numeric conversion for Prisma queries.
- Error handling: controllers catch errors and return `500` with `{ error: "Internal Server Error" }`. Avoid changing global behavior unless adding a consistent error middleware.

Dev workflows & commands discovered
- Backend:
  - Install: from `server/` run `npm install`.
  - Dev run: `npm run dev` (uses `nodemon index.js`). Expects `DATABASE_URL` in an `.env` file — Prisma connects before `app.listen`.
  - Start: `npm start` runs `node index.js`.
  - Prisma: migrations are present under `server/prisma/migrations`. When changing schema, use Prisma CLI: `npx prisma migrate dev --name <desc>` and `npx prisma generate` (run from `server/`).
- Frontend:
  - From `client/`: `npm install` then `npm run dev` (Vite). Default port is Vite's (typically 5173); client expects the backend at `http://localhost:3000` (CORS is enabled server-side).

Integration points & external dependencies
- Database: MySQL via Prisma. `DATABASE_URL` environment variable controls DB connection.
- Stripe: `stripe` exists in both `client` and `server` dependencies — payment integration likely implemented in client and possibly server; search for `stripe` usage before editing payments.

Small examples to reference
- List endpoint usage: GET /api/food-items?page=1&limit=12&category=salad&search=cheese
- Get item: GET /api/food-items/get/123
- Create item: POST /api/food-items/create/  Body JSON: { "name":"...","image":"...","price":9.99, "rating":4.5, "description":"...", "category":"...", "isAvailable":true }

Editing guidance and low-risk improvements
- When updating Prisma models: add a migration and run `npx prisma migrate dev` to keep the DB schema consistent; update `prisma/schema.prisma` first.
- Keep controller responsibilities small: validation/req-parsing in controllers, raw DB logic in `services/`.
- Add tests or a simple smoke route if adding infrastructure changes (e.g., new middleware) to verify the server boots and DB connects.

Where to look next
- `server/components/` and `server/services/` for existing naming and parameter patterns.
- `server/prisma/migrations/` to inspect historical schema changes.
- `client/src/` to see how the UI queries endpoints and the shape of expected request/response objects.

If anything here looks wrong or you want a different focus (payments, tests, CI), tell me which area to expand and I'll iterate.
