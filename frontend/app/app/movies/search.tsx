import { StyleSheet } from 'react-native'
import { Text, View } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { useSearchMovies, useGenres } from '@/hooks/movies/useMovies'
import { useEffect } from 'react'
import { MoviesList } from '@/components/Movies/MoviesList'

export default function MovieSearchScreen() {
  const { query, order, genre } = useLocalSearchParams()
  const { genres, isLoading: isLoadingGenres, error: genresError } = useGenres()

  useEffect(() => {
    console.log('=== SEARCH SCREEN PARAMS ===')
    console.log('query:', query)
    console.log('order:', order)
    console.log('genre:', genre)
  }, [query, order, genre])

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

  useEffect(() => {
    console.log('=== SEARCH RESULTS ===')
    console.log('isLoading:', isLoadingSearch)
    console.log('error:', searchError)
    console.log('results count:', searchResults?.length || 0)
    console.log('results:', searchResults)
  }, [searchResults, isLoadingSearch, searchError])

  console.log('Is loading genres? ', isLoadingGenres)
  console.log('Genres error? ', genresError)
  console.log('Genres:')
  console.log(genres)

  return (
    <View style={styles.container}>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
})
