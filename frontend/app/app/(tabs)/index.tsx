import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useRandomMovies } from '@/hooks/movies/useMovies'
import { MoviesList } from '@/components/MoviesList'

export default function MoviesScreen() {
  const { movies, isLoading, error } = useRandomMovies()
  console.log(error)
  console.log(isLoading)
  console.log(movies)

  return (
    <View style={styles.container}>
      <MoviesList movies={movies} isLoading={isLoading} error={error} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
