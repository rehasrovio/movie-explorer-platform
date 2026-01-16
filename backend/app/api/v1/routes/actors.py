"""API routes for actor-related endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.actor import Actor
from app.schemas.actor import ActorDetail, ActorListItem
from app.schemas.common import PaginatedResponse
from app.services.actor_service import get_actors

router = APIRouter()


@router.get("", response_model=PaginatedResponse[ActorListItem])
def get_actors_list(
    movieId: int | None = Query(None, alias="movieId"),
    genreId: int | None = Query(None, alias="genreId"),
    db: Session = Depends(get_db),
):
    """
    Get a paginated list of actors with optional filtering.

    Supports filtering by movie or genre. Returns actors who have acted in
    the specified movie or in movies of the specified genre.

    Query Parameters:
        movieId: Filter by movie ID - returns actors in this movie (must be positive integer)
        genreId: Filter by genre ID - returns actors in movies of this genre (must be positive integer)

    Returns:
        PaginatedResponse with list of actors and total count

    Raises:
        HTTPException 400: If any filter ID is invalid (<= 0)
    """
    if movieId is not None and movieId <= 0:
        raise HTTPException(status_code=400, detail="Invalid movieId")
    if genreId is not None and genreId <= 0:
        raise HTTPException(status_code=400, detail="Invalid genreId")

    actors = get_actors(db, movie_id=movieId, genre_id=genreId)
    return {"items": actors, "total": len(actors)}


@router.get("/{actor_id}", response_model=ActorDetail)
def get_actor(actor_id: int, db: Session = Depends(get_db)):
    """
    Get detailed information about a specific actor.

    Path Parameters:
        actor_id: The ID of the actor to retrieve (must be positive integer)

    Returns:
        ActorDetail with full actor information including filmography

    Raises:
        HTTPException 400: If actor_id is invalid (<= 0)
        HTTPException 404: If actor is not found
    """
    if actor_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid actor ID")

    actor = db.query(Actor).filter(Actor.id == actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    return actor
