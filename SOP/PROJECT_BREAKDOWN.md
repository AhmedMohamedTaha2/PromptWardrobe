# Prompts Wardrobe — Project Breakdown

## Stages, Phases & Work Levels

**Version 1.0.0 | March 2026**

---

## Executive Summary

The Prompts Wardrobe project is divided into **4 Major Stages**, each containing **multiple Phases**, with granular **Work Levels** (P0 Critical, P1 High, P2 Medium, P3 Low).

### Timeline Estimate

- **Stage 1 (Setup & Infrastructure):** 2–3 weeks
- **Stage 2 (Core Features):** 4–6 weeks
- **Stage 3 (Advanced Features):** 2–3 weeks
- **Stage 4 (Polish & Deployment):** 1–2 weeks
- **Total:** ~10–14 weeks (full-time development)

---

## STAGE 1: Project Setup & Infrastructure

### Duration: 2–3 weeks

This stage establishes the development environment, configures all tools, and sets up the backend infrastructure.

---

### Phase 1.1: Development Environment Setup

**Duration:** 3–5 days

#### Level 1: Node.js & Project Scaffolding (CRITICAL — P0)

- [ ] Install Node.js >= 20.x
- [ ] Create Vite project: `npm create vite@latest prompts-wardrobe -- --template react`
- [ ] Set up git repository and `.gitignore`
- [ ] Configure ESLint and Prettier

#### Level 2: Core Dependencies Installation (CRITICAL — P0)

- [ ] Install React + React DOM (^19.x)
- [ ] Install Vite dev server and build tooling
- [ ] Install @tanstack/react-router (^1.x)
- [ ] Install @tanstack/react-query (^5.x)
- [ ] Install @supabase/supabase-js (^2.x)
- [ ] Install form libraries: react-hook-form (^7.x), zod (^3.x), @hookform/resolvers (^3.x)
- [ ] Install styling: tailwindcss (^4.x), @tailwindcss/vite
- [ ] Install UI/Icons: lucide-react (^0.4x), sonner (^1.x)
- [ ] Install utilities: gpt-tokenizer (^2.x), date-fns (^3.x)

#### Level 3: Dev Dependencies (HIGH — P1)

- [ ] Install @tanstack/router-plugin for Vite
- [ ] Install @tanstack/router-devtools (^1.x)
- [ ] Install @tanstack/react-query-devtools (^5.x)
- [ ] Install @tanstack/react-table (^8.x) — optional but recommended

#### Level 4: Configuration Files (CRITICAL — P0)

- [ ] Create `vite.config.js` with TanStack Router plugin
- [ ] Create `tailwind.config.js` with theme customization
- [ ] Create `tsconfig.json` or `jsconfig.json` with path aliases
- [ ] Create `.env.local` template with Supabase variables

---

### Phase 1.2: Supabase Backend Setup

**Duration:** 5–7 days

#### Level 1: Supabase Project Creation (CRITICAL — P0)

- [ ] Create Supabase account and project
- [ ] Obtain project URL and anon key
- [ ] Add credentials to `.env.local`
- [ ] Test connection with `supabase.auth.getSession()`

#### Level 2: Database Schema Creation (CRITICAL — P0)

- [ ] Run SQL script to create `prompts` table
- [ ] Configure columns: id, user_id, title, content, model, category, rating, notes, token_estimate, created_at, updated_at
- [ ] Create indexes on frequently queried columns (user_id, category, created_at)
- [ ] Set up auto-update trigger for `updated_at`

#### Level 3: Row Level Security (RLS) Setup (CRITICAL — P0)

- [ ] Enable RLS on `prompts` table
- [ ] Create SELECT policy: `auth.uid() = user_id`
- [ ] Create INSERT policy: `auth.uid() = user_id`
- [ ] Create UPDATE policy: `auth.uid() = user_id`
- [ ] Create DELETE policy: `auth.uid() = user_id`
- [ ] Test RLS policies with test accounts

#### Level 4: Authentication Configuration (CRITICAL — P0)

- [ ] Enable email/password authentication in Supabase
- [ ] Configure email confirmation settings (if required)
- [ ] Set Site URL to localhost for development
- [ ] Add redirect URLs for local dev and production
- [ ] Create Supabase client wrapper at `lib/supabase.js`

