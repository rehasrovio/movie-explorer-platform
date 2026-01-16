"""API routes for genre-related endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.genre import Genre
from app.schemas.common import PaginatedResponse
from app.schemas.genre import GenreListItem

router = APIRouter()


@router.get("", response_model=PaginatedResponse[GenreListItem])
def get_genres(db: Session = Depends(get_db)):
    """
    Get a paginated list of all genres.

    Returns:
        PaginatedResponse with list of all genres and total count
    """
    genres = db.query(Genre).all()
    return {"items": genres, "total": len(genres)}
