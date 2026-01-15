const WATCH_LATER_KEY = "watchLater";

export const getWatchLater = (): number[] => {
  const stored = localStorage.getItem(WATCH_LATER_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToWatchLater = (movieId: number): void => {
  const watchLater = getWatchLater();
  if (!watchLater.includes(movieId)) {
    watchLater.push(movieId);
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(watchLater));
  }
};

export const removeFromWatchLater = (movieId: number): void => {
  const watchLater = getWatchLater();
  const updated = watchLater.filter((id) => id !== movieId);
  localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
};

export const isInWatchLater = (movieId: number): boolean => {
  return getWatchLater().includes(movieId);
};
