import { Text, View } from '../Themed'
import YoutubePlayer from 'react-native-youtube-iframe'

function getYoutubeId(url: string) {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : ''
}

export default function YoutubeEmbed({ url }: { url: string | undefined }) {
  if (!url) return <Text>Error loading video URL.</Text>
  const videoId = getYoutubeId(url)
  return (
    <View style={{ aspectRatio: 16 / 9, width: '100%' }}>
      <YoutubePlayer height={220} play={false} videoId={videoId} />
    </View>
  )
}
