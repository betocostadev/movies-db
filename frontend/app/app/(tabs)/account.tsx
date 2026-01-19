import ActionButton from '@/components/ActionButton'
import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { Text, useThemeColor, View } from '@/components/Themed'
import { useAuth } from '@/contexts/authContext'
import { useLogout, useUserFavoriteMovies } from '@/hooks/account/useAccount'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { MovieCard } from '@/components/Movies/MovieCard'

export default function AccountScreen() {
  const [mode, setMode] = useState<'register' | 'login' | 'user'>('login')
  const cardBackground = useThemeColor({}, 'cardBackground')
  const router = useRouter()
  const { logout: handleLogout, isPending } = useLogout(() =>
    router.replace('/'),
  )
  const { user } = useAuth()
  const { favorites, isLoading } = useUserFavoriteMovies()

  const handleModeRegister = useCallback(() => setMode('register'), [])
  const handleModeLogin = useCallback(() => setMode('login'), [])

  const getRandomFavorite = (favorites: any[]) => {
    if (!favorites || favorites.length === 0) return null
    const idx = Math.floor(Math.random() * favorites.length)
    return favorites[idx]
  }

  useEffect(() => {
    if (!user) {
      setMode('login')
    } else {
      setMode('user')
    }
  }, [user])

  if (mode === 'register') {
    return (
      <View style={styles.container}>
        <View style={[{ backgroundColor: cardBackground }, styles.card]}>
          <RegisterForm />
          <View
            style={[
              { backgroundColor: cardBackground },
              styles.registerPromptContainer,
            ]}
          >
            <Text style={styles.registerPromptText}>Have an account?</Text>
            <View
              style={[{ backgroundColor: cardBackground }, styles.registerRow]}
            >
              <Text style={styles.registerPromptText}>Please </Text>
              <TouchableOpacity onPress={handleModeLogin}>
                <Text style={styles.registerLink}>LOGIN HERE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  if (mode === 'login') {
    return (
      <View style={styles.container}>
        <View style={[{ backgroundColor: cardBackground }, styles.card]}>
          <LoginForm />
          <View
            style={[
              { backgroundColor: cardBackground },
              styles.registerPromptContainer,
            ]}
          >
            <Text style={styles.registerPromptText}>
              If you still don't have an account
            </Text>
            <View
              style={[{ backgroundColor: cardBackground }, styles.registerRow]}
            >
              <Text style={styles.registerPromptText}>Please </Text>
              <TouchableOpacity onPress={handleModeRegister}>
                <Text style={styles.registerLink}>REGISTER HERE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const randomFavorite = favorites ? getRandomFavorite(favorites) : null
  return (
    <View style={styles.container}>
      {/* Add more user info here */}
      {user && (
        <>
          <Text style={styles.title}>Welcome, {user.name || 'User'}!</Text>
          {!isLoading && randomFavorite && (
            <View style={styles.taglineContainer}>
              <Text>Today's pick for you</Text>
              <Text style={styles.tagline}>{randomFavorite.tagline}</Text>
              <MovieCard movie={randomFavorite} />
            </View>
          )}
          {!randomFavorite && (
            <View style={{ marginTop: 16, marginBottom: 24 }}>
              <Text style={{ fontSize: 18, marginVertical: 14 }}>
                No Favorites yet?
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Link href={'/'}>
                  <Text style={styles.linkText}>
                    Check the latest top movies{' '}
                  </Text>
                </Link>
                <Text style={{ fontSize: 16 }}>and add your favorites.</Text>
              </View>
            </View>
          )}

          <ActionButton
            buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
            onPressHandler={handleLogout}
            label={isPending ? 'Logging out...' : 'Logout'}
          />
        </>
      )}
    </View>
  )
}

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
  card: {
    width: '94%',
    marginVertical: 8,
    marginHorizontal: 12,
    paddingHorizontal: 2,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formInputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 2,
    width: '80%',
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: '#e4e4e4',
    width: '100%',
    padding: 8,
    borderRadius: 4,
  },
  actionButton: {
    backgroundColor: '#7bd695',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#060606',
    fontWeight: '600',
    fontSize: 14,
  },
  registerPromptContainer: {
    marginTop: 28,
    alignItems: 'center',
  },
  registerPromptText: {
    color: '#b9b2b2',
    fontSize: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  registerLink: {
    color: '#7bd695',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
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
