# Movie Explorer Frontend

Modern React frontend for the Movie Explorer platform, built with TypeScript, Vite, and Tailwind CSS v4.

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ErrorState.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── MoviesPage.tsx
│   │   │   ├── MovieDetailPage.tsx
│   │   │   ├── ActorProfilePage.tsx
│   │   │   ├── DirectorProfilePage.tsx
│   │   │   ├── WatchLaterPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── services/        # API client
│   │   │   └── api.ts
│   │   ├── types/           # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── utils/           # Utility functions
│   │   │   └── watchLater.ts
│   │   └── App.tsx          # Main app component
│   ├── styles/              # CSS files
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── fonts.css
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tailwind.config.js
├── Dockerfile
└── README.md
```

## 🛠️ Available Scripts

### `npm run dev`

Starts the development server with hot module replacement (HMR).

### `npm run build`

Builds the application for production. This runs TypeScript type checking and creates an optimized production build in the `dist/` directory.

### `npm run preview`

Serves the production build locally for testing.

### `npm run lint`

Runs ESLint to check for code quality issues.

### `npm test`

Runs Vitest test suite.

## 🎨 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Vitest** - Testing framework

## 🔌 API Configuration

The frontend connects to the backend API. The API base URL is configured via environment variable:

- **Environment Variable**: `VITE_API_BASE_URL`
- **Default**: `http://localhost:8000/api/v1`
- **Docker**: Set during build via `docker-compose.yml`

### Local Development

For local development, the frontend will use `http://localhost:8000/api/v1` by default. Make sure the backend is running on port 8000.

### Docker

When running in Docker, the API URL is set to `http://localhost:8000/api/v1` during build, which allows the browser to connect to the backend through the exposed port.

## 🎯 Features

### Pages

- **Movies Page** (`/`) - Browse and filter movies
- **Movie Detail** (`/movies/:id`) - View detailed movie information
- **Actor Profile** (`/actors/:id`) - View actor details and filmography
- **Director Profile** (`/directors/:id`) - View director details and filmography
- **Watch Later** (`/watch-later`) - View saved movies
- **404 Page** - Not found page

### Components

- **Navbar** - Navigation bar with links
- **MovieCard** - Movie card component with rating, genres, and watch later button
- **FilterBar** - Search and filter controls (genre, director, actor, year)
- **LoadingState** - Loading spinners and skeleton loaders
- **EmptyState** - Empty state messages
- **ErrorState** - Error display with retry functionality

### Utilities

- **watchLater** - LocalStorage-based "Watch Later" functionality
- **api** - Centralized API client with type-safe requests

## 🧪 Testing

**Important**: Tests are automatically run during Docker build. The build will fail if any test fails.

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test -- --watch
```

### Run Tests Once (Non-Watch Mode)

```bash
npm test -- --run
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

## 🐳 Docker

**Build Process**: The Docker build automatically runs:
1. Linting (`npm run lint`) - build fails if linting errors found
2. Tests (`npm test -- --run`) - build fails if tests fail
3. Production build (`npm run build`)
4. Starts preview server

Ensure all linting and tests pass before building.

### Build Docker Image

```bash
docker build -t movie-explorer-frontend .
```

### Run Docker Container

```bash
docker run -p 5173:5173 movie-explorer-frontend
```

### Build with Custom API URL

```bash
docker build --build-arg VITE_API_BASE_URL=http://localhost:8000/api/v1 -t movie-explorer-frontend .
```

## 🔧 Configuration

### TypeScript

TypeScript configuration is in `tsconfig.json` and `tsconfig.app.json`. The project uses:
- Strict type checking
- Path aliases (`@/*` maps to `src/*`)
- `verbatimModuleSyntax` for explicit type imports

### Tailwind CSS

Tailwind CSS v4 is configured via `@tailwindcss/vite` plugin. Configuration is in:
- `tailwind.config.js` - Tailwind configuration
- `src/styles/tailwind.css` - Tailwind directives
- `src/styles/theme.css` - Custom theme variables

### Vite

Vite configuration is in `vite.config.ts`. It includes:
- React plugin
- Tailwind CSS plugin
- Path alias resolution

### ESLint

ESLint is configured in `eslint.config.js`. Linting is automatically run:
- During Docker build (build fails on errors)
- Manually with `npm run lint`

## 🎨 Styling

The application uses Tailwind CSS v4 with a custom theme. Key styling features:

- **Dark mode** support
- **Responsive design** (mobile-first)
- **Modern UI** with glass effects and gradients
- **Smooth animations** and transitions
- **Consistent spacing** and typography

## 📦 Dependencies

### Production Dependencies

- `react` - React library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `axios` - HTTP client
- `lucide-react` - Icons

### Development Dependencies

- `@vitejs/plugin-react` - Vite React plugin
- `@tailwindcss/vite` - Tailwind CSS Vite plugin
- `typescript` - TypeScript compiler
- `vite` - Build tool
- `vitest` - Testing framework
- `@testing-library/react` - React testing utilities
- `eslint` - Linting

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 5174
```

### Build Errors

If you encounter TypeScript errors during build:

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix linting issues
npm run lint -- --fix
```

### API Connection Issues

1. Verify backend is running: `curl http://localhost:8000/api/v1/health`
2. Check `VITE_API_BASE_URL` environment variable
3. Verify CORS settings in backend
4. Check browser console for errors

### Module Resolution Errors

If you see import errors:

1. Check path aliases in `tsconfig.app.json`
2. Verify `vite.config.ts` has correct alias configuration
3. Restart the dev server

## 📝 Development Tips

- Use React DevTools for debugging
- Check browser console for API errors
- Use Network tab to inspect API requests
- TypeScript will catch type errors during development
- Hot module replacement (HMR) updates components automatically

## 🔗 Related Documentation

- [Backend README](../backend/README.md) - Backend API documentation
- [Root README](../README.md) - Overall project documentation
