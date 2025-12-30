import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Text } from './Themed'
import { FontSizes } from '@/constants/ThemeValues'
import { useThemeColor } from './Themed'

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
  const backgroundColor = useThemeColor({}, 'btnPrimaryBackground')
  const textColor = useThemeColor({}, 'btnPrimaryText')

  return (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor }, buttonStyles]}
      onPress={onPressHandler}
    >
      <Text
        style={[
          styles.actionText,
          { color: textColor, fontSize: FontSizes.small },
          textStyles,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    fontWeight: '600',
  },
})
