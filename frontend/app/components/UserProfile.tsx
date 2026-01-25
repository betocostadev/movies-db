import { IMovie } from '@/types/movies'
import { Text, View } from './Themed'
import { IUserInfo } from '@/types/user'
import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { MovieCard } from './Movies/MovieCard'
import ActionButton from './ActionButton'

interface UserProfileProps {
  user: IUserInfo
  randomFavorite: IMovie | null
  isLoading: boolean
  onLogout: () => void
  isPending: boolean
}

export const UserProfile = ({
  user,
  randomFavorite,
  isLoading,
  onLogout,
  isPending,
}: UserProfileProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name || 'User'}!</Text>

      {!isLoading && randomFavorite ? (
        <TodaysPick movie={randomFavorite} />
      ) : (
        <NoFavorites />
      )}

      <ActionButton
        buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
        onPressHandler={onLogout}
        label={isPending ? 'Logging out...' : 'Logout'}
      />
    </View>
  )
}

const TodaysPick = ({ movie }: { movie: IMovie }) => (
  <View style={styles.taglineContainer}>
    <Text>Today's pick for you</Text>
    <Text style={styles.tagline}>{movie.tagline}</Text>
    <MovieCard movie={movie} />
  </View>
)

const NoFavorites = () => (
  <View style={{ marginTop: 16, marginBottom: 24 }}>
    <Text style={{ fontSize: 18, marginVertical: 14 }}>No Favorites yet?</Text>
    <View style={{ flexDirection: 'row' }}>
      <Link href={'/'}>
        <Text style={styles.linkText}>Check the latest top movies </Text>
      </Link>
      <Text style={{ fontSize: 16 }}>and add your favorites.</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#b9b2b2',
    fontWeight: '700',
    paddingVertical: 12,
  },
  taglineContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#b3acac',
    paddingLeft: 4,
    paddingTop: 4,
  },
  linkText: {
    fontSize: 16,
    color: '#7bd695',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})
