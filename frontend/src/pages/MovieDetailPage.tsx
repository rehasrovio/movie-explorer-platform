import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../api/movies";
import { Movie } from "../types/movie";
import { Loading } from "../components/common/Loading";
import { ErrorState } from "../components/common/ErrorState";
import { NotFoundPage } from "./NotFoundPage";
import { Badge } from "../components/common/Badge";
import { useWatchLater } from "../hooks/useWatchLater";

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggle, check } = useWatchLater();

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(parseInt(id));
        setMovie(data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError("not_found");
        } else {
          setError(err.message || "Failed to load movie");
        }
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error === "not_found" || (!movie && !loading)) {
    return <NotFoundPage />;
  }

  if (error || !movie) {
    return <ErrorState message={error || "Failed to load movie"} />;
  }

  const isWatched = check(movie.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {movie.title}
              </h1>
              <p className="text-xl text-gray-600">{movie.releaseYear}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">
                {movie.rating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Director
            </h2>
            <Link
              to={`/directors/${movie.director.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {movie.director.name}
            </Link>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
          </div>

          {movie.actors && movie.actors.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map((actor) => (
                  <Link
                    key={actor.id}
                    to={`/actors/${actor.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => toggle(movie.id)}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              isWatched
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            {isWatched ? "Remove from Watch Later" : "Add to Watch Later"}
          </button>
        </div>
      </div>
    </div>
  );
};
