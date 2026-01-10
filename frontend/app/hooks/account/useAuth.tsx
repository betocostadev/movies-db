import { useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { useAuth } from '../../contexts/authContext'

export function useAuthGuard() {
  const { user } = useAuth()
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        router.replace('/account')
      }
    }, [user]),
  )
}
