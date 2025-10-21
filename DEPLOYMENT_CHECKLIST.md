# 📋 DEPLOYMENT CHECKLIST

## Pre-Deployment

### Code Quality
- [ ] All features tested locally
- [ ] Frontend builds without errors (`npm run build`)
- [ ] Backend starts without errors (`npm start`)
- [ ] No console.log or debug code in production
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings reviewed

### Security
- [ ] `.env` files in `.gitignore`
- [ ] No secrets committed to Git
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] API keys stored securely
- [ ] CORS configured properly
- [ ] SQL injection prevention (using parameterized queries ✅)

### Database
- [ ] Neon DB account created
- [ ] Database initialized
- [ ] Tables created (users, products, orders, order_items)
- [ ] Sample data added (optional)
- [ ] Connection string saved securely
- [ ] Backups configured

### Documentation
- [ ] README.md updated
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment guide reviewed

---

## Neon DB Setup

- [ ] Account created at https://neon.tech
- [ ] Project created: `optommarket_db`
- [ ] Connection string obtained
- [ ] Database initialized (`npm run init-db`)
- [ ] Tables verified:
  - [ ] users
  - [ ] products
  - [ ] orders
  - [ ] order_items
- [ ] Sample products inserted
- [ ] Connection tested

---

## Render.com - Backend

### Account Setup
- [ ] Signed up at https://render.com
- [ ] GitHub connected
- [ ] Repository access granted

### Web Service Configuration
- [ ] New Web Service created
- [ ] Repository connected: `optimbazar-ai/optommarket`
- [ ] Settings configured:
  - [ ] Name: `optommarket-backend`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: Node
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Branch: `main`

### Environment Variables
- [ ] `DATABASE_URL` (from Neon)
- [ ] `JWT_SECRET` (generated strong secret)
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `GEMINI_API_KEY` (from Google AI Studio)
- [ ] `FRONTEND_URL` (from Vercel - add later)

### Deployment
- [ ] Service deployed successfully
- [ ] Build logs checked (no errors)
- [ ] Service URL noted: `https://optommarket-backend.onrender.com`
- [ ] Health check tested: `/api/health`
- [ ] Response: `{"status":"healthy"}`

---

## Vercel - Frontend

### Account Setup
- [ ] Signed up at https://vercel.com
- [ ] GitHub connected

### Project Configuration
- [ ] New Project imported
- [ ] Repository: `optimbazar-ai/optommarket`
- [ ] Framework: Next.js (auto-detected)
- [ ] Root Directory: `frontend`
- [ ] Build settings (auto-configured):
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `.next`
  - [ ] Install Command: `npm install`

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://optommarket-backend.onrender.com/api`
- [ ] `NEXT_PUBLIC_APP_NAME` = `OPTOMMARKET`

### Deployment
- [ ] Project deployed successfully
- [ ] Build logs checked (no errors)
- [ ] URL noted: `https://optommarket.vercel.app`
- [ ] Homepage loads correctly
- [ ] All pages accessible

---

## Cross-Platform Configuration

### Update Backend CORS
- [ ] Render → optommarket-backend → Environment
- [ ] Add/Update `FRONTEND_URL` = Vercel URL
- [ ] Service redeployed

### Verify Integration
- [ ] Frontend can call backend API
- [ ] No CORS errors in browser console
- [ ] API responses successful

---

## Testing Production

### Backend Tests
- [ ] Health check: `https://...onrender.com/api/health`
- [ ] Products list: `https://...onrender.com/api/products`
- [ ] Database connection verified
- [ ] All endpoints responding
- [ ] Error responses appropriate

### Frontend Tests
- [ ] Homepage loads: `https://...vercel.app`
- [ ] Products page works: `/products`
- [ ] Search functionality
- [ ] Category filtering
- [ ] Cart operations
- [ ] Chatbot button visible
- [ ] Navigation working
- [ ] Responsive design (mobile/tablet/desktop)

### Integration Tests
- [ ] User registration
- [ ] User login
- [ ] JWT authentication
- [ ] Protected routes (orders, profile)
- [ ] Add to cart
- [ ] View cart
- [ ] Chatbot conversation
- [ ] API calls successful
- [ ] No console errors

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] No memory leaks
- [ ] Database queries efficient

---

## Monitoring Setup

### Render
- [ ] Logs accessible
- [ ] Metrics dashboard reviewed
- [ ] Auto-deploy enabled
- [ ] Email notifications configured

### Vercel
- [ ] Deployment logs reviewed
- [ ] Analytics enabled (optional)
- [ ] Auto-deploy from main branch
- [ ] Build notifications configured

### Neon
- [ ] Database monitoring active
- [ ] Storage usage checked
- [ ] Connection limits reviewed
- [ ] Backups configured

---

## Security Verification

- [ ] HTTPS enabled (automatic)
- [ ] Environment variables not exposed
- [ ] API keys secured
- [ ] Database credentials hidden
- [ ] CORS whitelist configured
- [ ] JWT expiration set
- [ ] Password hashing verified (bcrypt)
- [ ] SQL injection prevention (parameterized queries)

---

## Documentation

- [ ] DEPLOYMENT_GUIDE.md created
- [ ] Production URLs documented
- [ ] Environment variables documented
- [ ] API endpoints listed
- [ ] Troubleshooting guide available
- [ ] Team members informed

---

## Post-Deployment

### Immediate (Day 1)
- [ ] Monitor error logs (both platforms)
- [ ] Test all major features
- [ ] Verify database connections
- [ ] Check performance metrics
- [ ] Test on multiple devices
- [ ] Share with stakeholders

### Week 1
- [ ] Daily log review
- [ ] User feedback collection
- [ ] Performance optimization
- [ ] Bug fixes (if any)
- [ ] Documentation updates

### Month 1
- [ ] Security audit
- [ ] Performance analysis
- [ ] Feature usage statistics
- [ ] Cost analysis
- [ ] Scaling decisions

---

## Custom Domain (Optional)

- [ ] Domain purchased
- [ ] DNS configured in Vercel
- [ ] SSL certificate active
- [ ] Redirects configured (www → non-www)
- [ ] Updated backend CORS

---

## Backup & Recovery

- [ ] Database backups enabled (Neon)
- [ ] Backup schedule configured
- [ ] Recovery procedure documented
- [ ] Code backed up in Git
- [ ] Environment variables documented

---

## Final Verification

### All Systems Go
- [ ] Backend: ✅ Running
- [ ] Frontend: ✅ Running
- [ ] Database: ✅ Connected
- [ ] Chatbot: ✅ Working
- [ ] Auth: ✅ Working
- [ ] Cart: ✅ Working
- [ ] Logs: ✅ Clean
- [ ] Errors: ✅ None

### Production URLs
- [ ] Frontend: https://optommarket.vercel.app
- [ ] Backend: https://optommarket-backend.onrender.com
- [ ] Health: https://optommarket-backend.onrender.com/api/health

---

## 🎉 DEPLOYMENT COMPLETE!

Date: _______________
Deployed by: _______________
Version: _______________

**Platform Status:** 🟢 LIVE

**Notes:**
- 
- 
- 

---

## Support Contacts

- **Render Support:** https://render.com/docs
- **Vercel Support:** https://vercel.com/support
- **Neon Support:** https://neon.tech/docs
- **Team Contact:** _______________

---

**Last Updated:** 2025-10-21
**Next Review:** _______________
