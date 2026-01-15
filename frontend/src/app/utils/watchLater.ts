const WATCH_LATER_KEY = 'movie-explorer-watch-later';

export function getWatchLater(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WATCH_LATER_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addToWatchLater(movieId: string): void {
  const current = getWatchLater();
  if (!current.includes(movieId)) {
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify([...current, movieId]));
    window.dispatchEvent(new CustomEvent('watchLaterUpdated'));
  }
}

export function removeFromWatchLater(movieId: string): void {
  const current = getWatchLater();
  const filtered = current.filter(id => id !== movieId);
  localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('watchLaterUpdated'));
}

export function isInWatchLater(movieId: string): boolean {
  return getWatchLater().includes(movieId);
}

export function toggleWatchLater(movieId: string): boolean {
  const inList = isInWatchLater(movieId);
  if (inList) {
    removeFromWatchLater(movieId);
  } else {
    addToWatchLater(movieId);
  }
  return !inList;
}