#### Level 5: Testing Database & Auth (HIGH — P1)

- [ ] Write test queries to verify schema
- [ ] Test user sign-up flow end-to-end
- [ ] Test RLS policies with multiple users
- [ ] Verify cascade delete on user deletion

---

### Phase 1.3: Project Structure & Routing Setup

**Duration:** 3–5 days

#### Level 1: Directory Structure Creation (CRITICAL — P0)

- [ ] Create `/src/routes` directory with subdirectories
- [ ] Create `/src/components` with ui, prompts, layout subdirectories
- [ ] Create `/src/hooks` for custom hooks
- [ ] Create `/src/lib` for utilities and configs
- [ ] Create `/src/styles` for CSS files

#### Level 2: TanStack Router Configuration (CRITICAL — P0)

- [ ] Create root route file (`__root.jsx`)
- [ ] Implement auth guard in root route with `beforeLoad`
- [ ] Create landing/redirect route (`index.jsx`)
- [ ] Create auth routes structure (`auth/login.jsx`, `auth/signup.jsx`)
- [ ] Create dashboard routes structure (with placeholders)
- [ ] Configure TanStack Router vite plugin in build config

#### Level 3: Router Provider Setup (CRITICAL — P0)

- [ ] Create router instance with context (Supabase client)
- [ ] Wrap app with RouterProvider in `main.jsx`
- [ ] Add RouteDevtools for development
- [ ] Test basic route navigation

#### Level 4: Query Client Setup (HIGH — P1)

- [ ] Create TanStack Query client at `lib/queryClient.js`
- [ ] Configure cache times and retry policies
- [ ] Wrap app with QueryClientProvider in `main.jsx`
- [ ] Add QueryDevtools for development

#### Level 5: Styling Foundation (HIGH — P1)

- [ ] Import Tailwind CSS in `src/main.jsx`
- [ ] Create global styles at `src/index.css`
- [ ] Set up Tailwind theme configuration
- [ ] Add RetroUI theme variables (fonts, colors, spacing)

---

### Phase 1.4: UI Component Library & RetroUI Integration

**Duration:** 4–6 days

#### Level 1: RetroUI Theme & Fonts (HIGH — P1)

- [ ] Add RetroUI fonts to `index.html` (Courier Prime, JetBrains Mono, etc.)
- [ ] Create `src/styles/retroui-theme.css` with theme variables
- [ ] Configure Tailwind to extend with RetroUI theme
- [ ] Test theme application in a simple component

#### Level 2: Base UI Components via shadcn (HIGH — P1)

- [ ] Add RetroUI Button component via shadcn CLI
- [ ] Add RetroUI Input component
- [ ] Add RetroUI Textarea component
- [ ] Add RetroUI Card component
- [ ] Add RetroUI Dialog/Modal component
- [ ] Add RetroUI Badge component
- [ ] Add RetroUI Toast/Alert component
- [ ] Verify component imports and exports

#### Level 3: Custom UI Component Wrappers (HIGH — P1)

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

#### Level 4: Layout Components (HIGH — P1)

- [ ] Create `src/components/layout/AppShell.jsx` (main page wrapper)
- [ ] Create navbar/header component with logout button
- [ ] Create sidebar or navigation structure (if needed)
- [ ] Style layout to match RetroUI aesthetic

#### Level 5: Icon Integration (MEDIUM — P2)

- [ ] Set up lucide-react icon imports
- [ ] Create icon constants/exports
- [ ] Test icons in UI components

---

## STAGE 2: Core Features Implementation

### Duration: 4–6 weeks

This stage builds all P0 and P1 priority features: authentication, prompt CRUD, and basic UI.

---

### Phase 2.1: Authentication Implementation

**Duration:** 1 week

#### Level 1: Auth Hook & Context (CRITICAL — P0)

- [ ] Create `src/hooks/useAuth.js` hook
- [ ] Implement user session state management
- [ ] Create helper functions: `signUp()`, `login()`, `logout()`, `getCurrentUser()`
- [ ] Export auth context or custom hook

#### Level 2: Login Page (CRITICAL — P0)

