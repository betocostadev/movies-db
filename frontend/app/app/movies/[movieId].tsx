import { MovieDetails } from '@/components/Movies/MovieDetails'
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
      <View style={styles.header}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.tagline}>{movie.tagline}</Text>
      </View>
      <MovieDetails
        language={movie.language}
        popularity={movie.popularity}
        poster_url={movie.poster_url}
        release_year={movie.release_year}
        score={movie.score}
        onAddToFavorites={() => {}}
        onAddToWatchList={() => {}}
      />
      <Text style={styles.overview}>{movie.overview}</Text>
      {movie.trailer_url && (
        <View style={{ padding: 10 }}>
          <YoutubeEmbed url={movie.trailer_url} />
        </View>
      )}
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
  header: {
    marginBottom: 10,
    padding: 4,
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
    fontSize: 15,
    marginTop: 6,
    marginBottom: 10,
    padding: 6,
    lineHeight: 24,
  },
})
