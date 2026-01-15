from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.director import Director
from app.schemas.common import PaginatedResponse
from app.schemas.director import DirectorDetail

router = APIRouter()


@router.get("", response_model=PaginatedResponse[DirectorDetail])
def get_directors(db: Session = Depends(get_db)):
    directors = db.query(Director).all()
    return {"items": directors, "total": len(directors)}


@router.get("/{director_id}", response_model=DirectorDetail)
def get_director(director_id: int, db: Session = Depends(get_db)):
    director = db.query(Director).filter(Director.id == director_id).first()
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    return director
