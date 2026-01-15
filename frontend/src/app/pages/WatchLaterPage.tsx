import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/app/types';
import { getWatchLater } from '@/app/utils/watchLater';
import { api } from '@/app/services/api';
import { MovieCard } from '@/app/components/MovieCard';
import { EmptyState } from '@/app/components/EmptyState';
import { Bookmark } from 'lucide-react';

export function WatchLaterPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWatchLater = async () => {
      setLoading(true);
      const movieIds = getWatchLater();
      
      if (movieIds.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        const moviePromises = movieIds.map(id => api.getMovieById(id));
        const savedMovies = (await Promise.all(moviePromises)).filter((m): m is Movie => m !== undefined);
        setMovies(savedMovies);
      } catch (err) {
        console.error('Failed to load watch later movies:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadWatchLater();

    // Listen for storage changes to update the list
    const handleStorageChange = () => {
      loadWatchLater();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('watchLaterUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('watchLaterUpdated', handleStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Watch Later
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Movies you saved for later
          </p>
        </div>

        {/* Content */}
        {movies.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            message="Browse movies and add some to your Watch Later list."
            icon="bookmark"
            action={{
              label: 'Browse Movies',
              onClick: () => navigate('/'),
            }}
          />
        ) : (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="font-semibold">{movies.length}</span> {movies.length === 1 ? 'movie' : 'movies'} saved
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
