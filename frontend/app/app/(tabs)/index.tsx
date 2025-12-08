import { StyleSheet } from 'react-native'
import { View } from '@/components/Themed'
import { useRandomMovies } from '@/hooks/movies/useMovies'
import { MoviesList } from '@/components/MoviesList'

export default function MoviesScreen() {
  const { movies, isLoading, error } = useRandomMovies()

  return (
    <View style={styles.container}>
      <MoviesList
        movies={movies}
        isLoading={isLoading}
        error={error}
        headerTitle="Pick a something to watch"
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
