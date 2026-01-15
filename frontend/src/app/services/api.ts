import axios from 'axios';
import type { Movie, Actor, Director, Genre, MovieFilters } from '@/app/types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const client = axios.create({
  baseURL: API_BASE_URL,
});

// Backend response types
interface BackendDirectorInfo {
  id: number;
  name: string;
}

interface BackendGenreInfo {
  id: number;
  name: string;
}

interface BackendActorInfo {
  id: number;
  name: string;
}

interface BackendMovieListItem {
  id: number;
  title: string;
  release_year: number;
  rating: number;
  director: BackendDirectorInfo;
  genres: BackendGenreInfo[];
}

interface BackendMovieDetail extends BackendMovieListItem {
  actors: BackendActorInfo[];
}

interface BackendActorListItem {
  id: number;
  name: string;
}

interface BackendActorDetail extends BackendActorListItem {
  movies?: Array<{ id: number; title: string; release_year: number; rating: number }>;
}

interface BackendDirectorDetail {
  id: number;
  name: string;
  movies?: Array<{ id: number; title: string; release_year: number; rating: number }>;
}

interface BackendGenreListItem {
  id: number;
  name: string;
}

// Transform backend response to frontend types
const transformMovie = (movie: BackendMovieListItem | BackendMovieDetail): Movie => ({
  id: movie.id.toString(),
  title: movie.title,
  releaseYear: movie.release_year,
  directorId: movie.director.id.toString(),
  directorName: movie.director.name,
  genreIds: movie.genres.map((g) => g.id.toString()),
  genres: movie.genres.map((g) => g.name),
  rating: movie.rating,
  actorIds: 'actors' in movie ? movie.actors.map((a) => a.id.toString()) : [],
});

const transformActor = (actor: BackendActorListItem | BackendActorDetail): Actor => ({
  id: actor.id.toString(),
  name: actor.name,
  movieCount: 'movies' in actor ? actor.movies?.length || 0 : 0,
});

const transformDirector = (director: BackendDirectorDetail): Director => ({
  id: director.id.toString(),
  name: director.name,
  movieCount: director.movies?.length || 0,
});

const transformGenre = (genre: BackendGenreListItem): Genre => ({
  id: genre.id.toString(),
  name: genre.name,
});

export const api = {
  async getMovies(filters: MovieFilters = {}): Promise<Movie[]> {
    const params: Record<string, string | number> = {};
    
    if (filters.search) params.q = filters.search;
    if (filters.genreId && filters.genreId !== 'all') params.genreId = filters.genreId;
    if (filters.directorId && filters.directorId !== 'all') params.directorId = filters.directorId;
    if (filters.actorId && filters.actorId !== 'all') params.actorId = filters.actorId;
    if (filters.releaseYear) params.releaseYear = filters.releaseYear;

    const response = await client.get('/movies', { params });
    return response.data.items.map(transformMovie);
  },

  async getMovieById(id: string): Promise<Movie | undefined> {
    try {
      const response = await client.get(`/movies/${id}`);
      return transformMovie(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },

  async getActorById(id: string): Promise<Actor | undefined> {
    try {
      const response = await client.get(`/actors/${id}`);
      return transformActor(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },

  async getDirectorById(id: string): Promise<Director | undefined> {
    try {
      const response = await client.get(`/directors/${id}`);
      return transformDirector(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return undefined;
      }
      throw error;
    }
  },

  async getMoviesByActor(actorId: string): Promise<Movie[]> {
    const response = await client.get('/movies', { params: { actorId } });
    return response.data.items.map(transformMovie);
  },

  async getMoviesByDirector(directorId: string): Promise<Movie[]> {
    const response = await client.get('/movies', { params: { directorId } });
    return response.data.items.map(transformMovie);
  },

  async getActorsForMovie(movieId: string): Promise<Actor[]> {
    const movie = await this.getMovieById(movieId);
    if (!movie) return [];
    
    // Get actors from the movie data
    const actors: Actor[] = [];
    for (const actorId of movie.actorIds) {
      const actor = await this.getActorById(actorId);
      if (actor) actors.push(actor);
    }
    return actors;
  },

  async getAllGenres(): Promise<Genre[]> {
    const response = await client.get('/genres');
    return response.data.items.map(transformGenre);
  },

  async getAllDirectors(): Promise<Director[]> {
    const response = await client.get('/directors');
    return response.data.items.map(transformDirector);
  },

  async getAllActors(): Promise<Actor[]> {
    const response = await client.get('/actors');
    return response.data.items.map(transformActor);
  },

  async getAvailableYears(): Promise<number[]> {
    const movies = await this.getMovies();
    const years = [...new Set(movies.map(m => m.releaseYear))];
    return years.sort((a, b) => b - a);
  },
};
