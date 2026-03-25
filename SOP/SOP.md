# PROMPTS WARDROBE — Standard Operating Procedure

**Version 1.0.0 | March 2026**

> A personal AI prompt library with authentication, filtering, token estimation, and export capabilities.

| Document Type     | Status | Owner            | Last Updated |
| ----------------- | ------ | ---------------- | ------------ |
| SOP — Development | Active | Engineering Team | March 2026   |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Application Architecture](#3-application-architecture)
4. [Database Schema](#4-database-schema-supabase)
5. [Feature Specifications](#5-feature-specifications)
6. [Routing Structure](#6-routing-structure)
7. [Development Workflow](#7-development-workflow)
8. [Coding Standards & Conventions](#8-coding-standards--conventions)
9. [Deployment](#9-deployment)
10. [Future Roadmap](#10-future-roadmap)

---

## 1. Project Overview

### 1.1 Purpose & Vision

Prompts Wardrobe is a full-stack React web application that serves as a personal prompt management system for AI practitioners. The application enables users to store, organize, search, rate, and export their AI prompts across different models and use-case categories — functioning like a wardrobe for your best-performing prompts.

### 1.2 Target Users

- AI engineers and developers who work with multiple LLMs
- Prompt engineers who need to track and iterate on prompts
- Researchers documenting prompting techniques and results
- Power users of AI tools who want to reuse high-quality prompts

### 1.3 Core Feature Set

| Feature                | Description                                                                         | Priority |
| ---------------------- | ----------------------------------------------------------------------------------- | -------- |
| Prompt Management      | Create, read, update, delete prompts with title, content, model, notes              | P0       |
| Authentication         | Sign up, login, logout via Supabase Auth                                            | P0       |
| Prompt Visibility      | Publish prompts publicly (discoverable) or keep them private to the owner           | P0       |
| Upvotes                | Users can upvote public prompts from other users (one vote per user per prompt)     | P0       |
| Follow & Notifications | Follow authors and receive notifications when they publish new public prompts       | P0       |
| Rating System          | 1–5 star rating to evaluate prompt effectiveness                                    | P0       |
| User Profile Page      | Public profile with user info, avatar, published prompts, follower/following counts | P0       |
| Settings Page          | Owner-only page to edit name, bio, email, password, and profile image               | P0       |
| Token Estimator        | Approximate token count with confidence score                                       | P1       |
| Metadata Tracker       | Auto-capture creation date, time, and model used                                    | P1       |
| Category Filtering     | Filter by type: image gen, coding, general, etc.                                    | P1       |
| Search                 | Full-text search across user's own prompts                                          | P1       |
| Notes / Technique Docs | Field to document prompting techniques used                                         | P1       |
| Export / Import        | Export all prompts to JSON, re-import on new session                                | P2       |

---

## 2. Technology Stack

### 2.1 Stack Overview

The application is built entirely on the React ecosystem with Supabase as the backend-as-a-service provider. The stack is intentionally minimal — each library is chosen for a specific, non-overlapping responsibility.

| Category         | Library / Tool                    | Version | Purpose                                                                    |
| ---------------- | --------------------------------- | ------- | -------------------------------------------------------------------------- |
| Framework        | React + React DOM                 | ^19.x   | Core UI framework                                                          |
| Build Tool       | Vite                              | ^6.x    | Dev server and bundler                                                     |
| Language         | JavaScript (ESNext)               | —       | Project uses modern JavaScript (no TypeScript)                             |
| Routing          | @tanstack/react-router            | ^1.x    | Type-safe file-based routing with search params                            |
| Router Devtools  | @tanstack/router-devtools         | ^1.x    | Route debugging in development                                             |
| Server State     | @tanstack/react-query             | ^5.x    | Async data fetching, caching, mutations                                    |
| Query Devtools   | @tanstack/react-query-devtools    | ^5.x    | Query inspection in development                                            |
| Table (optional) | @tanstack/react-table             | ^8.x    | Headless table with sort/filter for prompt list                            |
| Backend / Auth   | @supabase/supabase-js             | ^2.x    | Auth, Postgres DB, real-time                                               |
| Forms            | react-hook-form                   | ^7.x    | Performant form state management                                           |
| Validation       | zod                               | ^3.x    | Schema validation for forms and API responses                              |
| Form Resolvers   | @hookform/resolvers               | ^3.x    | Bridges zod schemas into react-hook-form                                   |
| Styling          | tailwindcss                       | ^4.x    | Utility-first CSS framework                                                |
| UI Components    | RetroUI (added via shadcn/manual) | n/a     | NeoBrutalism styled components (added via shadcn CLI or copied components) |
| Icons            | lucide-react                      | ^0.4x   | Icon set compatible with React                                             |
| Token Estimation | gpt-tokenizer                     | ^2.x    | Client-side token count approximation                                      |
| Date Formatting  | date-fns                          | ^3.x    | Lightweight date/time utilities                                            |
| Notifications    | sonner                            | ^1.x    | Toast notification system                                                  |

### 2.2 Why This Stack

**TanStack Full Ecosystem**
Using `@tanstack/react-router` alongside `@tanstack/react-query` gives the app a fully type-safe data + routing layer. Search params (filters, search query) are managed directly in the URL with type-safety via TanStack Router's `validateSearch` — no manual URL parsing needed.

**Supabase as BaaS**
Supabase provides PostgreSQL with Row Level Security (RLS), built-in authentication (email/password), and a generous free tier. It eliminates the need to build and host a custom backend for this application.

**RetroUI + Tailwind**
RetroUI is a NeoBrutalism styled component library built on top of Tailwind CSS. It provides bold, distinctive UI components (buttons, cards, inputs, badges, dialogs) that give Prompts Wardrobe a unique, developer-friendly aesthetic without requiring custom design work.

**No Global State Manager**
Zustand or Redux are not needed. TanStack Query handles all server/async state. Local UI state (modal open/closed, active tab) is managed with plain React `useState`. This keeps the app simple and avoids over-engineering.

---

## 3. Application Architecture

### 3.1 Project Structure

```
src/
├── routes/                  # TanStack Router file-based routes
│   ├── __root.jsx           # Root layout (auth guard, providers)
│   ├── index.jsx            # Landing / redirect
│   ├── auth/
│   │   ├── login.jsx        # Login page
│   │   └── signup.jsx       # Sign up page
│   └── dashboard/
│       ├── index.jsx        # Prompt list (search + filter via URL params)
│       ├── new.jsx          # Create new prompt
│       └── $promptId/
│           ├── index.jsx    # View prompt detail
│           └── edit.jsx     # Edit prompt
├── components/
│   ├── ui/                  # Shared RetroUI wrappers
│   ├── prompts/             # Prompt-specific components
│   └── layout/              # Navbar, Sidebar, PageWrapper
├── hooks/                   # Custom React hooks
│   ├── usePrompts.js        # useQuery wrapper for prompts
│   ├── useAuth.js           # Supabase auth state
│   └── useTokenEstimate.js  # Token count + confidence
├── lib/
│   ├── supabase.js          # Supabase client instance
│   ├── queryClient.js       # TanStack Query client config
│   └── exportImport.js      # JSON export/import utilities
├── main.jsx                 # App entry point
```

### 3.2 State Management Strategy

| State Type             | Tool                   | Examples                                            |
| ---------------------- | ---------------------- | --------------------------------------------------- |
| Server / Async State   | @tanstack/react-query  | Prompts list, single prompt, user session           |
| URL / Navigation State | @tanstack/react-router | Active filter category, search query, current route |
| Form State             | react-hook-form + zod  | Prompt creation form, login/signup forms            |
| Local UI State         | React useState         | Modal open/close, active tab, loading spinners      |

---

## 4. Database Schema (Supabase)

### 4.1 Tables

#### Table: `prompts`

| Column         | Type        | Nullable | Default           | Description                        |
| -------------- | ----------- | -------- | ----------------- | ---------------------------------- |
| id             | uuid        | NO       | gen_random_uuid() | Primary key                        |
| user_id        | uuid        | NO       | —                 | FK → auth.users.id                 |
| title          | text        | NO       | —                 | Prompt title                       |
| content        | text        | NO       | —                 | The prompt body                    |
| model          | text        | YES      | NULL              | Model used (e.g. GPT-4o)           |
| is_public      | boolean     | NO       | false             | Whether prompt is publicly visible |
| published_at   | timestamptz | YES      | NULL              | Timestamp when made public         |
| category       | text        | NO       | 'general'         | Prompt category/type               |
| rating         | int2        | YES      | NULL              | 1–5 star rating                    |
| notes          | text        | YES      | NULL              | Technique notes                    |
| token_estimate | int4        | YES      | NULL              | Estimated token count              |
| created_at     | timestamptz | NO       | now()             | Auto-set on insert                 |
| updated_at     | timestamptz | NO       | now()             | Auto-updated on change             |

#### Prompt Categories (Enum Values)

| Category Value | Display Label         |
| -------------- | --------------------- |
| general        | General               |
| coding         | Coding                |
| image_gen      | Image Generation      |
| writing        | Writing & Copywriting |
| data_analysis  | Data Analysis         |
| research       | Research              |
| roleplay       | Roleplay / Persona    |
| system_prompt  | System Prompt         |

#### Table: `profiles`

| Column       | Type        | Nullable | Default | Description                   |
| ------------ | ----------- | -------- | ------- | ----------------------------- |
| user_id      | uuid        | NO       | —       | PK/FK → auth.users.id         |
| display_name | text        | YES      | NULL    | User-chosen name              |
| bio          | text        | YES      | NULL    | Short bio                     |
| avatar_url   | text        | YES      | NULL    | Public profile image URL      |
| email_public | text        | YES      | NULL    | Optional public email display |
| created_at   | timestamptz | NO       | now()   | Auto-set on insert            |
| updated_at   | timestamptz | NO       | now()   | Auto-updated on change        |

#### Table: `prompt_upvotes`

| Column      | Type                 | Nullable | Default | Description                                |
| ----------- | -------------------- | -------- | ------- | ------------------------------------------ |
| prompt_id   | uuid                 | NO       | —       | FK → prompts.id                            |
| user_id     | uuid                 | NO       | —       | FK → auth.users.id (voter)                 |
| created_at  | timestamptz          | NO       | now()   | When the upvote was created                |
| PRIMARY KEY | (prompt_id, user_id) |          |         | Prevent multiple votes per user per prompt |

#### Table: `follows`

| Column       | Type                        | Nullable | Default | Description                          |
| ------------ | --------------------------- | -------- | ------- | ------------------------------------ |
| follower_id  | uuid                        | NO       | —       | FK → auth.users.id (who follows)     |
| following_id | uuid                        | NO       | —       | FK → auth.users.id (who is followed) |
| created_at   | timestamptz                 | NO       | now()   | When the follow was created          |
| PRIMARY KEY  | (follower_id, following_id) |          |         | Prevent duplicate follows            |

#### Table: `notifications`

| Column     | Type        | Nullable | Default           | Description                                  |
| ---------- | ----------- | -------- | ----------------- | -------------------------------------------- |
| id         | uuid        | NO       | gen_random_uuid() | Primary key                                  |
| user_id    | uuid        | NO       | —                 | Recipient FK → auth.users.id                 |
| type       | text        | NO       | —                 | e.g., `new_prompt_from_followed`             |
| payload    | jsonb       | NO       | '{}'              | Contains prompt_id, author_id, message, etc. |
| read_at    | timestamptz | YES      | NULL              | Timestamp when user read the notification    |
| created_at | timestamptz | NO       | now()             | When notification was created                |

### 4.2 Row Level Security (RLS) Policies

All RLS policies are scoped to `auth.uid() = user_id` to ensure users can only access their own prompts.

| Policy Name                    | Operation | Condition            |
| ------------------------------ | --------- | -------------------- |
| Users can view own prompts     | SELECT    | auth.uid() = user_id |
| Anyone can view public prompts | SELECT    | is_public = true     |
| Users can insert own prompts   | INSERT    | auth.uid() = user_id |
| Users can update own prompts   | UPDATE    | auth.uid() = user_id |
| Users can delete own prompts   | DELETE    | auth.uid() = user_id |

Additional RLS policies:

- **profiles:** user can select/insert/update/delete only where `auth.uid() = user_id`.
- **prompt_upvotes:** user can select; insert/delete where `auth.uid() = user_id`; prevent duplicate via PK.
- **follows:** user can select; insert/delete where `auth.uid() = follower_id`.
- **notifications:** user can select where `auth.uid() = user_id`; insert allowed via service role; updates allowed for read/unread where `auth.uid() = user_id`.

### 4.3 SQL Setup

```sql
-- Create prompts table
create table prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  model text,
  is_public boolean not null default false,
  published_at timestamptz,
  category text not null default 'general',
  rating smallint check (rating >= 1 and rating <= 5),
  notes text,
  token_estimate integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table prompts enable row level security;

-- RLS Policies
create policy "Users can view own prompts"
  on prompts for select using (auth.uid() = user_id);

create policy "Users can insert own prompts"
  on prompts for insert with check (auth.uid() = user_id);

create policy "Users can update own prompts"
  on prompts for update using (auth.uid() = user_id);

create policy "Users can delete own prompts"
  on prompts for delete using (auth.uid() = user_id);

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger prompts_updated_at
  before update on prompts
  for each row execute function update_updated_at();
```

---

## 5. Feature Specifications

### 5.1 Authentication Flow

- User visits the app → redirected to `/auth/login` if not authenticated
- **Sign Up:** email + password → Supabase creates account → auto-login → redirect to `/dashboard`
- **Login:** email + password → Supabase validates → session stored → redirect to `/dashboard`
- **Logout:** `supabase.auth.signOut()` → session cleared → redirect to `/auth/login`
- Protected routes: `__root.tsx` uses `beforeLoad` context to check session

### 5.2 Prompt CRUD

#### Create

- Form fields: Title (required), Content (required), Model (optional), Category (required), Rating (optional), Notes (optional)
- Token estimate auto-calculated client-side via `gpt-tokenizer` on content change
- `created_at` and `updated_at` set automatically by Supabase
- On success: invalidate prompts query → navigate to `/dashboard`

#### Read / List

- Fetched via `useQuery` on `/dashboard` mount
- Search and filter params stored in URL (TanStack Router search params)
- Client-side filtering by category; search by title/content via Supabase `ilike`

#### Update

- Pre-filled form at `/dashboard/$promptId/edit`
- `useMutation` → `supabase.update` → `invalidateQueries(['prompts'])`
- `updated_at` column updated via Supabase trigger

#### Delete

- Confirmation dialog (RetroUI Dialog component)
- `useMutation` → `supabase.delete` → `invalidateQueries(['prompts'])`
- Sonner toast on success/error

### 5.3 Token Estimator

- Uses `gpt-tokenizer` to count tokens in the prompt content field in real-time
- Displays estimated token count next to the content textarea
- Confidence score label: **Low / Medium / High** based on model similarity to GPT tokenizer
- Note shown to user: _"Token counts are approximate and may vary by model"_
- Stored in `token_estimate` column on save

### 5.4 Filtering System

- Filter tabs rendered at top of `/dashboard` for each category
- Active category stored in URL search param: `?category=coding`
- "All" tab shows all prompts (no category filter)
- Filter state persists across browser refresh via URL
- Compatible with search: `?category=coding&q=chain+of+thought`

### 5.5 Search

- Search input at top of `/dashboard`
- Search query stored in URL: `?q=keyword`
- Filters against `title` and `content` fields via Supabase `ilike`
- Debounced input (300ms) to prevent excessive queries
- Compatible with category filter simultaneously

### 5.6 Export & Import

#### Export

- Button in dashboard header or settings panel
- Fetches all user prompts from Supabase
- Serializes to JSON array of prompt objects
- Downloads as `prompts-wardrobe-export-{date}.json` via Blob + anchor click

#### Import

- File input accepts `.json` files only
- Parses JSON → validates schema with zod
- Upserts prompts into Supabase (insert or update by `id`)
- Shows success count and error count in a Sonner toast
- Prompts query invalidated after import

### 5.7 Rating System

- 1–5 star interactive rating component on each prompt
- Displayed on the prompt card in the list view
- Editable inline or via the edit form
- Stored as `smallint` in the database with a `CHECK` constraint

### 5.8 Metadata Tracker

- `created_at` auto-set by Supabase `default now()` on insert
- `updated_at` auto-updated via database trigger on every update
- Displayed in the prompt detail view formatted with `date-fns`
- Included in JSON export payload

### 5.9 Prompt Visibility & Publishing

- Prompts are **private by default** (`is_public = false`).
- Authors can toggle **Public/Private** in the create/edit form; publishing sets `published_at`.
- Public prompts are discoverable by all authenticated users and included in public listings/search.
- Private prompts are visible only to the owner; attempting to access another user's private prompt should redirect with an error toast.
- UI surfacing: visibility badge on cards/detail, filter to show only public/private in dashboard, and a publish/unpublish control on edit page.

### 5.10 Upvotes

- Only public prompts can be upvoted.
- Each user can upvote a prompt once (idempotent toggle stored in `prompt_upvotes` PK (prompt_id, user_id)).
- Display total upvotes on prompt cards and detail pages; highlight if the current user has upvoted.
- Mutations optimistically update UI and invalidate prompt detail/list queries on settle.

### 5.11 Following & Notifications

- Users can **follow other authors** (stored in `follows` table); unfollow removes the row.
- When a followed author publishes a new public prompt, the follower receives a notification (insert into `notifications` with type `new_prompt_from_followed`).
- Notifications surface in a bell/menu with unread badge; each item links to the new prompt and marks `read_at` when opened.
- Background process/hook: on publish mutation, enqueue notifications for all followers.

### 5.12 User Profile Page

- Public profile route shows: avatar, display name, bio, follower/following counts, and the user's **public prompts** sorted by newest.
- Contains Follow/Unfollow button (hidden for own profile) and upvote/follow counts on prompts.
- Profile data sourced from `profiles` table; prompts filtered by `is_public = true`.

### 5.13 Settings Page (Account & Profile)

- Owner-only page to edit **display name, bio, avatar**, and manage **email/password** updates.
- Profile fields persisted in `profiles` table; email/password updates use Supabase Auth APIs.
- Supports updating profile image URL and clearing it; form validation via zod + react-hook-form.
- Includes danger zone for logout and (optionally) account deletion.

---

## 6. Routing Structure

### 6.1 Route Map

| Route                       | File                                 | Access      | Description                             |
| --------------------------- | ------------------------------------ | ----------- | --------------------------------------- |
| `/`                         | routes/index.tsx                     | Public      | Redirect to /dashboard or /auth/login   |
| `/auth/login`               | routes/auth/login.tsx                | Public only | Login page                              |
| `/auth/signup`              | routes/auth/signup.tsx               | Public only | Sign up page                            |
| `/dashboard`                | routes/dashboard/index.tsx           | Protected   | Prompt list with search + filters       |
| `/dashboard/new`            | routes/dashboard/new.tsx             | Protected   | Create new prompt form                  |
| `/dashboard/$promptId`      | routes/dashboard/$promptId/index.tsx | Protected   | View single prompt                      |
| `/dashboard/$promptId/edit` | routes/dashboard/$promptId/edit.tsx  | Protected   | Edit existing prompt                    |
| `/profile/$userId`          | routes/profile/$userId/index.tsx     | Public      | Public user profile + published prompts |
| `/settings`                 | routes/settings/index.tsx            | Protected   | Manage profile, email, password         |
| `/notifications`            | routes/notifications/index.tsx       | Protected   | View and mark notifications             |
| `/`                         | routes/index.jsx                     | Public      | Redirect to /dashboard or /auth/login   |
| `/auth/login`               | routes/auth/login.jsx                | Public only | Login page                              |
| `/auth/signup`              | routes/auth/signup.jsx               | Public only | Sign up page                            |
| `/dashboard`                | routes/dashboard/index.jsx           | Protected   | Prompt list with search + filters       |
| `/dashboard/new`            | routes/dashboard/new.jsx             | Protected   | Create new prompt form                  |
| `/dashboard/$promptId`      | routes/dashboard/$promptId/index.jsx | Protected   | View single prompt                      |
| `/dashboard/$promptId/edit` | routes/dashboard/$promptId/edit.jsx  | Protected   | Edit existing prompt                    |
| `/profile/$userId`          | routes/profile/$userId/index.jsx     | Public      | Public user profile + published prompts |
| `/settings`                 | routes/settings/index.jsx            | Protected   | Manage profile, email, password         |
| `/notifications`            | routes/notifications/index.jsx       | Protected   | View and mark notifications             |

### 6.2 URL Search Params (Type-Safe)

The `/dashboard` route uses TanStack Router's `validateSearch` for type-safe URL search params:

```ts
// routes/dashboard/index.tsx
import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";

const dashboardSearchSchema = z.object({
  q: z.string().optional(),
  category: z
    .enum([
      "all",
      "general",
      "coding",
      "image_gen",
      "writing",
      "data_analysis",
      "research",
      "roleplay",
      "system_prompt",
    ])
    .default("all"),
});

export const Route = createFileRoute("/dashboard/")({
  validateSearch: dashboardSearchSchema,
  component: DashboardPage,
});
```

### 6.3 Auth Guard

```ts
// routes/__root.tsx
export const Route = createRootRouteWithContext<{ supabase: SupabaseClient }>()(
  {
    beforeLoad: async ({ context, location }) => {
      const {
        data: { session },
      } = await context.supabase.auth.getSession();
      if (!session && !location.pathname.startsWith("/auth")) {
        throw redirect({ to: "/auth/login" });
      }
    },
  },
);
```

---

## 7. Development Workflow

### 7.1 Prerequisites

- Node.js >= 20.x
- npm >= 10.x or pnpm >= 9.x
- Supabase account and project created
- Git

### 7.2 Project Setup

**Step 1 — Scaffold the project**

```bash
npm create vite@latest prompts-wardrobe -- --template react
cd prompts-wardrobe
```

**Step 2 — Install all dependencies**

```bash
npm install \
  @tanstack/react-router @tanstack/react-query \
  @tanstack/react-table \
  @tanstack/router-devtools @tanstack/react-query-devtools \
  @supabase/supabase-js \
  react-hook-form zod @hookform/resolvers \
  lucide-react sonner \
  gpt-tokenizer date-fns

npm install -D tailwindcss @tailwindcss/vite
```

**Step 2a — Add RetroUI (theme + components)**

RetroUI assets are added via a shadcn-style workflow (component JSON) or manually — there is no single `retroui` package to install from npm. Recommended approach:

- Add the RetroUI theme variables (see section "Add RetroUI Theme" below) by creating a CSS file (for example `src/styles/retroui-theme.css`) and import it in your app root.
- Use the shadcn CLI to add components (example below). If the CLI complains about Tailwind or import aliases, create a minimal `tailwind.config.js` and a `tsconfig.json`/`jsconfig.json` with an `@/*` path alias (this is safe for JS projects):

```bash
# add a single RetroUI component (Button) via the shadcn-style CLI
npx shadcn@latest add "https://retroui.dev/r/button.json"
```

If the CLI cannot be used, create `src/components/retroui/` and add component wrappers (or copy the JSON-based component outputs) manually. The repository's docs also include a theme and font recommendations which you should add to `index.html` and your CSS.

**Step 3 — Configure environment variables**

```bash
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Step 4 — Configure TanStack Router**

```bash
# Add to vite.config.js
npm install -D @tanstack/router-plugin
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
});
```

### 7.3 Available Scripts

| Script  | Command           | Description                             |
| ------- | ----------------- | --------------------------------------- |
| dev     | `npm run dev`     | Start Vite dev server on localhost:5173 |
| build   | `npm run build`   | Production build                        |
| preview | `npm run preview` | Preview production build locally        |
| lint    | `npm run lint`    | Run ESLint across the codebase          |
|         |                   |                                         |

### 7.4 Git Branch Strategy

| Branch      | Purpose                                   |
| ----------- | ----------------------------------------- |
| `main`      | Production-ready code — deploys to Vercel |
| `dev`       | Integration branch for features           |
| `feature/*` | Individual feature branches               |
| `fix/*`     | Bug fix branches                          |

---

## 8. Coding Standards & Conventions

### 8.1 JavaScript (ESNext)

- Project uses modern JavaScript (ESNext) and JSX (`.jsx`/`.js`) files rather than TypeScript.
- Use `zod` for runtime validation of inputs and API responses. For developer ergonomics prefer JSDoc or PropTypes where helpful.
- Keep runtime validation and shape checks (zod) as the source of truth; do not rely on TypeScript-only checks.
- If you later adopt TypeScript, a `tsconfig.json` and generated Supabase types can be added (see future roadmap).

### 8.2 File Naming Conventions

| Type             | Convention                  | Example             |
| ---------------- | --------------------------- | ------------------- |
| React Components | PascalCase.tsx              | PromptCard.tsx      |
| Hooks            | camelCase with `use` prefix | usePrompts.ts       |
| Utilities / Lib  | camelCase.ts                | exportImport.ts     |
| Route files      | TanStack Router convention  | dashboard/index.tsx |
| Types            | camelCase.ts                | prompt.ts           |
| Constants        | SCREAMING_SNAKE_CASE        | CATEGORIES.ts       |
| React Components | PascalCase.jsx              | PromptCard.jsx      |
| Hooks            | camelCase with `use` prefix | usePrompts.js       |
| Utilities / Lib  | camelCase.js                | exportImport.js     |
| Route files      | TanStack Router convention  | dashboard/index.jsx |
| Types            | (optional) camelCase.js     | promptData.js       |
| Constants        | SCREAMING_SNAKE_CASE        | CATEGORIES.js       |

### 8.3 Component Conventions

- Prefer functional components with named exports
- Co-locate component-specific types inside the component file unless shared
- Use RetroUI components as base; only build custom components if RetroUI lacks the pattern
- Avoid prop drilling beyond 2 levels — use TanStack Query or context
- Each component file should have a single primary export

### 8.4 TanStack Query Keys

Use consistent query key arrays to enable precise cache invalidation:

| Query            | Key Array                       |
| ---------------- | ------------------------------- |
| All user prompts | `['prompts', userId]`           |
| Single prompt    | `['prompts', userId, promptId]` |
| Auth session     | `['auth', 'session']`           |

```ts
// hooks/usePrompts.ts
export const promptKeys = {
  all: (userId: string) => ["prompts", userId] as const,
  detail: (userId: string, promptId: string) =>
    ["prompts", userId, promptId] as const,
};
```

### 8.5 Form Validation Pattern

```ts
// Always define zod schema first, then infer the type
const promptSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  model: z.string().optional(),
  category: z.enum([
    "general",
    "coding",
    "image_gen",
    "writing",
    "data_analysis",
    "research",
    "roleplay",
    "system_prompt",
  ]),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});

type PromptFormValues = z.infer<typeof promptSchema>;
```

---

## 9. Deployment

### 9.1 Recommended Platform: Vercel

- Connect GitHub repo to Vercel — zero-config deployment for Vite projects
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel environment variables
- Set production branch to `main`
- Preview deployments auto-created for every pull request

### 9.2 Supabase Production Checklist

1. Enable Row Level Security (RLS) on the `prompts` table
2. Apply all four RLS policies (SELECT, INSERT, UPDATE, DELETE)
3. Enable email confirmations in Supabase Auth settings
4. Set **Site URL** in Supabase Auth to your production domain
5. Add production domain to Supabase Auth **redirect URLs**
6. Review Supabase API rate limits for your plan
7. Enable database backups (Pro plan)

### 9.3 Environment Variables

| Variable                 | Required | Description                                |
| ------------------------ | -------- | ------------------------------------------ |
| `VITE_SUPABASE_URL`      | Yes      | Supabase project URL from project settings |
| `VITE_SUPABASE_ANON_KEY` | Yes      | Public anon key — safe to expose in client |

> **Note:** Never commit `.env.local` to version control. Add it to `.gitignore`.

---

## 10. Future Roadmap

| Feature                | Description                                          | Priority |
| ---------------------- | ---------------------------------------------------- | -------- |
| Prompt Versioning      | Track edit history with diff view per prompt         | P2       |
| Collections / Folders  | Group prompts into named folders or collections      | P2       |
| Public Sharing         | Generate a shareable link for a single prompt        | P3       |
| Community Library      | Browse and import prompts shared by other users      | P3       |
| AI Prompt Suggestions  | Use an LLM to suggest improvements to a saved prompt | P3       |
| Prompt Chaining        | Link prompts together in a sequence / pipeline view  | P3       |
| Browser Extension      | Save prompts directly from ChatGPT / Claude UI       | P3       |
| Multi-language Support | i18n support for Arabic and other languages          | P3       |

---

## 11. Project Breakdown: Stages, Phases & Work Levels

This section provides a detailed breakdown of the Prompts Wardrobe project into actionable stages, phases, and work levels. Use this as your implementation roadmap.

### 11.1 Executive Summary

The Prompts Wardrobe project is divided into **4 Major Stages**, each containing **multiple Phases**, with granular **Work Levels** (P0 Critical, P1 High, P2 Medium, P3 Low).

#### Timeline Estimate

- **Stage 1 (Setup & Infrastructure):** 2–3 weeks
- **Stage 2 (Core Features):** 4–6 weeks
- **Stage 3 (Advanced Features):** 2–3 weeks
- **Stage 4 (Polish & Deployment):** 1–2 weeks
- **Total:** ~10–14 weeks (full-time development)

---

### 11.2 STAGE 1: Project Setup & Infrastructure

**Duration: 2–3 weeks**

This stage establishes the development environment, configures all tools, and sets up the backend infrastructure.

#### Phase 1.1: Development Environment Setup

**Duration:** 3–5 days

**Level 1: Node.js & Project Scaffolding (CRITICAL — P0)**

- [ ] Install Node.js >= 20.x
- [ ] Create Vite project: `npm create vite@latest prompts-wardrobe -- --template react`
- [ ] Set up git repository and `.gitignore`
- [ ] Configure ESLint and Prettier

**Level 2: Core Dependencies Installation (CRITICAL — P0)**

- [ ] Install React + React DOM (^19.x)
- [ ] Install Vite dev server and build tooling
- [ ] Install @tanstack/react-router (^1.x)
- [ ] Install @tanstack/react-query (^5.x)
- [ ] Install @supabase/supabase-js (^2.x)
- [ ] Install form libraries: react-hook-form (^7.x), zod (^3.x), @hookform/resolvers (^3.x)
- [ ] Install styling: tailwindcss (^4.x), @tailwindcss/vite
- [ ] Install UI/Icons: lucide-react (^0.4x), sonner (^1.x)
- [ ] Install utilities: gpt-tokenizer (^2.x), date-fns (^3.x)

**Level 3: Dev Dependencies (HIGH — P1)**

- [ ] Install @tanstack/router-plugin for Vite
- [ ] Install @tanstack/router-devtools (^1.x)
- [ ] Install @tanstack/react-query-devtools (^5.x)
- [ ] Install @tanstack/react-table (^8.x) — optional but recommended

**Level 4: Configuration Files (CRITICAL — P0)**

- [ ] Create `vite.config.js` with TanStack Router plugin
- [ ] Create `tailwind.config.js` with theme customization
- [ ] Create `tsconfig.json` or `jsconfig.json` with path aliases
- [ ] Create `.env.local` template with Supabase variables

#### Phase 1.2: Supabase Backend Setup

**Duration:** 5–7 days

**Level 1: Supabase Project Creation (CRITICAL — P0)**

- [ ] Create Supabase account and project
- [ ] Obtain project URL and anon key
- [ ] Add credentials to `.env.local`
- [ ] Test connection with `supabase.auth.getSession()`

**Level 2: Database Schema Creation (CRITICAL — P0)**

- [ ] Run SQL script to create `prompts` table
- [ ] Configure columns: id, user_id, title, content, model, category, rating, notes, token_estimate, created_at, updated_at
- [ ] Create indexes on frequently queried columns (user_id, category, created_at)
- [ ] Set up auto-update trigger for `updated_at`

**Level 3: Row Level Security (RLS) Setup (CRITICAL — P0)**

- [ ] Enable RLS on `prompts` table
- [ ] Create SELECT policy: `auth.uid() = user_id`
- [ ] Create INSERT policy: `auth.uid() = user_id`
- [ ] Create UPDATE policy: `auth.uid() = user_id`
- [ ] Create DELETE policy: `auth.uid() = user_id`
- [ ] Test RLS policies with test accounts

**Level 4: Authentication Configuration (CRITICAL — P0)**

- [ ] Enable email/password authentication in Supabase
- [ ] Configure email confirmation settings (if required)
- [ ] Set Site URL to localhost for development
- [ ] Add redirect URLs for local dev and production
- [ ] Create Supabase client wrapper at `lib/supabase.js`

**Level 5: Testing Database & Auth (HIGH — P1)**

- [ ] Write test queries to verify schema
- [ ] Test user sign-up flow end-to-end
- [ ] Test RLS policies with multiple users
- [ ] Verify cascade delete on user deletion

#### Phase 1.3: Project Structure & Routing Setup

**Duration:** 3–5 days

**Level 1: Directory Structure Creation (CRITICAL — P0)**

- [ ] Create `/src/routes` directory with subdirectories
- [ ] Create `/src/components` with ui, prompts, layout subdirectories
- [ ] Create `/src/hooks` for custom hooks
- [ ] Create `/src/lib` for utilities and configs
- [ ] Create `/src/styles` for CSS files

**Level 2: TanStack Router Configuration (CRITICAL — P0)**

- [ ] Create root route file (`__root.jsx`)
- [ ] Implement auth guard in root route with `beforeLoad`
- [ ] Create landing/redirect route (`index.jsx`)
- [ ] Create auth routes structure (`auth/login.jsx`, `auth/signup.jsx`)
- [ ] Create dashboard routes structure (with placeholders)
- [ ] Configure TanStack Router vite plugin in build config

**Level 3: Router Provider Setup (CRITICAL — P0)**

- [ ] Create router instance with context (Supabase client)
- [ ] Wrap app with RouterProvider in `main.jsx`
- [ ] Add RouteDevtools for development
- [ ] Test basic route navigation

**Level 4: Query Client Setup (HIGH — P1)**

- [ ] Create TanStack Query client at `lib/queryClient.js`
- [ ] Configure cache times and retry policies
- [ ] Wrap app with QueryClientProvider in `main.jsx`
- [ ] Add QueryDevtools for development

**Level 5: Styling Foundation (HIGH — P1)**

- [ ] Import Tailwind CSS in `src/main.jsx`
- [ ] Create global styles at `src/index.css`
- [ ] Set up Tailwind theme configuration
- [ ] Add RetroUI theme variables (fonts, colors, spacing)

#### Phase 1.4: UI Component Library & RetroUI Integration

**Duration:** 4–6 days

**Level 1: RetroUI Theme & Fonts (HIGH — P1)**

- [ ] Add RetroUI fonts to `index.html` (Courier Prime, JetBrains Mono, etc.)
- [ ] Create `src/styles/retroui-theme.css` with theme variables
- [ ] Configure Tailwind to extend with RetroUI theme
- [ ] Test theme application in a simple component

**Level 2: Base UI Components via shadcn (HIGH — P1)**

- [ ] Add RetroUI Button component via shadcn CLI
- [ ] Add RetroUI Input component
- [ ] Add RetroUI Textarea component
- [ ] Add RetroUI Card component
- [ ] Add RetroUI Dialog/Modal component
- [ ] Add RetroUI Badge component
- [ ] Add RetroUI Toast/Alert component
- [ ] Verify component imports and exports

**Level 3: Custom UI Component Wrappers (HIGH — P1)**

- [ ] Create `src/components/ui/Button.jsx` wrapper
- [ ] Create `src/components/ui/Input.jsx` wrapper
- [ ] Create `src/components/ui/Textarea.jsx` wrapper
- [ ] Create `src/components/ui/Select.jsx` wrapper
- [ ] Create `src/components/ui/SearchInput.jsx` (search-specific)
- [ ] Create `src/components/ui/RatingStars.jsx` (1–5 star component)
- [ ] Create `src/components/ui/CategoryTabs.jsx` (category filter tabs)
- [ ] Create `src/components/ui/LoadingState.jsx`
- [ ] Create `src/components/ui/ErrorState.jsx`
- [ ] Create `src/components/ui/EmptyState.jsx`

**Level 4: Layout Components (HIGH — P1)**

- [ ] Create `src/components/layout/AppShell.jsx` (main page wrapper)
- [ ] Create navbar/header component with logout button
- [ ] Create sidebar or navigation structure (if needed)
- [ ] Style layout to match RetroUI aesthetic

**Level 5: Icon Integration (MEDIUM — P2)**

- [ ] Set up lucide-react icon imports
- [ ] Create icon constants/exports
- [ ] Test icons in UI components

---

### 11.3 STAGE 2: Core Features Implementation

**Duration: 4–6 weeks**

This stage builds all P0 and P1 priority features: authentication, prompt CRUD, and basic UI.

#### Phase 2.1: Authentication Implementation

**Duration:** 1 week

**Level 1: Auth Hook & Context (CRITICAL — P0)**

- [ ] Create `src/hooks/useAuth.js` hook
- [ ] Implement user session state management
- [ ] Create helper functions: `signUp()`, `login()`, `logout()`, `getCurrentUser()`
- [ ] Export auth context or custom hook

**Level 2: Login Page (CRITICAL — P0)**

- [ ] Create `src/routes/auth/login.jsx` component
- [ ] Design login form with email and password inputs
- [ ] Implement form validation with zod schema
- [ ] Integrate react-hook-form for form state
- [ ] Handle login submission with error handling
- [ ] Add Sonner toast notifications for success/error
- [ ] Redirect to dashboard on successful login
- [ ] Add "Sign up" link

**Level 3: Sign-Up Page (CRITICAL — P0)**

- [ ] Create `src/routes/auth/signup.jsx` component
- [ ] Design sign-up form with email and password
- [ ] Implement password confirmation validation
- [ ] Integrate react-hook-form with zod schema
- [ ] Handle sign-up submission with error handling
- [ ] Show validation errors inline
- [ ] Redirect to dashboard on successful sign-up
- [ ] Add "Already have account?" link

**Level 4: Logout Functionality (CRITICAL — P0)**

- [ ] Add logout button to navbar/header
- [ ] Implement logout mutation
- [ ] Clear session and redirect to login on logout
- [ ] Add confirmation or immediate logout option

**Level 5: Auth Guard & Route Protection (CRITICAL — P0)**

- [ ] Verify `__root.jsx` auth guard is working
- [ ] Test protected routes redirect to login
- [ ] Test public auth routes redirect to dashboard if logged in
- [ ] Verify session persists across page refresh

**Level 6: Session Persistence (HIGH — P1)**

- [ ] Ensure Supabase session tokens persist in localStorage
- [ ] Handle token refresh on expiry
- [ ] Test session persistence across browser restarts

#### Phase 2.2: Prompt CRUD Operations

**Duration:** 1.5 weeks

**Level 1: Create Query Hook (CRITICAL — P0)**

- [ ] Create `src/hooks/usePrompts.js` hook
- [ ] Implement `useQuery` for fetching all user prompts
- [ ] Add `useMutation` for creating prompts
- [ ] Add `useMutation` for updating prompts
- [ ] Add `useMutation` for deleting prompts
- [ ] Implement query key factory for cache invalidation
- [ ] Export all hooks and utilities

**Level 2: Create Prompt Form (CRITICAL — P0)**

- [ ] Create `src/components/prompts/PromptForm.jsx` component
- [ ] Design form fields: title, content, model, category, rating, notes
- [ ] Implement zod schema for form validation
- [ ] Integrate react-hook-form
- [ ] Add real-time token estimator (integration with `useTokenEstimate.js`)
- [ ] Show token count estimate below textarea
- [ ] Handle form submission
- [ ] Add loading state during submission
- [ ] Display validation errors

**Level 3: Create Prompt Page (CRITICAL — P0)**

- [ ] Create `src/routes/dashboard/new.jsx` route
- [ ] Add page title and description
- [ ] Render PromptForm component
- [ ] Handle successful form submission → redirect to dashboard
- [ ] Add back button or cancel option
- [ ] Style with AppShell layout

**Level 4: Prompt List View (CRITICAL — P0)**

- [ ] Create `src/components/prompts/PromptList.jsx` component
- [ ] Display prompts as cards in a grid or list
- [ ] Show title, category, rating, created_at on each card
- [ ] Add click handler to navigate to detail view
- [ ] Implement loading state with skeleton loaders
- [ ] Implement empty state when no prompts
- [ ] Implement error state with retry button

**Level 5: Prompt Card Component (CRITICAL — P0)**

- [ ] Create `src/components/prompts/PromptCard.jsx` component
- [ ] Display prompt title, snippet of content, category badge, rating stars
- [ ] Show creation date formatted with date-fns
- [ ] Add click-to-expand or link to detail view
- [ ] Style with RetroUI card design

**Level 6: Dashboard Main Route (CRITICAL — P0)**

- [ ] Create `src/routes/dashboard/index.jsx` route
- [ ] Render PromptList component
- [ ] Add "Create New Prompt" button
- [ ] Implement search/filter params state with TanStack Router
- [ ] Render empty state or prompt list based on data
- [ ] Render loading/error states
- [ ] Style with AppShell layout

**Level 7: Prompt Detail View (CRITICAL — P0)**

- [ ] Create `src/routes/dashboard/$promptId/index.jsx` route
- [ ] Fetch single prompt by ID
- [ ] Display full prompt details: title, content, model, category, rating, notes, dates
- [ ] Add edit button → navigate to edit page
- [ ] Add delete button with confirmation dialog
- [ ] Add back button to dashboard
- [ ] Format dates using date-fns
- [ ] Handle loading and error states

**Level 8: Prompt Edit Page (CRITICAL — P0)**

- [ ] Create `src/routes/dashboard/$promptId/edit.jsx` route
- [ ] Fetch prompt data and pre-fill form
- [ ] Render PromptForm with existing data
- [ ] Handle form submission with update mutation
- [ ] Show "Unsaved changes" warning if navigating away
- [ ] Redirect to detail view on success
- [ ] Add cancel button to discard changes

**Level 9: Delete Confirmation Dialog (CRITICAL — P0)**

- [ ] Create dialog/modal for delete confirmation
- [ ] Show prompt title being deleted
- [ ] Implement "Cancel" and "Delete" buttons
- [ ] Handle delete mutation on confirmation
- [ ] Show loading state during deletion
- [ ] Redirect to dashboard on success
- [ ] Show error toast if deletion fails

#### Phase 2.3: Search & Basic Filtering

**Duration:** 1 week

**Level 1: Search Input Component (CRITICAL — P0)**

- [ ] Create `src/components/ui/SearchInput.jsx` component
- [ ] Add text input with debounce (300ms)
- [ ] Implement clear button (X icon)
- [ ] Emit search query on input change
- [ ] Focus/blur visual feedback

**Level 2: Category Filtering UI (CRITICAL — P0)**

- [ ] Create `src/components/ui/CategoryTabs.jsx` component
- [ ] Render tabs for each category: All, General, Coding, Image Gen, Writing, Data Analysis, Research, Roleplay, System Prompt
- [ ] Highlight active tab
- [ ] Emit category selection on tab click
- [ ] Style with RetroUI tab design

**Level 3: URL-Based Search State (CRITICAL — P0)**

- [ ] Update `/dashboard` route search params with zod validation
- [ ] Implement `validateSearch` in TanStack Router for category and q params
- [ ] Update SearchInput to modify URL params
- [ ] Update CategoryTabs to modify URL params
- [ ] Ensure state persists across browser refresh

**Level 4: Client-Side Filtering Logic (CRITICAL — P0)**

- [ ] Implement category filter in prompt list (client-side filtering)
- [ ] Implement search filter using Supabase `ilike` on title + content
- [ ] Combine category and search filters
- [ ] Show result count
- [ ] Show "No results" message if empty

**Level 5: Filter UI Integration (HIGH — P1)**

- [ ] Add SearchInput to dashboard header
- [ ] Add CategoryTabs above or below prompt list
- [ ] Ensure filters are always visible and accessible
- [ ] Test filter combinations

**Level 6: Performance Optimization (HIGH — P1)**

- [ ] Debounce search input to reduce queries (300ms)
- [ ] Implement pagination or infinite scroll for large lists (optional)
- [ ] Avoid duplicate queries with TanStack Query caching

#### Phase 2.4: Token Estimator Implementation

**Duration:** 4–5 days

**Level 1: Token Estimator Hook (HIGH — P1)**

- [ ] Create `src/hooks/useTokenEstimate.js` hook
- [ ] Implement gpt-tokenizer integration
- [ ] Calculate token count from text input
- [ ] Implement confidence score logic based on model type
- [ ] Return: { tokens: number, confidence: 'Low' | 'Medium' | 'High' }

**Level 2: Token Display Component (HIGH — P1)**

- [ ] Display token count below textarea in PromptForm
- [ ] Show confidence indicator: Low (red), Medium (yellow), High (green)
- [ ] Add tooltip explaining confidence score
- [ ] Show note: "Token counts are approximate and may vary by model"

**Level 3: Real-Time Token Updates (HIGH — P1)**

- [ ] Update token count as user types in content textarea
- [ ] Debounce token calculation (100ms) for performance
- [ ] Handle rapid input changes gracefully

**Level 4: Store Token Estimate on Save (HIGH — P1)**

- [ ] Capture token_estimate on form submission
- [ ] Send to Supabase with other prompt data
- [ ] Display stored token estimate in prompt detail view
- [ ] Allow user to recalculate on edit

#### Phase 2.5: Rating System

**Duration:** 3–4 days

**Level 1: Rating Stars Component (CRITICAL — P0)**

- [ ] Create `src/components/ui/RatingStars.jsx` component
- [ ] Render 5 interactive stars
- [ ] Show filled/empty star states
- [ ] Implement hover effect (show preview rating)
- [ ] Emit rating on click (1–5)
- [ ] Make read-only or interactive based on prop

**Level 2: Rating Integration in Forms (CRITICAL — P0)**

- [ ] Add RatingStars component to PromptForm
- [ ] Integrate with react-hook-form
- [ ] Allow optional rating (can be null)
- [ ] Display rating error if validation fails

**Level 3: Display Ratings on Cards & Details (CRITICAL — P0)**

- [ ] Show rating stars on PromptCard component
- [ ] Show rating stars on prompt detail view
- [ ] Display "Not rated" if rating is null

**Level 4: Update Rating Inline (HIGH — P1)**

- [ ] Allow users to update rating directly on detail view or card
- [ ] Use mutation to save rating change
- [ ] Show loading state during update
- [ ] Verify database constraint: rating between 1–5

---

### 11.4 STAGE 3: Advanced Features

**Duration: 2–3 weeks**

This stage builds P2 features: export/import, metadata display, and advanced filtering.

#### Phase 3.1: Export & Import Functionality

**Duration:** 1 week

**Level 1: Export Utility Library (MEDIUM — P2)**

- [ ] Create `src/lib/exportImport.js` utility
- [ ] Implement `exportPromptsAsJSON()` function
- [ ] Fetch all user prompts from Supabase
- [ ] Serialize to JSON array
- [ ] Generate filename: `prompts-wardrobe-export-{YYYY-MM-DD}.json`
- [ ] Create Blob and trigger download via anchor

**Level 2: Export Button & UI (MEDIUM — P2)**

- [ ] Add export button to dashboard header or menu
- [ ] Implement loading state during export
- [ ] Show success toast with filename
- [ ] Handle export errors gracefully

**Level 3: Import Utility & Logic (MEDIUM — P2)**

- [ ] Implement `importPromptsFromJSON()` function
- [ ] Accept JSON file input
- [ ] Validate JSON schema with zod
- [ ] Parse and normalize data
- [ ] Upsert prompts into Supabase (insert or update by id)
- [ ] Return success/error counts
- [ ] Invalidate prompts query cache

**Level 4: Import UI & File Input (MEDIUM — P2)**

- [ ] Add import button to dashboard header or menu
- [ ] Create file input dialog/modal
- [ ] Validate file type (JSON only)
- [ ] Display import progress and results
- [ ] Show success toast with import summary
- [ ] Handle errors with detailed messages
- [ ] Allow cancel/retry

**Level 5: Import Validation Schema (HIGH — P1)**

- [ ] Define zod schema for imported prompt objects
- [ ] Validate required fields: title, content, category
- [ ] Validate optional fields: model, rating, notes, token_estimate, created_at
- [ ] Skip or error on invalid records

**Level 6: Conflict Resolution (HIGH — P1)**

- [ ] Handle duplicate prompts (same id)
- [ ] Decide: overwrite or skip existing
- [ ] Show warning if data will be overwritten
- [ ] Allow user to confirm or cancel

#### Phase 3.2: Metadata Display & Formatting

**Duration:** 4–5 days

**Level 1: Date Formatting (MEDIUM — P2)**

- [ ] Use date-fns to format `created_at` and `updated_at`
- [ ] Display human-readable dates (e.g., "March 23, 2026")
- [ ] Display relative times (e.g., "2 hours ago")
- [ ] Add tooltips with full timestamp on hover

**Level 2: Metadata Section in Detail View (MEDIUM — P2)**

- [ ] Create metadata display section in prompt detail page
- [ ] Show created_at, updated_at, model, token_estimate
- [ ] Display in a clean, non-intrusive layout
- [ ] Use icons from lucide-react for visual clarity

**Level 3: Card Metadata Display (MEDIUM — P2)**

- [ ] Show creation date on PromptCard
- [ ] Show category badge
- [ ] Show rating (if set)
- [ ] Keep card compact and scannable

**Level 4: Metadata Sorting (HIGH — P1)**

- [ ] Add sort options to dashboard (by date created, date updated, rating, etc.)
- [ ] Store active sort in URL params (optional)
- [ ] Implement client-side or server-side sorting

#### Phase 3.3: Advanced Filtering & Search

**Duration:** 4–5 days

**Level 1: Multi-Filter Support (MEDIUM — P2)**

- [ ] Combine category + search + sort simultaneously
- [ ] All filters editable via URL params
- [ ] Add "Clear All Filters" button
- [ ] Show active filter count badge

**Level 2: Filter Persistence (MEDIUM — P2)**

- [ ] Persist filters across page navigation
- [ ] Allow sharing filtered URLs with specific state
- [ ] Test filter state persistence

**Level 3: Advanced Search Options (HIGH — P1)**

- [ ] Add search by model field (optional)
- [ ] Add minimum rating filter (optional)
- [ ] Add date range filter (optional)
- [ ] Combine multiple search criteria

**Level 4: Search Results Display (HIGH — P1)**

- [ ] Show active filters summary
- [ ] Show result count ("123 prompts found")
- [ ] Show search query highlighted
- [ ] Implement faceted search hints (optional)

#### Phase 3.4: Performance & UX Improvements

**Duration:** 2–3 days

**Level 1: Skeleton Loaders (HIGH — P1)**

- [ ] Create skeleton loader components for cards
- [ ] Show skeleton loaders while fetching prompts
- [ ] Animate skeleton loading state

**Level 2: Pagination or Infinite Scroll (MEDIUM — P2)**

- [ ] Decide: pagination vs infinite scroll
- [ ] Implement chosen approach
- [ ] Test with large datasets

**Level 3: Caching Strategy (HIGH — P1)**

- [ ] Configure TanStack Query stale times
- [ ] Set cache invalidation on mutations
- [ ] Test cache behavior

**Level 4: Error Boundaries (HIGH — P1)**

- [ ] Implement React Error Boundary component
- [ ] Catch and display component errors gracefully
- [ ] Allow user to recover (retry/reset)

---

### 11.5 STAGE 4: Polish, Testing & Deployment

**Duration: 1–2 weeks**

This stage focuses on quality assurance, documentation, and production deployment.

#### Phase 4.1: Testing & QA

**Duration:** 3–5 days

**Level 1: Manual Testing (HIGH — P1)**

- [ ] Test authentication flow (signup, login, logout)
- [ ] Test all CRUD operations on prompts
- [ ] Test search and filters
- [ ] Test token estimator
- [ ] Test export/import
- [ ] Test rating system
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test RLS policies with multiple users
- [ ] Verify no data leakage between users

**Level 2: Error Handling Testing (HIGH — P1)**

- [ ] Test network failures
- [ ] Test validation errors
- [ ] Test edge cases (empty queries, special characters, very long text)
- [ ] Test concurrent operations (rapid mutations)
- [ ] Verify error messages are user-friendly

**Level 3: Performance Testing (MEDIUM — P2)**

- [ ] Test with large number of prompts (1000+)
- [ ] Measure load times and responsiveness
- [ ] Profile bundle size
- [ ] Check memory usage
- [ ] Optimize if needed

**Level 4: Accessibility Testing (HIGH — P1)**

- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Test form accessibility
- [ ] Add ARIA labels where needed

**Level 5: Security Testing (CRITICAL — P0)**

- [ ] Verify RLS policies enforce correctly
- [ ] Test CSRF protection
- [ ] Verify no sensitive data in logs/console
- [ ] Test rate limiting
- [ ] Check for XSS vulnerabilities

#### Phase 4.2: Code Quality & Documentation

**Duration:** 2–3 days

**Level 1: Code Review & Cleanup (HIGH — P1)**

- [ ] Review all components for consistency
- [ ] Remove unused code and imports
- [ ] Add JSDoc comments to functions
- [ ] Ensure naming conventions followed
- [ ] Check for code duplication

**Level 2: Documentation (HIGH — P1)**

- [ ] Update README.md with setup instructions
- [ ] Document environment variables required
- [ ] Add troubleshooting guide
- [ ] Document API endpoints used
- [ ] Add component usage examples (optional)

**Level 3: ESLint & Formatting (HIGH — P1)**

- [ ] Run ESLint on all files
- [ ] Fix any lint errors or warnings
- [ ] Ensure consistent code formatting
- [ ] Set up pre-commit hooks (optional)

**Level 4: Comments & Inline Documentation (MEDIUM — P2)**

- [ ] Add comments to complex logic
- [ ] Document custom hooks
- [ ] Document query keys and caching strategy
- [ ] Document zod schemas

#### Phase 4.3: Production Preparation

**Duration:** 2–3 days

**Level 1: Environment Configuration (CRITICAL — P0)**

- [ ] Create production `.env` variables
- [ ] Configure different env vars for dev/staging/prod
- [ ] Update Supabase project with production credentials
- [ ] Verify credentials work in production

**Level 2: Build & Bundle Optimization (HIGH — P1)**

- [ ] Run `npm run build` and verify no errors
- [ ] Check bundle size with Vite analyzer
- [ ] Enable code splitting if needed
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all features work in production build

**Level 3: Supabase Production Checklist (CRITICAL — P0)**

- [ ] Enable Row Level Security on prompts table
- [ ] Verify all RLS policies are active
- [ ] Enable email confirmations if required
- [ ] Set Site URL to production domain
- [ ] Add production domain to auth redirect URLs
- [ ] Review Supabase API rate limits
- [ ] Enable database backups (if on Pro plan)
- [ ] Set up monitoring/alerts (optional)

**Level 4: Security Checklist (CRITICAL — P0)**

- [ ] Verify no hardcoded credentials in code
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Use environment variables for all secrets
- [ ] Test that anon key is appropriate (not exposing sensitive data)
- [ ] Verify CORS settings in Supabase

#### Phase 4.4: Deployment & Monitoring

**Duration:** 1–2 days

**Level 1: Vercel Deployment (CRITICAL — P0)**

- [ ] Create Vercel account
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set production branch to `main`
- [ ] Deploy to production
- [ ] Verify deployment successful

**Level 2: Post-Deployment Testing (CRITICAL — P0)**

- [ ] Test all features in production
- [ ] Test authentication with real Supabase production
- [ ] Test CRUD operations in production
- [ ] Test export/import in production
- [ ] Monitor for errors in Vercel logs

**Level 3: Monitoring & Logging (HIGH — P1)**

- [ ] Set up error tracking (Sentry, LogRocket, etc. — optional)
- [ ] Monitor Supabase metrics
- [ ] Watch for failed queries or auth errors
- [ ] Set up alerts for critical errors

**Level 4: DNS & Custom Domain (MEDIUM — P2)**

- [ ] Point custom domain to Vercel (if applicable)
- [ ] Set up SSL certificate
- [ ] Verify HTTPS working
- [ ] Update Supabase redirect URLs with custom domain

**Level 5: Release Notes (MEDIUM — P2)**

- [ ] Create git tag for release (e.g., v1.0.0)
- [ ] Write release notes
- [ ] Document changes and new features
- [ ] Commit to git

---

### 11.6 Priority Matrix

#### Critical Path (P0 — Must Have)

These features block the project from being complete or usable:

1. ✅ Dev environment setup
2. ✅ Supabase backend setup with RLS
3. ✅ Authentication (login, signup, logout)
4. ✅ Prompt CRUD (create, read, update, delete)
5. ✅ Basic search and category filtering
6. ✅ Dashboard UI and routing
7. ✅ Security and RLS verification
8. ✅ Production deployment

**Estimated Duration:** 6–8 weeks

#### High Priority (P1 — Should Have)

These features significantly enhance usability and are part of core vision:

1. ✅ Token estimator with confidence score
2. ✅ Rating system
3. ✅ Metadata display (dates, model, etc.)
4. ✅ Advanced filtering and search
5. ✅ Export/import functionality
6. ✅ Performance optimization (pagination, caching)
7. ✅ Error boundaries and error handling
8. ✅ Testing and QA
9. ✅ Documentation

**Estimated Duration:** 2–3 weeks (after P0)

#### Medium Priority (P2 — Nice to Have)

These features add polish and advanced functionality:

1. ⚠️ Skeleton loaders
2. ⚠️ Advanced search options (by model, date range)
3. ⚠️ Sorting options
4. ⚠️ Code documentation and cleanup
5. ⚠️ Custom domain and DNS setup

**Estimated Duration:** 1–2 weeks (after P1)

#### Low Priority (P3 — Future Roadmap)

These features are planned but not in MVP scope:

1. 🔮 Prompt versioning with edit history
2. 🔮 Collections/folders for organization
3. 🔮 Public prompt sharing
4. 🔮 Community library
5. 🔮 AI prompt suggestions
6. 🔮 Prompt chaining
7. 🔮 Browser extension
8. 🔮 Multi-language support (i18n)

**Estimated Timeline:** Post v1.0 (Q2 2026+)

---

### 11.7 Risk & Mitigation

| Risk                            | Severity | Mitigation                                          |
| ------------------------------- | -------- | --------------------------------------------------- |
| Supabase RLS misconfiguration   | Critical | Test policies extensively with multiple users early |
| Token estimator inaccuracy      | Medium   | Clearly communicate approximation to users          |
| Performance with large datasets | Medium   | Implement pagination and caching from the start     |
| Authentication token expiry     | Medium   | Handle token refresh gracefully                     |
| Export data corruption          | Low      | Validate JSON schema strictly before import         |
| UI component library missing    | Low      | Use RetroUI + shadcn as fallback                    |
| Browser compatibility issues    | Medium   | Test on multiple browsers during Stage 4            |

---

### 11.8 Success Criteria

**Stage 1 Completion**

- ✅ Development environment ready and tested
- ✅ Supabase backend fully configured with working RLS
- ✅ All dependencies installed and verified
- ✅ Project structure in place
- ✅ TanStack Router and Query configured

**Stage 2 Completion**

- ✅ Users can sign up, log in, and log out
- ✅ Users can create, read, update, delete prompts
- ✅ Users can search and filter prompts
- ✅ Token estimator functional and displaying
- ✅ Rating system working
- ✅ All data persists to Supabase
- ✅ RLS prevents cross-user data access
- ✅ No bugs in critical workflows

**Stage 3 Completion**

- ✅ Users can export prompts to JSON
- ✅ Users can import prompts from JSON
- ✅ Metadata (dates, model) displayed correctly
- ✅ Advanced filtering and search working
- ✅ Performance acceptable with 100+ prompts

**Stage 4 Completion**

- ✅ All manual testing passed
- ✅ No critical errors or bugs
- ✅ Code cleaned up and documented
- ✅ Production deployment successful
- ✅ Monitoring and alerts configured
- ✅ Release notes published
- ✅ v1.0.0 shipped! 🎉

---

### 11.9 Estimated Timeline Summary

| Stage     | Duration       | Key Deliverables                       |
| --------- | -------------- | -------------------------------------- |
| 1         | 2–3 weeks      | Infrastructure ready, tools configured |
| 2         | 4–6 weeks      | All core features working              |
| 3         | 2–3 weeks      | Advanced features complete             |
| 4         | 1–2 weeks      | Tested, deployed, monitoring active    |
| **Total** | **9–14 weeks** | **MVP shipped**                        |

---

### 11.10 Next Steps

1. **Immediately:** Start Stage 1, Phase 1.1 (Dev environment setup)
2. **Week 1:** Complete Stage 1 infrastructure
3. **Week 2–7:** Execute Stage 2 (core features)
4. **Week 8–9:** Execute Stage 3 (advanced features)
5. **Week 10:** Execute Stage 4 (polish, testing, deployment)
6. **Week 11–14:** Buffer for unknowns and optimization

---

_End of Document — Prompts Wardrobe SOP v1.0.0_
_Confidential — Internal Use Only_
