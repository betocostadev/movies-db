import { IMovie } from '@/types/movies'
import { Text, View } from './Themed'

export function MoviesList({
  movies,
  isLoading,
  error,
}: {
  movies: IMovie[] | undefined
  isLoading: boolean
  error: Error | undefined
}) {
  console.log('Movies component props:')
  console.log(movies)
  console.log(isLoading)
  console.log(error)
  return (
    <View>
      <Text>Movies here</Text>
    </View>
  )
}
