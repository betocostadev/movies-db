import { Text, View } from '@/components/Themed'
import { useMovie } from '@/hooks/movies/useMovies'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'

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

  return (
    <View>
      <Text>Movie Screen</Text>
      <Text>Movie ID: {movieId}</Text>
    </View>
  )
}
