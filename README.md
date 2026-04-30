# VaultStack - Client

**Subscription-driven SaaS file management platform.** Every storage action - upload, folder creation, nesting, file type - is dynamically enforced by the user's active subscription plan.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-1A56DB?style=flat-square)](https://saas-storage.rakibulhasandev.com)
[![Backend Repo](https://img.shields.io/badge/Backend-Server_Repo-374151?style=flat-square)](https://github.com/Rakibul-98/SaaS-storage-engine-server)

---

## Demo access

Click the **Admin** or **User** toggle on the login page - credentials are auto-filled.

| Role  | What you can explore                                                      |
| ----- | ------------------------------------------------------------------------- |
| Admin | Create & manage subscription plans, set per-plan limits, manage users     |
| User  | Upload files, create nested folders, switch plans, view storage analytics |

---

## What makes this project interesting

Most file management demos are simple CRUD. VaultStack enforces a real subscription constraint model - every action on every resource is validated server-side against the user's active plan before it executes:

- **Max folders** - hard ceiling on total folder count
- **Max nesting depth** - prevents folder hierarchies beyond plan limit
- **Allowed file types** - plan-specific whitelist (images, video, PDF, audio)
- **Max file size** - per-file size cap enforced at upload
- **Files per folder** - directory-level quota
- **Total storage** - account-wide byte limit

When a user upgrades or downgrades, the enforcement rules change immediately on the next request.

---

## Tech stack

| Layer       | Technology                                  |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 16 (App Router)                     |
| Language    | TypeScript (strict)                         |
| State / API | Redux Toolkit + RTK Query                   |
| Styling     | Tailwind CSS v4 + Shadcn UI                 |
| Forms       | React Hook Form + Zod v4                    |
| Charts      | Recharts                                    |
| Animation   | Framer Motion                               |
| Auth        | JWT (stored in Redux, verified server-side) |

---

## Features

### User dashboard

- Upload files (images, video, PDF, audio) with real-time validation against plan limits
- Create, rename, and delete folders with nested breadcrumb navigation
- Move files and folders between directories
- Soft delete with trash - restore or permanently delete
- Storage usage charts and quota indicators
- Subscription management - view tiers, upgrade/downgrade

### Admin panel

- Create and update subscription packages with dynamic limit configuration
- Set per-plan: max folders, nesting level, allowed file types, max file size, files per folder, total file limit
- User management

---

## Project structure

```
src/
├── app/
│   ├── (private)/          # Authenticated routes - dashboard, admin panel
│   ├── (public)/           # Auth routes - login, register, password reset
│   ├── redux/              # RTK Query API slices + Redux store
│   └── Components/         # Feature-specific components
├── components/             # Shared Shadcn UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── providers/              # Redux + theme providers
```

---

## Local setup

**Prerequisites:** Node.js 18+

```bash
git clone https://github.com/Rakibul-98/SaaS-storage-engine-client.git
cd SaaS-storage-engine-client
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

```bash
npm run dev
# → http://localhost:3000
```

---

## Architecture decisions

**RTK Query over plain fetch** - All API calls go through RTK Query slices, giving automatic caching, background refetching, and loading/error states without manual useEffect management.

**App Router layout groups** - `(private)` and `(public)` route groups share distinct layouts. Auth checks happen at the layout level, not per-page.

**Zod + React Hook Form** - All forms are schema-validated before submission. The same Zod schema types are shared with the backend where applicable.

**Recharts for storage visualisation** - Storage usage and plan limits are displayed as visual charts, not just text, to make quota awareness immediately understandable.

---

## Related

- [Server repository](https://github.com/Rakibul-98/SaaS-storage-engine-server) - Node.js + Express + PostgreSQL + Prisma backend
- [Live application](https://saas-storage.rakibulhasandev.com)

---

_Built by [Md Rakibul Hasan](https://www.rakibulhasandev.com)_
