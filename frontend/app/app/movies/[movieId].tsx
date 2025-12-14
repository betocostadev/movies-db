import Badge from '@/components/Badge'
import { MovieCardLoading } from '@/components/Movies/MovieCardLoading'
import MovieCasting from '@/components/Movies/MovieCasting'
import { MovieDetails } from '@/components/Movies/MovieDetails'
import YoutubeEmbed from '@/components/Movies/YoutubeEmbed'
import Skeleton from '@/components/Skeleton'
import { Text, View } from '@/components/Themed'
import { useMovie } from '@/hooks/movies/useMovies'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

export default function MovieScreen() {
  const { movieId } = useLocalSearchParams()
  const navigation = useNavigation()
  const { movie, isLoading, error } = useMovie({
    options: {},
    id: movieId as string,
  })

  const movieTitle = movie?.title || 'Movie'

  useEffect(() => {
    navigation.setOptions({
      title: movieTitle,
      headerBackTitle: 'Home',
    })
  }, [navigation, movieTitle])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Skeleton width="50%" height={22} />
        <Skeleton width="100%" height={22} />
        <MovieCardLoading />
        <Skeleton width="100%" height={100} />
      </View>
    )
  }

  if (!movie || error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>
          Sorry, there was a problem loading the movie.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
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
      {movie.genres?.length && (
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}
        >
          {movie.genres.map(({ id, name }) => (
            <Badge key={String(`genre-${id}`)} name={name} />
          ))}
        </View>
      )}
      {movie.trailer_url && (
        <View style={{ padding: 10 }}>
          <Text style={styles.trailers}>Trailers</Text>
          <YoutubeEmbed url={movie.trailer_url} />
        </View>
      )}
      {movie.casting?.length && (
        <View>
          <Text style={styles.castingTitle}>Casting</Text>
          <MovieCasting cast={movie.casting} />
        </View>
      )}
    </ScrollView>
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
    fontSize: 20,
    color: '#b9b2b2',
    fontWeight: '700',
    paddingLeft: 4,
  },
  tagline: {
    fontSize: 18,
    color: '#b3acac',
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
  trailers: {
    fontSize: 18,
    color: '#c8c0c0',
    marginBottom: 12,
  },
  castingTitle: {
    fontSize: 18,
    color: '#c8c0c0',
    marginVertical: 10,
  },
})
