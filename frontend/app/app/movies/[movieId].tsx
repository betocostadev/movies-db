import Badge from '@/components/Badge'
import { MovieCardLoading } from '@/components/Movies/MovieCardLoading'
import MovieCasting from '@/components/Movies/MovieCasting'
import { MovieDetails } from '@/components/Movies/MovieDetails'
import YoutubeEmbed from '@/components/Movies/YoutubeEmbed'
import Skeleton from '@/components/Skeleton'
import { Text, View } from '@/components/Themed'
import { useAuth } from '@/contexts/authContext'
import {
  useSaveToCollection,
  useUserWatchlistMovies,
} from '@/hooks/account/useAccount'
import { useMovie } from '@/hooks/movies/useMovies'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import { useUserFavoriteMovies } from '@/hooks/account/useAccount'

export default function MovieScreen() {
  const { movieId } = useLocalSearchParams()
  const navigation = useNavigation()
  const { user } = useAuth()
  const { movie, isLoading, error } = useMovie({
    options: {},
    id: movieId as string,
  })

  const {
    favorites,
    isLoading: isFavoritesLoading,
    error: favoritesError,
    refresh: refreshFavorites,
  } = useUserFavoriteMovies()

  const {
    watchlist,
    isLoading: isWatchlistLoading,
    error: watchlistError,
    refresh: refreshWatchlist,
  } = useUserWatchlistMovies()

  const {
    saveToCollection,
    isPending,
    isError,
    error: collectionError,
  } = useSaveToCollection()

  const handleAddToFavorites = async () => {
    const id = Number(movieId)

    try {
      await saveToCollection({ id, collection: 'favorite' })
      refreshFavorites()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToWatchlist = async () => {
    const id = Number(movieId)

    try {
      await saveToCollection({ id, collection: 'watchlist' })
      refreshWatchlist()
    } catch (error) {
      console.log(error)
    }
  }

  const [localError, setLocalError] = useState<string | null>(null)

  useEffect(() => {
    let errorMsg: string | null = null

    if (isError && collectionError) {
      errorMsg =
        typeof collectionError === 'string'
          ? collectionError
          : collectionError.message || 'An error occurred'
    } else if (favoritesError) {
      errorMsg =
        typeof favoritesError === 'string'
          ? favoritesError
          : favoritesError.message || 'An error occurred'
    } else if (watchlistError) {
      errorMsg =
        typeof watchlistError === 'string'
          ? watchlistError
          : watchlistError.message || 'An error occurred'
    }

    if (errorMsg) {
      setLocalError(errorMsg)
      const timer = setTimeout(() => setLocalError(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [isError, collectionError, favoritesError, watchlistError])

  const movieTitle = movie?.title || 'Movie'

  const isFavorite = useMemo(() => {
    if (Array.isArray(favorites) && favorites?.length) {
      return favorites.some((m) => m.id === Number(movieId))
    }
    return false
  }, [favorites, movieId])

  const inWatchlist = useMemo(() => {
    if (Array.isArray(watchlist) && watchlist.length) {
      return watchlist.some((m) => m.id === Number(movieId))
    }
    return false
  }, [watchlist, movieId])

  const showActivityIndicator =
    isPending || (!!user && (isFavoritesLoading || isWatchlistLoading))

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
        onAddToFavorites={handleAddToFavorites}
        onAddToWatchList={handleAddToWatchlist}
        isFavorite={isFavorite}
        inWatchlist={inWatchlist}
      />
      {showActivityIndicator && (
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
          <ActivityIndicator size="small" color="#b9b2b2" />
        </View>
      )}
      {localError && (
        <View style={{ alignItems: 'center', marginVertical: 8 }}>
          <Text style={{ color: 'red', fontWeight: '600' }}>{localError}</Text>
        </View>
      )}
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
