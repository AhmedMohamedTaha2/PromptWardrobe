# Setup Supabase Ping with GitHub Actions

## Why this workflow exists

Supabase pauses free-tier databases after a period of inactivity. This workflow acts as a scheduled task to ping the database regularly (every Monday and Thursday at 09:00 UTC) with a simple read query, keeping the project active.

## Steps to Configure GitHub Secrets

To make the workflow function, you must add your Supabase credentials to GitHub Secrets.

1. Go to your GitHub repository on the web.
2. Navigate to **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret**.
4. Add `SUPABASE_URL`:
   - Name: `SUPABASE_URL`
   - Secret: Your Supabase Project URL (e.g., `https://xxxx.supabase.co`)
5. Add `SUPABASE_SERVICE_ROLE_KEY`:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Secret: Your Supabase Service Role Key

## Finding your Service Role Key

1. Go to your Supabase Dashboard.
2. Select your project.
3. Navigate to **Project Settings** (the gear icon) → **API**.
4. Look under **Project API keys** to find the `service_role` secret. Reveal it and copy.

## Running the Workflow Manually

You can test the setup immediately without waiting for the schedule:

1. In your GitHub repository, click the **Actions** tab.
2. Select **Ping Supabase to Prevent Pausing** from the left sidebar.
3. Click the **Run workflow** dropdown on the right side.
4. Click **Run workflow**.

## ⚠️ Important Note

As of early 2026, Supabase may occasionally still pause projects despite these pings if they modify their internal criteria for inactivity on free-tier projects. If your project continues to get paused or if you need guaranteed uptime, upgrading to a Supabase paid plan is the reliable fix.
