import LoginForm from '@/components/LoginForm'
import RegisterForm from '@/components/RegisterForm'
import { AuthCard } from '@/components/Auth/AuthCard'
import { useAccountScreen } from '@/hooks/account/useAccountScreen'
import { UserProfile } from '@/components/UserProfile'

export default function AccountScreen() {
  const { mode, setMode, user, favorites, isLoading, handleLogout, isPending } =
    useAccountScreen()

  const getRandomFavorite = (favorites: any[]) => {
    if (!favorites || favorites.length === 0) return null
    const idx = Math.floor(Math.random() * favorites.length)
    return favorites[idx]
  }

  if (mode === 'register') {
    return (
      <AuthCard mode="register" onModeChange={setMode}>
        <RegisterForm />
      </AuthCard>
    )
  }

  if (mode === 'login') {
    return (
      <AuthCard mode="login" onModeChange={setMode}>
        <LoginForm />
      </AuthCard>
    )
  }

  const randomFavorite = favorites ? getRandomFavorite(favorites) : null
  return user ? (
    <UserProfile
      user={user}
      randomFavorite={randomFavorite}
      isLoading={isLoading}
      onLogout={handleLogout}
      isPending={isPending}
    />
  ) : null
}
