import { useEffect, useState } from "react";
import { getMovieById } from "../api/movies";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/movies/MovieCard";
import { Loading } from "../components/common/Loading";
import { ErrorState } from "../components/common/ErrorState";
import { EmptyState } from "../components/common/EmptyState";
import { useWatchLater } from "../hooks/useWatchLater";

export const WatchLaterPage = () => {
  const { watchLaterIds, remove } = useWatchLater();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      if (watchLaterIds.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const moviePromises = watchLaterIds.map((id) => getMovieById(id));
        const loadedMovies = await Promise.all(moviePromises);
        setMovies(loadedMovies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [watchLaterIds]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Watch Later</h1>
      {movies.length === 0 ? (
        <EmptyState message="No movies in your watch later list" />
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
