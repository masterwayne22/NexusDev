# 🌌 NexusDev — Your Unified Developer Identity

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)

**NexusDev** is a premium, AI-powered developer portfolio aggregator that transforms your raw coding statistics into a stunning, glassmorphic visual identity. By unifying data from GitHub, LeetCode, and Codeforces, NexusDev provides a 360-degree view of your technical growth and career trajectory.

---

## ✨ Key Features

- 🔐 **Secure Authentication**: Integrated Clerk authentication supporting GitHub OAuth and a user-driven metadata system for linking developer platform accounts.
- 💎 **Glassmorphic UI**: A state-of-the-art interface built with vanilla CSS and Tailwind 4, featuring vibrant gradients and deep frosted-glass effects.
- 🤖 **AI Career Insights**: Leverages advanced logic (and soon LLMs) to analyze your commit history and algorithmic progress, providing actionable career feedback.
- 📊 **Unified Dashboard**: Real-time aggregation of your public metrics across multiple platforms including GitHub, LeetCode, and Codeforces.
- 🎭 **Premium Animations**: Silky-smooth staggered entry animations powered by Framer Motion.
- 📱 **Fully Responsive**: Designed to look breathtaking on everything from ultrawide monitors to mobile devices.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Custom Glassmorphism System
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Geist Sans & Mono

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nexusdev-dashboard.git
cd nexusdev-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and populate it with your API keys:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# GitHub API Configuration
GITHUB_ACCESS_TOKEN=your_github_token_here

# LeetCode API Configuration
LEETCODE_USERNAME=your_leetcode_username_here

# Codeforces API Configuration
CODEFORCES_API_KEY=your_codeforces_api_key_here
CODEFORCES_API_SECRET=your_codeforces_api_secret_here

# AI Service Configuration
AI_SERVICE_API_KEY=your_ai_api_key_here
```

### 4. Launch Development Server
```bash
npm run dev
```

## 🧠 AI Analysis Logic

NexusDev uses a proprietary analysis engine to evaluate developer profiles:
- **Algorithmic Foundation**: Evaluates LeetCode problem density and difficulty spread, alongside Codeforces ratings.
- **Proof of Work**: Analyzes GitHub commit consistency and repository impact.
- **Growth Vectors**: Suggests specific areas for improvement (e.g., Open Source, Documentation, System Design).

---

<p align="center">
  Built with ❤️ for the global developer community.
</p>