- [ ] Create `src/routes/auth/login.jsx` component
- [ ] Design login form with email and password inputs
- [ ] Implement form validation with zod schema
- [ ] Integrate react-hook-form for form state
- [ ] Handle login submission with error handling
- [ ] Add Sonner toast notifications for success/error
- [ ] Redirect to dashboard on successful login
- [ ] Add "Sign up" link

#### Level 3: Sign-Up Page (CRITICAL — P0)

- [ ] Create `src/routes/auth/signup.jsx` component
- [ ] Design sign-up form with email and password
- [ ] Implement password confirmation validation
- [ ] Integrate react-hook-form with zod schema
- [ ] Handle sign-up submission with error handling
- [ ] Show validation errors inline
- [ ] Redirect to dashboard on successful sign-up
- [ ] Add "Already have account?" link

#### Level 4: Logout Functionality (CRITICAL — P0)

- [ ] Add logout button to navbar/header
- [ ] Implement logout mutation
- [ ] Clear session and redirect to login on logout
- [ ] Add confirmation or immediate logout option

#### Level 5: Auth Guard & Route Protection (CRITICAL — P0)

- [ ] Verify `__root.jsx` auth guard is working
- [ ] Test protected routes redirect to login
- [ ] Test public auth routes redirect to dashboard if logged in
- [ ] Verify session persists across page refresh

#### Level 6: Session Persistence (HIGH — P1)

- [ ] Ensure Supabase session tokens persist in localStorage
- [ ] Handle token refresh on expiry
- [ ] Test session persistence across browser restarts

---

### Phase 2.2: Prompt CRUD Operations

**Duration:** 1.5 weeks

#### Level 1: Create Query Hook (CRITICAL — P0)

- [ ] Create `src/hooks/usePrompts.js` hook
- [ ] Implement `useQuery` for fetching all user prompts
- [ ] Add `useMutation` for creating prompts
- [ ] Add `useMutation` for updating prompts
- [ ] Add `useMutation` for deleting prompts
- [ ] Implement query key factory for cache invalidation
- [ ] Export all hooks and utilities

#### Level 2: Create Prompt Form (CRITICAL — P0)

- [ ] Create `src/components/prompts/PromptForm.jsx` component
- [ ] Design form fields: title, content, model, category, rating, notes
- [ ] Implement zod schema for form validation
- [ ] Integrate react-hook-form
- [ ] Add real-time token estimator (integration with `useTokenEstimate.js`)
- [ ] Show token count estimate below textarea
- [ ] Handle form submission
- [ ] Add loading state during submission
- [ ] Display validation errors

#### Level 3: Create Prompt Page (CRITICAL — P0)

- [ ] Create `src/routes/dashboard/new.jsx` route
- [ ] Add page title and description
- [ ] Render PromptForm component
- [ ] Handle successful form submission → redirect to dashboard
- [ ] Add back button or cancel option
- [ ] Style with AppShell layout

#### Level 4: Prompt List View (CRITICAL — P0)

- [ ] Create `src/components/prompts/PromptList.jsx` component
- [ ] Display prompts as cards in a grid or list
- [ ] Show title, category, rating, created_at on each card
- [ ] Add click handler to navigate to detail view
- [ ] Implement loading state with skeleton loaders
- [ ] Implement empty state when no prompts
- [ ] Implement error state with retry button

#### Level 5: Prompt Card Component (CRITICAL — P0)

- [ ] Create `src/components/prompts/PromptCard.jsx` component
- [ ] Display prompt title, snippet of content, category badge, rating stars
- [ ] Show creation date formatted with date-fns
- [ ] Add click-to-expand or link to detail view
- [ ] Style with RetroUI card design

#### Level 6: Dashboard Main Route (CRITICAL — P0)

- [ ] Create `src/routes/dashboard/index.jsx` route
- [ ] Render PromptList component
- [ ] Add "Create New Prompt" button
- [ ] Implement search/filter params state with TanStack Router
- [ ] Render empty state or prompt list based on data
- [ ] Render loading/error states
- [ ] Style with AppShell layout

#### Level 7: Prompt Detail View (CRITICAL — P0)

