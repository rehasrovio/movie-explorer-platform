import { useState, useEffect } from "react";
import { getMovies, GetMoviesParams } from "../api/movies";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/movies/MovieCard";
import { MovieFilters, MovieFilters as MovieFiltersType } from "../components/movies/MovieFilters";
import { Loading } from "../components/common/Loading";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";

export const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MovieFiltersType>({});

  const loadMovies = async (params?: GetMoviesParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMovies(params);
      setMovies(response.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleFilterChange = (newFilters: MovieFiltersType) => {
    setFilters(newFilters);
    const params: GetMoviesParams = {
      genreId: newFilters.genreId,
      directorId: newFilters.directorId,
      actorId: newFilters.actorId,
      q: newFilters.q,
    };
    loadMovies(params);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => loadMovies(filters)} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Movies</h1>
      <MovieFilters onFilterChange={handleFilterChange} />
      {movies.length === 0 ? (
        <EmptyState message="No movies found" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};
