import { ScrollView, StyleSheet } from 'react-native'
import { useRandomMovies, useTopMovies } from '@/hooks/movies/useMovies'
import { MoviesList } from '@/components/Movies/MoviesList'

export default function MoviesScreen() {
  const {
    movies: randomMovies,
    isLoading: isLoadingRandomMovies,
    error: randomMoviesError,
  } = useRandomMovies()
  const {
    movies: topMovies,
    isLoading: isLoadingTopMovies,
    error: topMoviesError,
  } = useTopMovies()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MoviesList
        movieListKey={'random-movies'}
        movies={randomMovies}
        isLoading={isLoadingRandomMovies}
        error={randomMoviesError}
        headerTitle="Pick a something to watch"
      />
      <MoviesList
        movieListKey={'random-movies'}
        movies={topMovies}
        isLoading={isLoadingTopMovies}
        error={topMoviesError}
        headerTitle="Top Movies"
      />
    </ScrollView>
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