- [ ] Create `src/routes/dashboard/$promptId/index.jsx` route
- [ ] Fetch single prompt by ID
- [ ] Display full prompt details: title, content, model, category, rating, notes, dates
- [ ] Add edit button → navigate to edit page
- [ ] Add delete button with confirmation dialog
- [ ] Add back button to dashboard
- [ ] Format dates using date-fns
- [ ] Handle loading and error states

#### Level 8: Prompt Edit Page (CRITICAL — P0)

- [ ] Create `src/routes/dashboard/$promptId/edit.jsx` route
- [ ] Fetch prompt data and pre-fill form
- [ ] Render PromptForm with existing data
- [ ] Handle form submission with update mutation
- [ ] Show "Unsaved changes" warning if navigating away
- [ ] Redirect to detail view on success
- [ ] Add cancel button to discard changes

#### Level 9: Delete Confirmation Dialog (CRITICAL — P0)

- [ ] Create dialog/modal for delete confirmation
- [ ] Show prompt title being deleted
- [ ] Implement "Cancel" and "Delete" buttons
- [ ] Handle delete mutation on confirmation
- [ ] Show loading state during deletion
- [ ] Redirect to dashboard on success
- [ ] Show error toast if deletion fails

---

### Phase 2.3: Search & Basic Filtering

**Duration:** 1 week

#### Level 1: Search Input Component (CRITICAL — P0)

- [ ] Create `src/components/ui/SearchInput.jsx` component
- [ ] Add text input with debounce (300ms)
- [ ] Implement clear button (X icon)
- [ ] Emit search query on input change
- [ ] Focus/blur visual feedback

#### Level 2: Category Filtering UI (CRITICAL — P0)

- [ ] Create `src/components/ui/CategoryTabs.jsx` component
- [ ] Render tabs for each category: All, General, Coding, Image Gen, Writing, Data Analysis, Research, Roleplay, System Prompt
- [ ] Highlight active tab
- [ ] Emit category selection on tab click
- [ ] Style with RetroUI tab design

#### Level 3: URL-Based Search State (CRITICAL — P0)

- [ ] Update `/dashboard` route search params with zod validation
- [ ] Implement `validateSearch` in TanStack Router for category and q params
- [ ] Update SearchInput to modify URL params
- [ ] Update CategoryTabs to modify URL params
- [ ] Ensure state persists across browser refresh

#### Level 4: Client-Side Filtering Logic (CRITICAL — P0)

- [ ] Implement category filter in prompt list (client-side filtering)
- [ ] Implement search filter using Supabase `ilike` on title + content
- [ ] Combine category and search filters
- [ ] Show result count
- [ ] Show "No results" message if empty

#### Level 5: Filter UI Integration (HIGH — P1)

- [ ] Add SearchInput to dashboard header
- [ ] Add CategoryTabs above or below prompt list
- [ ] Ensure filters are always visible and accessible
- [ ] Test filter combinations

#### Level 6: Performance Optimization (HIGH — P1)

- [ ] Debounce search input to reduce queries (300ms)
- [ ] Implement pagination or infinite scroll for large lists (optional)
- [ ] Avoid duplicate queries with TanStack Query caching

---

### Phase 2.4: Token Estimator Implementation

**Duration:** 4–5 days

#### Level 1: Token Estimator Hook (HIGH — P1)

- [ ] Create `src/hooks/useTokenEstimate.js` hook
- [ ] Implement gpt-tokenizer integration
- [ ] Calculate token count from text input
- [ ] Implement confidence score logic based on model type
- [ ] Return: { tokens: number, confidence: 'Low' | 'Medium' | 'High' }

#### Level 2: Token Display Component (HIGH — P1)

- [ ] Display token count below textarea in PromptForm
- [ ] Show confidence indicator: Low (red), Medium (yellow), High (green)
- [ ] Add tooltip explaining confidence score
- [ ] Show note: "Token counts are approximate and may vary by model"

#### Level 3: Real-Time Token Updates (HIGH — P1)

- [ ] Update token count as user types in content textarea
- [ ] Debounce token calculation (100ms) for performance
- [ ] Handle rapid input changes gracefully

#### Level 4: Store Token Estimate on Save (HIGH — P1)

