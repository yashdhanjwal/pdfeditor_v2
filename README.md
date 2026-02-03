# Free Online Tools by Yash Dhanjwal

A production-ready, high-quality document conversion platform built with Next.js, LibreOffice, and Python.

## Features
- **PDF to Word**: High accuracy conversion preserving layout.
- **PDF to Excel**: Table extraction with formatting.
- **Word to PDF**: Professional document conversion.
- **Excel to PDF**: Clean and readable spreadsheet conversion.
- **Security**: All files are automatically deleted after 1 hour.
- **Responsive**: Works on mobile, tablet, and desktop.
- **SEO Optimized**: Meta tags, schema markup, and sitemaps included.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: Next.js API Routes, Node.js.
- **Conversion Engine**: LibreOffice (Headless), pdf2docx (Python), pdfplumber (Python).

## Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.10+
- LibreOffice (installed on the host system)

### Backend Dependencies (Python)
```bash
pip install pdf2docx pdfplumber pandas openpyxl
```

### Frontend & API Dependencies (Node.js)
```bash
npm install
```

### Environment Variables
Create a `.env.local` file (if needed for specific deployment configurations).

## Deployment Instructions (Hostingial.com / Linux)

1. **Server Setup**: Ensure LibreOffice and Python are installed.
   ```bash
   sudo apt update
   sudo apt install -y libreoffice
   ```

2. **Clone & Install**:
   ```bash
   git clone <repository-url>
   cd <project-dir>
   npm install
   pip install pdf2docx pdfplumber pandas openpyxl
   ```

3. **Build**:
   ```bash
   npm run build
   ```

4. **Run with PM2**:
   ```bash
   pm2 start npm --name "pdf-tools" -- start
   ```

5. **Nginx Configuration**:
   Configure Nginx as a reverse proxy to port 3000. Increase `client_max_body_size` to allow larger uploads (e.g., `20M`).

6. **Cleanup Job**:
   Set up a crontab to run the cleanup script every hour.
   ```bash
   0 * * * * node /path/to/project/scripts/cleanup.js
   ```

## Future Scalability
- **Distributed Queue**: Use Redis and BullMQ for handling high volumes of conversions.
- **Cloud Storage**: Move file storage from local disk to S3 or similar.
- **Microservices**: Separate conversion engines into dedicated workers.

---
Created by **Yash Dhanjwal** - B.Tech Student, New Delhi.
