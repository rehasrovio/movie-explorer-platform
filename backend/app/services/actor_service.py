from sqlalchemy.orm import Session

from app.models.actor import Actor
from app.models.genre import Genre
from app.models.movie import Movie


def get_actors(db: Session, movie_id: int | None = None, genre_id: int | None = None):
    query = db.query(Actor)

    if movie_id:
        query = query.join(Actor.movies).filter(Movie.id == movie_id)

    if genre_id:
        query = (
            query.join(Actor.movies)
            .join(Movie.genres)
            .filter(Genre.id == genre_id)
            .distinct()
        )

    return query.all()
