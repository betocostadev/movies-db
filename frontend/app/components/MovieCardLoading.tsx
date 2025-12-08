import { View, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.4
const CARD_HEIGHT = height * 0.35
const CARD_MARGIN = 8
const IMAGE_HEIGHT = CARD_HEIGHT * 0.8

export const MovieCardLoading = () => (
  <View style={styles.cardContainer}>
    <View style={styles.posterSkeleton} />
    <View style={styles.textSkeleton} />
  </View>
)

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 8,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 8,
    backgroundColor: '#eee',
    overflow: 'hidden',
    alignItems: 'center',
  },
  posterSkeleton: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textSkeleton: {
    width: '80%',
    height: 20,
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
})
