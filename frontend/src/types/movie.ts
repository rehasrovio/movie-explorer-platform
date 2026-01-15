import type { Director } from "./director";
import type { Genre } from "./genre";
import type { Actor } from "./actor";

export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  rating: number;
  director: Director;
  genres: Genre[];
  actors?: Actor[];
}
