export const accountQueryKeys = {
  all: ['account'],
  current: () => [...accountQueryKeys.all, 'current'] as const,
}
