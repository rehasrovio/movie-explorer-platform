import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { Badge } from "../common/Badge";
import { useWatchLater } from "../../hooks/useWatchLater";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { toggle, check } = useWatchLater();
  const isWatched = check(movie.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <Link
              to={`/movies/${movie.id}`}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {movie.title}
            </Link>
            <p className="text-gray-600 text-sm mt-1">{movie.releaseYear}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {movie.rating.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
        </div>

        <div className="mb-3">
          <Link
            to={`/directors/${movie.director.id}`}
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            Director: {movie.director.name}
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>

        <button
          onClick={() => toggle(movie.id)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isWatched
              ? "bg-red-100 text-red-700 hover:bg-red-200"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {isWatched ? "Remove from Watch Later" : "Watch Later"}
        </button>
      </div>
    </div>
  );
};
