import { useState, useCallback } from 'react'

export interface SearchFiltersState {
  searchInput: string
  selectedOrder: string
  selectedGenre: number | null
}

export interface UseSearchFiltersReturn extends SearchFiltersState {
  setSearchInput: (input: string) => void
  setSelectedOrder: (order: string) => void
  setSelectedGenre: (genre: number | null) => void
  reset: () => void
}

const DEFAULT_ORDER = 'popularity'
const DEFAULT_GENRE = null

export const useSearchFilters = (
  initialQuery: string = '',
  initialOrder: string = DEFAULT_ORDER,
  initialGenre: number | null = DEFAULT_GENRE,
): UseSearchFiltersReturn => {
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [selectedOrder, setSelectedOrder] = useState(initialOrder)
  const [selectedGenre, setSelectedGenre] = useState(initialGenre)

  const reset = useCallback(() => {
    setSearchInput('')
    setSelectedOrder(DEFAULT_ORDER)
    setSelectedGenre(DEFAULT_GENRE)
  }, [])

  return {
    searchInput,
    setSearchInput,
    selectedOrder,
    setSelectedOrder,
    selectedGenre,
    setSelectedGenre,
    reset,
  }
}
