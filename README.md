# Next.js App Starter Template

A modern, production-ready Next.js 15 starter template with TypeScript, Tailwind CSS, and comprehensive tooling for building scalable web applications.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS 4** with animations and utilities
- **React 19** with latest features
- **State Management** with Zustand
- **Data Fetching** with TanStack Query
- **Form Handling** with React Hook Form + Yup validation
- **UI Components** with shadcn/ui style architecture
- **Code Quality** with ESLint, Prettier, and Husky
- **Modern Tooling** with Bun package manager
- **Responsive Design** with mobile-first approach
- **Dark Mode** support
- **API Integration** with built-in error handling
- **Authentication** ready with cookie-based tokens

## 📦 Quick Start with Degit

This template is designed to be used as a starting point for new projects. Use `degit` to quickly clone this template without the git history:

```bash
# Install degit globally (if not already installed)
npm install -g degit

# Create a new project from this template
degit your-username/next-app-starter my-new-project

# Navigate to the project directory
cd my-new-project

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

## 🛠️ Development Process

### Prerequisites
- Node.js 18+ or Bun
- Git

### Getting Started

1. **Clone the template** using degit (see above)
2. **Install dependencies**: `npm install` or `bun install`
3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
4. **Start development server**: `npm run dev` or `bun dev`
5. **Open your browser** to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

This template includes pre-commit hooks that automatically:
- Run ESLint to check code quality
- Format code with Prettier
- Ensure consistent code style

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages and layouts
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page component
│   ├── components/             # Reusable UI components
│   │   ├── accordion/          # Accordion component
│   │   ├── actions/            # Action buttons and controls
│   │   ├── avatar/             # Avatar component
│   │   ├── button/             # Button components
│   │   ├── dragDrop/           # Drag and drop functionality
│   │   ├── dropdown/           # Dropdown menu components
│   │   ├── form/               # Form components and inputs
│   │   ├── modal/              # Modal and dialog components
│   │   ├── table/              # Table components
│   │   ├── tabs/               # Tab components
│   │   ├── toggle/             # Toggle and switch components
│   │   └── loaders.tsx         # Loading and skeleton components
│   ├── config/                 # Configuration files
│   │   ├── _config.ts          # Main configuration and API setup
│   │   └── api.ts              # API configuration and endpoints
│   ├── context/                # React Context providers
│   │   ├── index.tsx           # Main context provider
│   │   ├── query-context.tsx   # TanStack Query context
│   │   └── tabscontext.tsx     # Tabs state management
│   ├── hooks/                  # Custom React hooks
│   │   ├── useApi.ts           # API data fetching hook
│   │   ├── useClickOutside.ts  # Click outside detection
│   │   ├── useDeviceSize.ts    # Responsive device detection
│   │   ├── useLogout.js        # Authentication logout logic
│   │   └── useMaxLength.ts     # Input length validation
│   ├── lib/                    # Utility libraries
│   │   ├── error-handler.ts    # Error handling utilities
│   │   └── utils.ts            # General utility functions
│   ├── store/                  # Zustand state management
│   ├── types.ts                # TypeScript type definitions
│   ├── ui/                     # Base UI components (shadcn/ui style)
│   ├── utils/                  # Additional utility functions
│   └── layout/                 # Layout-specific components
├── public/                     # Static assets
│   ├── favicon.ico             # Site favicon
│   └── *.svg                   # SVG icons and logos
├── .github/                    # GitHub workflows and templates
├── .husky/                     # Git hooks configuration
├── .prettierrc                 # Prettier configuration
├── .prettierignore             # Prettier ignore rules
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Styling & Design

This template uses **Tailwind CSS 4** with:
- Custom color palette and design tokens
- Responsive breakpoints
- Dark mode support
- Animation utilities
- Component-based styling approach

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_base_url
```

### API Configuration

The template includes a comprehensive API configuration in `src/config/_config.ts` with:
- Automatic authentication token handling
- Error handling and retry logic
- Query parameter support
- Multipart form data support

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:
- Responsive breakpoints for all screen sizes
- Touch-friendly interactions
- Optimized layouts for mobile, tablet, and desktop

## 🔐 Authentication

The template includes authentication-ready features:
- Cookie-based token storage
- Automatic token injection in API requests
- Logout functionality
- Protected route patterns

## 🚀 Deployment

This template is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any Node.js hosting platform

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This template is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
3. Open an issue in the repository

---

**Happy coding! 🎉**
