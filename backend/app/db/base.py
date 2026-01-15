from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Import all models so SQLAlchemy can discover them
from app.models.actor import Actor  # noqa: E402, F401
from app.models.director import Director  # noqa: E402, F401
from app.models.genre import Genre  # noqa: E402, F401
from app.models.movie import Movie  # noqa: E402, F401
