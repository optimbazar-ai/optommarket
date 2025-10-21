# 🚀 PRODUCTION DEPLOYMENT GUIDE

## OPTOMMARKET - Full-Stack Deployment

**Stack:**
- Frontend: Next.js → Vercel
- Backend: Node.js/Express → Render.com  
- Database: PostgreSQL → Neon DB

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ Code Ready
- [ ] All features tested locally
- [ ] No console.log() or debug code
- [ ] Environment variables documented
- [ ] Git repository up to date
- [ ] All dependencies installed

### ✅ Security
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] API keys not in code
- [ ] .env files in .gitignore
- [ ] CORS properly configured
- [ ] SQL injection prevention

### ✅ Database
- [ ] Neon DB account created
- [ ] Database initialized
- [ ] Tables created
- [ ] Sample data (optional)
- [ ] Connection string saved

---

## 1️⃣ NEON DB SETUP (If not done)

### Step 1: Create Account
1. Go to https://neon.tech
2. Sign up with GitHub
3. Verify email

### Step 2: Create Project
1. Click "Create Project"
2. Project name: `optommarket_db`
3. Region: Choose closest (e.g., AWS US East)
4. Click "Create"

### Step 3: Get Connection String
1. Dashboard → Connection Details
2. Copy **Pooled connection** string
3. Format: `postgresql://user:pass@host/dbname?sslmode=require`
4. Save securely

### Step 4: Initialize Database
```bash
# Local setup first
cd backend
# Update .env with Neon connection string
DATABASE_URL=postgresql://...

# Run init script
npm run init-db
```

Expected output:
```
✅ Users table created
✅ Products table created
✅ Orders table created  
✅ Order_items table created
✅ Sample products inserted
```

---

## 2️⃣ RENDER.COM - BACKEND DEPLOYMENT

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Dashboard → "New +"
2. Select "Web Service"
3. Connect GitHub repository: `optimbazar-ai/optommarket`
4. Click "Connect"

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `optommarket-backend`
- **Region:** Oregon (US West) - Free tier
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Advanced Settings:**
- **Plan:** Free
- **Auto-Deploy:** Yes

### Step 4: Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://...` (from Neon) |
| `JWT_SECRET` | `your_production_secret_min_32_chars` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | `AIza...` (from Google AI Studio) |
| `FRONTEND_URL` | `https://optommarket.vercel.app` (add after Vercel deploy) |

⚠️ **Generate Strong JWT_SECRET:**
```bash
# In terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 2-5 minutes for build
3. Check logs for errors
4. Note your URL: `https://optommarket-backend.onrender.com`

### Step 6: Test Backend
```bash
# Health check
curl https://optommarket-backend.onrender.com/api/health

# Expected response:
# {"status":"healthy","database":"Connected ✅"}
```

---

## 3️⃣ VERCEL - FRONTEND DEPLOYMENT

### Step 1: Sign Up
1. Go to https://vercel.com
2. Click "Sign Up"
3. Continue with GitHub
4. Authorize Vercel

### Step 2: Import Project
1. Dashboard → "Add New..." → "Project"
2. Import Git Repository
3. Select `optimbazar-ai/optommarket`
4. Click "Import"

### Step 3: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `frontend`

**Build Settings (auto-filled):**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**No need to change these!**

### Step 4: Environment Variables

Add these variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://optommarket-backend.onrender.com/api` |
| `NEXT_PUBLIC_APP_NAME` | `OPTOMMARKET` |

⚠️ **Important:** Use `/api` at the end of API_URL!

### Step 5: Deploy
1. Click "Deploy"
2. Wait 1-3 minutes
3. Check build logs
4. Note your URL: `https://optommarket.vercel.app`

### Step 6: Update Backend CORS

Go back to Render → optommarket-backend → Environment

Update `FRONTEND_URL`:
```
FRONTEND_URL=https://optommarket.vercel.app
```

Click "Save Changes" → Service will redeploy

### Step 7: Test Frontend
1. Open `https://optommarket.vercel.app`
2. Check all pages load
3. Test chatbot (🤖 button)
4. Try authentication
5. Browse products

---

## 4️⃣ POST-DEPLOYMENT CONFIGURATION

### Update Frontend URL in Render

1. Render Dashboard → optommarket-backend
2. Environment → Edit `FRONTEND_URL`
3. Value: Your Vercel URL
4. Save (auto-redeploys)

### Enable Auto-Deploy

**Render:**
- Settings → "Auto-Deploy" → Enable
- Pushes to `main` branch auto-deploy

**Vercel:**
- Settings → Git → "Production Branch"
- Set to `main`
- Every push auto-deploys

---

## 5️⃣ TESTING PRODUCTION

### Backend Tests
```bash
# Health check
curl https://optommarket-backend.onrender.com/api/health

# Products endpoint
curl https://optommarket-backend.onrender.com/api/products

# Chatbot endpoint (POST)
curl -X POST https://optommarket-backend.onrender.com/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Salom!","userId":"test"}'
```

### Frontend Tests
1. **Home Page:** https://optommarket.vercel.app
2. **Products:** /products
3. **Register:** /register
4. **Login:** /login
5. **Cart:** /cart
6. **Chatbot:** Click 🤖

### Full User Flow Test
1. Register new account
2. Login
3. Browse products
4. Add to cart
5. View cart
6. Test chatbot
7. View profile
8. Check orders

