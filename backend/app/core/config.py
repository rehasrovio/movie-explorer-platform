from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./movie.db"

    class Config:
        env_file = ".env"


settings = Settings()
