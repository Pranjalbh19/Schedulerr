# 🗓️ Schedulrr

Schedulrr is a modern, full-stack meeting scheduling platform built with **Next.js**, **Tailwind CSS**, **Clerk**, and **Prisma**. It lets users create time slots, manage availability, and share personalized booking links — all with a sleek, responsive UI.

[

---

## 🚀 Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-F02E65?logo=clerk&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)

---

## ✨ Features

- ✅ User authentication via Clerk
- ✅ Create and manage meeting events
- ✅ Set availability and generate time slots
- ✅ Clean, responsive UI with dark/light mode
- ✅ Dynamic calendar-based booking system
- ✅ Secure API routes with server-side validation
- ✅ Smooth animations with `tailwindcss-animate`

---

## 📸 Screenshots

> Make sure to replace paths with your actual image paths
📁 public/screenshots/
├── home.png
├── create-meeting.png
└── availability.png



![Home Page](./public/screenshots/home.png)
![Create Meeting](./public/screenshots/create-meeting.png)
![Availability](./public/screenshots/availability.png)
📂 Project Structure

.
├── app/                 # Next.js app directory
│   ├── page.tsx         # Main entry
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Tailwind + custom CSS
├── components/          # Reusable UI components
├── lib/                 # Helper functions (slot generator, utils)
├── prisma/              # Schema and migration files
├── public/              # Static assets (icons, screenshots)
├── tailwind.config.js   # Tailwind customization
└── postcss.config.js    # PostCSS plugins
🧑‍💻 Getting Started

# Clone the repo
git clone https://github.com/yourusername/schedulrr.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Run the development server
npm run dev
Open http://localhost:3001 to view the app.

🔮 Upcoming Features

🔄 Google Calendar sync
✉️ Email notifications and reminders
📊 Admin dashboard with analytics
📱 PWA support
