import { useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { useAuth } from '../../contexts/authContext'

export function useAuthGuard() {
  const { user } = useAuth()
  const router = useRouter()
  console.log('Auth guard')
  console.log('User? ', user)

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        router.replace('/account')
      }
    }, [user]),
  )
}
