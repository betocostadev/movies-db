import { IMovie } from '@/types/movies'
import { Text, View } from './Themed'
import { StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = width * 0.4
const CARD_HEIGHT = height * 0.35
const CARD_MARGIN = 8
const IMAGE_HEIGHT = CARD_HEIGHT * 0.9

export const MovieCard = ({ movie }: { movie: IMovie }) => {
  const poster = { uri: movie.poster_url }
  const router = useRouter()

  const goToMovieScreen = () => {
    router.push({
      pathname: '/movies/[movieId]',
      params: { movieId: String(movie.id) },
    })
  }

  return (
    <TouchableOpacity onPress={goToMovieScreen} style={styles.cardContainer}>
      {/* <View style={styles.cardContainer}> */}
      <Image source={poster} resizeMode="cover" style={styles.posterImg} />
      <Text style={styles.title}>
        {movie.title} ({movie.release_year})
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginVertical: 8,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  posterImg: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 10,
    fontWeight: '500',
    paddingHorizontal: 6,
  },
})
