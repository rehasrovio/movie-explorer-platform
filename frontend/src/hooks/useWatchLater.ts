import { useState, useEffect } from "react";
import {
  getWatchLater,
  addToWatchLater,
  removeFromWatchLater,
  isInWatchLater,
} from "../utils/storage";

export const useWatchLater = () => {
  const [watchLaterIds, setWatchLaterIds] = useState<number[]>([]);

  useEffect(() => {
    setWatchLaterIds(getWatchLater());
  }, []);

  const add = (movieId: number) => {
    addToWatchLater(movieId);
    setWatchLaterIds(getWatchLater());
  };

  const remove = (movieId: number) => {
    removeFromWatchLater(movieId);
    setWatchLaterIds(getWatchLater());
  };

  const toggle = (movieId: number) => {
    if (isInWatchLater(movieId)) {
      remove(movieId);
    } else {
      add(movieId);
    }
  };

  const check = (movieId: number) => {
    return isInWatchLater(movieId);
  };

  return {
    watchLaterIds,
    add,
    remove,
    toggle,
    check,
  };
};
