import { useState, useEffect } from "react";
import { Genre } from "../../types/genre";
import { Director } from "../../types/director";
import { Actor } from "../../types/actor";
import { getGenres } from "../../api/genres";
import { getDirectors } from "../../api/directors";
import { getActors } from "../../api/actors";

export interface MovieFilters {
  genreId?: number;
  directorId?: number;
  actorId?: number;
  q?: string;
}

interface MovieFiltersProps {
  onFilterChange: (filters: MovieFilters) => void;
}

export const MovieFilters = ({ onFilterChange }: MovieFiltersProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [filters, setFilters] = useState<MovieFilters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [genresRes, directorsRes, actorsRes] = await Promise.all([
          getGenres(),
          getDirectors(),
          getActors(),
        ]);
        setGenres(genresRes.items);
        setDirectors(directorsRes.items);
        setActors(actorsRes.items);
      } catch (error) {
        console.error("Failed to load filters:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  const handleFilterChange = (key: keyof MovieFilters, value: string | number | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value === "" || value === undefined ? undefined : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (loading) {
    return <div className="mb-6">Loading filters...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            value={filters.genreId || ""}
            onChange={(e) =>
              handleFilterChange(
                "genreId",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Director
          </label>
          <select
            value={filters.directorId || ""}
            onChange={(e) =>
              handleFilterChange(
                "directorId",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Directors</option>
            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Actor
          </label>
          <select
            value={filters.actorId || ""}
            onChange={(e) =>
              handleFilterChange(
                "actorId",
                e.target.value ? parseInt(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Actors</option>
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search movies..."
            value={filters.q || ""}
            onChange={(e) => handleFilterChange("q", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};
