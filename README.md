<div align="center">

# 🗂️ WARDROBE — AI Prompting Techniques

> Master the art of instructing AI, organize it like a wardrobe, and iterate with confidence.

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.2-38BDF8?logo=tailwindcss)
![TanStack Router](https://img.shields.io/badge/TanStack%20Router-1.168.2-FF6F00)
![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)
![Vibe Coded with Claude AI](https://img.shields.io/badge/Vibe%20Coded%20with-Claude%20AI-D97706?logo=anthropic)
![Frontend Masters](https://img.shields.io/badge/Frontend%20Masters-Course-FF4E00?logo=frontendmasters)

</div>

---

## 📚 Table of Contents

1. [Project Overview](#sec-3)
2. [Live Demo](#sec-4)
3. [Technologies & Libraries](#sec-5)
4. [Color Palette](#sec-6)
5. [Project Structure](#sec-7)
6. [Features & Functions](#sec-8)
7. [Routing Architecture](#sec-9)
8. [Data Flow](#sec-10)
9. [Component Inventory](#sec-11)
10. [Getting Started](#sec-12)
11. [Environment Variables](#sec-13)
12. [Vibe Coding (Claude AI)](#sec-14)
13. [Course Credit](#sec-15)
14. [Contributing](#sec-16)
15. [License](#sec-17)

<a id="sec-3"></a>

## 🧠 Project Overview

`prompts-wardrobe` is a frontend web application that turns prompt engineering into something you can _organize, rate, and iterate on_—like a wardrobe you revisit every day.

It provides:

- A **private dashboard** for creating and managing your prompt collection.
- A **public feed** of published prompts where you can **upvote** what works.
- A **profile + follow + notifications** loop that turns prompt sharing into a community workflow.
- **Prompt engineering education** built into the app via dedicated public pages (techniques + engineering concepts).
- **Export/import** so your wardrobe stays portable as your workflow evolves.

### What it teaches

This project is a practical exercise built while learning:

- “Practical Prompt Engineering for Developers” by **Engineer Sabrina Goldfarb** on **Frontend Masters**.

It demonstrates prompt engineering as both:

- **Content** (the Techniques and Engineering pages)
- **Practice** (how prompts are structured, validated, estimated, published, and iterated)

### Who it’s for

This README (and this app) is designed for:

- Developers building AI tooling interfaces (dashboards, editors, feeds).
- Prompt engineers who want a workflow that’s repeatable and measurable (tokens, ratings, publishing).
- Anyone using Supabase + TanStack Router + React Query patterns for production-grade frontend architecture.

<a id="sec-4"></a>

## 🎥 Live Demo

Live Demo URL:

- `Add your deployed URL here`

Screenshot placeholder:

![Live demo screenshot placeholder](https://placehold.co/1200x600/png?text=Live+Demo+Screenshot+Placeholder)

> Tip: Replace the placeholder with a screenshot from your deployed environment (including the public feed + dashboard views).

<a id="sec-5"></a>

## 🛠️ Technologies & Libraries

### ⚛️ Core Framework

| Technology | Version                   | Purpose                                |
| ---------- | ------------------------- | -------------------------------------- |
| React      | 19.2.4                    | UI rendering                           |
| React DOM  | 19.2.4                    | Client runtime                         |
| Vite       | 8.0.1                     | Build tool & dev server                |
| TypeScript | (configured, JS/TS mixed) | Safer editing + generated route typing |

### 🧭 Routing

| Technology              | Version | Purpose                           |
| ----------------------- | ------- | --------------------------------- |
| @tanstack/react-router  | 1.168.2 | File-based routing + route guards |
| @tanstack/router-plugin | 1.167.3 | Router integration for Vite       |

### 🔄 Data Fetching & Cache

| Technology                     | Version | Purpose                |
| ------------------------------ | ------- | ---------------------- |
| @tanstack/react-query          | 5.95.0  | Query/mutation caching |
| @tanstack/react-query-devtools | 5.95.0  | Dev tooling            |

### 🌐 Backend & Auth

| Technology            | Version | Purpose                                   |
| --------------------- | ------- | ----------------------------------------- |
| @supabase/supabase-js | 2.100.0 | Auth, database queries, realtime channels |

### 🎨 Styling

| Technology        | Version | Purpose                                 |
| ----------------- | ------- | --------------------------------------- |
| Tailwind CSS      | 4.2.2   | Utility-first styling                   |
| @tailwindcss/vite | 4.2.2   | Tailwind integration                    |
| CSS Theme Files   | —       | RetroUI theme + project token variables |
| clsx              | 2.1.1   | Conditional class building              |
| tailwind-merge    | 3.5.0   | Resolve Tailwind class conflicts        |

### 🧰 Forms & Validation

| Technology          | Version | Purpose                        |
| ------------------- | ------- | ------------------------------ |
| react-hook-form     | 7.72.0  | Form state management          |
| zod                 | 4.3.6   | Schema validation              |
| @hookform/resolvers | 5.2.2   | Bridge react-hook-form <-> zod |

### 📈 UI Utilities

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| sonner       | 2.0.7   | Toast notifications             |
| lucide-react | 0.577.0 | Icon set                        |
| recharts     | 3.8.0   | Pie chart for model usage stats |
| date-fns     | 4.1.0   | Human timestamps                |

### 🧠 Prompt/Token Utility

| Technology    | Version | Purpose                               |
| ------------- | ------- | ------------------------------------- |
| gpt-tokenizer | 3.4.0   | Token estimation in the prompt editor |

### 🧪 Testing & Quality

| Technology             | Version | Purpose                 |
| ---------------------- | ------- | ----------------------- |
| vitest                 | 4.1.1   | Test runner             |
| @testing-library/react | 16.3.2  | Component testing tools |
| eslint                 | 9.39.4  | Linting                 |

<a id="sec-6"></a>

## 🎨 Color Palette

The UI uses a RetroUI-inspired theme plus project-specific Tailwind `brand` tokens.

| Role                                   | Hex       | Preview                                              |
| -------------------------------------- | --------- | ---------------------------------------------------- |
| Brand Yellow                           | `#FFDB33` | ![#FFDB33](https://placehold.co/20x20/FFDB33/FFDB33) |
| Accent Yellow / Focus Accent           | `#F5C518` | ![#F5C518](https://placehold.co/20x20/F5C518/F5C518) |
| Warm Off-white (RetroUI `--primaryBG`) | `#FFFBE9` | ![#FFFBE9](https://placehold.co/20x20/FFFBE9/FFFBE9) |
| Cream (index fallback)                 | `#FFF5CB` | ![#FFF5CB](https://placehold.co/20x20/FFF5CB/FFF5CB) |
| White                                  | `#FFFFFF` | ![#FFFFFF](https://placehold.co/20x20/FFFFFF/FFFFFF) |
| Soft Black / Primary Text              | `#1A1A1A` | ![#1A1A1A](https://placehold.co/20x20/1A1A1A/1A1A1A) |
| Black (RetroUI border)                 | `#000000` | ![#000000](https://placehold.co/20x20/000000/000000) |
| Green Tag / Public Badge               | `#A8E6A3` | ![#A8E6A3](https://placehold.co/20x20/A8E6A3/A8E6A3) |
| Red (Destructive / Alerts)             | `#E63946` | ![#E63946](https://placehold.co/20x20/E63946/E63946) |
| Muted Gray                             | `#666666` | ![#666666](https://placehold.co/20x20/666666/666666) |
| UI Muted (index)                       | `#555555` | ![#555555](https://placehold.co/20x20/555555/555555) |
| UI Placeholder (index)                 | `#999999` | ![#999999](https://placehold.co/20x20/999999/999999) |
| Muted (RetroUI)                        | `#AEAEAE` | ![#AEAEAE](https://placehold.co/20x20/AEAEAE/AEAEAE) |
| Muted (RetroUI)                        | `#5A5A5A` | ![#5A5A5A](https://placehold.co/20x20/5A5A5A/5A5A5A) |
| Accent (RetroUI)                       | `#FAE583` | ![#FAE583](https://placehold.co/20x20/FAE583/FAE583) |
| Primary Hover (RetroUI)                | `#FFCC00` | ![#FFCC00](https://placehold.co/20x20/FFCC00/FFCC00) |

Notes:

- `#FFFBE9` and related RetroUI variables come from `src/styles/retroui-theme.css`.
- Tailwind `brand` tokens come from `tailwind.config.js`.
- Index fallback colors come from `src/index.css`.

<a id="sec-7"></a>

## 🗂️ Project Structure

```text
prompts-Wardrobe/
  README.md
  index.html
  package.json
  package-lock.json
  vite.config.js
  tsconfig.json
  eslint.config.js
  tailwind.config.js
  tailwind.config.cjs
  .gitignore
  .env.local.example
  .env.production.example
  public/
    icons.svg
  SOP/
    SOP.md
    PROJECT_BREAKDOWN.md
    ReportAuditV01.md
    copilot-audit.xml
    SUPABASE_SETUP.sql
  supabase_setup.sql
  supabase_social_triggers.sql
  supabase_social_notifications.sql
  src/
    main.jsx
    App.jsx
    App.css
    index.css
    routeTree.gen.ts              # Generated TanStack file-route map
    test/
      setup.js
    lib/
      supabase.js                 # Supabase client init via env vars
      queryClient.js              # React Query client config
      schemas.js                  # Zod prompt schema + categories
      schemas.test.js            # Tests for schema validation
      profile.js                  # ensureProfileExists(user)
      exportImport.js            # exportPrompts/importPrompts JSON workflow
      utils.js                    # cn() helper
    routes/
      __root.jsx                 # Root route guard + Outlet shell
      index.jsx                  # Landing route "/"
      public/
        index.jsx                # Public feed "/public/"
        prompt-techniques.jsx    # Techniques page "/public/prompt-techniques"
        prompt-engineering.jsx   # Engineering concepts "/public/prompt-engineering"
        $promptId/index.jsx      # Public prompt detail "/public/$promptId/"
      auth/
        login.jsx                # Login "/auth/login"
        signup.jsx               # Signup "/auth/signup"
      dashboard/
        index.jsx                # Dashboard "/dashboard/"
        new.jsx                  # New prompt "/dashboard/new"
        $promptId/
          index.jsx              # Prompt detail "/dashboard/$promptId/"
          edit.jsx               # Prompt edit "/dashboard/$promptId/edit"
      bookmarks/
        index.jsx                # Bookmarks "/bookmarks/"
      notifications/
        index.jsx                # Notifications list "/notifications/"
      profile/
        $userId/index.jsx        # Profile page "/profile/$userId/"
      settings/
        index.jsx                # Settings "/settings/"
    components/
      ModernLandingPage.jsx      # Marketing v2 landing
      LandingPage.jsx            # Marketing v1 landing
      layout/
        AppShell.jsx             # App chrome (navbar, export/import, notifications)
        BellIcon.jsx            # Notification dropdown
      prompts/
        PromptList.jsx
        PromptCard.jsx
        PromptForm.jsx
      profile/
        FollowButton.jsx
        ModelUsageChart.jsx
      notifications/
        NotificationItem.jsx
      ui/
        Button.jsx
        Input.jsx
        Textarea.jsx
        Select.jsx
        SearchInput.jsx
        CategoryTabs.jsx
        RatingStars.jsx
        PromptCardSkeleton.jsx
        EmptyState.jsx
        ErrorState.jsx
        LoadingState.jsx
        ErrorBoundary.jsx
        PageLoader.jsx
        ProfileHeaderSkeleton.jsx
        PieChart.jsx
  .tanstack/
    tmp/
      441efc8a-caa0da83a7509b0eae2cd22fb8ecdfc2
      b85a169f-eb869d6fb9cdb698b29caceb9fbd8656
```

<a id="sec-8"></a>

## 🚀 Features & Functions

### 🧾 Authentication & Session Guard

Authentication is handled via Supabase and enforced by TanStack Router:

- `src/routes/__root.jsx` runs `beforeLoad` and redirects unauthenticated users to `/auth/login` unless the route is public.
- If a user is already authenticated and they visit an auth route (`/auth/login`, `/auth/signup`), they’re redirected to `/dashboard`.

Supporting hook:

- `src/hooks/useAuth.js` loads session and listens to `onAuthStateChange`.

### 🏷️ Public Prompt Feed (Infinite Scroll + Filters)

Public browsing at `/public/`:

- Uses `SearchInput` to update `q` (debounced).
- Uses `CategoryTabs` to update `category`.
- Fetching is powered by `usePublicPromptsFeed` (`useInfiniteQuery`).
- Infinite pagination is implemented via an `IntersectionObserver` sentinel.
- Prompts render in a responsive grid via `PromptCard`.

Associated code:

- `src/routes/public/index.jsx`
- `src/hooks/usePrompts.js` (public feed)
- `src/components/ui/SearchInput.jsx`
- `src/components/ui/CategoryTabs.jsx`
- `src/components/prompts/PromptCard.jsx`

### 🧠 Public Prompt Detail (Author Follow + Upvote)

Public prompt detail at `/public/$promptId/`:

- Loads prompt via `usePublicPrompt(promptId)`.
- Loads upvote state via `useUpvotes(promptId)`.
- Lets users upvote via `useUpvotePrompt(userId)` and toggle state optimistically.
- Shows creator information and provides follow/unfollow through `FollowButton`.

Associated code:

- `src/routes/public/$promptId/index.jsx`
- `src/hooks/useUpvotePrompt.js`
- `src/components/profile/FollowButton.jsx`

### 🧰 Prompt Techniques (Educational UI + Example Modal)

`/public/prompt-techniques` provides:

- Multiple technique cards in a bento layout.
- A modal overlay for technique example prompts.

Associated code:

- `src/routes/public/prompt-techniques.jsx`

### 🧪 Prompt Engineering (Concept Breakdown)

`/public/prompt-engineering` provides:

- Structured explanations of prompt engineering concepts and parameters.
- A grid of “AI Parameters” including Temperature, Top P, Tokens, and Context Window.

Associated code:

- `src/routes/public/prompt-engineering.jsx`

### 📋 Dashboard Prompt Management (List + Create + Update)

Private dashboard at `/dashboard/`:

- `PromptList` queries prompts for the authenticated user and applies search/filter/sort from URL params.
- Prompts display via `PromptCard`, including rating and token estimate preview.
- Create prompt UI is hosted at `/dashboard/new`.
- Edit prompt UI is hosted at `/dashboard/$promptId/edit`.

Associated code:

- `src/routes/dashboard/index.jsx`
- `src/components/prompts/PromptList.jsx`
- `src/components/prompts/PromptCard.jsx`
- `src/routes/dashboard/new.jsx`
- `src/routes/dashboard/$promptId/edit.jsx`

### ✍️ Token-aware Prompt Editor (Validation + Publish)

The core editor `PromptForm` includes:

- `react-hook-form` + `zod` validation using `promptSchema`.
- Token estimation:
  - `useTokenEstimate(content)` uses `gpt-tokenizer` and updates `token_estimate` live.
- Publish logic:
  - When saving a prompt as public, the app triggers `usePublishPrompt` to mark `is_public=true` and enqueue follower notifications.

Associated code:

- `src/components/prompts/PromptForm.jsx`
- `src/lib/schemas.js`
- `src/hooks/useTokenEstimate.js`
- `src/hooks/usePublishPrompt.js`

### 🔍 Prompt Detail + Delete Confirmation

Dashboard prompt detail at `/dashboard/$promptId/`:

- Shows content, notes, metadata, rating stars.
- Owner-only actions:
  - Edit link
  - Delete confirmation modal
- Public prompts can show upvote CTA.

Associated code:

- `src/routes/dashboard/$promptId/index.jsx`

### 🔖 Bookmarks (Saved Prompt Collection)

Bookmarks at `/bookmarks/`:

- Fetches bookmark rows via `useBookmarks(userId)`.
- Renders saved prompts using `PromptCard`.
- Requires authentication.

Associated code:

- `src/routes/bookmarks/index.jsx`
- `src/hooks/useBookmarks.js`

### 🔔 Notifications (Realtime Dropdown + Full List)

Notifications at `/notifications/`:

- `useNotifications(userId)` loads recent notifications.
- `useMarkAllRead` and `useMarkRead` update `read_at`.
- `NotificationItem` navigates based on notification `type`.

Realtime bell dropdown:

- `BellIcon` subscribes to realtime INSERT events on `public.notifications` using `useNotificationRealtime(userId)`.
- Unread count updates via `useUnreadCount(userId)`.

Associated code:

- `src/routes/notifications/index.jsx`
- `src/components/layout/BellIcon.jsx`
- `src/components/notifications/NotificationItem.jsx`
- `src/hooks/useNotificationRealtime.js`

### 👤 Profiles (Follow + Model Usage Chart)

Profile at `/profile/$userId/`:

- Loads public profile via `useProfile(userId)`.
- Loads the user’s public prompts with pagination via `usePublicPrompts`.
- Shows follower/following counts via `useFollowCounts`.
- Follow/unfollow via `FollowButton` unless it’s your own profile.
- Owner-only model usage visualization:
  - `ModelUsageChart` calls Supabase RPC `get_model_usage_stats` and renders a pie chart.

Associated code:

- `src/routes/profile/$userId/index.jsx`
- `src/hooks/useFollow.js`
- `src/components/profile/ModelUsageChart.jsx`
- `src/hooks/useModelStats.js`

### ⚙️ Settings (Public Profile + Auth Account Update)

Settings at `/settings/`:

- Profile information form updates `public.profiles` through `useUpdateProfile`.
- Account form updates Supabase auth user email/password through `useUpdateAccount`.
- Uses `zod` schemas to validate form inputs.

Associated code:

- `src/routes/settings/index.jsx`
- `src/hooks/useUpdateProfile.js`
- `src/hooks/useUpdateAccount.js`

### 🧳 Export / Import Prompts (Portable Wardrobe)

`AppShell` provides export/import:

- Export prompts for the logged-in user to JSON using `exportPrompts`.
- Import prompts from JSON and upsert them with `importPrompts`.
- Uses Sonner to show success/failure feedback.

Associated code:

- `src/components/layout/AppShell.jsx`
- `src/lib/exportImport.js`

<a id="sec-9"></a>

## 🧭 Routing Architecture

Routing is built with **TanStack Router** using the generated `routeTree`.

### 🗺️ Route Flow Diagram

```text
main.jsx
  └─ createRouter({ routeTree, context: { supabase, queryClient } })
     └─ RouterProvider
        └─ Root route: src/routes/__root.jsx
           ├─ beforeLoad auth guard + redirects
           └─ AppShell + <Outlet />
              └─ file route components
```

### 📍 Route Table

The route list comes from `src/routeTree.gen.ts`:

| Path                         | File Route Component                       |
| ---------------------------- | ------------------------------------------ |
| `/`                          | `src/routes/index.jsx`                     |
| `/auth/login`                | `src/routes/auth/login.jsx`                |
| `/auth/signup`               | `src/routes/auth/signup.jsx`               |
| `/dashboard/`                | `src/routes/dashboard/index.jsx`           |
| `/dashboard/new`             | `src/routes/dashboard/new.jsx`             |
| `/dashboard/$promptId/`      | `src/routes/dashboard/$promptId/index.jsx` |
| `/dashboard/$promptId/edit`  | `src/routes/dashboard/$promptId/edit.jsx`  |
| `/public/`                   | `src/routes/public/index.jsx`              |
| `/public/prompt-techniques`  | `src/routes/public/prompt-techniques.jsx`  |
| `/public/prompt-engineering` | `src/routes/public/prompt-engineering.jsx` |
| `/public/$promptId/`         | `src/routes/public/$promptId/index.jsx`    |
| `/bookmarks/`                | `src/routes/bookmarks/index.jsx`           |
| `/notifications/`            | `src/routes/notifications/index.jsx`       |
| `/profile/$userId/`          | `src/routes/profile/$userId/index.jsx`     |
| `/settings/`                 | `src/routes/settings/index.jsx`            |

### 🧱 Route Guards

`src/routes/__root.jsx` uses these checks:

- Public routes (no session required):
  - routes starting with `/public`
  - routes starting with `/profile`
  - the landing page `/`
- Auth routes (`/auth/*`):
  - redirected to `/dashboard` if already authenticated
- Private routes:
  - redirected to `/auth/login` if no session exists

<a id="sec-10"></a>

## 🔄 Data Flow

### 🧾 High-level Architecture

```text
Supabase (tables + RPC + realtime)
  ├─ Auth session (supabase.auth.getSession)
  ├─ Queries/mutations (supabase.from(...))
  └─ Realtime (supabase.channel(...).on('postgres_changes', ...))
      │
      ▼
TanStack React Query (useQuery / useInfiniteQuery / useMutation)
      │
      ▼
Routes (TanStack Router) -> Components -> Hooks
```

### 📦 Key Data Shape Definitions

#### 🧱 Prompt (Zod + DB columns)

```ts
type Prompt = {
  id: string; // UUID
  user_id: string; // UUID (owner)
  title: string;
  content: string;
  model?: string | null;
  category:
    | "general"
    | "coding"
    | "image_gen"
    | "writing"
    | "data_analysis"
    | "research"
    | "roleplay"
    | "system_prompt";
  rating?: number; // optional, 1..5
  notes?: string;
  token_estimate?: number;
  is_public: boolean;
  published_at?: string | null;
  created_at: string; // TIMESTAMPTZ (ISO string)
  updated_at: string; // TIMESTAMPTZ (ISO string)
};
```

Sources:

- `src/lib/schemas.js` (`promptSchema`, categories)
- `supabase_setup.sql` (`public.prompts`)

#### 🔔 Notification (inbox events)

```ts
type Notification = {
  id: string;
  user_id: string;
  type: string;
  payload: Record<string, unknown>;
  read_at?: string | null;
  created_at: string;
};
```

Sources:

- `src/hooks/useNotifications.js`
- `supabase_setup.sql` (`public.notifications`)

#### 👥 Follow + Social graph

```ts
type Follow = {
  follower_id: string;
  following_id: string;
};
```

Sources:

- `src/hooks/useFollow.js`
- `supabase_setup.sql` (`public.follows`)

#### 🧳 Bookmarks

```ts
type Bookmark = {
  id: string;
  user_id: string;
  prompt_id: string;
};
```

Sources:

- `src/hooks/useBookmarks.js`
- `supabase_setup.sql` (`public.bookmarks`)

<a id="sec-11"></a>

## 🧩 Component Inventory

Every component listed below exists as a real file in `src/components/`.

- `src/components/ModernLandingPage.jsx`: Marketing landing page (“v2.0 Beta — Now Live”).
- `src/components/LandingPage.jsx`: Alternate marketing landing page (“v1.0.0 Now Available”).
- `src/components/layout/AppShell.jsx`: Global navigation + export/import + notification bell wrapper.
- `src/components/layout/BellIcon.jsx`: Notification bell dropdown with realtime updates and navigation by notification type.
- `src/components/prompts/PromptList.jsx`: Dashboard list that fetches and renders the user’s prompts.
- `src/components/prompts/PromptCard.jsx`: Prompt summary card with rating, metadata, and optional bookmark toggle.
- `src/components/prompts/PromptForm.jsx`: Prompt create/edit form with validation and live token estimation.
- `src/components/ui/Button.jsx`: Styled button component with variants and loading state.
- `src/components/ui/Input.jsx`: Labeled input with consistent neo-brutalist styling and error UI.
- `src/components/ui/Textarea.jsx`: Labeled textarea with consistent styling and error UI.
- `src/components/ui/Select.jsx`: Labeled select component.
- `src/components/ui/SearchInput.jsx`: Debounced search input tied to router search params.
- `src/components/ui/CategoryTabs.jsx`: Category filter pills tied to router search params.
- `src/components/ui/RatingStars.jsx`: Star rating widget used for prompt rating.
- `src/components/ui/PromptCardSkeleton.jsx`: Skeleton placeholder for prompts list loading.
- `src/components/ui/EmptyState.jsx`: Empty/results state with optional action.
- `src/components/ui/ErrorState.jsx`: Inline error state with optional retry.
- `src/components/ui/LoadingState.jsx`: Compact loading UI used in routes.
- `src/components/ui/ErrorBoundary.jsx`: Error boundary wrapper that triggers a Sonner toast.
- `src/components/ui/PageLoader.jsx`: Full-page loader for route pending states.
- `src/components/ui/ProfileHeaderSkeleton.jsx`: Skeleton header while profile data loads.
- `src/components/ui/PieChart.jsx`: Recharts pie chart wrapper with custom tooltip.
- `src/components/profile/ModelUsageChart.jsx`: Pie chart + breakdown for `get_model_usage_stats`.
- `src/components/profile/FollowButton.jsx`: Follow/unfollow CTA for creators.
- `src/components/notifications/NotificationItem.jsx`: Notification item renderer and navigation target.

<a id="sec-12"></a>

## 🚀 Getting Started

### 0) Clone the repo

```powershell
git clone <your-repo-url-here>
cd prompts-Wardrobe
```

### 1) Install dependencies

```powershell
npm ci
```

### 2) Configure Supabase credentials

```powershell
copy .env.local.example .env.local
```

Set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 3) Create Supabase tables + RLS policies

Run `supabase_setup.sql` in Supabase SQL Editor.

Optional/extra social logic files:

- `supabase_social_triggers.sql`
- `supabase_social_notifications.sql`

### 4) Start the app

```powershell
npm run dev
```

### 5) Lint, build, test (optional)

```powershell
npm run lint
npm run build
npm test
```

<a id="sec-13"></a>

## 🔐 Environment Variables

| Variable                 | Required | Example                            | Where it’s used                      |
| ------------------------ | -------- | ---------------------------------- | ------------------------------------ |
| `VITE_SUPABASE_URL`      | Yes      | `https://your-project.supabase.co` | `src/lib/supabase.js`                |
| `VITE_SUPABASE_ANON_KEY` | Yes      | `your-anon-key-here`               | `src/lib/supabase.js`                |
| `VITE_SITE_URL`          | Optional | `https://my-production-app.com`    | Present in `.env.production.example` |

<a id="sec-14"></a>

## 🤖 Vibe Coding — Built with Claude AI

This project is a VIBE CODING collaboration:

- It was built with **Claude AI (Anthropic)** as a pair programmer.

Vibe coding contributed to:

- faster iteration on routing + data fetching boundaries
- rapid creation of reusable UI primitives (buttons, empty/error/loading states)
- practical learning via prompt-workflow UX: validate, estimate tokens, publish, observe notifications, and iterate.

<a id="sec-15"></a>

## 🎓 Course Credit — Frontend Masters

This project is a practical exercise built while studying:

- **“Practical Prompt Engineering for Developers”** by **Sabrina Goldfarb**
  - Platform: [Frontend Masters](https://frontendmasters.com)

The app’s Techniques and Prompt Engineering pages make course concepts visible in the UI, while the prompt editor and publishing workflow turn those concepts into a measurable developer experience.

<a id="sec-16"></a>

## 🤝 Contributing Guidelines

Contributions are welcome:

- Open an issue for bugs or feature requests.
- Include reproduction steps and affected routes.
- Keep changes aligned with existing architecture:
  - route-level logic in `src/routes/*`
  - data logic in `src/hooks/*`
  - shared UI in `src/components/ui/*`

Before opening a PR:

- run `npm run lint`
- run `npm test` if tests cover the changed behavior

<a id="sec-17"></a>

## 🧾 License

No `LICENSE` file was found in the repository root.

If you plan to distribute this project, add a license file (MIT, Apache-2.0, or other) and document any third-party asset licensing as needed.
