import { Text, View } from '@/components/Themed'
import { useAuthGuard } from '@/hooks/account/useAuth'
import { StyleSheet } from 'react-native'

export default function WatchlistScreen() {
  useAuthGuard()

  return (
    <View style={styles.container}>
      <Text>Watchlist</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
