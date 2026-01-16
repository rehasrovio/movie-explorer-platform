"""Health check endpoint for monitoring API status."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health():
    """
    Health check endpoint.

    Returns:
        Dictionary with status "ok" to indicate the API is running
    """
    return {"status": "ok"}