- [ ] Capture token_estimate on form submission
- [ ] Send to Supabase with other prompt data
- [ ] Display stored token estimate in prompt detail view
- [ ] Allow user to recalculate on edit

---

### Phase 2.5: Rating System

**Duration:** 3–4 days

#### Level 1: Rating Stars Component (CRITICAL — P0)

- [ ] Create `src/components/ui/RatingStars.jsx` component
- [ ] Render 5 interactive stars
- [ ] Show filled/empty star states
- [ ] Implement hover effect (show preview rating)
- [ ] Emit rating on click (1–5)
- [ ] Make read-only or interactive based on prop

#### Level 2: Rating Integration in Forms (CRITICAL — P0)

- [ ] Add RatingStars component to PromptForm
- [ ] Integrate with react-hook-form
- [ ] Allow optional rating (can be null)
- [ ] Display rating error if validation fails

#### Level 3: Display Ratings on Cards & Details (CRITICAL — P0)

- [ ] Show rating stars on PromptCard component
- [ ] Show rating stars on prompt detail view
- [ ] Display "Not rated" if rating is null

#### Level 4: Update Rating Inline (HIGH — P1)

- [ ] Allow users to update rating directly on detail view or card
- [ ] Use mutation to save rating change
- [ ] Show loading state during update
- [ ] Verify database constraint: rating between 1–5

### Phase 2.6: Public Prompts & Social (Duration: 1 week)

#### Level 1: Prompt Visibility Toggle (CRITICAL — P0)

- [ ] Add `is_public` toggle + `published_at` to create/edit forms
- [ ] Default new prompts to private
- [ ] Show visibility badge on cards/detail
- [ ] Prevent access to private prompts by non-owners

#### Level 2: Public Feed & Discovery (CRITICAL — P0)

- [ ] Add public prompts list (filter `is_public = true`) with search/filter
- [ ] Expose public prompts in dashboard or a dedicated view
- [ ] Ensure pagination or infinite scroll ready for larger lists

#### Level 3: Upvotes (CRITICAL — P0)

- [ ] Create `prompt_upvotes` table with PK (prompt_id, user_id)
- [ ] Add upvote button (one per user) with optimistic UI
- [ ] Display counts on card/detail and in profile lists

#### Level 4: Following & Notifications (CRITICAL — P0)

- [ ] Create `follows` table and follow/unfollow controls on profile pages
- [ ] Insert notification `new_prompt_from_followed` when followed author publishes
- [ ] Add notifications UI with unread badge and mark-as-read

#### Level 5: Profiles & Settings (CRITICAL — P0)

- [ ] Create public profile page showing avatar, name, bio, counts, public prompts
- [ ] Create protected settings page to edit name, bio, avatar, email, password
- [ ] Wire profile data to `profiles` table; email/password via Supabase Auth

---

## STAGE 3: Advanced Features

### Duration: 2–3 weeks

This stage builds P2 features: export/import, metadata display, and advanced filtering.

---

### Phase 3.1: Export & Import Functionality

**Duration:** 1 week

#### Level 1: Export Utility Library (MEDIUM — P2)

- [ ] Create `src/lib/exportImport.js` utility
- [ ] Implement `exportPromptsAsJSON()` function
  - Fetch all user prompts from Supabase
  - Serialize to JSON array
  - Generate filename: `prompts-wardrobe-export-{YYYY-MM-DD}.json`
  - Create Blob and trigger download via anchor

#### Level 2: Export Button & UI (MEDIUM — P2)

- [ ] Add export button to dashboard header or menu
- [ ] Implement loading state during export
- [ ] Show success toast with filename
- [ ] Handle export errors gracefully

#### Level 3: Import Utility & Logic (MEDIUM — P2)

- [ ] Implement `importPromptsFromJSON()` function
  - Accept JSON file input
  - Validate JSON schema with zod
  - Parse and normalize data
  - Upsert prompts into Supabase (insert or update by id)
  - Return success/error counts
  - Invalidate prompts query cache

#### Level 4: Import UI & File Input (MEDIUM — P2)

- [ ] Add import button to dashboard header or menu
- [ ] Create file input dialog/modal
- [ ] Validate file type (JSON only)
- [ ] Display import progress and results
- [ ] Show success toast with import summary
- [ ] Handle errors with detailed messages
- [ ] Allow cancel/retry

