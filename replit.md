# ElectroSmart Analytics - B2B SaaS Landing Page

## Overview
Professional landing page for ElectroSmart Analytics, a B2B technology company providing AI-powered analytics for electronics retailers. Built with React, TypeScript, and Vite.

## Project Structure
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **Styling**: Custom CSS with design tokens

## Recent Changes
- **October 30, 2025**: Complete professional redesign
  - Redesigned based on modern B2B SaaS templates (inspired by Stripe, Webflow patterns)
  - Implemented consistent blue color theme using design tokens
  - Built fully responsive mobile-first layout with breakpoints at 768px and 480px
  - Added mobile hamburger menu navigation
  - Created professional sections: Hero, Social Proof, Features, Solutions, Testimonials, Pricing, CTA, Footer
  - Clean, minimalist design suitable for premium B2B technology company
  - Vite server configured to run on port 5000 with host 0.0.0.0
  - HMR configured for Replit proxy (wss protocol on port 443)

## Design System
- **Primary Colors**: Blue palette (--blue-900 through --blue-50)
- **Gray Scale**: Professional grays for text and backgrounds
- **Typography**: System fonts with -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Spacing**: Consistent padding and margins using rem units
- **Components**: Card-based design with hover states and transitions

## Key Features
- Responsive navigation with mobile menu
- Hero section with trust badge and statistics
- 6 feature cards with color-coded icons
- Solutions section with dashboard preview mockup
- Customer testimonials grid
- 3-tier pricing structure
- Call-to-action section
- Professional footer

## Development
- **Dev Server**: `npm run dev` - Runs on port 5000
- **Build**: `npm run build` - TypeScript compilation + Vite build
- **Lint**: `npm run lint` - ESLint checking
- **Preview**: `npm run preview` - Preview production build

## Dependencies
- React and React DOM for UI
- Vite for build tooling and dev server
- TypeScript for type safety
- ESLint for code quality

## Mobile Responsiveness
- Breakpoint 768px: Tablet and below (mobile menu, stacked layouts)
- Breakpoint 480px: Small mobile (reduced font sizes)
- Touch-friendly button sizes
- Collapsible navigation for mobile
