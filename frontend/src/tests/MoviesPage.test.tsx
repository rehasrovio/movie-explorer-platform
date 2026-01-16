import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MoviesPage } from "../app/pages/MoviesPage";
import * as apiService from "../app/services/api";

vi.mock("../app/services/api");

describe("MoviesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock FilterBar API calls
    vi.mocked(apiService.api.getAllGenres).mockResolvedValue([]);
    vi.mocked(apiService.api.getAllDirectors).mockResolvedValue([]);
    vi.mocked(apiService.api.getAllActors).mockResolvedValue([]);
    vi.mocked(apiService.api.getAvailableYears).mockResolvedValue([]);
  });

  it("renders heading", async () => {
    vi.mocked(apiService.api.getMovies).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <MoviesPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Explore Movies")).toBeInTheDocument();
  });

  it("renders empty state when API returns empty list", async () => {
    vi.mocked(apiService.api.getMovies).mockResolvedValue([]);

    render(
      <BrowserRouter>
        <MoviesPage />
      </BrowserRouter>
    );

    // Wait for loading to finish and empty state to appear
    await waitFor(
      () => {
        expect(screen.getByText("No movies found")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
