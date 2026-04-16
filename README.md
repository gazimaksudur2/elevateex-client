# ElevateEx: Enterprise EdTech Platform

A modern, full-featured educational platform built with React, Tailwind CSS, and a modular Express.js backend. ElevateEx provides a complete learning management system with role-based access, course management, enrollment workflows, and an enterprise-grade architecture.

## Architecture

### Frontend
- **React 18** with React Router v6 for SPA routing
- **Tailwind CSS** with custom design system (tokens, semantic colors, component classes)
- **DaisyUI** custom theme (`elevateex`)
- **TanStack React Query** for server-state management
- **React Hook Form** for form handling and validation
- **Firebase Authentication** (Email/Password, Google, GitHub)

### Backend (v2.0 - Modular Monolith)
- **Express.js** with modular architecture (`src/modules/*`)
- **MongoDB** via native driver with centralized connection management
- **JWT** access + refresh token strategy
- **RBAC** middleware with role hierarchy (super_admin > admin > instructor > student)
- **Audit logging**, rate limiting, request tracing, and structured error handling
- **Legacy API compatibility** preserved alongside new `/api/v2/*` routes

## Features

### Public
- Conversion-focused landing page with hero, featured courses, testimonials, and CTA
- Course catalog with search, category filtering, price filtering, and sorting
- Course detail pages with enrollment flow

### Student Dashboard
- Profile management
- Enrolled courses with progress tracking
- Assignment submission workflow

### Instructor Studio
- Course creation and management
- Assignment creation with deadlines
- Student submission review and grading

### Admin Console
- Platform dashboard with KPIs (users, courses, enrollments, revenue)
- Instructor application approval/rejection workflow
- Admin application management
- Course approval/rejection with audit logging
- User role management

### Security
- JWT-based authentication with short-lived access tokens
- Role-based access control (RBAC) at route and service level
- Rate limiting per IP
- Request ID tracing
- Secure headers via Helmet
- Centralized error handling with environment-aware responses
- Audit logs for admin actions

## Demo Credentials
- **Admin:** admin@elavateex.edu / AdmEdu123!
- **Instructor:** johndoe@example.com / JohnMama2!
- **Student:** hello@gmail.com / helloVai!

## Links
- **Server Repo:** [GitHub - Server](https://github.com/gazimaksudur2/elevateex-server)
- **Live Server:** [API](https://elevate-dusky-nine.vercel.app)

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Client Setup
```bash
git clone https://github.com/gazimaksudur2/elevateex-client.git
cd elevateex-client
npm install
```

Create `.env` file:
```
VITE_APIKEY=your_api_key
VITE_AUTHDOMAIN=your_authdomain
VITE_PROJECTID=your_projectID
VITE_STORAGEBUCKET=your_storagebucket
VITE_MESSAGINGSENDERID=your_messagingSenderID
VITE_APPID=your_appID
VITE_image_hosting_key=your_imgbb_key
```

```bash
npm run dev
# Open http://localhost:5173
```

### Server Setup
```bash
cd elevateex-server
npm install
```

Create `.env` file:
```
DBuser=your_mongo_user
DBpassword=your_mongo_password
Security_Access_Token=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev      # New modular server (v2.0)
npm run start:legacy  # Legacy single-file server
```

## Project Structure

### Client (`elevateex-client/src/`)
```
src/
├── components/
│   ├── Home/           # HeroSection, FeaturedCourses, WhyElevateEx, Testimonials, CTASection, BecomeInstructor, TrustedBy
│   └── AllClasses/     # ClassCards, CourseDetail, Payment, CheckOutForm
├── pages/
│   ├── Home/           # Home page composition
│   ├── AllClasses/     # Course catalog with search/filter
│   └── TeachHere/      # Instructor application
├── layout/
│   ├── MainLayout      # App shell (Navbar + Outlet + Footer)
│   ├── Login/Register  # Split-screen auth pages
│   ├── UserDashboard/  # Student dashboard
│   ├── TeacherDashboard/ # Instructor dashboard
│   └── AdminDashBoard/ # Admin dashboard
├── shared/             # Navbar, Footer, SubSection
├── hooks/              # useAuth, useAxiosSecure, useAxiosPublic, useUserInfo, useClass, useUsers
├── providers/          # AuthProvider, Firebase config
└── routes/             # Router, PrivateRoute, AdminRouter
```

### Server (`elevateex-server/src/`)
```
src/
├── config/             # database, cors, env
├── middleware/          # auth, rbac, validate, errorHandler, rateLimiter, requestId, auditLog
├── modules/
│   ├── auth/           # JWT token management, login/register, social auth, profile
│   ├── users/          # CRUD, stats, role management
│   ├── courses/        # CRUD, search, approve/reject, reviews
│   ├── enrollments/    # Enroll, progress, cancel, stats
│   ├── assignments/    # CRUD, submit, grade
│   ├── admin/          # Dashboard stats, instructor/admin requests, audit logs, revenue
│   └── reviews/        # CRUD, featured reviews
├── utils/              # ApiError, ApiResponse, asyncHandler, logger
├── app.js              # Express app with legacy + v2 routes
└── server.js           # Server entry point
```

## Tech Stack
React 18 | Tailwind CSS | DaisyUI | React Query | React Hook Form | Firebase Auth | Express.js | MongoDB | JWT | Helmet | Stripe (planned)
