export const accountQueryKeys = {
  all: ['account'],
  current: () => [...accountQueryKeys.all, 'current'] as const,
  favorites: () => [...accountQueryKeys.all, 'favorites'] as const,
  watchlist: () => [...accountQueryKeys.all, 'watchlist'] as const,
}
