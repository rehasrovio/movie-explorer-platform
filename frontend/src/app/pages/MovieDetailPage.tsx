import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "@/app/services/api";
import type { Movie, Actor } from "@/app/types";
import { Star, Bookmark, ArrowLeft, Calendar, User } from "lucide-react";
import { LoadingSpinner } from "@/app/components/LoadingState";
import { ErrorState } from "@/app/components/ErrorState";
import { isInWatchLater, toggleWatchLater } from "@/app/utils/watchLater";

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [movieData, actorsData] = await Promise.all([
          api.getMovieById(id),
          api.getActorsForMovie(id),
        ]);

        if (!movieData) {
          setError(true);
        } else {
          setMovie(movieData);
          setActors(actorsData);
          setIsSaved(isInWatchLater(id));
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleToggleWatchLater = () => {
    if (!id) return;
    const newState = toggleWatchLater(id);
    setIsSaved(newState);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <ErrorState
          title="Movie not found"
          message="The movie you're looking for doesn't exist."
          onRetry={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Movie Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48" />
          <div className="p-8 -mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{movie.releaseYear}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full font-semibold">
                      <Star className="w-5 h-5 fill-current" />
                      <span>{movie.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleToggleWatchLater}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                    isSaved
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? "Saved" : "Save to Watch Later"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Director
              </h3>
              <Link
                to={`/directors/${movie.directorId}`}
                className="inline-flex items-center gap-2 text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
              >
                <User className="w-5 h-5" />
                {movie.directorName}
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Cast
          </h2>
          {actors.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No cast available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {actors.map((actor) => (
                <Link
                  key={actor.id}
                  to={`/actors/${actor.id}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {actor.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {actor.movieCount}{" "}
                      {actor.movieCount === 1 ? "movie" : "movies"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
