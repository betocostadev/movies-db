import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { useRandomMovies, useTopMovies } from '@/hooks/movies/useMovies'
import { MoviesList } from '@/components/MoviesList'

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
    <View style={styles.container}>
      <MoviesList
        movies={randomMovies}
        isLoading={isLoadingRandomMovies}
        error={randomMoviesError}
        headerTitle="Pick a something to watch"
      />
      <MoviesList
        movies={topMovies}
        isLoading={isLoadingTopMovies}
        error={topMoviesError}
        headerTitle="Top Movies"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
