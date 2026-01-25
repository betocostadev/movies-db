import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useLogout, useUserFavoriteMovies } from './useAccount'
import { useAuth } from '@/contexts/authContext'

export const useAccountScreen = () => {
  const [mode, setMode] = useState<'register' | 'login' | 'user'>('login')
  const router = useRouter()
  const { logout: handleLogout, isPending } = useLogout(() =>
    router.replace('/'),
  )
  const { user } = useAuth()
  const { favorites, isLoading } = useUserFavoriteMovies()

  useEffect(() => {
    setMode(!user ? 'login' : 'user')
  }, [user])

  return { mode, setMode, user, favorites, isLoading, handleLogout, isPending }
}
