import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/app/services/api";
import type { Director, Movie } from "@/app/types";
import { User, ArrowLeft, Film } from "lucide-react";
import { LoadingSpinner } from "@/app/components/LoadingState";
import { ErrorState } from "@/app/components/ErrorState";
import { MovieCard } from "@/app/components/MovieCard";

export function DirectorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [director, setDirector] = useState<Director | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [directorData, moviesData] = await Promise.all([
          api.getDirectorById(id),
          api.getMoviesByDirector(id),
        ]);

        if (!directorData) {
          setError(true);
        } else {
          setDirector(directorData);
          // Sort by year descending
          const sortedMovies = moviesData.sort(
            (a, b) => b.releaseYear - a.releaseYear
          );
          setMovies(sortedMovies);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !director) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <ErrorState
          title="Director not found"
          message="The director you're looking for doesn't exist."
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Director Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {director.name}
                </h1>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                  Director
                </span>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                <span className="font-semibold">{director.movieCount}</span>{" "}
                {director.movieCount === 1 ? "movie" : "movies"} directed
              </p>
            </div>
          </div>
        </div>

        {/* Filmography Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Directed Movies
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              (sorted by year)
            </span>
          </div>
          {movies.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No movies found for this director.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
