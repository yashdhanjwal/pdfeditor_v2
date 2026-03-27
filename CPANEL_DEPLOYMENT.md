# cPanel Deployment Guide (Hostingial.com) - Optimized

Shared hosting environments often have strict RAM and CPU limits. If you see errors like **"Unable to fork"**, **"Resource limits reached"**, or **"Wrong Data"**, follow this guide carefully.

## Strategy: Local Build & Upload
Instead of building the app on the server (which uses too much RAM), build it on your computer and upload the finished files.

### 1. Build on your Local Computer
1. Open your terminal on your computer.
2. Run:
   ```bash
   npm install
   npm run build
   ```
3. This creates a hidden folder named `.next`.

### 2. Upload Files to cPanel
Use cPanel File Manager or FTP to upload these files/folders to your subdomain root (e.g., `public_html/pdfeditor.yashdhanjwal.com`):
- `.next/` (The whole folder)
- `public/`
- `scripts/`
- `package.json`
- `server.js`
- `next.config.ts` (or `.js`)

### 3. Setup Node.js Application in cPanel
1. Go to **"Setup Node.js App"** in cPanel.
2. Click **"Create Application"**.
3. **Application root:** Enter the path to your folder (e.g., `public_html/pdfeditor.yashdhanjwal.com`).
4. **Application URL:** Select `pdfeditor.yashdhanjwal.com` (ensure `www` or non-`www` matches your subdomain).
5. **Application startup file:** `server.js`
6. Click **Create**.

---

## ⚠️ Troubleshooting "Wrong Data" Error
If you get a **"Wrong Data"** error when clicking the **CREATE** button:

1. **Delete `node_modules`:** Ensure there is NO `node_modules` folder in your application root directory on the server *before* you click Create. cPanel needs to initialize this itself.
2. **Check Paths:** Make sure the "Application root" path is correct and exists. It should usually be relative to your home directory (e.g., `public_html/pdfeditor.yashdhanjwal.com`).
3. **Subdomain Setup:** Ensure the subdomain `pdfeditor.yashdhanjwal.com` is already created in the cPanel "Domains" section before trying to link it to a Node.js app.
4. **Permissions:** Ensure the directory is writable (755 permissions).

---

## 4. Install Production Dependencies on Server
1. Once the app is created, copy the "Enter virtual environment" command from the top of the cPanel Node.js page.
2. Open the cPanel **Terminal**.
3. Paste the command and press Enter.
4. Run:
   ```bash
   npm install --production
   ```

## 5. Fixing "API Error" or "Conversion Failed"
1. **CloudConvert API Key:** Ensure you have added `CLOUDCONVERT_API_KEY` to your Environment Variables in the cPanel Node.js App interface.
2. **Python Setup:** Word/Excel to PDF requires Python. Go to **"Setup Python App"** in cPanel and ensure Python 3.x is available.
3. **Memory Limits:** If conversions fail mid-way, it's likely a RAM limit. Contact Hostingial support to increase **PMEM (Physical Memory)** for your account.

---

## Branding & Identity
- **Name:** Yash Dhanjwal
- **Website:** https://www.pdfeditor.yashdhanjwal.com
- **Tagline:** Fast, Free & Accurate Document Conversion
