# ElectroSmart Analytics - Agent Documentation

## Project Overview

This is a **modern, production-ready multi-page website** for ElectroSmart Analytics, a B2B technology company offering AI-powered analytics for electronics retailers. The application is built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Architecture

### Tech Stack
- **React 18.3.1** - Component-based UI framework
- **TypeScript 5.5.3** - Type safety and better developer experience
- **Vite 5.4.1** - Fast build tool and dev server (configured for port 5000)
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Navbar/
│   │   └── Navbar.tsx      # Sticky nav with dropdown, mobile menu
│   ├── Footer.tsx          # Site footer with links and social icons
│   ├── AnimatedStats.tsx   # Animated counter component
│   ├── Button.tsx          # Reusable button (primary/ghost variants)
│   └── ScrollReveal.tsx    # Scroll-triggered animation wrapper
│
├── pages/                  # Route components
│   ├── Home.tsx           # Landing page with hero, services, stats
│   ├── About.tsx          # Company information and values
│   ├── Gallery.tsx        # Data visualization showcase
│   ├── Insights.tsx       # Industry insights and trends
│   ├── Blog.tsx           # Blog posts and articles
│   ├── Contact.tsx        # Contact form and information
│   └── services/          # Service pages with algorithm details
│       ├── index.tsx      # Services hub/overview
│       ├── sales-forecasting/
│       ├── customer-segmentation/
│       ├── product-recommendation/
│       └── fraud-detection/
│
├── App.tsx                # Router setup and layout structure
├── main.tsx              # Application entry point
└── index.css             # Tailwind directives and custom styles
```

## Key Design Patterns

### 1. Component Modularity
All UI components are reusable and follow single-responsibility principle:
- `Button` - Handles primary and ghost button variants
- `ScrollReveal` - Wraps any content for scroll animations
- `AnimatedStats` - Displays animated counters with customizable stats array

### 2. Page Structure
All pages follow consistent structure:
```tsx
// Standard page pattern
<div className="min-h-screen py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ScrollReveal>
      {/* Page content */}
    </ScrollReveal>
  </div>
</div>
```

### 3. Navigation
- Navbar uses `useLocation()` for active link highlighting
- Services dropdown implemented with hover state management
- Mobile menu uses conditional rendering based on state
- All navigation uses React Router `<Link>` components

### 4. Styling Conventions
- **Glass morphism**: `glass` utility class (bg-white/5 with backdrop-blur)
- **Glow effects**: `glow` utility class for shadow effects
- **Color palette**: Custom Tailwind colors defined in `tailwind.config.js`
  - `slate-dark` (#0f172a) - Primary background
  - `accent-blue` (#2563eb) - Primary actions
  - `accent-cyan` (#38bdf8) - Highlights and accents

## Routes Configuration

The application has 11 routes configured in `App.tsx`:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with hero and overview |
| `/about` | About | Company story and values |
| `/gallery` | Gallery | Data visualization gallery |
| `/insights` | Insights | Industry insights and trends |
| `/blog` | Blog | Blog posts and resources |
| `/contact` | Contact | Contact form and info |
| `/services` | ServicesHub | All services overview |
| `/services/sales-forecasting` | SalesForecasting | Linear Regression details |
| `/services/customer-segmentation` | CustomerSegmentation | Naive Bayes & Decision Tree |
| `/services/product-recommendation` | ProductRecommendation | KNN & ANN algorithms |
| `/services/fraud-detection` | FraudDetection | SVM algorithm details |

## Common Tasks for Agents

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`: `<Route path="/new-page" element={<NewPage />} />`
3. Add navigation link in `src/components/Navbar/Navbar.tsx`
4. Follow the standard page structure pattern

### Modifying Styles
- **Global styles**: Edit `src/index.css` (Tailwind layers)
- **Theme colors**: Modify `tailwind.config.js` extend.colors
- **Component styles**: Use Tailwind utility classes inline
- **Custom utilities**: Add to `@layer utilities` in `index.css`

