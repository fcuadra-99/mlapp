# ElectroSmart Analytics - Modern Multi-Page Website

## Overview
Professional multi-page website for ElectroSmart Analytics, a premium B2B technology company providing AI-powered analytics for electronics retailers. Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Project Structure
```
src/
├── components/
│   ├── Navbar/
│   │   └── Navbar.tsx          # Responsive navigation with dropdown
│   ├── Footer.tsx               # Site footer with links
│   ├── AnimatedStats.tsx        # Animated counter component
│   ├── Button.tsx               # Reusable button component
│   └── ScrollReveal.tsx         # Scroll animation wrapper
├── pages/
│   ├── Home.tsx                 # Landing page
│   ├── About.tsx                # Company information
│   ├── Gallery.tsx              # Data visualization gallery
│   ├── Insights.tsx             # Industry insights
│   ├── Blog.tsx                 # Blog posts
│   ├── Contact.tsx              # Contact form
│   └── services/
│       ├── index.tsx            # Services hub page
│       ├── sales-forecasting/
│       │   ├── SalesForecasting.tsx
│       │   └── README.md
│       ├── customer-segmentation/
│       │   ├── CustomerSegmentation.tsx
│       │   └── README.md
│       ├── product-recommendation/
│       │   ├── ProductRecommendation.tsx
│       │   └── README.md
│       └── fraud-detection/
│           ├── FraudDetection.tsx
│           └── README.md
├── App.tsx                      # React Router setup
├── main.tsx                     # App entry point
└── index.css                    # Tailwind CSS config
```

## Technology Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.0
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Recent Changes
- **October 30, 2025**: Complete website transformation
  - Implemented multi-page architecture with React Router (11 routes)
  - Designed with Tailwind CSS custom theme (dark slate, blue accents)
  - Created modular component system (Navbar, Footer, Button, AnimatedStats, ScrollReveal)
  - Built 6 main pages (Home, About, Gallery, Insights, Blog, Contact)
  - Developed Services hub and 4 detailed service pages
  - Added responsive navigation with mobile menu and Services dropdown
  - Implemented scroll animations and transitions with Framer Motion
  - Created README files for each service with ML implementation guidance

## Design System
- **Colors**: 
  - Dark slate (#0f172a) - Primary background
  - Accent blue (#2563eb) - Primary actions
  - Accent cyan (#38bdf8) - Highlights and gradients
  - Light gray (#f3f4f6) - Backgrounds
- **Typography**: Inter font family from Google Fonts
- **Effects**: Glass morphism panels, gradient text, soft glows
- **Animations**: Scroll-triggered reveals, hover transitions

## Routes
- `/` - Home page
- `/about` - About page
- `/gallery` - Gallery page
- `/insights` - Insights page
- `/blog` - Blog page
- `/contact` - Contact page
- `/services` - Services hub
- `/services/sales-forecasting` - Sales Forecasting (Linear Regression)
- `/services/customer-segmentation` - Customer Segmentation (Naive Bayes, Decision Tree)
- `/services/product-recommendation` - Product Recommendation (KNN, ANN)
- `/services/fraud-detection` - Fraud Detection (SVM)

## Key Features
- **Navigation**: Sticky navbar with Services dropdown menu
- **Homepage**: Hero section, services preview, data gallery, statistics, CTA
- **Service Pages**: Algorithm explanations, benefits, visualizations, methodology
- **Responsive**: Mobile-first design with hamburger menu
- **Animations**: Scroll-triggered animations on all pages
- **Modular**: Reusable components for consistency

## Development
- **Dev Server**: `npm run dev` - Runs on port 5000
- **Build**: `npm run build` - TypeScript + Vite production build
- **Lint**: `npm run lint` - ESLint code checking
- **Preview**: `npm run preview` - Preview production build

## Dependencies
- react & react-dom - UI framework
- react-router-dom - Client-side routing
- tailwindcss - Utility-first CSS
- framer-motion - Animation library
- lucide-react - Icon library
- vite - Build tool
- typescript - Type safety

## Deployment Ready
- Vite configured for port 5000 with host 0.0.0.0
- HMR configured for Replit proxy (wss on port 443)
- Production build optimized with TypeScript compilation
- All routes tested and working
- Responsive across all breakpoints
