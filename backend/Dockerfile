FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY pytest.ini .
COPY ruff.toml .

# Run linting
RUN ruff check . || exit 1

# Run tests
RUN pytest || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
