"""Actor service layer for business logic related to actors."""

from sqlalchemy.orm import Session

from app.models.actor import Actor
from app.models.genre import Genre
from app.models.movie import Movie


def get_actors(
    db: Session, movie_id: int | None = None, genre_id: int | None = None
) -> list[Actor]:
    """
    Retrieve actors with optional filtering.

    Filters actors based on movies they've acted in or genres of movies they've acted in.
    Multiple filters can be combined.

    Args:
        db: Database session
        movie_id: Filter by movie ID - returns actors who acted in this movie (optional)
        genre_id: Filter by genre ID - returns actors who acted in movies of this genre (optional)

    Returns:
        List of Actor objects matching the filters
    """
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
