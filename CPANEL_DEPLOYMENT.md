# cPanel Deployment Guide (Shared Hosting)

Since shared hosting (like Hostingial.com) does not allow root access (`sudo`) or system-wide software installation (`apt`), you must use cPanel's built-in features to deploy this application.

## 1. Setup Node.js Application
1. Log in to cPanel.
2. Search for **"Setup Node.js App"**.
3. Click **"Create Application"**.
4. Set the following:
   - **Node.js version**: 18.x or 20.x
   - **Application mode**: Production
   - **Application root**: `public_html/ft1.yashdhanjwal.com`
   - **Application URL**: `ft1.yashdhanjwal.com`
5. Click **Create**.
6. Once created, enter your Terminal (in cPanel) and enter the virtual environment using the command shown in the cPanel UI.
7. Run `npm install` and `npm run build`.

## 2. Setup Python Application
1. In cPanel, search for **"Setup Python App"**.
2. Click **Create Application**.
   - **Version**: 3.10+
   - **Application root**: `python_env`
3. Once created, enter the virtualenv in your Terminal and run:
   ```bash
   pip install pdf2docx pdfplumber pandas openpyxl
   ```
4. Run `which python` and copy the path.
5. In your **Node.js App** settings, add an Environment Variable `PYTHON_PATH` with this value.

## 3. CloudConvert API (Required)
Since you cannot install LibreOffice:
1. Create a free account at [CloudConvert.com](https://cloudconvert.com/).
2. Get an API Key.
3. In your cPanel **Node.js App** settings, add `CLOUDCONVERT_API_KEY`.
4. Restart the app.

## 4. Cron Job
1. In cPanel **Cron Jobs**, set an hourly task:
   ```bash
   /usr/local/bin/node /home/yourusername/public_html/ft1.yashdhanjwal.com/scripts/cleanup.js
   ```
