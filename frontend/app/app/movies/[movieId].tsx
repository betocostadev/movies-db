import { Text, View } from '@/components/Themed'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react'

export default function MovieScreen() {
  const { movieId } = useLocalSearchParams()
  const navigation = useNavigation()

  const movieTitle = 'Movie Name'

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
