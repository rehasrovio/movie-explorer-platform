from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.db.base import Base
from app.db.init_db import seed_data
from app.db.session import engine

app = FastAPI(title="Movie Explorer API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
def on_startup():
    # Create tables
    Base.metadata.create_all(bind=engine)

    # Seed data
    from app.db.session import SessionLocal

    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()
