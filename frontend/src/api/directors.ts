import { apiClient } from "./client";
import type { PaginatedResponse } from "../types/api";
import type { Director } from "../types/director";

export const getDirectors = async (): Promise<PaginatedResponse<Director>> => {
  const response = await apiClient.get<PaginatedResponse<Director>>("/directors");
  return response.data;
};

export const getDirectorById = async (id: number): Promise<Director> => {
  const response = await apiClient.get<Director>(`/directors/${id}`);
  return response.data;
};
