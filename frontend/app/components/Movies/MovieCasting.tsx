import { TMovieCasting } from '@/types/movies'
import { Text, View } from '../Themed'
import { Dimensions, Image, StyleSheet } from 'react-native'

const CARD_WIDTH = 160
const CARD_HEIGHT = 60

export default function MovieCasting({
  cast,
}: {
  cast: TMovieCasting[] | null
}) {
  if (!cast?.length) return null
  return (
    <View style={styles.container}>
      {cast.map((cast) => (
        <View key={cast.id} style={styles.card}>
          {cast.image_url ? (
            <Image
              source={{ uri: cast.image_url || '' }}
              resizeMode="cover"
              style={styles.actorImg}
            />
          ) : (
            <View style={styles.actorImg} />
          )}
          <Text style={styles.fullName}>
            {cast.first_name} {cast.last_name}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 12,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#2c2f37',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actorImg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#444',
    marginRight: 10,
  },
  fullName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    flexShrink: 1,
  },
})
