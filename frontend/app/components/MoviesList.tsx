import { IMovie } from '@/types/movies'
import { Text, View } from './Themed'
import { FlatList, StyleSheet } from 'react-native'
import { MovieCard } from './MovieCard'
import { MovieCardLoading } from './MovieCardLoading'

export function MoviesList({
  movies,
  isLoading,
  error,
  headerTitle,
}: {
  movies: IMovie[] | undefined
  isLoading: boolean
  error: Error | undefined
  headerTitle?: string
}) {
  console.log('Movies component props:')
  console.log(movies)
  console.log(isLoading)
  console.log(error)

  const skeletonCount = 6

  return (
    <View style={styles.container}>
      {headerTitle && <Text style={styles.listHeader}>{headerTitle}</Text>}
      <FlatList
        data={isLoading ? Array.from({ length: skeletonCount }) : movies}
        renderItem={({ item, index }) =>
          isLoading ? (
            <MovieCardLoading key={`randMovie-${index}`} />
          ) : (
            <MovieCard movie={item as IMovie} />
          )
        }
        keyExtractor={(item, index) =>
          isLoading ? `rand-skeleton-${index}` : String((item as IMovie).id)
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 12,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
})