---

## 6️⃣ MONITORING & LOGS

### Render Dashboard
- **Logs:** Real-time server logs
- **Metrics:** CPU, Memory, Bandwidth
- **Events:** Deployments history
- **Shell:** Direct server access

Access: Dashboard → optommarket-backend → Logs

### Vercel Dashboard
- **Deployments:** Build history
- **Logs:** Runtime and build logs
- **Analytics:** Page views (Pro plan)
- **Speed Insights:** Performance metrics

Access: Dashboard → optommarket → Deployments

### Neon Dashboard
- **Monitoring:** Query performance
- **Storage:** Database size
- **Connections:** Active connections
- **Backups:** Point-in-time recovery

Access: https://console.neon.tech

---

## 7️⃣ TROUBLESHOOTING

### ❌ Backend Deploy Failed

**Error:** "Build failed"
```bash
# Check: package.json has correct scripts
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Error:** "Database connection failed"
- Check DATABASE_URL in Render environment
- Verify Neon DB is active
- Check connection string format

### ❌ Frontend Deploy Failed

**Error:** "Build command failed"
- Check `package.json` scripts
- Verify all dependencies installed
- Check for TypeScript errors

**Error:** "API calls failing"
- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check CORS in backend
- Verify backend is running

### ❌ CORS Error

**Solution:**
1. Render → Environment → Add `FRONTEND_URL`
2. Value: `https://your-app.vercel.app`
3. Save & Redeploy

### ❌ Chatbot Not Working

**Check:**
1. `GEMINI_API_KEY` set in Render
2. API key is valid
3. Check Render logs for errors

---

## 8️⃣ CUSTOM DOMAIN (Optional)

### Buy Domain
- **Uzbekistan:** https://uz.beget.com
- **International:** https://namecheap.com

### Add to Vercel
1. Vercel Dashboard → optommarket
2. Settings → Domains
3. Add Domain: `yourdomain.uz`
4. Follow DNS instructions
5. Wait 24-48 hours for propagation

### Update Backend CORS
Add your custom domain to `FRONTEND_URL` in Render

---

## 9️⃣ COST BREAKDOWN

### Free Tier Limits

**Render (Free):**
- 750 hours/month
- 512 MB RAM
- Sleeps after 15 min inactivity
- ⚠️ First request after sleep: slow (cold start)

**Vercel (Free):**
- Unlimited deployments
- 100 GB bandwidth/month
- Serverless functions included
- Custom domains: 1 free

**Neon (Free):**
- 0.5 GB storage
- 1 project
- No credit card required
- Auto-suspend after inactivity

### Paid Upgrades (When Needed)

**Render:**
- $7/month - Always-on server
- No cold starts

**Vercel:**
- $20/month - Pro plan
- Analytics, More bandwidth

**Neon:**
- $19/month - Pro plan
- 10 GB storage, Always-on

---

## 🔟 SECURITY BEST PRACTICES

### ✅ Environment Variables
- Never commit `.env` files
- Use strong secrets (32+ chars)
- Rotate keys periodically

### ✅ Database
- Use connection pooling
- Enable SSL (Neon default)
- Regular backups

### ✅ API
- Rate limiting (future feature)
- Input validation
- SQL injection prevention (using pg parameterized queries)

### ✅ Authentication
- JWT with expiration
- Password hashing (bcrypt)
- HTTPS only

---

## 1️⃣1️⃣ MAINTENANCE

### Daily
- Check error logs
- Monitor uptime
- Verify key features

### Weekly
- Review database size
- Check performance metrics
- Update dependencies if needed

### Monthly
- Security patches
- Feature updates
- User feedback review

---

## 1️⃣2️⃣ CI/CD (Advanced - Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Test Backend
        run: |
          cd backend
          npm install
          npm test
          
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Render Deploy
        run: echo "Render auto-deploys on push"
      - name: Trigger Vercel Deploy  
        run: echo "Vercel auto-deploys on push"
```

---

## ✅ DEPLOYMENT COMPLETE CHECKLIST

- [ ] Neon DB created and initialized
- [ ] Render backend deployed successfully
- [ ] Vercel frontend deployed successfully
- [ ] Environment variables configured (both platforms)
- [ ] CORS updated with frontend URL
- [ ] Health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] API endpoints responding
- [ ] Chatbot working
- [ ] Authentication working
- [ ] Cart functionality working
- [ ] Database queries working
- [ ] Logs reviewed (no critical errors)
- [ ] Performance acceptable
- [ ] Custom domain configured (optional)

---

## 🎯 PRODUCTION URLs

**Frontend:** https://optommarket.vercel.app
**Backend:** https://optommarket-backend.onrender.com
**Health Check:** https://optommarket-backend.onrender.com/api/health

---

## 📞 SUPPORT

### Platform Support
- **Render:** https://render.com/docs
- **Vercel:** https://vercel.com/docs
- **Neon:** https://neon.tech/docs

### Community
- Render Discord
- Vercel Discord
- Stack Overflow

---

## 🎉 CONGRATULATIONS!

Your OPTOMMARKET platform is now LIVE and accessible worldwide! 🌍

**Next Steps:**
1. Share with users
2. Gather feedback
3. Monitor performance
4. Plan updates
5. Scale as needed

**Platform is PRODUCTION-READY!** 🚀
