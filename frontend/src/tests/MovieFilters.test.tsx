import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { FilterBar } from "../app/components/FilterBar";
import * as apiService from "../app/services/api";

vi.mock("../app/services/api");

describe("FilterBar", () => {
  const mockOnFiltersChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiService.api.getAllGenres).mockResolvedValue([
      { id: "1", name: "Action" },
      { id: "2", name: "Comedy" },
    ]);

    vi.mocked(apiService.api.getAllDirectors).mockResolvedValue([
      { id: "1", name: "Director 1" },
      { id: "2", name: "Director 2" },
    ]);

    vi.mocked(apiService.api.getAllActors).mockResolvedValue([
      { id: "1", name: "Actor 1" },
      { id: "2", name: "Actor 2" },
    ]);

    vi.mocked(apiService.api.getAvailableYears).mockResolvedValue([2020, 2021, 2022]);
  });

  it("renders filter controls", async () => {
    render(<FilterBar filters={{}} onFiltersChange={mockOnFiltersChange} />);

    await waitFor(() => {
      expect(screen.getByText("Genre")).toBeInTheDocument();
    });

    expect(screen.getByText("Director")).toBeInTheDocument();
    expect(screen.getByText("Actor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search movies by title…")).toBeInTheDocument();
  });
});
