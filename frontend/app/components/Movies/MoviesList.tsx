import { IMovie, TMovieListKey } from '@/types/movies'
import { Text, useThemeColor, View } from '../Themed'
import { FlatList, StyleSheet } from 'react-native'
import { MovieCard } from './MovieCard'
import { MovieCardLoading } from './MovieCardLoading'

export function MoviesList({
  movieListKey,
  movies,
  isLoading,
  error,
  headerTitle,
}: {
  movieListKey: TMovieListKey
  movies: IMovie[] | undefined
  isLoading: boolean
  error: Error | undefined
  headerTitle?: string
}) {
  const skeletonCount = 6
  const titleColor = useThemeColor({}, 'title')

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View style={styles.container}>
      {headerTitle && (
        <Text style={[styles.listHeader, { color: titleColor }]}>
          {headerTitle}
        </Text>
      )}
      <FlatList
        data={isLoading ? Array.from({ length: skeletonCount }) : movies}
        renderItem={({ item, index }) =>
          isLoading ? (
            <MovieCardLoading key={`${movieListKey}-${index}`} />
          ) : (
            <MovieCard movie={item as IMovie} />
          )
        }
        keyExtractor={(item, index) =>
          isLoading
            ? `skeleton-${index}`
            : `${movieListKey}-${String((item as IMovie).id)}`
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
    marginVertical: 12,
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
})
