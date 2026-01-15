import { apiClient } from "./client";
import type { PaginatedResponse } from "../types/api";
import type { Genre } from "../types/genre";

export const getGenres = async (): Promise<PaginatedResponse<Genre>> => {
  const response = await apiClient.get<PaginatedResponse<Genre>>("/genres");
  return response.data;
};
