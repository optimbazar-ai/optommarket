# OPTOMMARKET - Replit Migration Documentation

## Project Overview
OPTOMMARKET is a wholesale marketplace platform for Uzbekistan with AI chatbot integration. Successfully migrated from Vercel to Replit on October 22, 2025.

## Architecture
- **Frontend**: Next.js 14.0.4 (TypeScript, React 18, TailwindCSS)
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL (Neon/Replit managed)
- **AI**: Google Gemini API for chatbot

## Replit Configuration

### Port Configuration
- Frontend (Next.js): Port 5000 (bound to 0.0.0.0)
- Backend (Express): Port 3000 (bound to 0.0.0.0)

### Workflows
1. **Frontend Workflow**: `cd frontend && npm run dev` (webview on port 5000)
2. **Backend Workflow**: `cd backend && npm start` (console on port 3000)

### Environment Variables
The following secrets are configured in Replit Secrets:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `GEMINI_API_KEY`: Google Gemini API key for AI chatbot

Frontend environment (`.env.local`):
- `NEXT_PUBLIC_API_URL`: Points to backend API
- `NEXT_PUBLIC_APP_NAME`: OPTOMMARKET

### CORS Configuration
Backend is configured to allow requests from:
- Development: `http://localhost:5000`, `https://${REPLIT_DEV_DOMAIN}`, `https://${REPLIT_DEV_DOMAIN}:5000`
- Production: Vercel domains + custom frontend URL

## Migration Changes

### Backend Changes
1. Changed default port from 5000 to 3000
2. Added `0.0.0.0` binding to `app.listen()` for Replit compatibility
3. Updated CORS to include Replit development domains
4. Environment variables loaded via Replit Secrets

### Frontend Changes
1. Updated `package.json` scripts to use `-p 5000 -H 0.0.0.0` flags
2. Created `.env.local` with backend API URL pointing to port 3000
3. All API calls properly configured to use environment variable

## Database Schema
The application uses PostgreSQL with the following main tables:
- `users`: User accounts and authentication
- `products`: Product catalog
- `orders`: Order management
- `order_items`: Order line items

## Features
- User authentication (JWT-based)
- Product catalog with search and filtering
- Shopping cart functionality
- Order management
- Admin dashboard (analytics, users, products, orders)
- AI chatbot powered by Google Gemini

## Recent Changes (October 22, 2025)
- ✅ Migrated from Vercel to Replit
- ✅ Configured workflows for automatic server startup
- ✅ Set up environment secrets in Replit
- ✅ Updated CORS and port configurations
- ✅ Verified database connectivity
- ✅ Both frontend and backend running successfully

## Known Issues
- React hook warnings in browser console (non-blocking, cosmetic issue)
- Next.js StrictMode findDOMNode deprecation warnings (framework-level, non-critical)

## Project Structure
```
/
├── backend/
│   ├── models/        # Database models and connection
│   ├── routes/        # API route handlers
│   ├── middleware/    # Auth and other middleware
│   └── server.js      # Express server entry point
├── frontend/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions and constants
└── replit.md         # This documentation
```

## User Preferences
- Language: Uzbek (uz)
- Framework preference: Next.js + Express
- Database: PostgreSQL

## Deployment
Project is running in Replit development environment. For production deployment, use Replit's deployment features accessible via the Deploy button.
