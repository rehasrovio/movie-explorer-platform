from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.common import PaginatedResponse
from app.schemas.movie import MovieDetail, MovieListItem
from app.services.movie_service import get_movie_by_id, get_movies

router = APIRouter()


@router.get("", response_model=PaginatedResponse[MovieListItem])
def get_movies_list(
    genreId: int | None = Query(None, alias="genreId"),
    directorId: int | None = Query(None, alias="directorId"),
    actorId: int | None = Query(None, alias="actorId"),
    releaseYear: int | None = Query(None, alias="releaseYear"),
    q: str | None = Query(None),
    db: Session = Depends(get_db),
):
    # Validate IDs
    if genreId is not None and genreId <= 0:
        raise HTTPException(status_code=400, detail="Invalid genreId")
    if directorId is not None and directorId <= 0:
        raise HTTPException(status_code=400, detail="Invalid directorId")
    if actorId is not None and actorId <= 0:
        raise HTTPException(status_code=400, detail="Invalid actorId")
    if releaseYear is not None and releaseYear <= 0:
        raise HTTPException(status_code=400, detail="Invalid releaseYear")

    items, total = get_movies(
        db=db,
        genre_id=genreId,
        director_id=directorId,
        actor_id=actorId,
        release_year=releaseYear,
        q=q,
    )
    return {"items": items, "total": total}


@router.get("/{movie_id}", response_model=MovieDetail)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    if movie_id <= 0:
        raise HTTPException(status_code=400, detail="Invalid movie ID")

    movie = get_movie_by_id(db, movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie
