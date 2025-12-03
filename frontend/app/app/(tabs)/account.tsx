import { Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>My Account</Text>
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
