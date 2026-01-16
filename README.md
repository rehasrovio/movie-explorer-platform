# Movie Explorer Platform

A full-stack web application for exploring movies, actors, directors, and genres. Built with FastAPI (backend) and React + TypeScript + Vite (frontend).

## 🎬 Features

- Browse movies with advanced filtering (genre, director, actor, year, search)
- View detailed information about movies, actors, and directors
- "Watch Later" functionality to save movies for later
- Modern, responsive UI with dark mode support
- RESTful API with comprehensive filtering capabilities

## 🏗️ Architecture

- **Backend**: FastAPI (Python) with SQLAlchemy ORM and SQLite database
- **Frontend**: React 19 with TypeScript, Vite, Tailwind CSS v4
- **Database**: SQLite (auto-created and seeded on first run)

## 📋 Prerequisites

- **Docker & Docker Compose** (recommended for full-stack setup)
- OR
- **Python 3.11+** (for backend)
- **Node.js 20+** (for frontend)

## 🚀 Quick Start with Docker (Recommended)

The easiest way to run the entire application:

### 1. Build and Start All Services

```bash
docker compose up --build
```

This will:
- Build and start the backend API on `http://localhost:8000`
- Build and start the frontend on `http://localhost:5173`
- Automatically configure the frontend to connect to the backend

### 2. Access the Application

- **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
- **Backend API Docs**: Visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API documentation

### 3. Stop the Services

```bash
docker compose down
```

### 4. View Logs

```bash
# All services
docker compose logs

# Backend only
docker compose logs backend

# Frontend only
docker compose logs frontend

# Follow logs in real-time
docker compose logs -f
```

## 🛠️ Development Setup (Without Docker)

### Backend Setup

See [backend/README.md](./backend/README.md) for detailed backend setup instructions.

**Quick start:**
```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

See [frontend/README.md](./frontend/README.md) for detailed frontend setup instructions.

**Quick start:**
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
movie-explorer-platform/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration
│   │   ├── db/             # Database setup
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── tests/          # Test files
│   ├── Dockerfile
│   └── README.md
├── frontend/               # React frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # React components
│   │   │   ├── pages/     # Page components
│   │   │   ├── services/  # API client
│   │   │   ├── types/     # TypeScript types
│   │   │   └── utils/     # Utilities
│   │   └── styles/        # CSS files
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml      # Docker Compose configuration
└── README.md              # This file
```

## 🔌 API Endpoints

### Health Check
- `GET /api/v1/health` - Server status

### Movies
- `GET /api/v1/movies` - List movies (with filters: `genreId`, `directorId`, `actorId`, `releaseYear`, `q`)
- `GET /api/v1/movies/{movie_id}` - Get movie details

### Actors
- `GET /api/v1/actors` - List actors (with filters: `movieId`, `genreId`)
- `GET /api/v1/actors/{actor_id}` - Get actor details

### Directors
- `GET /api/v1/directors` - List directors
- `GET /api/v1/directors/{director_id}` - Get director details

### Genres
- `GET /api/v1/genres` - List genres

**Interactive API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest -v  # Verbose output
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔍 Linting

### Backend Linting
```bash
cd backend
ruff check .
ruff check . --fix  # Auto-fix issues
```

### Frontend Linting
```bash
cd frontend
npm run lint
```

## 🐳 Docker Commands

### Build and Start
```bash
docker compose up --build
```

### Start in Background (Detached)
```bash
docker compose up -d --build
```

### Stop Services
```bash
docker compose down
```

### Rebuild Specific Service
```bash
docker compose up --build backend
docker compose up --build frontend
```

### View Container Status
```bash
docker compose ps
```

### Execute Commands in Containers
```bash
# Backend shell
docker compose exec backend sh

# Frontend shell
docker compose exec frontend sh
```

## 🔧 Environment Variables

### Backend
Create `backend/.env`:
```env
DATABASE_URL=sqlite:///./movie.db
```

### Frontend
The frontend uses `VITE_API_BASE_URL` which is set during Docker build. For local development, it defaults to `http://localhost:8000/api/v1`.

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - Backend setup, API details, testing, and more
- [Frontend Documentation](./frontend/README.md) - Frontend setup, development, and build instructions

## 🐛 Troubleshooting

### Port Already in Use

If port 8000 or 5173 is already in use:

**Backend:**
```bash
uvicorn app.main:app --reload --port 8001
```

**Frontend:**
Update `vite.config.ts` or use:
```bash
npm run dev -- --port 5174
```

**Docker:**
Update ports in `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Backend
  - "5174:5173"  # Frontend
```

### Database Issues

If you encounter database errors:
1. Stop all services
2. Delete `backend/movie.db`
3. Restart services (database will be recreated automatically)

### Frontend Can't Connect to Backend

**Docker:**
- Ensure both containers are running: `docker compose ps`
- Check backend logs: `docker compose logs backend`
- Verify API is accessible: `curl http://localhost:8000/api/v1/health`

**Local Development:**
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in `backend/app/main.py`
- Verify `VITE_API_BASE_URL` in frontend environment

### Docker Build Failures

- Clear Docker cache: `docker compose build --no-cache`
- Remove old containers: `docker compose down -v`
- Check Docker logs: `docker compose logs`