#### Level 5: Import Validation Schema (HIGH — P1)

- [ ] Define zod schema for imported prompt objects
- [ ] Validate required fields: title, content, category
- [ ] Validate optional fields: model, rating, notes, token_estimate, created_at
- [ ] Skip or error on invalid records

#### Level 6: Conflict Resolution (HIGH — P1)

- [ ] Handle duplicate prompts (same id)
- [ ] Decide: overwrite or skip existing
- [ ] Show warning if data will be overwritten
- [ ] Allow user to confirm or cancel

---

### Phase 3.2: Metadata Display & Formatting

**Duration:** 4–5 days

#### Level 1: Date Formatting (MEDIUM — P2)

- [ ] Use date-fns to format `created_at` and `updated_at`
- [ ] Display human-readable dates (e.g., "March 23, 2026")
- [ ] Display relative times (e.g., "2 hours ago")
- [ ] Add tooltips with full timestamp on hover

#### Level 2: Metadata Section in Detail View (MEDIUM — P2)

- [ ] Create metadata display section in prompt detail page
- [ ] Show created_at, updated_at, model, token_estimate
- [ ] Display in a clean, non-intrusive layout
- [ ] Use icons from lucide-react for visual clarity

#### Level 3: Card Metadata Display (MEDIUM — P2)

- [ ] Show creation date on PromptCard
- [ ] Show category badge
- [ ] Show rating (if set)
- [ ] Keep card compact and scannable

#### Level 4: Metadata Sorting (HIGH — P1)

- [ ] Add sort options to dashboard (by date created, date updated, rating, etc.)
- [ ] Store active sort in URL params (optional)
- [ ] Implement client-side or server-side sorting

---

### Phase 3.3: Advanced Filtering & Search

**Duration:** 4–5 days

#### Level 1: Multi-Filter Support (MEDIUM — P2)

- [ ] Combine category + search + sort simultaneously
- [ ] All filters editable via URL params
- [ ] Add "Clear All Filters" button
- [ ] Show active filter count badge

#### Level 2: Filter Persistence (MEDIUM — P2)

- [ ] Persist filters across page navigation
- [ ] Allow sharing filtered URLs with specific state
- [ ] Test filter state persistence

#### Level 3: Advanced Search Options (HIGH — P1)

- [ ] Add search by model field (optional)
- [ ] Add minimum rating filter (optional)
- [ ] Add date range filter (optional)
- [ ] Combine multiple search criteria

#### Level 4: Search Results Display (HIGH — P1)

- [ ] Show active filters summary
- [ ] Show result count ("123 prompts found")
- [ ] Show search query highlighted
- [ ] Implement faceted search hints (optional)

---

### Phase 3.4: Performance & UX Improvements

**Duration:** 2–3 days

#### Level 1: Skeleton Loaders (HIGH — P1)

- [ ] Create skeleton loader components for cards
- [ ] Show skeleton loaders while fetching prompts
- [ ] Animate skeleton loading state

#### Level 2: Pagination or Infinite Scroll (MEDIUM — P2)

- [ ] Decide: pagination vs infinite scroll
- [ ] Implement chosen approach
- [ ] Test with large datasets

#### Level 3: Caching Strategy (HIGH — P1)

- [ ] Configure TanStack Query stale times
- [ ] Set cache invalidation on mutations
- [ ] Test cache behavior

#### Level 4: Error Boundaries (HIGH — P1)

- [ ] Implement React Error Boundary component
- [ ] Catch and display component errors gracefully
- [ ] Allow user to recover (retry/reset)

---

## STAGE 4: Polish, Testing & Deployment

### Duration: 1–2 weeks

This stage focuses on quality assurance, documentation, and production deployment.

---

### Phase 4.1: Testing & QA

**Duration:** 3–5 days

#### Level 1: Manual Testing (HIGH — P1)

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

#### Level 2: Error Handling Testing (HIGH — P1)

- [ ] Test network failures
- [ ] Test validation errors
- [ ] Test edge cases (empty queries, special characters, very long text)
- [ ] Test concurrent operations (rapid mutations)
- [ ] Verify error messages are user-friendly

