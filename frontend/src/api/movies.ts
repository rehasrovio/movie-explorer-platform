import { apiClient } from "./client";
import type { PaginatedResponse } from "../types/api";
import type { Movie } from "../types/movie";

export interface GetMoviesParams {
  genreId?: number;
  directorId?: number;
  actorId?: number;
  releaseYear?: number;
  q?: string;
}

export const getMovies = async (
  params?: GetMoviesParams
): Promise<PaginatedResponse<Movie>> => {
  const response = await apiClient.get<PaginatedResponse<Movie>>("/movies", {
    params,
  });
  return response.data;
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await apiClient.get<Movie>(`/movies/${id}`);
  return response.data;
};
