import ActionButton from '@/components/ActionButton'
import LoginForm from '@/components/LoginForm'
import { Text, useThemeColor, View } from '@/components/Themed'
import { useLogout, useUserData } from '@/hooks/account/useAccount'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

export default function AccountScreen() {
  const [mode, setMode] = useState<'register' | 'login' | 'user'>('user')
  const cardBackground = useThemeColor({}, 'cardBackground')
  const router = useRouter()
  const { logout: handleLogout, isPending } = useLogout(() =>
    router.replace('/'),
  )

  const {
    user: userData,
    isLoading: isLoadingUser,
    error: userDataError,
  } = useUserData()

  console.log('User data: ', userData)
  console.log('Loading: ', isLoadingUser)
  console.log('Error? ', userDataError?.message)

  useEffect(() => {
    if (userDataError?.message === 'UNAUTHORIZED') {
      console.log('User not logged in!')
      setMode('login')
    } else if (userData) {
      setMode('user')
    } else if (userDataError) {
      setMode('login')
    }
  }, [userData, userDataError])

  if (mode === 'register') {
    return (
      <View>
        <Text style={styles.title}>Register a new account</Text>
      </View>
    )
  }

  if (mode === 'login') {
    return (
      <View style={styles.container}>
        <View style={[{ backgroundColor: cardBackground }, styles.card]}>
          <LoginForm />
          <Text>If you don't have an account, please: REGISTER HERE</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData?.name || 'User'}!</Text>
      {/* Add more user info here */}
      <ActionButton
        buttonStyles={{ paddingHorizontal: 20, marginBottom: 10 }}
        onPressHandler={handleLogout}
        label={isPending ? 'Logging out...' : 'Logout'}
      />
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
})