#### Level 3: Performance Testing (MEDIUM — P2)

- [ ] Test with large number of prompts (1000+)
- [ ] Measure load times and responsiveness
- [ ] Profile bundle size
- [ ] Check memory usage
- [ ] Optimize if needed

#### Level 4: Accessibility Testing (HIGH — P1)

- [ ] Test keyboard navigation
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Test form accessibility
- [ ] Add ARIA labels where needed

#### Level 5: Security Testing (CRITICAL — P0)

- [ ] Verify RLS policies enforce correctly
- [ ] Test CSRF protection
- [ ] Verify no sensitive data in logs/console
- [ ] Test rate limiting
- [ ] Check for XSS vulnerabilities

---

### Phase 4.2: Code Quality & Documentation

**Duration:** 2–3 days

#### Level 1: Code Review & Cleanup (HIGH — P1)

- [ ] Review all components for consistency
- [ ] Remove unused code and imports
- [ ] Add JSDoc comments to functions
- [ ] Ensure naming conventions followed
- [ ] Check for code duplication

#### Level 2: Documentation (HIGH — P1)

- [ ] Update README.md with setup instructions
- [ ] Document environment variables required
- [ ] Add troubleshooting guide
- [ ] Document API endpoints used
- [ ] Add component usage examples (optional)

#### Level 3: ESLint & Formatting (HIGH — P1)

- [ ] Run ESLint on all files
- [ ] Fix any lint errors or warnings
- [ ] Ensure consistent code formatting
- [ ] Set up pre-commit hooks (optional)

#### Level 4: Comments & Inline Documentation (MEDIUM — P2)

- [ ] Add comments to complex logic
- [ ] Document custom hooks
- [ ] Document query keys and caching strategy
- [ ] Document zod schemas

---

### Phase 4.3: Production Preparation

**Duration:** 2–3 days

#### Level 1: Environment Configuration (CRITICAL — P0)

- [ ] Create production `.env` variables
- [ ] Configure different env vars for dev/staging/prod
- [ ] Update Supabase project with production credentials
- [ ] Verify credentials work in production

#### Level 2: Build & Bundle Optimization (HIGH — P1)

- [ ] Run `npm run build` and verify no errors
- [ ] Check bundle size with Vite analyzer
- [ ] Enable code splitting if needed
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all features work in production build

#### Level 3: Supabase Production Checklist (CRITICAL — P0)

- [ ] Enable Row Level Security on prompts table
- [ ] Verify all RLS policies are active
- [ ] Enable email confirmations if required
- [ ] Set Site URL to production domain
- [ ] Add production domain to auth redirect URLs
- [ ] Review Supabase API rate limits
- [ ] Enable database backups (if on Pro plan)
- [ ] Set up monitoring/alerts (optional)

#### Level 4: Security Checklist (CRITICAL — P0)

- [ ] Verify no hardcoded credentials in code
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Use environment variables for all secrets
- [ ] Test that anon key is appropriate (not exposing sensitive data)
- [ ] Verify CORS settings in Supabase

---

### Phase 4.4: Deployment & Monitoring

**Duration:** 1–2 days

#### Level 1: Vercel Deployment (CRITICAL — P0)

- [ ] Create Vercel account
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables in Vercel dashboard
- [ ] Set production branch to `main`
- [ ] Deploy to production
- [ ] Verify deployment successful

#### Level 2: Post-Deployment Testing (CRITICAL — P0)

- [ ] Test all features in production
- [ ] Test authentication with real Supabase production
- [ ] Test CRUD operations in production
- [ ] Test export/import in production
- [ ] Monitor for errors in Vercel logs

#### Level 3: Monitoring & Logging (HIGH — P1)

- [ ] Set up error tracking (Sentry, LogRocket, etc. — optional)
- [ ] Monitor Supabase metrics
- [ ] Watch for failed queries or auth errors
- [ ] Set up alerts for critical errors

#### Level 4: DNS & Custom Domain (MEDIUM — P2)

- [ ] Point custom domain to Vercel (if applicable)
- [ ] Set up SSL certificate
- [ ] Verify HTTPS working
- [ ] Update Supabase redirect URLs with custom domain

