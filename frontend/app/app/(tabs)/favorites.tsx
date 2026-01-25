import { router } from 'expo-router'
import { Text, View } from '@/components/Themed'
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { MoviesList } from '@/components/Movies/MoviesList'
import { useAuthGuard } from '@/hooks/account/useAuth'
import { useUserFavoriteMovies } from '@/hooks/account/useAccount'

export default function FavoritesScreen() {
  useAuthGuard()

  const { favorites, isLoading, error } = useUserFavoriteMovies()

  const isEmpty =
    !isLoading && !error && Array.isArray(favorites) && favorites.length === 0

  return (
    <View style={styles.container}>
      {error ? (
        <>
          <Text style={styles.errorText}>
            Sorry, there was an error loading your favorites.
          </Text>
          <Pressable onPress={() => router.replace('/')}>
            <Text style={styles.linkText}>Go to Movies</Text>
          </Pressable>
        </>
      ) : isEmpty ? (
        <>
          <Text style={styles.title}>Your favorites</Text>
          <Text style={styles.infoText}>
            You still haven't added any favorites.
          </Text>
          <Pressable onPress={() => router.replace('/')}>
            <Text style={styles.linkText}>Go to Movies</Text>
          </Pressable>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollList}>
          <MoviesList
            movieListKey={'favorites'}
            movies={favorites}
            isLoading={isLoading}
            error={error}
            headerTitle=""
          />
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  scrollList: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  errorText: {
    fontSize: 16,
    color: '#fa4e4e',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  linkText: {
    fontSize: 16,
    color: '#7bd695',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})
