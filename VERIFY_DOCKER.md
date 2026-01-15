# How to Verify Docker Setup

## 1. Rebuild and Start Containers

```bash
docker compose up --build
```

This will:
- Build both backend and frontend containers
- Start the backend on port 8000
- Start the frontend on port 5173
- Frontend will be configured to call backend at `http://backend:8000/api/v1`

## 2. Check Container Status

In a new terminal, verify both containers are running:

```bash
docker compose ps
```

You should see both `movie-explorer-backend` and `movie-explorer-frontend` with status "Up".

## 3. Check Container Logs

```bash
# Backend logs
docker compose logs backend

# Frontend logs
docker compose logs frontend

# Both logs
docker compose logs
```

Expected output:
- **Backend**: Should show "Uvicorn running on http://0.0.0.0:8000"
- **Frontend**: Should show "Local: http://localhost:5173" (or similar)

## 4. Test Backend API

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Get movies
curl http://localhost:8000/api/v1/movies
```

Expected: JSON responses from the API.

## 5. Test Frontend

Open your browser and navigate to:
```
http://localhost:5173
```

You should see:
- The Movie Explorer app loads
- Movies are displayed (fetched from backend)
- No console errors about API connection

## 6. Verify Frontend-Backend Communication

Open browser DevTools (F12) and check:
- **Network tab**: API calls should go to `http://localhost:5173` (proxied by Vite)
- **Console**: No CORS errors or connection errors
- **Application**: Movies should load and display

## 7. Test API from Frontend Container

```bash
# Execute command inside frontend container
docker compose exec frontend wget -qO- http://backend:8000/api/v1/health
```

Expected: Should return health check response, proving frontend can reach backend using container name.

## Troubleshooting

If frontend shows errors:
1. Check backend is running: `docker compose ps`
2. Check backend logs: `docker compose logs backend`
3. Check frontend logs: `docker compose logs frontend`
4. Verify environment variable: `docker compose exec frontend env | grep VITE_API_BASE_URL`

If you see "vite: not found":
- The Dockerfile fix should resolve this
- Rebuild: `docker compose up --build --force-recreate`
