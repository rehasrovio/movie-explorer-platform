import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { MovieFilters } from '@/app/types';
import { api } from '@/app/services/api';

interface FilterBarProps {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
  resultsCount?: number;
}

export function FilterBar({ filters, onFiltersChange, resultsCount }: FilterBarProps) {
  const [genres, setGenres] = useState<Array<{ id: string; name: string }>>([]);
  const [directors, setDirectors] = useState<Array<{ id: string; name: string }>>([]);
  const [actors, setActors] = useState<Array<{ id: string; name: string }>>([]);
  const [years, setYears] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    Promise.all([
      api.getAllGenres(),
      api.getAllDirectors(),
      api.getAllActors(),
      api.getAvailableYears(),
    ]).then(([genresData, directorsData, actorsData, yearsData]) => {
      setGenres(genresData);
      setDirectors(directorsData);
      setActors(actorsData);
      setYears(yearsData);
    });
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchInput || undefined });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleClearFilters = () => {
    setSearchInput('');
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.search ||
    (filters.genreId && filters.genreId !== 'all') ||
    (filters.directorId && filters.directorId !== 'all') ||
    (filters.actorId && filters.actorId !== 'all') ||
    filters.releaseYear;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies by title…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Genre
            </label>
            <select
              value={filters.genreId || 'all'}
              onChange={(e) =>
                onFiltersChange({ ...filters, genreId: e.target.value === 'all' ? undefined : e.target.value })
              }
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="all">All Genres</option>
              {genres?.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Director Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Director
            </label>
            <select
              value={filters.directorId || 'all'}
              onChange={(e) =>
                onFiltersChange({ ...filters, directorId: e.target.value === 'all' ? undefined : e.target.value })
              }
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="all">All Directors</option>
              {directors?.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actor Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Actor
            </label>
            <select
              value={filters.actorId || 'all'}
              onChange={(e) =>
                onFiltersChange({ ...filters, actorId: e.target.value === 'all' ? undefined : e.target.value })
              }
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="all">All Actors</option>
              {actors?.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {actor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Year
            </label>
            <select
              value={filters.releaseYear || 'all'}
              onChange={(e) =>
                onFiltersChange({ ...filters, releaseYear: e.target.value === 'all' ? undefined : Number(e.target.value) })
              }
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              <option value="all">All Years</option>
              {years?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          {resultsCount !== undefined && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{resultsCount}</span> movie{resultsCount !== 1 ? 's' : ''} found
            </p>
          )}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors ml-auto"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
