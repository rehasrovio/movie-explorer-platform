from sqlalchemy.orm import Session

from app.models.actor import Actor
from app.models.genre import Genre
from app.models.movie import Movie


def get_movies(
    db: Session,
    genre_id: int | None = None,
    director_id: int | None = None,
    actor_id: int | None = None,
    release_year: int | None = None,
    q: str | None = None,
):
    query = db.query(Movie)

    if genre_id:
        query = query.join(Movie.genres).filter(Genre.id == genre_id)

    if director_id:
        query = query.filter(Movie.director_id == director_id)

    if actor_id:
        query = query.join(Movie.actors).filter(Actor.id == actor_id)

    if release_year:
        query = query.filter(Movie.release_year == release_year)

    if q:
        search_term = f"%{q}%"
        query = query.filter(Movie.title.ilike(search_term))

    # Remove duplicates if multiple joins
    query = query.distinct()

    total = query.count()
    items = query.all()

    return items, total


def get_movie_by_id(db: Session, movie_id: int):
    return db.query(Movie).filter(Movie.id == movie_id).first()
