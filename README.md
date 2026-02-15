# IndiaFilings – Compliance Services Website

Production-grade, SEO-optimized compliance services website built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, and NextAuth.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui (Slate theme, Indigo primary)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth (Credentials provider for admin)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/indiafilings?schema=public"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

- `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` to generate.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: Used for admin login at `/admin/login`.

### Install and Setup

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server               |
| `npm run build`| Production build               |
| `npm run start`| Start production server        |
| `npm run lint` | Run ESLint                     |
| `npm run db:push`   | Push Prisma schema (no migrations) |
| `npm run db:migrate`| Create and run migrations      |
| `npm run db:deploy` | Run migrations (production, e.g. Neon) |
| `npm run db:seed`   | Seed categories, services, locations |
| `npm run db:studio` | Open Prisma Studio             |

## Deployment

### Option A: Neon + Netlify + GoDaddy (recommended)

One repo, one deployment. No separate backend.

1. **Neon (database)** — Create a project at [neon.tech](https://neon.tech), copy the connection string. Set `DATABASE_URL` locally to that URL, then run `npx prisma migrate deploy` and `npm run db:seed`. Use the same `DATABASE_URL` in Netlify.
2. **Netlify (app)** — Connect this repo. Build is in `netlify.toml`. In Site settings → Environment variables add: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_APP_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. Deploy.
3. **GoDaddy (domain)** — In GoDaddy DNS add CNAME to `your-site.netlify.app`. In Netlify add custom domain. Then set `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` to `https://yourdomain.com` and redeploy.

**Checklist:** Neon → migrate + seed → Netlify connect repo + env → deploy → GoDaddy CNAME → Netlify custom domain → production URLs → redeploy.

### Option B: Other hosts

1. **Database:** Provision PostgreSQL (e.g. Vercel Postgres, Supabase, Railway).
2. **Environment:** Set all variables above in your host. For production:
   - `NEXTAUTH_URL` = your production URL (e.g. `https://yourdomain.com`)
   - `NEXT_PUBLIC_APP_URL` = same as `NEXTAUTH_URL`
3. **Build:**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   ```
4. **Run:** `npm run start` or use your host’s start command.

## Project Structure

- `src/app/` – App Router pages and API routes
- `src/components/` – React components (layout, home, service, ui, seo)
- `src/lib/` – DB client, auth config, constants, queries
- `prisma/` – Schema and seed

## Features

- **Public:** Homepage, category/service/location pages, blog, lead form, WhatsApp CTA
- **SEO:** Dynamic meta, canonical, Open Graph, FAQ and breadcrumb schema, sitemap, robots.txt
- **Admin:** Dashboard, Services CRUD, Locations CRUD, Leads (filter, status, CSV export), Blog CRUD
