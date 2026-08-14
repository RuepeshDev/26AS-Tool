# 26AS Retrieval Tool - Desktop Application Guide

Welcome to the **26AS Retrieval Desktop Application**! This application is built using **Tauri v2** (Rust + Native Webview), enabling end-users to run 26AS Statement retrievals and downloads seamlessly on Windows without downloading Python, Rust, Node.js, or Chrome extensions.

---

## 1. Application Overview

- **No External Prerequisites for Users**: Standard Windows users only need to run the `.exe` installer.
- **Embedded Download Engine**: All authentication phases (Phase 1 connect to Phase 5 TRACES redirect & PDF export) are executed directly inside the desktop application.
- **Supabase Metrics Tracking**: Built-in Supabase client ready to log successful, failed, and disposed processing times.

---

## 2. Configuration & Keys (`.env` / Setup)

Create a `.env` file in the `Desktop Application` root folder or configure environment variables in your deployment setup:

```env
# --- Supabase Configuration ---
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-key-here

# --- Encryption & Security Keys (if required) ---
VITE_APP_PUBLIC_KEY=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----
VITE_APP_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ...\n-----END PRIVATE KEY-----
```

### Explanation of Keys:
- **`VITE_SUPABASE_URL`**: Your Supabase project URL (found under Project Settings -> API in your Supabase dashboard).
- **`VITE_SUPABASE_ANON_KEY`**: Your public anon key for Supabase client initialization.
- **`VITE_APP_PUBLIC_KEY`**: Public RSA key for encrypting credentials sent to e-Filing authentication services.
- **`VITE_APP_PRIVATE_KEY`**: Private key reference if decryption is required on-device.

---

## 3. Database Setup (Supabase)

Execute the contents of `supabase_schema.sql` inside your Supabase SQL Editor:

1. Log into your **Supabase Dashboard**.
2. Navigate to **SQL Editor**.
3. Run the SQL script from `supabase_schema.sql` to create the `execution_stats` table and default policies.

---

## 4. Development Setup (For Developers)

To run and test the application locally on your development machine:

### Prerequisites:
- Node.js (v18+)
- Rust & Cargo (`rustup`)

### Steps:
```bash
# 1. Open the Desktop Application directory
cd "Desktop Application"

# 2. Install Node dependencies
npm install

# 3. Launch Tauri in development mode
npm run tauri dev
```

---

## 5. How to Build the Windows Application (`.exe` / `.msi`)

To build the standalone Windows executable for non-technical users:

```bash
# Build the production executable installer
npm run tauri build
```

The output standalone installer will be generated in:
`src-tauri/target/release/bundle/msi/` or `src-tauri/target/release/bundle/nsis/`

### Distribution to End Users:
Simply share the resulting `.exe` or `.msi` file with your users. They only need to double-click and install it on Windows. No technical setup, command line, or external dependencies are required.

---

## 6. Automated GitHub Actions Build (`.exe` CI/CD)

An automated GitHub Actions workflow has been configured in [`.github/workflows/build-tauri.yml`](file:///Users/dangodra/Downloads/Work/Founders/26AS%20Tool/.github/workflows/build-tauri.yml).

### Trigger Branches:
Whenever code is pushed to either of these branches:
- `tauri`
- `tauri-dev`

### What Happens Automatically:
1. GitHub Actions spins up a Windows runner (`windows-latest`).
2. Installs Node.js 20 and stable Rust toolchain (`x86_64-pc-windows-msvc`).
3. Compiles the Tauri Desktop App.
4. Uploads the generated `.exe` installer as a downloadable **Build Artifact** named `26AS-Desktop-App-Windows` on the GitHub Actions run summary page.

---

## 7. Auto-Updater Key Configuration

The automatic updater feature is fully configured in the application code ([`src/app.js`](file:///Users/dangodra/Downloads/Work/Founders/26AS%20Tool/Desktop%20Application/src/app.js) & [`src-tauri/tauri.conf.json`](file:///Users/dangodra/Downloads/Work/Founders/26AS%20Tool/Desktop%20Application/src-tauri/tauri.conf.json)).

### Where to Put Your Keys:

1. **Public Key (Inside App)**:
   - Open [`src-tauri/tauri.conf.json`](file:///Users/dangodra/Downloads/Work/Founders/26AS%20Tool/Desktop%20Application/src-tauri/tauri.conf.json).
   - Replace `"pubkey": "YOUR_TAURI_PUBLIC_KEY_HERE"` with your actual public key string.
   - Replace `"https://github.com/OWNER/REPO/releases/latest/download/latest.json"` with your GitHub repo owner and name.

2. **Private Key (GitHub Repository Secret)**:
   - Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Create a Secret named **`TAURI_SIGNING_PRIVATE_KEY`** and paste your private key string.
   - (Optional) If your private key has a password, create a secret named **`TAURI_SIGNING_PRIVATE_KEY_PASSWORD`**.

---

## 8. Branch Segregation: Developer Testing vs Production Release

### A. Developer Debugging Branch (`tauri-dev`)
- **Purpose**: Internal testing and debugging environment only.
- **What happens on push**:
  1. GitHub Actions compiles a **Debug Build** (`npx tauri build --debug`) with Webview DevTools enabled.
  2. Uploads the debug installer `.exe` as a GitHub Actions Build Artifact named **`26AS-Desktop-App-DEV-DEBUG`**.
  3. Does **NOT** publish a public GitHub release or trigger auto-updates.
  4. You can download this `.exe` from GitHub Actions, run it on Windows, right-click, and select **Inspect Element / F12 DevTools** to view all developer console logs!

### B. Production Release Branch (`tauri`)
- **Purpose**: Official public release build for end-users.
- **What happens on push**:
  1. GitHub Actions compiles an **Optimized Release Build** (`npm run tauri build`) with DevTools disabled and max minification.
  2. Signs the executable using your private key (`TAURI_SIGNING_PRIVATE_KEY`).
  3. Automatically publishes an official **GitHub Release** with `latest.json` auto-updater manifest attached.



