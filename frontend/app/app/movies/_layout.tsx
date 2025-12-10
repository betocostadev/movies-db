import HomeButton from '@/components/HomeButton'
import { Text } from '@/components/Themed'
import { Stack } from 'expo-router'

export default function MoviesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Home',
        headerStyle: { backgroundColor: '#23272f' },
        headerTintColor: '#fff',
        headerLeft: () => <HomeButton pathTo="/" label="Home" />,
      }}
    />
  )
}
