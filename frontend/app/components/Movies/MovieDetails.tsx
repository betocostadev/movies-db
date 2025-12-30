import { StyleSheet, Dimensions, Image } from 'react-native'
import { Text, useThemeColor, View } from '../Themed'
import ActionButton from '../ActionButton'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.9
const CARD_HEIGHT = 220

export const MovieDetails = ({
  language,
  popularity,
  poster_url,
  release_year,
  score,
  onAddToFavorites,
  onAddToWatchList,
}: {
  language: string
  popularity: number
  poster_url: string | undefined
  release_year: number | undefined
  score: number | undefined
  onAddToFavorites: () => void
  onAddToWatchList: () => void
}) => {
  const poster = { uri: poster_url }
  const cardBackground = useThemeColor({}, 'cardBackground')

  return (
    <View style={[styles.cardContainer, { backgroundColor: cardBackground }]}>
      <Image source={poster} resizeMode="cover" style={styles.posterImg} />
      <View
        style={[styles.detailsContainer, { backgroundColor: cardBackground }]}
      >
        <View style={[styles.detailRow, { backgroundColor: cardBackground }]}>
          <Text style={styles.label}>Release Year:</Text>
          <Text style={styles.value}>{release_year}</Text>
        </View>
        <View style={[styles.detailRow, { backgroundColor: cardBackground }]}>
          <Text style={styles.label}>Score:</Text>
          <Text style={styles.value}>{score} / 10</Text>
        </View>
        <View style={[styles.detailRow, { backgroundColor: cardBackground }]}>
          <Text style={styles.label}>Language:</Text>
          <Text style={styles.value}>{language}</Text>
        </View>
        <View style={[styles.detailRow, { backgroundColor: cardBackground }]}>
          <Text style={styles.label}>Popularity:</Text>
          <Text style={styles.value}>
            {popularity ? popularity.toFixed(2) : 'Not rated'}
          </Text>
        </View>
        <View style={[styles.actionsRow, { backgroundColor: cardBackground }]}>
          <ActionButton
            label="Add to Favorites"
            onPressHandler={onAddToFavorites}
          />
          <ActionButton
            label="Add to Watchlist"
            onPressHandler={onAddToWatchList}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    marginVertical: 16,
    alignSelf: 'center',
  },
  posterImg: {
    width: '40%',
    height: '100%',
    backgroundColor: '#222d2a',
  },
  detailsContainer: {
    width: '60%',
    padding: 16,
    backgroundColor: '#222d2a',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#222d2a',
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#e9e9e9',
    width: 90,
    flexShrink: 1,
  },
  value: {
    fontWeight: 'bold',
    color: '#fff',
  },
  actionsRow: {
    marginTop: 10,
    flexDirection: 'column',
  },
})
