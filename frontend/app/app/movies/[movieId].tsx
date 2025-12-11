import YoutubeEmbed from '@/components/Movies/YoutubeEmbed'
import { Text, View } from '@/components/Themed'
import { useMovie } from '@/hooks/movies/useMovies'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'

export default function MovieScreen() {
  const { movieId } = useLocalSearchParams()
  const navigation = useNavigation()
  const { movie, isLoading, error } = useMovie({
    options: {},
    id: movieId as string,
  })

  const movieTitle = movie?.title || 'Movie'
  console.log('=== MOVIES SCREEN ===')
  console.log('Is loading ?', isLoading)
  console.log('Error ?', error)
  console.log(movie)

  useEffect(() => {
    navigation.setOptions({
      title: movieTitle,
      headerBackTitle: 'Home',
    })
  }, [navigation, movieTitle])

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>
          Sorry, there was a problem loading the movie.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.tagline}>{movie.tagline}</Text>
      {movie.trailer_url && <YoutubeEmbed url={movie.trailer_url} />}
      <Text style={styles.overview}>{movie.overview}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: 20,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: '400',
  },
  container: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    color: '#ada7a7',
    fontWeight: '700',
    paddingLeft: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#ada7a7',
    paddingLeft: 4,
    paddingTop: 4,
  },
  overview: {
    fontSize: 14,
    marginTop: 8,
    padding: 6,
    lineHeight: 24,
  },
})
