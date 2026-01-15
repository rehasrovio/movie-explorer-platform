def test_get_movies(client):
    response = client.get("/api/v1/movies")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert isinstance(data["items"], list)
    assert data["total"] > 0


def test_get_movie_detail(client):
    # First get movies to find a valid ID
    movies_response = client.get("/api/v1/movies")
    assert movies_response.status_code == 200
    movies = movies_response.json()["items"]
    if movies:
        movie_id = movies[0]["id"]
        response = client.get(f"/api/v1/movies/{movie_id}")
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "title" in data
        assert "director" in data
        assert "genres" in data
        assert "actors" in data


def test_get_movie_not_found(client):
    response = client.get("/api/v1/movies/99999")
    assert response.status_code == 404
