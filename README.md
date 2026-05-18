# 🎓 ScholarStream Client

## 📌 Project Name
ScholarStream (Scholarship Management System)

---

## 🌍 Purpose of the Project

ScholarStream is a modern scholarship management platform designed to help students discover and apply for scholarships from universities and organizations worldwide. The platform simplifies the scholarship search, application, payment, and review process through an interactive and user-friendly interface.

Students can browse scholarships, apply online, pay application fees securely, track application progress, and submit reviews. Administrators and moderators can manage scholarships, applications, users, and reviews efficiently through dedicated dashboard functionalities.

---

## 🚀 Live URL

🔗 Live Site: https://scholar-stream-e2d14.web.app

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Firebase Authentication with Email/Password login
- Google Login integration
- JWT-based secure API authorization
- Role-based dashboard system:
  - Student
  - Moderator
  - Admin

### 🎓 Scholarship Features
- Browse all scholarships
- Dynamic scholarship details page
- Search and filter scholarships
- Top scholarships section on homepage
- Scholarship application system

### 💳 Payment System
- Secure Stripe payment integration
- Payment success & failed pages
- Payment history tracking
- Retry unpaid application payments

### 🧑‍🎓 Student Dashboard
- My Applications page
- Application status tracking
- Add scholarship reviews
- Payment history
- User profile management

### 🛡️ Moderator Dashboard
- Manage all applications
- Update application status
- Send feedback to applicants
- Manage all student reviews

### 👑 Admin Dashboard
- Manage users
- Change user roles
- Manage scholarships
- Analytics dashboard

### ⭐ Reviews & Testimonials
- Student review system
- Dynamic testimonials section
- Infinite testimonial marquee animation
- Review moderation system

### 🎨 UI/UX Features
- Fully responsive design
- Framer Motion animations
- DaisyUI + Tailwind modern UI
- Custom 404 page
- Loading spinners and skeleton loaders
- Responsive dashboard sidebar/navbar

---

## 📦 NPM Packages Used

### Core Packages
- react
- react-dom
- react-router-dom
- axios

### Authentication
- firebase

### Styling & UI
- tailwindcss
- daisyui
- react-icons
- framer-motion

### Data Fetching
- @tanstack/react-query

### Forms
- react-hook-form

### Payment
- @stripe/react-stripe-js
- @stripe/stripe-js
- stripe

### Charts & Analytics
- recharts

### Development Tools
- vite
- eslint

---

## 🛠️ Technologies Used

- React.js
- Vite
- Tailwind CSS
- DaisyUI
- Firebase Authentication
- Stripe Payment Gateway
- React Query
- Express.js API Integration

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---

## 🔒 Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=