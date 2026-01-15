export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  directorId: string;
  directorName: string;
  genreIds: string[];
  genres: string[];
  rating: number;
  actorIds: string[];
}

export interface Actor {
  id: string;
  name: string;
  movieCount: number;
}

export interface Director {
  id: string;
  name: string;
  movieCount: number;
}

export interface Genre {
  id: string;
  name: string;
}

export interface MovieFilters {
  search?: string;
  genreId?: string;
  directorId?: string;
  actorId?: string;
  releaseYear?: number;
}
