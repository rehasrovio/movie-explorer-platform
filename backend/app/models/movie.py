from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.models.associations import movie_actors, movie_genres


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    release_year = Column(Integer, nullable=False, index=True)
    rating = Column(Float, nullable=False)
    director_id = Column(Integer, ForeignKey("directors.id"), nullable=False)

    director = relationship("Director", back_populates="movies")
    actors = relationship("Actor", secondary=movie_actors, back_populates="movies")
    genres = relationship("Genre", secondary=movie_genres, back_populates="movies")
