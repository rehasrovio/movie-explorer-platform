# Movie Explorer Backend

Production-grade FastAPI backend for the Movie Explorer platform.

## Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## Running the Server

### Development Mode (with auto-reload)

```bash
uvicorn app.main:app --reload
```

The server will start on `http://localhost:8000`

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

### Run All Tests

```bash
pytest
```

### Run Tests with Verbose Output

```bash
pytest -v
```

### Run Specific Test File

```bash
pytest app/tests/test_movies.py
```

### Run Specific Test Function

```bash
pytest app/tests/test_movies.py::test_get_movies
```

### Run Tests with Coverage

```bash
pytest --cov=app --cov-report=html
```

This will generate an HTML coverage report in `htmlcov/index.html`

### Run Tests in Parallel (if pytest-xdist is installed)

```bash
pytest -n auto
```

## Linting

### Check Code with Ruff

```bash
ruff check .
```

### Auto-fix Linting Issues

```bash
ruff check . --fix
```

### Check Specific Directory/File

```bash
ruff check app/
ruff check app/main.py
```

### Format Code (if ruff format is configured)

```bash
ruff format .
```

## Docker

### Build Docker Image

```bash
docker build -t movie-explorer-backend .
```

### Run Docker Container

```bash
docker run -p 8000:8000 movie-explorer-backend
```

### Run Docker Container with Environment Variables

```bash
docker run -p 8000:8000 -e DATABASE_URL=sqlite:///./movie.db movie-explorer-backend
```

### Build and Run in One Command

```bash
docker build -t movie-explorer-backend . && docker run -p 8000:8000 movie-explorer-backend
```

### Run Docker Container in Detached Mode

```bash
docker run -d -p 8000:8000 --name movie-backend movie-explorer-backend
```

### View Docker Logs

```bash
docker logs movie-backend
```

### Stop Docker Container

```bash
docker stop movie-backend
```

### Remove Docker Container

```bash
docker rm movie-backend
```

## Database

### Database Location

The SQLite database file (`movie.db`) is created automatically in the `backend/` directory when the server starts.

### Reset Database

To reset the database:

1. Stop the server
2. Delete `movie.db` file
3. Restart the server (database and seed data will be recreated automatically)

### Database URL Configuration

Default database URL: `sqlite:///./movie.db`

You can override this by creating a `.env` file in the `backend/` directory:

```env
DATABASE_URL=sqlite:///./movie.db
```

## Environment Variables

Create a `.env` file in the `backend/` directory to configure environment variables:

```env
DATABASE_URL=sqlite:///./movie.db
```

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application entry point
│   ├── core/
│   │   └── config.py       # Configuration settings
│   ├── db/
│   │   ├── base.py         # SQLAlchemy Base
│   │   ├── session.py      # Database session
│   │   └── init_db.py      # Seed data
│   ├── models/             # SQLAlchemy models
│   ├── schemas/            # Pydantic schemas
│   ├── services/           # Business logic
│   ├── api/
│   │   └── v1/
│   │       ├── api.py      # API router
│   │       └── routes/     # Route handlers
│   └── tests/              # Test files
├── requirements.txt        # Python dependencies
├── ruff.toml              # Linting configuration
├── Dockerfile             # Docker configuration
└── README.md              # This file
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Returns server status

### Movies
- `GET /api/v1/movies` - List movies (with filters: genreId, directorId, actorId, releaseYear, q)
- `GET /api/v1/movies/{movie_id}` - Get movie details

### Actors
- `GET /api/v1/actors` - List actors (with filters: movieId, genreId)
- `GET /api/v1/actors/{actor_id}` - Get actor details

### Directors
- `GET /api/v1/directors` - List directors
- `GET /api/v1/directors/{director_id}` - Get director details

### Genres
- `GET /api/v1/genres` - List genres

## Common Commands Summary

```bash
# Setup
python -m venv venv
venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt

# Run Server
uvicorn app.main:app --reload

# Run Tests
pytest
pytest -v

# Linting
ruff check .
ruff check . --fix

# Docker
docker build -t movie-explorer-backend .
docker run -p 8000:8000 movie-explorer-backend
```

## Troubleshooting

### ModuleNotFoundError when running tests

If you get `ModuleNotFoundError: No module named 'app'`:

1. Make sure you're in the `backend/` directory
2. Make sure your virtual environment is activated
3. Try running: `python -m pytest` instead of just `pytest`

### Port already in use

If port 8000 is already in use:

```bash
uvicorn app.main:app --reload --port 8001
```

### Database locked error

If you get a database locked error:

1. Make sure no other process is using the database
2. Stop all running server instances
3. Delete `movie.db` and restart

## Development Tips

- The server auto-reloads on code changes when using `--reload` flag
- Database is automatically seeded on first startup
- Use Swagger UI at `/docs` to test API endpoints interactively
- Check linting before committing: `ruff check .`
