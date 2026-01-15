import { useState, useEffect } from "react";
import type { MovieFilters, Movie } from "@/app/types";
import { api } from "@/app/services/api";
import { FilterBar } from "@/app/components/FilterBar";
import { MovieCard } from "@/app/components/MovieCard";
import { LoadingState } from "@/app/components/LoadingState";
import { EmptyState } from "@/app/components/EmptyState";
import { ErrorState } from "@/app/components/ErrorState";

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState<MovieFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await api.getMovies(filters);
      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Movies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse by genre, director, actor, and year
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            resultsCount={!loading && !error ? movies.length : undefined}
          />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState onRetry={loadMovies} />
        ) : movies.length === 0 ? (
          <EmptyState
            title="No movies found"
            message="Try changing filters or clearing search."
            action={{
              label: "Clear Filters",
              onClick: handleClearFilters,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
