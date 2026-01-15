from pydantic import BaseModel, ConfigDict

from app.schemas.movie import MovieReference


class DirectorDetail(BaseModel):
    id: int
    name: str
    movies: list[MovieReference]

    model_config = ConfigDict(from_attributes=True)
