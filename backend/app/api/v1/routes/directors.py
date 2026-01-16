"""API routes for director-related endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.director import Director
from app.schemas.common import PaginatedResponse
from app.schemas.director import DirectorDetail

router = APIRouter()


@router.get("", response_model=PaginatedResponse[DirectorDetail])
def get_directors(db: Session = Depends(get_db)):
    """
    Get a paginated list of all directors.

    Returns:
        PaginatedResponse with list of all directors and total count
    """
    directors = db.query(Director).all()
    return {"items": directors, "total": len(directors)}


@router.get("/{director_id}", response_model=DirectorDetail)
def get_director(director_id: int, db: Session = Depends(get_db)):
    """
    Get detailed information about a specific director.

    Path Parameters:
        director_id: The ID of the director to retrieve

    Returns:
        DirectorDetail with full director information including filmography

    Raises:
        HTTPException 404: If director is not found
    """
    director = db.query(Director).filter(Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    return director
