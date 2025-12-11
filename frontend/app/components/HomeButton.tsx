import { RelativePathString, useRouter } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from '@/components/Themed'
import { MaterialIcons } from '@expo/vector-icons'

export default function HomeButton({
  pathTo,
  label,
}: {
  pathTo: string
  label: string
}) {
  const router = useRouter()
  return (
    <Pressable
      onPress={() => router.replace(pathTo as RelativePathString)}
      style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}
    >
      <MaterialIcons name="arrow-back-ios" size={22} color="#fff" />
      <Text
        style={{ color: '#fff', fontSize: 16, marginLeft: 2, paddingRight: 10 }}
      >
        {label}
      </Text>
    </Pressable>
  )
}
