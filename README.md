# Scribe Foundation

A premium full-stack blogging platform built with modern web technologies. Scribe Foundation provides a sophisticated editorial experience for both readers and content creators, featuring a beautiful interface, powerful admin tools, and seamless content management.

## About

Scribe Foundation is a production-quality blogging platform designed to deliver a premium reading and publishing experience. The platform enables visitors to discover, read, and engage with high-quality editorial content while providing administrators with comprehensive tools for content management.

**Key Capabilities:**
- 📝 Rich blog discovery and reading experience
- 🔍 Advanced search and category filtering
- 👤 User authentication and personalized dashboards
- ⚡ Powerful admin panel for content management
- 📊 Analytics and user management tools
- 📱 Fully responsive across all devices
- 🎨 Premium editorial design with elegant typography

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4
- **Routing**: TanStack Router
- **Backend**: TanStack Start, Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Animations**: Tailwind Animate
- **Icons**: Lucide React

## Features

### Public Features
- Premium homepage with featured and trending articles
- Advanced blog exploration with search and filters
- Beautiful article reading experience with progress indicator
- Category-based content browsing
- User authentication (sign up, login, logout)
- Personal user dashboard
- About and Contact pages

### Admin Features
- Comprehensive admin dashboard with statistics
- Blog post management (create, edit, delete, publish)
- Category management
- User management with role-based access
- Rich text editor for content creation
- Post preview functionality

### Design & UX
- Premium editorial aesthetic with sophisticated typography
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and micro-interactions
- Loading states, empty states, and error handling
- Toast notifications and confirmation dialogs
- Accessibility-focused implementation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager
- Supabase account for backend services

### Installation

1. Clone the repository
```bash
git clone https://github.com/ArfaMunam47/scribe-foundation.git
cd scribe-foundation
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Configure your Supabase credentials in `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

4. Start the development server
```bash
npm run dev
```


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── features/       # Feature-specific components
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations (Supabase)
├── lib/                # Utility functions and helpers
├── routes/             # TanStack Router pages
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Home page
│   ├── explore/       # Blog exploration
│   ├── blog/          # Single blog posts
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # User dashboard
│   └── admin/         # Admin panel
├── styles.css          # Global styles
├── router.tsx          # Router configuration
└── server.ts           # Server-side code

supabase/
├── config.toml         # Supabase configuration
└── migrations/         # Database migrations

public/
├── images/             # Static images
├── favicon.png         # Site favicon
└── brand-mark.png      # Brand logo
```

## Database Schema

The platform uses Supabase with PostgreSQL, featuring:

- **profiles** - User profiles with roles (user/admin)
- **posts** - Blog posts with rich content
- **categories** - Dynamic category system
- **tags** - Tagging system for posts
- Row Level Security (RLS) policies for data protection
- Foreign key relationships for data integrity


### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Contact

For questions or support, please reach out through the contact form on the live site or open an issue in this repository.

---

Built with ❤️ using modern web technologies
