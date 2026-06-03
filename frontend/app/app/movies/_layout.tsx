import HomeButton from '@/components/HomeButton'
import { Stack } from 'expo-router'

export default function MoviesStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: '#23272f' },
        headerTintColor: '#fff',
        headerLeft: () => <HomeButton label="Back" />,
      }}
    >
      <Stack.Screen name="[movieId]" options={{ title: 'Movie Details' }} />
      <Stack.Screen name="search" options={{ title: 'Search Results' }} />
    </Stack>
  )
}
