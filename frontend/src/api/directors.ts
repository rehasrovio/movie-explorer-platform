import { apiClient } from "./client";
import { PaginatedResponse } from "../types/api";
import { Director } from "../types/director";

export const getDirectors = async (): Promise<PaginatedResponse<Director>> => {
  const response = await apiClient.get<PaginatedResponse<Director>>("/directors");
  return response.data;
};

export const getDirectorById = async (id: number): Promise<Director> => {
  const response = await apiClient.get<Director>(`/directors/${id}`);
  return response.data;
};
