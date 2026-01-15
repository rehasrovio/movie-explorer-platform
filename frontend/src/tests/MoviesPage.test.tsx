import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MoviesPage } from "../pages/MoviesPage";
import * as moviesAPI from "../api/movies";

vi.mock("../api/movies");

describe("MoviesPage", () => {
  it("renders heading", async () => {
    vi.mocked(moviesAPI.getMovies).mockResolvedValue({
      items: [],
      total: 0,
    });

    render(
      <BrowserRouter>
        <MoviesPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  it("renders empty state when API returns empty list", async () => {
    vi.mocked(moviesAPI.getMovies).mockResolvedValue({
      items: [],
      total: 0,
    });

    render(
      <BrowserRouter>
        <MoviesPage />
      </BrowserRouter>
    );

    // Wait for loading to finish
    await screen.findByText("No movies found");
    expect(screen.getByText("No movies found")).toBeInTheDocument();
  });
});
