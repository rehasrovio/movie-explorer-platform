import type { Movie } from '@/app/types';
import { Star, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isInWatchLater, toggleWatchLater } from '@/app/utils/watchLater';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isSaved, setIsSaved] = useState(() => isInWatchLater(movie.id));

  useEffect(() => {
    const handleUpdate = () => setIsSaved(isInWatchLater(movie.id));
    window.addEventListener('watchLaterUpdated', handleUpdate);
    return () => window.removeEventListener('watchLaterUpdated', handleUpdate);
  }, [movie.id]);

  const handleToggleWatchLater = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleWatchLater(movie.id);
    setIsSaved(newState);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700">
      <Link to={`/movies/${movie.id}`} className="block p-6">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-1">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {movie.releaseYear}
              </p>
            </div>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full text-sm font-semibold shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              {movie.rating.toFixed(1)}
            </div>
          </div>

          {/* Director */}
          <Link
            to={`/directors/${movie.directorId}`}
            className="inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mb-3 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {movie.directorName}
          </Link>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              View Details
            </button>
            <button
              onClick={handleToggleWatchLater}
              className={`p-2 rounded-xl transition-colors ${
                isSaved
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              aria-label="Save to watch later"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
