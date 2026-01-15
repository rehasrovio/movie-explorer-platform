import { Director } from "./director";
import { Genre } from "./genre";
import { Actor } from "./actor";

export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  rating: number;
  director: Director;
  genres: Genre[];
  actors?: Actor[];
}
