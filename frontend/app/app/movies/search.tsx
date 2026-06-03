import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSearchMovies } from '@/hooks/movies/useMovies'
import { MoviesList } from '@/components/Movies/MoviesList'
import GenreSelector from '@/components/GenreSelector'
import PopularitySelector from '@/components/PopularitySelector'

export default function MovieSearchScreen() {
  const router = useRouter()
  const { query, order, genre } = useLocalSearchParams()

  const handleGenreChange = (genreId: number | null) => {
    router.setParams({ genre: genreId ? String(genreId) : '' })
  }

  const handleSortChange = (sort: string) => {
    router.setParams({ order: sort })
  }

  const {
    movies: searchResults,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSearchMovies({
    options: { autoload: true },
    query: String(query || ''),
    order: String(order || 'popularity'),
    genre: genre ? parseInt(String(genre)) : 0,
  })

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <GenreSelector
          selectedGenre={genre ? parseInt(String(genre)) : null}
          onGenreChange={handleGenreChange}
        />
        <PopularitySelector
          selectedSort={String(order || 'popularity')}
          onSortChange={handleSortChange}
        />
      </View>
      <MoviesList
        movieListKey={'search-results'}
        movies={searchResults}
        isLoading={isLoadingSearch}
        error={searchError}
        headerTitle={`Results for "${query}"`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
})
