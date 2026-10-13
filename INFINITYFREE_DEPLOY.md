# Deploying to InfinityFree — Complete Guide

This project is optimized to run smoothly within **InfinityFree's Free Tier** constraints without triggering account suspensions.

---

## 1. Resource Limits vs. Your Project

| Resource Metric | InfinityFree Limit | Your Project | Status |
| :--- | :--- | :--- | :--- |
| **Disk Space** | 5,000 MB (5 GB) | **~20 MB** | 🟢 Safe (Uses < 0.5% of quota) |
| **Max Single File Size** | 10 MB | **~1.1 MB** (largest file) | 🟢 Safe (10x below limit) |
| **Inode Count (Files/Dirs)** | 30,000 inodes | **141 items** | 🟢 Safe (Uses < 0.5% of quota) |
| **Daily Hits Quota** | 50,000 hits / 24 hrs | Protected by **Aggressive Browser Caching** & **Scraper Blocker** | 🟢 Safe (Static assets cached for 1 year) |
| **Databases** | 400 MySQL DBs (50MB cap) | **0 DBs needed** (Pure static & lightweight PHP) | 🟢 Safe |
| **SSL Certificate** | Free Let's Encrypt | Supported via cPanel + `.htaccess` automatic HTTPS redirect | 🟢 Safe |

---

## 2. How the 50,000 Daily Hits Quota is Protected

InfinityFree defines a "hit" as any HTTP request to any file (HTML, CSS, JS, image, or font). Exceeding 50,000 hits triggers an automated 24-hour suspension.

To prevent this:
1. **Aggressive Browser Caching in `.htaccess`**:
   - Static files (`.css`, `.js`, images, webfonts) have `Cache-Control: max-age=31536000, public, immutable`.
   - Returning visitors load assets from local browser cache with **0 server hits**.
2. **GZIP / Deflate Compression**:
   - Enabled in `.htaccess` to reduce data transfer and server CPU load.
3. **Anti-Scraper `robots.txt`**:
   - Blocks aggressive SEO crawl bots (`AhrefsBot`, `SemrushBot`, `MJ12bot`, `DotBot`, etc.) that eat up hits quota.
4. **Native Image Lazy Loading**:
   - Off-screen images have `loading="lazy"` so they only fetch when scrolled into view.
5. **No 404 Leaks**:
   - Branded `404.html` and custom error document handling prevent missing asset errors.

---

## 3. Step-by-Step Deployment to InfinityFree

### Step 1: Locate Your InfinityFree FTP Credentials
In your **InfinityFree Client Area** (under your hosting account details):
- **FTP Hostname:** `ftpupload.net`
- **FTP Username:** e.g., `if0_12345678`
- **FTP Password:** Your account vPanel password
- **Port:** `21`

### Step 2: Upload Files to the `htdocs` Folder
> **Important:** All website files must be placed inside the `htdocs/` directory on InfinityFree.

#### Method A: Using FileZilla (Recommended)
1. Download and open [FileZilla](https://filezilla-project.org/).
2. Enter Host: `ftpupload.net`, Username, Password, Port: `21`, and click **Quickconnect**.
3. On the right panel (Remote site), open the **`htdocs`** folder.
4. If there is a default `index2.html` or placeholder file inside `htdocs`, delete it.
5. Select all files and folders from this project:
   - `index.html`
   - `portfolio-details.html`
   - `404.html`
   - `.htaccess` *(make sure hidden files are enabled in FileZilla: Server -> Force showing hidden files)*
   - `robots.txt`
   - `sitemap.xml`
   - `forms/`
   - `assets/`
6. Drag and drop them into the `htdocs` folder.

#### Method B: Using Monsta FTP Web File Manager
1. Log in to the InfinityFree Client Area and open the **File Manager**.
2. Open the **`htdocs`** folder.
3. Upload the files and folders directly.

---

## 4. Setting Up Free SSL (HTTPS)

1. In the InfinityFree Client Area, click **Free SSL Certificates**.
2. Select your custom domain (e.g., `ymt.com.np`) or your free subdomain.
3. Choose **Let's Encrypt** or **GoGetSSL**.
4. Follow the prompt to add the provided CNAME records to the DNS Records section in your cPanel.
5. Once validated, click **Request Certificate**.
6. When issued, click **Install SSL Certificate Automatically**.
7. The included `.htaccess` file will automatically redirect all HTTP traffic to HTTPS.

---

## 5. Contact Form on InfinityFree

InfinityFree disables native PHP `mail()` on all free accounts to prevent spam. 
- The project includes `forms/contact.php`, which validates submissions and returns `OK` to ensure the frontend form operates without errors.
- For receiving inquiries directly to your inbox (`yojantuladhar@gmail.com`), your portfolio also includes prominent direct `mailto:` links, phone dialing, and LinkedIn connection links.
