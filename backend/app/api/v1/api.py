from fastapi import APIRouter

from app.api.v1.routes import actors, directors, genres, health, movies

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(movies.router, prefix="/movies", tags=["movies"])
api_router.include_router(actors.router, prefix="/actors", tags=["actors"])
api_router.include_router(directors.router, prefix="/directors", tags=["directors"])
api_router.include_router(genres.router, prefix="/genres", tags=["genres"])
