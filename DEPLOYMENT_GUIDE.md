# 🚀 OptoMarket.uz - Production Deployment Guide

Complete guide for deploying OptoMarket.uz to production.

---

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Add rate limiting
- [ ] Set up environment variables
- [ ] Review and secure API endpoints
- [ ] Enable MongoDB authentication

### Configuration
- [ ] Production MongoDB URI
- [ ] Production API URL
- [ ] Email service credentials (optional)
- [ ] Payment gateway credentials (Click, Payme)
- [ ] File upload service (Cloudinary/AWS S3) - optional
- [ ] Error monitoring (Sentry) - optional

### Testing
- [ ] Test all features locally
- [ ] Test admin panel functionality
- [ ] Test checkout flow
- [ ] Test payment integration
- [ ] Mobile responsiveness check
- [ ] Browser compatibility check

---

## 🗄️ Option 1: MongoDB Atlas (Recommended)

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (Free M0 tier available)

### 2. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/optommarket?retryWrites=true&w=majority
```

### 3. Configure Network Access

1. Go to "Network Access"
2. Add IP address: `0.0.0.0/0` (Allow from anywhere)
3. Or add specific deployment server IPs

---

## 🌐 Option 2: Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Update package.json**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. **Create render.yaml** (optional)

```yaml
services:
  - type: web
    name: optommarket-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

### Step 2: Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Sign up / Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** optommarket-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 3: Add Environment Variables

Add in Render dashboard:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_very_strong_secret_key_here_minimum_32_characters
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.netlify.app
```

### Step 4: Update CORS

In `backend/server.js`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## 🎨 Option 3: Frontend Deployment (Vercel/Netlify)

### Option A: Vercel

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Deploy**

```bash
cd frontend
vercel
```

3. **Configure Environment Variables**

In Vercel dashboard, add:

```env
VITE_API_URL=https://optommarket-api.onrender.com/api
```

4. **Configure vercel.json**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Option B: Netlify

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Build Frontend**

```bash
cd frontend
npm run build
```

3. **Create netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

4. **Deploy**

```bash
netlify deploy --prod
```

5. **Configure Environment Variables**

In Netlify dashboard, add:

```env
VITE_API_URL=https://optommarket-api.onrender.com/api
```

---

## 🔐 Security Best Practices

### 1. Environment Variables

**Never commit .env files!**

Add to `.gitignore`:
```
.env
.env.local
.env.production
```

### 2. JWT Secret

Generate strong secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Rate Limiting

Install express-rate-limit:

```bash
npm install express-rate-limit
```

Add to `server.js`:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet Security Headers

```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

---

## 📧 Optional: Email Service Setup

### Option A: SendGrid

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Get API key
3. Add to environment variables:

```env
SENDGRID_API_KEY=your_api_key
EMAIL_FROM=noreply@optommarket.uz
```

### Option B: Nodemailer + Gmail

```bash
npm install nodemailer
```

```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App password
  }
});
```

---

## 💳 Payment Integration

### Click Payment

1. Contact Click.uz for merchant credentials
2. Get merchant ID and secret key
3. Add to environment variables:

```env
CLICK_MERCHANT_ID=your_merchant_id
CLICK_SECRET_KEY=your_secret_key
```

### Payme Payment

1. Contact Payme.uz for merchant credentials
2. Get merchant ID and key
3. Add to environment variables:

```env
PAYME_MERCHANT_ID=your_merchant_id
PAYME_KEY=your_key
```

---

## 📊 Monitoring & Analytics

### Option 1: Sentry (Error Tracking)

1. Sign up at [https://sentry.io](https://sentry.io)
2. Create project
3. Install:

```bash
npm install @sentry/node
```

4. Initialize in `server.js`:

```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Option 2: Google Analytics

Add to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔧 Performance Optimization

### 1. Frontend Build Optimization

In `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
```

### 2. Image Optimization

Use Cloudinary or AWS S3 for images:

```bash
npm install cloudinary multer
```

### 3. Enable Compression

```bash
npm install compression
```

```javascript
import compression from 'compression';
app.use(compression());
```

---

## 📱 Domain & SSL Setup

### 1. Purchase Domain

Popular registrars:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### 2. Configure DNS

Point domain to deployment:

**A Record:**
```
Type: A
Name: @
Value: [Your server IP]
```

**CNAME Record:**
```
Type: CNAME
Name: www
Value: your-app.netlify.app
```

### 3. SSL Certificate

Both Render, Vercel, and Netlify provide free SSL automatically!

---

## ✅ Post-Deployment Checklist

- [ ] Test production URL
- [ ] Verify API endpoints work
- [ ] Test authentication flow
- [ ] Test admin panel
- [ ] Test checkout process
- [ ] Verify payments (test mode first)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Monitor error logs
- [ ] Set up backups
- [ ] Document any issues

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Error

**Solution:** Update CORS configuration to include production domain.

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://optommarket.uz',
    'https://www.optommarket.uz'
  ],
  credentials: true
}));
```

### Issue 2: Environment Variables Not Loading

**Solution:** Verify variables are set in deployment platform dashboard.

### Issue 3: MongoDB Connection Timeout

**Solution:** Check MongoDB Atlas network access settings and connection string.

### Issue 4: Build Fails on Deployment

**Solution:** 
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Review build logs for specific errors

---

## 📞 Support & Resources

### Documentation
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

### Community
- Stack Overflow
- GitHub Issues
- Discord/Slack communities

---

## 🎉 Congratulations!

Your OptoMarket.uz e-commerce platform is now live! 🚀

**Next Steps:**
1. Monitor application performance
2. Set up regular database backups
3. Collect user feedback
4. Plan feature updates
5. Scale as needed

---

**Made with ❤️ for OptoMarket.uz**