### Adding New Components
1. Create in `src/components/ComponentName.tsx`
2. Export default function
3. Use TypeScript for props interface
4. Follow existing component patterns (props destructuring, className merging)

### Working with Animations
- **Scroll animations**: Wrap content with `<ScrollReveal delay={0.2}>`
- **Counter animations**: Use `<AnimatedStats stats={[...]} />`
- **Custom animations**: Import from `framer-motion`, use `motion` components

## Important Configuration Files

### `vite.config.ts`
```typescript
// Already configured for Replit:
server: {
  host: '0.0.0.0',        // Allow external connections
  port: 5000,             // Exposed port
  allowedHosts: true,     // Enable proxy
  hmr: {
    clientPort: 443,      // Replit proxy port
    protocol: 'wss'       // WebSocket secure
  }
}
```

### `tailwind.config.js`
Custom theme extensions for the design system. To add colors/fonts, modify the `extend` object.

### `package.json`
Scripts available:
- `npm run dev` - Start dev server (port 5000)
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Debugging Common Issues

### 1. Routing Not Working
- Ensure `BrowserRouter` wraps entire app in `App.tsx`
- Check that routes use exact paths (no trailing slashes)
- Verify navigation uses `<Link to="/path">` not `<a href>`

### 2. Styles Not Applying
- Verify Tailwind classes are in the content array (`tailwind.config.js`)
- Check that `index.css` imports are in correct order (font import first)
- Clear browser cache if styles seem outdated

### 3. Build Errors
- Run `npm install` if dependencies are missing
- Check TypeScript errors with proper type definitions
- Ensure all imports use correct file extensions (.tsx for components)

### 4. Animations Not Triggering
- Verify `framer-motion` is installed
- Check that `viewport={{ once: true }}` is set correctly
- Ensure elements are within viewport when scrolling

## Service Pages Pattern

Each service page follows this structure:
1. **Hero section** - Icon, title, description
2. **How It Works** - Algorithm explanation (2-column grid)
3. **Benefits** - Checklist of real-world advantages
4. **Dataset & Methodology** - Training process and data sources

Each service also has a `README.md` with implementation guidance for adding real ML models.

## Development Workflow

1. **Start dev server**: `npm run dev` (auto-restarts on file changes)
2. **Make changes**: Edit files in `src/`
3. **Check browser**: Changes hot-reload automatically
4. **Build for production**: `npm run build`
5. **Preview build**: `npm run preview`

## Best Practices for Future Modifications

1. **Maintain consistency**: Follow existing component patterns
2. **Use TypeScript**: Define interfaces for all props
3. **Responsive design**: Use Tailwind breakpoints (sm:, md:, lg:)
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Performance**: Lazy load routes if app grows large
6. **Code organization**: Keep components small and focused

## Notes for Agents

- **Do not modify** `vite.config.ts` server settings (Replit-specific)
- **Always use** Tailwind utilities instead of custom CSS when possible
- **Maintain** the modular component structure for reusability
- **Test navigation** after adding new routes
- **Keep** the design system consistent (colors, spacing, typography)
- The app is **production-ready** and can be deployed as-is

## Quick Reference

**Key Files to Understand:**
- `src/App.tsx` - Router configuration
- `src/components/Navbar/Navbar.tsx` - Navigation logic
- `src/pages/Home.tsx` - Example of full-featured page
- `tailwind.config.js` - Design system tokens

**Common Patterns:**
- Page wrapper: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card style: `glass rounded-xl p-8 hover:glow transition-all`
- Section spacing: `py-20` for vertical padding
- Grid layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`

## Deployment

This app is configured for Replit deployment:
- Dev server runs on port 5000 (already configured)
- Use Replit's deployment feature to publish
- All routes work with client-side routing (no server-side config needed)
- Build outputs to `dist/` folder

---

**Last Updated**: October 30, 2025  
**Status**: Production-ready ✅
