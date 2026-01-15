from pydantic import BaseModel, ConfigDict

from app.schemas.movie import MovieReference


class ActorListItem(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class ActorDetail(BaseModel):
    id: int
    name: str
    movies: list[MovieReference]

    model_config = ConfigDict(from_attributes=True)
