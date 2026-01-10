import FontAwesome from '@expo/vector-icons/FontAwesome'
import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CustomDarkTheme, CustomLightTheme } from '@/constants/Themes'
import { AuthProvider } from '@/contexts/authContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 10000,
      gcTime: 2 * 60 * 1000,
      refetchOnReconnect: true,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movies" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}
