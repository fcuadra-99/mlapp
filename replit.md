# React + TypeScript + Vite Project

## Overview
This is a React application built with TypeScript and Vite. It provides a minimal setup with Hot Module Replacement (HMR) and ESLint rules for a modern development experience.

## Project Structure
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **Styling**: CSS

## Recent Changes
- **October 30, 2025**: Configured for Replit environment
  - Vite server configured to run on port 5000 with host 0.0.0.0
  - HMR configured for Replit proxy (wss protocol on port 443)
  - Added `allowedHosts: true` to allow all proxy domains
  - Workflow set up for development server
  - Deployment configured for autoscale with Vite preview

## Project Architecture
- `src/` - Source code directory
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point
  - `assets/` - Static assets (images, etc.)
- `public/` - Public static files
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

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
