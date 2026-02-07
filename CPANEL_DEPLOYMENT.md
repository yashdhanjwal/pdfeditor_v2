# cPanel Deployment Guide (Shared Hosting) - Optimized

Shared hosting environments often have strict RAM and CPU limits. If you see an error like **"Unable to fork"** or **"Resource limits reached"**, follow this optimized guide.

## Strategy: Local Build & Upload
Instead of building the app on the server (which uses too much RAM), you will build it on your computer and upload the finished files.

### 1. Build on your Local Computer
1. Open your terminal on your computer.
2. Run:
   ```bash
   npm install
   npm run build
   ```
3. This creates a hidden folder named `.next`.

### 2. Upload Files to cPanel
Use cPanel File Manager or FTP to upload these files/folders to your subdomain root (`public_html/ft1.yashdhanjwal.com`):
- `.next/` (The whole folder)
- `public/`
- `scripts/`
- `package.json`
- `server.js`
- `next.config.ts` (or `.js`)

### 3. Setup Node.js Application in cPanel
1. Go to **"Setup Node.js App"**.
2. Click **"Create Application"**.
3. **Application root:** `public_html/ft1.yashdhanjwal.com`
4. **Application URL:** `ft1.yashdhanjwal.com`
5. **Application startup file:** `server.js` (This is much lighter than pointing to node_modules).
6. Click **Create**.

### 4. Install Production Dependencies on Server
1. Copy the "Enter virtual environment" command from the top of the cPanel Node.js page.
2. Open the cPanel **Terminal**.
3. Paste the command and press Enter.
4. Run:
   ```bash
   npm install --production
   ```
   *(Note: `--production` is faster and uses less memory).*

### 5. Fixing "Unable to Fork" Error
If you still see the error in the screenshot:
1. Go to the cPanel main dashboard.
2. Search for **"Terminal"**.
3. Type `pkill -u your_username -f node` to kill any stuck processes.
4. Try restarting the Node.js app again.
5. If the problem persists, contact Hostingial support and ask them to **"Increase the PMEM (Physical Memory) and Process limit"** for your account so you can run a Node.js server.

## 6. CloudConvert & Python
Don't forget to set up your **Python App** and **CloudConvert API Key** as mentioned in the main guide to ensure Word to PDF conversions work!
