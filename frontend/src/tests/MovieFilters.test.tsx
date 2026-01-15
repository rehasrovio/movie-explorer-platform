import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MovieFilters } from "../components/movies/MovieFilters";
import * as genresAPI from "../api/genres";
import * as directorsAPI from "../api/directors";
import * as actorsAPI from "../api/actors";

vi.mock("../api/genres");
vi.mock("../api/directors");
vi.mock("../api/actors");

describe("MovieFilters", () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(genresAPI.getGenres).mockResolvedValue({
      items: [
        { id: 1, name: "Action" },
        { id: 2, name: "Comedy" },
      ],
      total: 2,
    });

    vi.mocked(directorsAPI.getDirectors).mockResolvedValue({
      items: [
        { id: 1, name: "Director 1" },
        { id: 2, name: "Director 2" },
      ],
      total: 2,
    });

    vi.mocked(actorsAPI.getActors).mockResolvedValue({
      items: [
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ],
      total: 2,
    });
  });

  it("renders filter controls", async () => {
    render(<MovieFilters onFilterChange={mockOnFilterChange} />);

    await waitFor(() => {
      expect(screen.getByLabelText("Genre")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Director")).toBeInTheDocument();
    expect(screen.getByLabelText("Actor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search movies...")).toBeInTheDocument();
  });

  it("triggers API call when changing genre dropdown", async () => {
    render(<MovieFilters onFilterChange={mockOnFilterChange} />);

    await waitFor(() => {
      expect(screen.getByLabelText("Genre")).toBeInTheDocument();
    });

    const genreSelect = screen.getByLabelText("Genre") as HTMLSelectElement;
    genreSelect.value = "1";
    genreSelect.dispatchEvent(new Event("change", { bubbles: true }));

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled();
    });
  });
});
