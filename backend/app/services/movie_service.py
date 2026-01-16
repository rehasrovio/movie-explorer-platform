"""Movie service layer for business logic related to movies."""

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
) -> tuple[list[Movie], int]:
    """
    Retrieve movies with optional filtering.

    Filters movies based on genre, director, actor, release year, or search query.
    Multiple filters can be combined. Returns both the filtered movies and total count.

    Args:
        db: Database session
        genre_id: Filter by genre ID (optional)
        director_id: Filter by director ID (optional)
        actor_id: Filter by actor ID (optional)
        release_year: Filter by exact release year (optional)
        q: Search query for movie title (case-insensitive partial match) (optional)

    Returns:
        Tuple of (list of Movie objects, total count)
    """
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


def get_movie_by_id(db: Session, movie_id: int) -> Movie | None:
    """
    Retrieve a single movie by its ID.

    Args:
        db: Database session
        movie_id: The ID of the movie to retrieve

    Returns:
        Movie object if found, None otherwise
    """
    return db.query(Movie).filter(Movie.id == movie_id).first()
