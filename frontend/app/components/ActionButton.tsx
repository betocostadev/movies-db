import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Text } from './Themed'

type ActionButtonProps = {
  buttonStyles?: StyleProp<ViewStyle>
  label: string
  onPressHandler: () => void
  textStyles?: StyleProp<TextStyle>
}

export default function ActionButton({
  buttonStyles,
  label,
  onPressHandler,
  textStyles,
}: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.actionButton, buttonStyles]}
      onPress={onPressHandler}
    >
      <Text style={[styles.actionText, textStyles]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#7bd695',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#060606',
    fontWeight: '600',
    fontSize: 14,
  },
})
