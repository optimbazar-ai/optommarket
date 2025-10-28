# OptoMarket.uz Frontend

Modern React-based frontend for OptoMarket.uz marketplace.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## 📁 Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS
- **Lucide React** - Icon library

## 📱 Pages

- `/` - Home page
- `/products` - Products listing with filters
- `/products/:id` - Product detail page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (protected)

## 🔐 Authentication

Uses JWT token stored in localStorage. Auth state managed via React Context.

### Login Flow:
1. User submits credentials
2. API returns JWT token
3. Token stored in localStorage
4. User redirected to dashboard

### Protected Routes:
Routes wrapped with `<PrivateRoute>` require authentication.

## 🎨 Styling

TailwindCSS with custom theme:

```javascript
// Primary colors
primary-50 to primary-900

// Custom classes
.btn, .btn-primary, .btn-secondary
.input
.card
```

## 📦 Scripts

- `npm run dev` - Start dev server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🧪 Testing in Browser

### Console Check (F12):
- No errors
- React dev tools available

### Network Tab:
- API calls to backend
- Successful responses (200)
- No CORS errors

### Application Tab:
- LocalStorage has token after login
- Token persists across refresh

## 🔄 State Management

- **AuthContext** - User authentication state
- **Local State** - Component-specific state (useState)

## 📡 API Integration

All API calls in `services/api.js`:

```javascript
import { productsAPI, authAPI } from './services/api'

// Usage
const products = await productsAPI.getAll()
const user = await authAPI.login(email, password)
```

## 🎯 Features

- ✅ Responsive design
- ✅ Authentication flow
- ✅ Product browsing & filtering
- ✅ Search functionality
- ✅ Category filtering
- ✅ Protected routes
- ✅ User dashboard
- ✅ Modern UI/UX

## 🐛 Debugging

### Blank Page:
1. Check browser console for errors
2. Verify backend is running
3. Check `.env` file

### API Errors:
1. Check Network tab in DevTools
2. Verify backend URL in `.env`
3. Check CORS configuration

### Auth Issues:
1. Clear localStorage
2. Re-login
3. Check token expiration

---

**Frontend v1.0.0**
