from fastapi import FastAPI

app = FastAPI(title="Movie Explorer API")

@app.get("/")
def root():
    return {"message": "Movie Explorer Backend is running 🚀"}

@app.get("/health")
def health():
    return {"status": "ok"}
