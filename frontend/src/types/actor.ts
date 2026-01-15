import { MovieReference } from "./common";

export interface Actor {
  id: number;
  name: string;
  movies?: MovieReference[];
}
