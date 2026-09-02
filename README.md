# TRACES Form 26AS Retriever (Render Deployment Package)

This package contains everything required to deploy the Form 26AS Retriever Web Portal and Backend API together on Render.

---

## 🚀 How to Deploy on Render (Free Plan)

1. **Create a New Web Service:**
   * Go to [Render Dashboard](https://dashboard.render.com/) -> **New +** -> **Web Service**.
   * Connect your GitHub repository (or upload this folder).

2. **Configure Settings:**
   * **Name:** `traces-26as-retriever` (or any name you prefer)
   * **Region:** Any (Singapore or Frankfurt recommended for fast routing to India)
   * **Branch:** `main`
   * **Root Directory:** *(leave blank if repository root is this folder, or set to `render ready`)*
   * **Runtime:** `Python 3`
   * **Build Command:** `pip install -r requirements.txt`
   * **Start Command:** `uvicorn backend:app --host 0.0.0.0 --port $PORT --workers 1`
   * **Instance Type:** `Free` (512 MB RAM / 0.1 CPU)

3. **Environment Variables (Optional - for Supabase metrics):**
   * Add `SUPABASE_URL`: `https://your-supabase-id.supabase.co`
   * Add `SUPABASE_KEY`: `your-supabase-anon-or-service-key`

4. **Click "Deploy Web Service"**:
   * Render will build the environment and serve both your Python API and the Frontend Website under your Render URL (e.g. `https://your-app.onrender.com`).

---

## 🧩 Chrome Extension Setup Note
Once your Render web service is deployed:
1. Open `chrome-extension/manifest.json`.
2. Add your live Render URL into `"externally_connectable"`:
   ```json
   "externally_connectable": {
     "matches": [
       "http://localhost/*",
       "http://127.0.0.1/*",
       "https://your-app.onrender.com/*"
     ]
   }
   ```
3. Load the unpacked extension in Chrome to enable direct PDF downloads.
