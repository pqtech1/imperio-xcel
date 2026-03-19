## Production Deployment Guide

### 1. Server Requirements
Ensure these are installed on Ubuntu:
```bash
node -v    # v18+
npm -v
nginx -v
git --version
```

### 2. Clone & Setup
```bash
cd ~
git clone https://github.com/pqtech1/imperio-xcel.git
cd imperio-xcel
npm install
```

### 3. Configure Base Paths
**App.jsx:**
```jsx
<BrowserRouter basename="/interioxcel">
```

**vite.config.js:**
```js
export default defineConfig({
  base: '/interioxcel/',
  plugins: [react(), tailwindcss()],
});
```

### 4. Build & Deploy
```bash
npm run build
sudo mkdir -p /var/www/html/interioxcel
sudo cp -r dist/* /var/www/html/interioxcel/
```

### 5. Nginx Configuration
**/etc/nginx/sites-available/techupgrad:**
```nginx
location /interioxcel/ {
    alias /var/www/html/interioxcel/;
    index index.html;
    try_files $uri $uri/ /interioxcel/index.html;
}

location = /interioxcel {
    return 301 /interioxcel/;
}
```

### 6. Apply Changes
```bash
sudo nginx -t
sudo systemctl reload nginx
```

**Live at:** [https://techupgrad.in/interioxcel/](https://techupgrad.in/interioxcel/)

## Update Deployment
```bash
cd ~/imperio-xcel
git pull origin master
npm install
npm run build
sudo rm -rf /var/www/html/interioxcel/*
sudo cp -r dist/* /var/www/html/interioxcel/
sudo systemctl reload nginx
```

## Project Structure
```
imperio-xcel/
├── public/
│   └── img/
├── src/
│   ├── components/
│   └── pages/
├── dist/          # Build output
├── vite.config.js
└── package.json
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Images not loading | Use `asset('/img/example.jpg')` with Vite base helper |
| 502 Bad Gateway | Serve `dist/` files, not dev server |

**Asset helper:**
```js
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
```

## Security Tips
Add to Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/javascript application/json;
```

## Scripts
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Local preview
```

---
