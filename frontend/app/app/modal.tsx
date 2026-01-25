import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet } from 'react-native'

import { Text, View } from '@/components/Themed'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Got a favorite?</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={{ padding: 16 }}>
        <Text>A simple React Native App using a backend created with Go.</Text>
        <Text>Made by Beto Costa</Text>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
})
