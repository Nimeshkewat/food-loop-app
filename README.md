# FoodLoop

A full-stack food ordering platform where users can browse restaurants,
order food, and pay online — and restaurant owners can manage their menu
and track incoming orders.

🔗 \*\*Live Demo: https://food-loop-frontend-black.vercel.app/

## Features

- Email/password auth with verification, forgot/reset password
- Browse restaurants with search & cuisine filters
- Cart with quantity management, single-restaurant enforcement
- Razorpay payment integration with webhook + signature verification
- Order tracking (pending → confirmed → preparing → delivered)
- Restaurant owner dashboard: create/update/delete restaurant, manage menu, update order status
- Light/dark mode
- Image uploads via Cloudinary

## Tech Stack

**Frontend:** React, TypeScript, Vite, TanStack Query (React Query),
Tailwind CSS, shadcn/ui, Zod, React Router

**Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), JWT auth,
Razorpay, Cloudinary, Nodemailer

## Getting Started

### Prerequisites

- Node.js
- MongoDB (Atlas)

### Installation

\`\`\`bash
git clone <your-repo-url>

# Backend

cd server
npm install
npm run server

# Frontend

cd client
npm install
npm run dev
\`\`\`

### Environment Variables

Create a `.env` in `/server`
PORT=
MONGODB_URI=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=

## What I Learned

- **TypeScript fundamentals** — generics (`useQuery<TData, TError, TVariables>`),
  utility types (`Partial`, `Omit`, `Record`), discriminated unions for status
  enums, and structuring a shared, typed API contract (request/response types)
  across the whole frontend
- Handling cross-site cookies and CORS in a split frontend/backend deployment
- Payment integration with signature verification (client-side verify +
  server-side webhook as the real source of truth)
- Common pitfalls: Mongoose ObjectId comparison (`.equals()` vs `===`),
  Express route ordering (static paths before dynamic `:param` routes)