#### Level 5: Release Notes (MEDIUM — P2)

- [ ] Create git tag for release (e.g., v1.0.0)
- [ ] Write release notes
- [ ] Document changes and new features
- [ ] Commit to git

---

## PRIORITY MATRIX

### Critical Path (P0 — Must Have)

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

### High Priority (P1 — Should Have)

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

### Medium Priority (P2 — Nice to Have)

These features add polish and advanced functionality:

1. ⚠️ Skeleton loaders
2. ⚠️ Advanced search options (by model, date range)
3. ⚠️ Sorting options
4. ⚠️ Code documentation and cleanup
5. ⚠️ Custom domain and DNS setup

**Estimated Duration:** 1–2 weeks (after P1)

### Low Priority (P3 — Future Roadmap)

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

## Dependency Graph

```
Stage 1: Infrastructure
├─ Dev Environment Setup
│  └─ Node.js, Vite, Dependencies
├─ Supabase Backend
│  └─ Database Schema, RLS, Auth Config
└─ Project Structure
   └─ Routing, TanStack Setup, UI Foundation

Stage 2: Core Features
├─ Authentication (depends on: Supabase + Router)
├─ Prompt CRUD (depends on: Supabase + TanStack Query + Router)
├─ Search & Filtering (depends on: Prompt CRUD)
├─ Token Estimator (depends on: gpt-tokenizer library)
└─ Rating System (depends on: Prompt CRUD)

Stage 3: Advanced Features
├─ Export/Import (depends on: Prompt CRUD)
├─ Metadata Display (depends on: Prompt CRUD + date-fns)
└─ Advanced Filtering (depends on: Search & Filtering)

Stage 4: Polish & Deployment
├─ Testing & QA (depends on: All Stage 2 features)
├─ Documentation (depends on: All implementation)
├─ Production Setup (depends on: Supabase + Vercel config)
└─ Deployment (depends on: All previous phases)
```

---

## Risk & Mitigation

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

## Success Criteria

### Stage 1 Completion

- ✅ Development environment ready and tested
- ✅ Supabase backend fully configured with working RLS
- ✅ All dependencies installed and verified
- ✅ Project structure in place
- ✅ TanStack Router and Query configured

### Stage 2 Completion

- ✅ Users can sign up, log in, and log out
- ✅ Users can create, read, update, delete prompts
- ✅ Users can search and filter prompts
- ✅ Token estimator functional and displaying
- ✅ Rating system working
- ✅ All data persists to Supabase
- ✅ RLS prevents cross-user data access
- ✅ No bugs in critical workflows

### Stage 3 Completion

- ✅ Users can export prompts to JSON
- ✅ Users can import prompts from JSON
- ✅ Metadata (dates, model) displayed correctly
- ✅ Advanced filtering and search working
- ✅ Performance acceptable with 100+ prompts

### Stage 4 Completion

- ✅ All manual testing passed
- ✅ No critical errors or bugs
- ✅ Code cleaned up and documented
- ✅ Production deployment successful
- ✅ Monitoring and alerts configured
- ✅ Release notes published
- ✅ v1.0.0 shipped! 🎉

---

## Estimated Timeline Summary

| Stage     | Duration       | Key Deliverables                       |
| --------- | -------------- | -------------------------------------- |
| 1         | 2–3 weeks      | Infrastructure ready, tools configured |
| 2         | 4–6 weeks      | All core features working              |
| 3         | 2–3 weeks      | Advanced features complete             |
| 4         | 1–2 weeks      | Tested, deployed, monitoring active    |
| **Total** | **9–14 weeks** | **MVP shipped**                        |

---

## Next Steps

1. **Immediately:** Start Stage 1, Phase 1.1 (Dev environment setup)
2. **Week 1:** Complete Stage 1 infrastructure
3. **Week 2–7:** Execute Stage 2 (core features)
4. **Week 8–9:** Execute Stage 3 (advanced features)
5. **Week 10:** Execute Stage 4 (polish, testing, deployment)
6. **Week 11–14:** Buffer for unknowns and optimization

---

_End of Project Breakdown — Prompts Wardrobe v1.0.0_
_For implementation, follow the stages and phases sequentially. Adjust timelines based on team size and experience._
