import type { MovieReference } from "./common";

export interface Director {
  id: number;
  name: string;
  movies?: MovieReference[];
}
