import { StyleSheet } from 'react-native'
import { Text, View } from './Themed'

export default function Badge({ name }: { name: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#292c34',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
})
