def test_filter_by_genre_id(client):
    # Get all movies first
    all_movies = client.get("/api/v1/movies").json()
    if all_movies["items"]:
        # Get a genre from the first movie
        first_movie = all_movies["items"][0]
        if first_movie.get("genres"):
            genre_id = first_movie["genres"][0]["id"]
            response = client.get(f"/api/v1/movies?genreId={genre_id}")
            assert response.status_code == 200
            data = response.json()
            assert "items" in data
            assert "total" in data
            # Verify all returned movies have the genre
            for movie in data["items"]:
                genre_ids = [g["id"] for g in movie["genres"]]
                assert genre_id in genre_ids


def test_filter_by_actor_id(client):
    # Get all movies first
    all_movies = client.get("/api/v1/movies").json()
    if all_movies["items"]:
        # Get movie detail to find actors
        movie_id = all_movies["items"][0]["id"]
        movie_detail = client.get(f"/api/v1/movies/{movie_id}").json()
        if movie_detail.get("actors"):
            actor_id = movie_detail["actors"][0]["id"]
            response = client.get(f"/api/v1/movies?actorId={actor_id}")
            assert response.status_code == 200
            data = response.json()
            assert "items" in data
            assert "total" in data


def test_filter_by_director_id(client):
    # Get all movies first
    all_movies = client.get("/api/v1/movies").json()
    if all_movies["items"]:
        director_id = all_movies["items"][0]["director"]["id"]
        response = client.get(f"/api/v1/movies?directorId={director_id}")
        assert response.status_code == 200
        data = response.json()
        assert "items" in data
        assert "total" in data
        # Verify all returned movies have the director
        for movie in data["items"]:
            assert movie["director"]["id"] == director_id


def test_filter_by_release_year(client):
    # Get all movies first
    all_movies = client.get("/api/v1/movies").json()
    if all_movies["items"]:
        release_year = all_movies["items"][0]["release_year"]
        response = client.get(f"/api/v1/movies?releaseYear={release_year}")
        assert response.status_code == 200
        data = response.json()
        assert "items" in data
        assert "total" in data
        # Verify all returned movies have the release year
        for movie in data["items"]:
            assert movie["release_year"] == release_year


def test_invalid_filter_id_returns_400(client):
    response = client.get("/api/v1/movies?genreId=-1")
    assert response.status_code == 400

    response = client.get("/api/v1/movies?directorId=0")
    assert response.status_code == 400

    response = client.get("/api/v1/movies?actorId=-5")
    assert response.status_code == 400
