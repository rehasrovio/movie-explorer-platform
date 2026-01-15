import random

from app.models.actor import Actor
from app.models.director import Director
from app.models.genre import Genre
from app.models.movie import Movie


def seed_data(db):
    # Check if movies already exist
    if db.query(Movie).first():
        return

    # Create genres
    genres_data = [
        "Action",
        "Comedy",
        "Drama",
        "Sci-Fi",
        "Thriller",
    ]
    genres = []
    for name in genres_data:
        genre = Genre(name=name)
        db.add(genre)
        genres.append(genre)
    db.flush()

    # Create directors
    directors_data = [
        "Christopher Nolan",
        "Quentin Tarantino",
        "Steven Spielberg",
        "Martin Scorsese",
        "Ridley Scott",
    ]
    directors = []
    for name in directors_data:
        director = Director(name=name)
        db.add(director)
        directors.append(director)
    db.flush()

    # Create actors
    actors_data = [
        "Leonardo DiCaprio",
        "Tom Hanks",
        "Brad Pitt",
        "Meryl Streep",
        "Robert De Niro",
        "Scarlett Johansson",
        "Denzel Washington",
        "Emma Stone",
        "Ryan Gosling",
        "Jennifer Lawrence",
        "Christian Bale",
        "Cate Blanchett",
        "Matt Damon",
        "Natalie Portman",
        "Joaquin Phoenix",
    ]
    actors = []
    for name in actors_data:
        actor = Actor(name=name)
        db.add(actor)
        actors.append(actor)
    db.flush()

    # Create movies
    movies_data = [
        ("Inception", 2010, 8.8),
        ("The Dark Knight", 2008, 9.0),
        ("Pulp Fiction", 1994, 8.9),
        ("Interstellar", 2014, 8.6),
        ("The Matrix", 1999, 8.7),
        ("Forrest Gump", 1994, 8.8),
        ("The Departed", 2006, 8.5),
        ("Gladiator", 2000, 8.5),
        ("The Shawshank Redemption", 1994, 9.3),
        ("Fight Club", 1999, 8.8),
        ("Goodfellas", 1990, 8.7),
        ("The Godfather", 1972, 9.2),
        ("Schindler's List", 1993, 8.9),
        ("Saving Private Ryan", 1998, 8.6),
        ("The Prestige", 2006, 8.5),
        ("Django Unchained", 2012, 8.4),
        ("Inglourious Basterds", 2009, 8.3),
        ("Blade Runner", 1982, 8.1),
        ("Alien", 1979, 8.5),
        ("The Revenant", 2015, 8.0),
    ]

    for title, year, rating in movies_data:
        movie = Movie(
            title=title,
            release_year=year,
            rating=rating,
            director=random.choice(directors),
        )
        # Add 2-4 random actors
        movie.actors = random.sample(actors, random.randint(2, min(4, len(actors))))
        # Add 1-3 random genres
        movie.genres = random.sample(genres, random.randint(1, min(3, len(genres))))
        db.add(movie)

    db.commit()
