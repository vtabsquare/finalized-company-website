<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cd90a303-74aa-4342-ac08-fa83e959cc8b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## One-click Windows launcher

1. Install the current Node.js LTS version and Python 3 once.
2. Double-click `RUN_WEBSITE.bat`.

The launcher automatically installs missing website packages, creates `.env` from `.env.example` when needed, builds the production site, checks its main routes, starts it locally, and opens it in your default browser. Keep the launcher window open while using the website; press `Ctrl+C` in that window to stop it.

## Website routes

- `/architecture/:productId` opens a product architecture page and supports browser Back/Forward navigation.
- `/careers` opens the careers page directly for links shared through LinkedIn and other job channels.
- The host must rewrite unknown routes to `/index.html`. The included `render.yaml` already contains this rule.

## Career applications

Applications are emailed through the existing `send-email` Supabase function. If a `career_applications` table is available, submissions are also logged there; email delivery remains the primary submission path.
