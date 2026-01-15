import { apiClient } from "./client";
import { PaginatedResponse } from "../types/api";
import { Actor } from "../types/actor";

export interface GetActorsParams {
  movieId?: number;
  genreId?: number;
}

export const getActors = async (
  params?: GetActorsParams
): Promise<PaginatedResponse<Actor>> => {
  const response = await apiClient.get<PaginatedResponse<Actor>>("/actors", {
    params,
  });
  return response.data;
};

export const getActorById = async (id: number): Promise<Actor> => {
  const response = await apiClient.get<Actor>(`/actors/${id}`);
  return response.data;
};
