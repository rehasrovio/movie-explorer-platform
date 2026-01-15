from pydantic import BaseModel, ConfigDict


class DirectorInfo(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class GenreInfo(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class ActorInfo(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class MovieReference(BaseModel):
    id: int
    title: str
    release_year: int
    rating: float

    model_config = ConfigDict(from_attributes=True)


class MovieListItem(BaseModel):
    id: int
    title: str
    release_year: int
    rating: float
    director: DirectorInfo
    genres: list[GenreInfo]

    model_config = ConfigDict(from_attributes=True)


class MovieDetail(BaseModel):
    id: int
    title: str
    release_year: int
    rating: float
    director: DirectorInfo
    genres: list[GenreInfo]
    actors: list[ActorInfo]

    model_config = ConfigDict(from_attributes=True)
